const PostModel = require("../models/PostModel");

module.exports.createPost = async (req, res) => {
  const { posterId, message, title, picture, likes, date } = req.body;
  try {
    const post = await PostModel.create({
      posterId,
      message,
      title,
      picture,
      likes,
      date,
    });
    res.status(200).send(post);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports.getAllPosts = async (req, res) => {
  try {
    const getPosts = await PostModel.find();
    res.status(200).send(getPosts);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports.updatePost = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedPost = await PostModel.findByIdAndUpdate(
      id,
      {
        $set: {
          message: req.body.message,
        },
      },
      {
        new: true,
      }
    );
    res.status(200).send(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
module.exports.deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPost = await PostModel.findByIdAndDelete(id);
    res.status(200).send(deletedPost);
  } catch (error) {
    res
      // .status(400)
      .send(error);
  }
};

module.exports.likePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostModel.findById(id);
    const countLikes = await PostModel.findByIdAndUpdate(
      id,
      {
        $set: {
          likes: post.likes + 1,
        },
      },
      {
        new: true,
      }
    );
    res.status(200).send(countLikes);
  } catch (error) {
    console.log(error);
  }
};

module.exports.getOnePost = async (req, res) => {
  const { id } = req.params;

  try {
    const onepost = await PostModel.findById(id);
    res.status(200).send(onepost);
  } catch (error) {
    res.status(400).send(error);
  }
};
