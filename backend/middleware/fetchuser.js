const jwt = require("jsonwebtoken");
const jwtSecret = "bradley";

const fetchuser = (req, res, next) => {

    let token = req.header("auth-token");
    if (!token) {
        return res.status(401).json({error: "Please use a valid token."});
    }
    try {
        jwt.verify(token, jwtSecret, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                req.user = data.user;
            }
        });
        
        
        next();
    
    } catch (error) {
        
        return res.status(401).json({error: "Please use a valid token"})
        
    }
    
}

module.exports = fetchuser