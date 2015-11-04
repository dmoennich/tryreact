/**
 * Created by daniel on 04.11.15.
 */
"use strict";
let express = require("express");
let app = express();
let path = require("path");
let fs = require("fs");
let bodyParser = require("body-parser");

const COMMENTS_FILE = path.join(__dirname, 'comments.json');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(express.static(path.join(__dirname, "../dist")));
app.use(express.static(path.join(__dirname, "../browser/css")));

app.get("/", (request, response, next) => response.sendFile(path.join(__dirname, "../browser/index.html")));


app.get("/api/comments", (req, res) => {
    fs.readFile(COMMENTS_FILE, (err, data) => {
        res.setHeader("Cache-Control", "no-cache");
        res.json(JSON.parse(data));
    });
});

app.post("/api/comments", (req, res) => {
    fs.readFile(COMMENTS_FILE, (err, data) => {
        let comments = JSON.parse(data);
        comments.push(req.body);
        fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), (err) => {
            res.setHeader("Cache-Control", "no-cache");
            res.json(comments);
        });
    });
});






app.listen(3000, () => console.log("Listening on port 3000..."));