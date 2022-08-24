const express = require("express");
const app = express();
const path = require("path");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const multer = require("multer");
aws.config.loadFromPath(__dirname + "/config/s3.json");

const s3 = new aws.S3();
const storage = multerS3({
  s3: s3,
  bucket: "insta-amazing-clone/User profile",
  acl: "public-read",
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

app.set("view engine", "ejs");

app.get("/upload", (req, res) => {
  res.render("upload");
});

app.post("/upload", upload.single("image"), (req, res) => {
  console.log(req.body);
  const image = req.file.location;
  res.send(image);
});

app.listen(3000);
console.log("Server Running");
