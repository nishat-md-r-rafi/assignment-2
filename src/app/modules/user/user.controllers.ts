import { Request, Response } from 'express';
import { UserServices } from './user.service';

import userValidationSchema, {
  partialUserValidationSchema,
} from './user.validation';
import { ordersSchema } from './user.validation';
import { UserModel } from './user.model';

const createUser = async (req: Request, res: Response) => {
  try {
    const parsedData = userValidationSchema.parse(req.body);
    const result = await UserServices.createUserIntoDB(parsedData);

    res.status(200).json({
      success: true,
      message: 'user created successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

const updateUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  // const result = await UserModel.isUserExists(Number(userId));
  // console.log(result);

  if (await UserModel.isUserExists(Number(userId))) {
    try {
      const parsedData = partialUserValidationSchema.parse(req.body);
      const result = await UserServices.updateSingleUserFromDB(
        Number(userId),
        parsedData,
      );

      res.status(200).json({
        success: true,
        message: 'user updated successfully!',
        data: result,
      });
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  } else {
    res.status(404).json({
      success: false,
      message: 'user  not found!',
      error: {
        code: 404,
        description: 'user  not found!',
      },
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};
const getSingleUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const result = await UserServices.getSingleUserFromDB(Number(userId));

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};
const deleteSingleUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    await UserServices.deleteSingleUserFromDB(Number(userId));

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

const updateOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const parsedData = ordersSchema.parse(req.body);
    const result = await UserServices.addNewProductInOrder(
      Number(userId),
      parsedData,
    );

    console.log(result);

    res.status(200).json({
      success: true,
      message: 'order updated successfully!',
      data: null,
    });
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const result = await UserServices.getAllOrdersFromDB(Number(userId));

    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

const calculateTotalPrice = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const result = await UserServices.calculateTotalPriceOfUser(Number(userId));

    res.status(200).json({
      success: true,
      message: 'Total price calculated  successfully!',
      data: {
        totalPrice: result[0].totalPrice,
      },
    });
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};
export const UserControllers = {
  createUser,
  updateUser,
  getAllUsers,
  getSingleUser,
  deleteSingleUser,
  updateOrder,
  getAllOrders,
  calculateTotalPrice,
};
