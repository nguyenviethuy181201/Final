import express from 'express';
import { createOrder, getMyOrder, getOrderDetail, getOrderResult } from '../Controller/OrderController.js';
import { protect } from '../Middleware/Auth.js';

const router = express.Router();

router.post('/createOrder', protect, createOrder);
router.get('/getMyOrder', protect, getMyOrder);
router.get('/:id/getOrderDetail', protect, getOrderDetail);
router.get('/:id/getOrderResult', protect, getOrderResult);

export default router;
