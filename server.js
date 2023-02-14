const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
app.use(bodyParser.json());

const messagesFile = "messages.txt";

app.post("/message", (req, res) => {
    const message = req.body.message.trim();
    if (message == "") {
        res.sendStatus(400);
        return;
    }

    fs.appendFile(messagesFile, message + "\n", (err) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });
});

app.get("/messages", (req, res) => {
    fs.readFile(messagesFile, "utf8", (err, data) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        } else {
            const messages = data.trim().split("\n");
            res.send(JSON.stringify(messages));
        }
    });
});

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});
