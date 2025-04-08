const express = require('express');
const router = express.Router();
const { getAllPosts, createPost, deletePost } = require('../controllers/social.controller');

// Get all posts
router.get('/posts', getAllPosts);

// Create a new post
router.post('/posts', createPost);

// Delete a post by ID
router.delete('/posts/:id', deletePost);

module.exports = router;
