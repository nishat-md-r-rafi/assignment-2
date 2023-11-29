import { UserModel } from './user.model';
import { TOrders, TUser } from './user.interface';

const createUserIntoDB = async (user: TUser) => {
  const result = await UserModel.create(user);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await UserModel.find().select('-password');
  return result;
};

const getSingleUserFromDB = async (userId: number) => {
  const result = await UserModel.find({ userId }).select('-password');
  return result;
};

const updateSingleUserFromDB = async (
  userId: number,
  newData: Partial<TUser>,
) => {
  const result = await UserModel.findOneAndUpdate(
    { userId },
    { $set: newData },
  );
  return result;
};
const deleteSingleUserFromDB = async (userId: number) => {
  const result = await UserModel.findOneAndDelete({ userId });
  return result;
};

const addNewProductInOrder = async (userId: number, orders: TOrders) => {
  const result = await UserModel.updateOne({ userId }, { $push: { orders } });
  return result;
};

const getAllOrdersFromDB = async (userId: number) => {
  const result = await UserModel.find({ userId }, { orders: 1, _id: 0 });
  return result;
};

const calculateTotalPriceOfUser = async (userId: number) => {
  const result = await UserModel.aggregate([
    { $match: { userId } },
    { $project: { orders: 1 } },
    { $unwind: '$orders' },
    {
      $group: {
        _id: null,
        totalPrice: {
          $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
        },
      },
    },
  ]);
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  deleteSingleUserFromDB,
  updateSingleUserFromDB,
  addNewProductInOrder,
  getAllOrdersFromDB,
  calculateTotalPriceOfUser,
};
