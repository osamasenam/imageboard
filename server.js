const express = require('express');
const app = express();
const db = require("./db.js");
const { uploader } = require("./upload");
const s3 = require("./s3");


app.use(express.static('./public'));

app.use(express.json());

app.post('/upload', uploader.single('file'), s3.upload, db.postImage, (req, res) => {
    console.log("finished uploading");
    db.getLastImage()
    .then((dbResults) => {
        res.json(dbResults.rows);
    })
    .catch((err) => {
        console.log("err in db.getLastImage: ", err);
        res.send("Database Error!");
    });
});

app.get("/imageboard", (req, res) => {
    db.getImages()
    .then((dbResults) => {
        console.log("Got images from db successfully");
        res.json(dbResults.rows);
    })
    .catch((err) => {
        console.log("err in db.getImages: ", err);
        res.send("Database Error!");
    });
    
});

app.get("/getFirstId", (req, res) => {
    db.getFirstId()
    .then((firstId) => {
        console.log("first id from db is:", firstId.rows);
        res.json(firstId.rows);
    })
    .catch((err) => {
        console.log("err in db.getFirstId: ", err);
        res.send("Database Error!");
    });
    
});

app.get("/showMoreImages/:lastId", (req, res) => {
    console.log("getting more images from server", req.params.lastId);
    db.getMoreImages(req.params.lastId)
    .then((dbResults) => {
        console.log("Got more images from db successfully");
        res.json(dbResults.rows);
    })
    .catch((err) => {
        console.log("err in db.getMoreImages: ", err);
        res.send("Database Error!");
    });
    
});

app.get("/openImage/:imgId", (req,res) => {
    console.log("imgID:", req.params.imgId);
    db.getImage(req.params.imgId)
    .then((dbResults) => {
        console.log("Got the clicked image from db successfully");
        res.json(dbResults.rows);
    })
    .catch((err) => {
        console.log("err in db.getImage: ", err);
        res.send("Database Error!");
    });
})

app.post('/postComment', db.postComment, (req, res) => {
    console.log("req.body", req.body);
    db.getLastComment()
    .then((dbResults) => {
        res.json(dbResults.rows);
    })
    .catch((err) => {
        console.log("err in db.getLastComment: ", err);
        res.send("Database Error!");
    });
});


app.get("/comments/:imgId", (req, res) => {
    db.getComments(req.params.imgId)
    .then((dbResults) => {
        console.log("Got comments from db successfully");
        res.json(dbResults.rows);
    })
    .catch((err) => {
        console.log("err in db.getComments: ", err);
        res.send("Database Error!");
    });
    
});

app.post('/postTag', db.postTag, (req, res) => {
    console.log("req.body", req.body);
    db.getLastTag()
    .then((dbResults) => {
        res.json(dbResults.rows);
    })
    .catch((err) => {
        console.log("err in db.getLastTag: ", err);
        res.send("Database Error!");
    });
});


app.get("/tags/:imgId", (req, res) => {
    db.getTags(req.params.imgId)
    .then((dbResults) => {
        console.log("Got tags from db successfully");
        res.json(dbResults.rows);
    })
    .catch((err) => {
        console.log("err in db.getTags: ", err);
        res.send("Database Error!");
    });
    
});

app.get("/imageboard/:tag", (req, res) => {
    console.log("req.params.tag",req.params.tag)
    db.getImagesTag(req.params.tag)
    .then((dbResults) => {
        console.log("Got Tagged images from db successfully");
        res.json(dbResults.rows);
    })
    .catch((err) => {
        console.log("err in db.getImagesTag: ", err);
        res.send("Database Error!");
    });
    
});

app.get('*', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.listen(8080, () => console.log(`I'm listening.`));