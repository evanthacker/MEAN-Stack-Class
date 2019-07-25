const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const Post = require('./models/post');

const app = express();

mongoose.connect("mongodb+srv://evan_thacker:Spike1991*@cluster0-bjmwv.mongodb.net/node-angular?retryWrites=true", { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to database!')
  })
  .catch(() => {
    console.log('Connection failed')
  });

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
})

app.post("/api/posts", (req, res, next) => {
      const post =  new Post({
        title: req.body.title,
        content: req.body.content
      });
      post.save();
      res.status(201).json({
        message: "Awesome! A post was added!"
      });
});

app.use("/api/posts", (req, res, next) => {
  const posts = [
    { id: "fadf12241l", title: "Congradulations On Making Your First Post", content: "Hi, my name is Tasty. I am an Artificial Intellegence bot and I am here to help with all your foodie needs! Congradulations On Making Your First Post! ."}
  ];
    res.status(200).json({
    message: "Posts fetched successfully!",
    posts: posts
  });
});

module.exports = app;
