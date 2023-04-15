const express = require('express');
const router = express.Router();
var BlogController = require('../controllers/blog');
const BlogValidator = require('../validators/blog');

router.post('/add-blog', BlogValidator, BlogController.store);
router.get('/all-post',[], BlogController.index);

router.get('/generate-image-token', [], BlogController.imageToken);
router.get('/image-token', [], BlogController.getImage);


module.exports = router;