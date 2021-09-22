const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');

// User
// POST /api/users
router.post('/', usersCtrl.create);
router.post('/login', usersCtrl.login);

// Favorites
// GET /api/users
router.get('/favorites', usersCtrl.favorites)
// POST /api/users
router.post('/favorites/:favorite', usersCtrl.manageFavorites)

// Projects
// GET /api/users
router.get('/projects', usersCtrl.projects)

module.exports = router;