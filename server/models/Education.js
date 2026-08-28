import { db } from "../config/db.js";

export const Education = {
  find: () => db.getEducations(),
  create: (data) => db.createEducation(data),
  findByIdAndUpdate: (id, data) => db.updateEducation(id, data),
  findByIdAndDelete: (id) => db.deleteEducation(id),
  countDocuments: async () => (await db.getEducations()).length,
};
