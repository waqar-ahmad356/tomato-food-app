import express from 'express';
import authMiddleWare from '../middleware/auth.js';

import { addToCart,removeFromCart,getCart } from '../controllers/cartcontroller.js';

const cartRouter=express.Router();

cartRouter.post('/add',authMiddleWare,addToCart);
cartRouter.post('/remove',authMiddleWare,removeFromCart);
cartRouter.post('/get',authMiddleWare,getCart);

export default cartRouter;