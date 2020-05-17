const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT =  process.env.PORT || 3000;
const routes = require("./routes/allRoutes")

mongoose.connect("mongodb://localhost:27017/customerDB", { useNewUrlParser: true, useUnifiedTopology: true });

// Sets up the Express app to handle data parsing
app.use(express.static(__dirname + "/public/"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes

routes.htmlRoutes(app);
routes.apiRoutes(app);

app.listen(PORT, function(){
    console.log("Listening on PORT: " + PORT)
})