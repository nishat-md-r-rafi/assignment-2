import { Request, Response } from 'express';
import { UserServices } from './user.service';
import * as CryptoJS from 'crypto-js';

const createUser = async (req: Request, res: Response) => {
  try {
    const { password, ...userData } = req.body;
    const encryptedPass = CryptoJS.AES.encrypt(
      password,
      'rafidev005',
    ).toString();

    const result = await UserServices.createUserIntoDB({
      encryptedPass,
      ...userData,
    });

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

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();

    res.status(200).json({
      success: true,
      message: 'All Users are shown!',
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
    const result = await UserServices.getSIngleUserFromDB(Number(userId));

    res.status(200).json({
      success: true,
      message: 'Specific are shown!',
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
    const result = await UserServices.deleteSingleUserFromDB(Number(userId));

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteSingleUser,
};
