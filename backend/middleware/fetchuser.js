const jwt = require("jsonwebtoken");
const jwtSecret = "bradley";

const fetchuser = (req, res, next) => {

    let token = req.header("auth-token");
    if (!token) {
        return res.status(401).json({error: "Please use a valid token."});
    }
    try {
        
        const data = jwt.verify(token, jwtSecret);
        req.user = data.user;
        next();
    
    } catch (error) {
        
        return res.status(401).json({error: "Please use a valid token"})
        
    }
    
}

module.exports = fetchuser