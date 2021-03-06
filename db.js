const spicedPg = require("spiced-pg");
// const { dbUserName, dbPassword} = require("./secrets.json");
const database = "imageboard";

const db = spicedPg(
    process.env.DATABASE_URL ||
    `postgres:postgres:postgres@localhost:5432/${database}`
);

// let db;
// if(process.env.DATABASE_URL) {
//     db = spicedPg(process.env.DATABASE_URL);
// } else {
//     // we are running our app locally
//     const { dbUserName, dbPassword} = require("./secrets.json");
//     db = spicedPg(
//         `postgres:${dbUserName}:${dbPassword}@localhost:5432/${database}`
//     );
// }

console.log(`db connecting to: ${database}`);


module.exports.getImages = () => {
    const q = `SELECT * FROM images ORDER BY created_at DESC LIMIT 6`;
    return db.query(q);
};

module.exports.getFirstId = () => {
    const q = `SELECT id FROM images ORDER BY created_at ASC LIMIT 1`;
    return db.query(q);
};

module.exports.getMoreImages = (lastId) => {
    const q = `SELECT * FROM images WHERE id < $1 ORDER BY created_at DESC  LIMIT 6`;
    const params = [lastId];
    return db.query(q,params);
};

module.exports.getLastImage = () => {
    const q = `SELECT * FROM images ORDER BY created_at DESC LIMIT 1`;
    return db.query(q);
};

module.exports.getImage = (id) => {
    const q = `SELECT *, 
            (SELECT id FROM images WHERE id>$1 LIMIT 1) AS next_id, 
            (SELECT id FROM images WHERE id<$1 ORDER BY created_at DESC LIMIT 1) AS previous_id 
            FROM images WHERE id=$1`;
    const params = [id];
    return db.query(q,params);
};

module.exports.postImage = (req, res, next) => { 
    const q = `INSERT INTO images (url, username, title, description) VALUES ($1, $2, $3, $4)`;
    const params = [`https://s3.amazonaws.com/spicedling/${req.file.filename}`, req.body.username, req.body.title , req.body.description];
    return db.query(q, params).then(() => next());
    
}

module.exports.getComments = (id) => {
    const q = `SELECT * FROM comments WHERE image_id=$1`;
    const params = [id];
    return db.query(q,params);
};

module.exports.postComment = (req, res, next) => { 
    const q = `INSERT INTO comments (image_id, username, comment) VALUES ($1, $2, $3)`;
    const params = [req.body.id, req.body.username, req.body.comment];
    return db.query(q, params).then(() => next());
    
}

module.exports.getLastComment = () => {
    const q = `SELECT * FROM comments ORDER BY created_at DESC LIMIT 1`;
    return db.query(q);
};


module.exports.getTags = (id) => {
    const q = `SELECT * FROM tags WHERE image_id=$1`;
    const params = [id];
    return db.query(q,params);
};

module.exports.postTag = (req, res, next) => { 
    const q = `INSERT INTO tags (image_id, tag) VALUES ($1, $2)`;
    const params = [req.body.id, req.body.tag];
    return db.query(q, params).then(() => next());
    
}

module.exports.getLastTag = () => {
    const q = `SELECT * FROM tags ORDER BY created_at DESC LIMIT 1`;
    return db.query(q);
};

module.exports.getImagesTag = (tag) => {
    const q = `SELECT images.id, url, username, title, description, images.created_at FROM images 
            LEFT OUTER JOIN tags 
            ON tags.image_id=images.id 
            WHERE tag=$1`;
    const params = [tag];
    return db.query(q, params);
};

// module.exports.getNextImage = (id) => {
//     const q = `SELECT *, 
//             (SELECT id FROM images WHERE id>$1 LIMIT 1) AS next_id, 
//             (SELECT id FROM images WHERE id<$1 ORDER BY created_at DESC LIMIT 1) AS previous_id 
//             FROM images WHERE id=$1`;
//     const params = [id];
//     return db.query(q,params);
// };