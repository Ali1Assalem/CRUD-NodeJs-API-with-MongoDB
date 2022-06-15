const express = require("express");
const Post = require("../Models/Post");
const router = express.Router();

// GREEN GET ALL THE POSTS
router.get("/", (req, res) => {
    Post.find()
        .then((data) => res.json(data))
        .catch((error) => res.send(error));
});
// SKY POST THE POST TO DB
router.post("/", (req, res) => {
    const post = new Post({ title: req.body.title, description: req.body.description });

    post
        .save()
        .then((data) => res.status(200).send(data))
        .catch((error) => {
            res.status(500).send(error);
        });
});
// PINK GET SPECIFIC POST FROM DB
router.get("/:postId", (req, res) => {
    Post.findById(req.params.postId)
        .then((data) => res.json(data))
        .catch((error) => {
            res.send(error);
        });
});

// FIRE DELETE THE POST FROM DB
router.delete("/:postId", (req, res) => {
    Post.deleteOne({ _id: req.params.postId })
        .then((data) => res.json(data))
        .catch((error) => res.send(error));
});

// orange UPDATA THE POST IN DB
router.patch("/:postId", (req, res) => {
    Post.updateOne({ _id: req.params.postId }, { title: req.body.title, description: req.body.description })
        .then((data) => res.json(data))
        .catch((error) => res.send(error));
});

module.exports = router;