 const connectToMongo = require("./db");
 connectToMongo();

 const express = require("express");
 const app = express();

 app.use(express.json());
 

//  ROUTES
 app.use("/api/auth", require("./routes/auth"));
 app.use("/api/notes", require("./routes/notes"));

 app.listen(3000, () => {
    console.log("Listening on port 3000...");
 })
 