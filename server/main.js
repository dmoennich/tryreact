/**
 * Created by daniel on 04.11.15.
 */
"use strict";
let express = require("express");
let app = express();
let path = require("path");


app.use(express.static(path.join(__dirname, "../dist")));

app.get("/", (request, response, next) => response.sendFile(path.join(__dirname, "../browser/index.html")));


app.listen(3000, () => console.log("Listening on port 3000..."));