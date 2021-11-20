const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const dotenv = require('dotenv');

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: 'User Does Not Exist' });
    }

    const isPasswordCorrect = await bycrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: 'Something gone wrong' });
  }
};

const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName, githubLink } =
    req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(404).json({ message: 'User already exists' });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Password do not match' });
    }
    const hashedPassword = await bycrypt.hash(
      password,
      Number(process.env.SALT)
    );

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      githubLink,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.SECRET,
      {
        expiresIn: '10h',
      }
    );

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: 'Something gone wrong' });
  }
};

module.exports = {
  signin,
  signup,
};
