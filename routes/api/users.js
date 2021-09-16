const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');

// GET /api/users
router.get('/favorites', usersCtrl.favorites)
// POST /api/users
router.post('/', usersCtrl.create);
router.post('/login', usersCtrl.login);
router.post('/favorites/:favorite', usersCtrl.manageFavorites)

module.exports = router;