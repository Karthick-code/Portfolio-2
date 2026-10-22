import { db } from "../config/db.js";

export const Profile = {
  findOne: () => db.getProfile(),
  findOneAndUpdate: (_, updateData) => db.updateProfile(updateData),
  create: (data) => db.updateProfile(data),
};
