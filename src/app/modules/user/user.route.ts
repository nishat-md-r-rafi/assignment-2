import express from 'express';
import { UserControllers } from './user.controllers';

const router = express.Router();

router.post('/', UserControllers.createUser);
router.get('/', UserControllers.getAllUsers);
router.get('/:userId', UserControllers.getSingleUser);
router.delete('/:userId', UserControllers.deleteSingleUser);
router.put('/:userId/orders', UserControllers.updateOrder);
router.get('/:userId/orders', UserControllers.getAllOrders);
router.put('/:userId/', UserControllers.updateUser);

export const UserRouter = router;
