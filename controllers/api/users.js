const { Redirect } = require("react-router");
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Mongoose } = require("mongoose");

module.exports = {
    create,
    login,
    manageFavorites,
    favorites,
    projects,
    createProject,
    getProject,
    updateProject
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
  if (!req.user) return null;
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
  user.save();
  res.json(user.favorites);
}

// Projects
async function projects(req, res) {
  if (!req.user) return null;
  const user = await User.getUser(req.user._id);
  res.json(user.projects);
}

async function createProject(req, res) {
  const user = await User.getUser(req.user._id);
  const project = {
    name: Buffer.from(req.params.project, 'base64').toString().slice(1, -1)
  }
  // If exists, return error
  let projExists = false
  user.projects.forEach((proj) => {
    if (proj.name === project.name) {
      projExists = true;
    }
  })
  // Add project if it doesn't exist
  if (!projExists) {
    user.projects.push(project);
    user.save();
    res.json(user.projects);
  } else {
    // Send duplicate error message back to user
  }
}
// View Single Project
async function getProject(req, res) {
  const project = await User.getProject(req.params.project);
  res.json(project);
}

async function updateProject(req, res) {
  const user = await User.getUser(req.user._id);
  const projectIndex = user.projects.findIndex(p => p._id.toString() === req.params.project)
  // check if typeface already exists in project
  if (user.projects[projectIndex].typefaces.indexOf(`"${req.body.typename}"`) > -1) {
    // if yes, remove it
    const typefaceIndex = user.projects[projectIndex].typefaces.indexOf(`"${req.body.typename}"`)
    const removedTypeface = user.projects[projectIndex].typefaces.splice(typefaceIndex, 1);
    console.log('yeaaa', user.projects)
  } else {
    // if no, add it
    user.projects[projectIndex].typefaces.push(`"${req.body.typename}"`);
    console.log('no :(', user.projects)
  }

  user.save();
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