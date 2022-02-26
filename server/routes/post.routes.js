const router = require('express').Router();
const postController = require("../controllers/post");

router.post('/', postController.createPost);
router.get('/', postController.getAllPosts);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);
router.put('/addlikes/:id', postController.likePost);
router.get('/single/:id', postController.getOnePost);



module.exports = router;