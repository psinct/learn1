// Create web server for comments
// 1. Create web server
// 2. Create router
// 3. Create GET endpoint for comments
// 4. Create POST endpoint for comments
// 5. Create PUT endpoint for comments
// 6. Create DELETE endpoint for comments
// 7. Export router
// 8. Import router in server.js

const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Comment = require('../models/Comment');

// 3. Create GET endpoint for comments
// @route GET api/comments
// @desc Get all comments
// @access Public
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error - GET');
  }
});

// 4. Create POST endpoint for comments
// @route POST api/comments
// @desc Create a comment
// @access Public
router.post(
  '/',
  [
    check('name', 'Please enter your name.').not().isEmpty(),
    check('email', 'Please enter a valid email address.').isEmail(),
    check('text', 'Please enter a comment.').not().isEmpty(),
  ],
  async (req, res) => {
    // 4.1 Check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // 4.2 If there are errors, return a 400 status and the errors
      return res.status(400).json({ errors: errors.array() });
    }

    // 4.3 If there are no errors, create a new comment
    const { name, email, text } = req.body;

    try {
      // 4.4 Create a new comment
      const newComment = new Comment({
        name,
        email,
        text,
      });

      // 4.5 Save the new comment
      const comment = await newComment.save();

      // 4.6 Return the new comment
      res.json(comment);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error - POST');
    }
  }
);

// 5. Create PUT endpoint for comments
// @route PUT api/comments/:id
//
