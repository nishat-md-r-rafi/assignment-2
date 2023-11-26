import { UserModel } from './user.model';
import { User } from './user.interface';

const createUserIntoDB = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await UserModel.find();
  return result;
};

const getSIngleUserFromDB = async (userId: number) => {
  const result = await UserModel.find({ userId });
  return result;
};
const deleteSingleUserFromDB = async (userId: number) => {
  const result = await UserModel.findOneAndDelete({ userId });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSIngleUserFromDB,
  deleteSingleUserFromDB,
};
