import express from 'express';
import { getPosts,createPost ,updatePost , deletePost , likePost } from '../controllers/posts.js';
const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/', getPosts);
router.post('/', auth , createPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
router.patch('/:id/likePost', likePost);



export default router;