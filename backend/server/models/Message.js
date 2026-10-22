import { db } from "../config/db.js";

export const Message = {
  find: () => db.getMessages(),
  create: (data) => db.createMessage(data),
  findByIdAndUpdate: (id, { read }) => db.updateMessageReadStatus(id, read),
  findByIdAndDelete: (id) => db.deleteMessage(id),
  countDocuments: async () => (await db.getMessages()).length,
};
