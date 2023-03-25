 const connectToMongo = require("./db");
 const cors = require("cors");
 connectToMongo();

 const express = require("express");
 const app = express();

 app.use(cors());
 app.use(express.json());
 

//  ROUTES
 app.use("/api/auth", require("./routes/auth"));
 app.use("/api/notes", require("./routes/notes"));

 app.listen(5000, () => {
    console.log("Listening on port 5000...");
 });
 