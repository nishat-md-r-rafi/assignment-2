import express from 'express';
import { UserControllers } from './user.controllers';

const router = express.Router();

router.post('/', UserControllers.createUser);
router.get('/', UserControllers.getAllUsers);
router.get('/:userId', UserControllers.getSingleUser);
router.put('/:userId', UserControllers.updateUser);
router.delete('/:userId', UserControllers.deleteSingleUser);
router.put('/:userId/orders', UserControllers.updateOrder);
router.get('/:userId/orders', UserControllers.getAllOrders);
router.get('/:userId/orders/total-price', UserControllers.calculateTotalPrice);

export const UserRouter = router;
