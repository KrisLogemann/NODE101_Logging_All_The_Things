const express = require("express");
const app = express();

const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const moment = require("moment");
let object = [];

app.use((req, res, next) => {
    // write your logging code here
    let Agent = req.headers["user-agent"];
    let Time = moment().format();
    let Method = req.method;
    let Resource = req._parsedUrl["path"];
    let Version = "HTTP/1.1";
    let Status = "200";
    console.log(
        Agent +
        "," +
        Time +
        "," +
        Method +
        "," +
        Resource +
        "," +
        Version +
        "," +
        Status
        );
        
        var userInfo =
        "/n" +
        Agent +
        "," +
        Time +
        "," +
        Method +
        "," +
        Resource +
        "," +
        Version +
        "," +
        Status;
        
        var userInfo = {
            Agent: req.headers["user-agent"],
            Time: moment()
            .utc()
            .format(),
            Method: req.method,
            Resource: req._parsedUrl["path"],
            Version: "HTTP/1.1",
            Status: "200"
        };
        
        object.push(userInfo);
        fs.appendFile(path.resolve(__dirname, 'log.csv'), userInfo, function (err) {
            if (err) throw err;
        });
    next();
    });

app.get("/", (req, res) => {
  // write your code to respond "ok" here
  res.status(200).send("ok");
});

app.get("/logs", (req, res) => {
  // write your code to return a json object containing the log data here
  res.json(object);
});

module.exports = app;
