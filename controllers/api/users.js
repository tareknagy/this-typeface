const { Redirect } = require("react-router");
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
    create,
    login,
    manageFavorites,
    favorites,
    projects
};

// User
async function create(req, res) {
    try {
        // Add user
        const user = await User.create(req.body);
        const token = createJWT(user);
        res.json(token);
    } catch (err) {
        res.status(400).json(err);
    }
}

async function login(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) throw new Error();
      const match = await bcrypt.compare(req.body.password, user.password);
      if (match) {
        const token = createJWT(user);
        res.json(token);
      } else {
        throw new Error();
      }
    } catch {
      res.status(400).json('Bad Credentials');
    }
}

// Favorites
async function favorites(req, res) {
  const user = await User.getUser(req.user._id);
  res.json(user.favorites);
}

async function manageFavorites(req, res) {
  const user = await User.getUser(req.user._id);
  const typeface = Buffer.from(req.params.favorite, 'base64').toString();
  // Delete if there
  if (user.favorites.indexOf(typeface) > -1) {
    user.favorites.splice(user.favorites.indexOf(typeface), 1);
  } else {
    user.favorites.push(typeface);
  }
  // const testProject = {name: '004-iOHsABranding'}
  // user.projects.push(testProject);
  user.save();
  res.json(user.favorites);
}

// Projects
async function projects(req, res) {
  const user = await User.getUser(req.user._id);
  res.json(user.projects);
}

// Helper functions
function createJWT(user) {
    return jwt.sign(
        { user }, 
        process.env.SECRET,
        { expiresIn: '24h' }
    );
}