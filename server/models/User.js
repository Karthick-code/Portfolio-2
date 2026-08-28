import { db } from "../config/db.js";

export const User = {
  findByEmail: (email) => db.findUserByEmail(email),
  findById: (id) => db.findUserById(id),
  create: (data) => db.createUser(data),
  countDocuments: () => db.countUsers(),
};
