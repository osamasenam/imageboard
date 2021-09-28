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
    const q = `SELECT * FROM images ORDER BY created_at DESC`;
    return db.query(q);
};

module.exports.postImage = (req, res, next) => { 
    const q = `INSERT INTO images (url, username, title, description) VALUES ($1, $2, $3, $4)`;
    const params = [`https://s3.amazonaws.com/spicedling/${req.file.filename}`, req.body.username, req.body.title , req.body.description];
    return db.query(q, params);
}