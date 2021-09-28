const express = require('express');
const app = express();
const db = require("./db.js");
const { uploader } = require("./upload");
const s3 = require("./s3");


app.use(express.static('./public'));

app.use(express.json());

app.post('/upload', uploader.single('file'), s3.upload, db.postImage, (req, res) => {
    db.getImages()
    .then((dbResults) => {
        console.log("updated dbResults: ", dbResults.rows);
        res.json(dbResults.rows);
    })
    .catch((err) => {
        console.log("err in db.getImages: ", err);
        res.send("Database Error!");
    });
});

app.get("/imageboard", (req, res) => {
    db.getImages()
    .then((dbResults) => {
        console.log("dbResults: ", dbResults.rows);
        res.json(dbResults.rows);
    })
    .catch((err) => {
        console.log("err in db.getImages: ", err);
        res.send("Database Error!");
    });
    
});

app.get('*', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.listen(8080, () => console.log(`I'm listening.`));