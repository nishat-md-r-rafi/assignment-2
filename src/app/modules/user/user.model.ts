import { Schema, model } from 'mongoose';
import {
  TAddress,
  TFullName,
  TOrders,
  TUser,
  UserCustomModel,
} from './user.interface';
import * as CryptoJS from 'crypto-js';

const fullNameSchema = new Schema<TFullName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const addressSchema = new Schema<TAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const ordersSchema = new Schema<TOrders>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const userSchema = new Schema<TUser, UserCustomModel>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: fullNameSchema,
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: {
    type: String,
    enum: {
      values: ['active', 'blocked'],
      message: 'only can assign active and blocked!',
    },
    default: 'active',
  },
  hobbies: [String],
  address: addressSchema,
  orders: { type: [ordersSchema], required: false },
});

userSchema.pre('save', function (next) {
  this.password = CryptoJS.AES.encrypt(this.password, 'rafidev005').toString();
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExists = async function (userId: number) {
  const result = await this.find({ userId });
  return result.length > 0;
};

export const UserModel = model<TUser, UserCustomModel>('User', userSchema);
