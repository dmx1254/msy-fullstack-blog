const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const objectID = require("mongoose").Types.ObjectId;

const { signUpErrors, signInErrors } = require("../utils/Utils");
module.exports.signUp = async (req, res) => {
  console.log(req.body);
  const { pseudo, email, password, selectedFile, bio } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await UserModel.create({
      pseudo,
      email,
      password: hashedPassword,
      selectedFile,
      bio,
    });
    res.status(201).json({ user: user._id });
  } catch (error) {
    let errors = signUpErrors(error);
    res.send({ errors });
  }
};

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user)
    return (
      res
        // .status(400)
        .send(signInErrors("email inconnu veuillez vous inscrire"))
    );
  const isCorrectPassword = await bcrypt.compare(password, user.password);
  if (!isCorrectPassword)
    return (
      res
        // .status(400)
        .send(signInErrors("Mot de passe inconnu"))
    );
  try {
    const token = await jwt.sign(
      { id: user._id },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.cookie("jwt", token, { maxAge: 1000 * 3600 });
    res.status(201).json({ result: user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports.logout = async (req, res) => {
  try {
    await res.cookie("jwt", "", { maxAge: 1 });
    res.status(201).send("cookie deleted");
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports.getAllUsers = async (req, res) => {
  try {
    const allUser = await UserModel.find().select("-password");
    res.status(201).json(allUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports.getOneUser = async (req, res) => {
  const { id } = req.params;
  try {
    const oneUser = await UserModel.findById(id).select("-password");
    res.status(200).send(oneUser);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports.updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const updateUser = await UserModel.findByIdAndUpdate(
      id,
      {
        $set: {
          pseudo: req.body.pseudo,
          selectedFile: req.body.selectedFile,
          bio: req.body.bio,
        },
      },
      {
        new: true, upsert: true, setDefaultsOnInsert: true
      }
    ).select("-password");
    res.status(200).send(updateUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  // if (!objectID.isValid(id)) return res.status(400).send("ID inconnu");
  try {
    const userDeleted = await UserModel.findByIdAndRemove(id);
    res.status(201).send(userDeleted);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
