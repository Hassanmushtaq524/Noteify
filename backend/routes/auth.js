const express = require("express");
const router = express.Router();
const User = require("../models/User");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "bradley";


// ROUTE 1
// Create new User using POST: "/api/auth/createuser". Doesn't require auth
router.post("/createuser",
    [body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 })],
    async (req, res) => {
        try {
            // validating our request
            let success = false;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success, errors: errors.array() });
            }

            // checking if email already exists
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ success, errors: "This email is already in use." });
            }


            // salt the password and use the salt to hash it
            let salt = await bcrypt.genSalt(10);
            let secPass = await bcrypt.hash(req.body.password, 10);
            // store the user in DB using the model and the new hashed password  
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            });


            // we create a JWT token for authentication in the future for secure route
            let data = {
                user: {
                    id: user.id
                }
            }
            // send the token
            const jwtToken = jwt.sign(data, jwtSecret);
            success = true;
            return res.json({ success, jwtToken });

        } catch (error) {

            console.error(error.message);
            return res.status(500).send("Internal Server Error.");

        }

    })

// ROUTE 2 
// Login a user using POST: "/api/auth/login" Doesnt require authentication
router.post("/login",
    [body("email").isEmail(),
    body("password").exists()],
    async (req, res) => {
        let success = false;
        // validating our request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }

        // get request 
        let { email, password } = req.body;

        try {
            // check if user already exists
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({
                    success,
                    error: "Please use valid credentials."
                });
            }
            // compare the password if the email exists
            const check = await bcrypt.compareSync(password, user.password);
            if (!check) {
                return res.status(400).json({
                    success,
                    error: "Please use valid credentials."
                });
            }

            // user has been authenticated, send a token
            // create a token
            const data = {
                user: {
                    id: user.id
                }
            }

            const jwtToken = jwt.sign(data, jwtSecret);
            // successfully passed all checks
            success = true;
            return res.json({ success, jwtToken: jwtToken });

        } catch (error) {

            console.error(error.message);
            return res.status(500).json({ error: "Internal Server Error." });

        }


    })

// ROUTE 3
// return user details using GET: "/api/auth/getuser" LOGIN REQUIRED
router.post("/getuser", fetchuser, async (req, res) => {

    try {

        let userId = req.user.id;
        let user = await User.findById(userId).select("-password");
        return res.json(user);
    } catch (error) {


        console.error(error.message);
        return res.status(500).json({ error: "Internal Server Error." });

    }
})

module.exports = router;