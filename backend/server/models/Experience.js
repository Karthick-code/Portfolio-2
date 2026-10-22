import { db } from "../config/db.js";

export const Experience = {
  find: () => db.getExperiences(),
  create: (data) => db.createExperience(data),
  findByIdAndUpdate: (id, data) => db.updateExperience(id, data),
  findByIdAndDelete: (id) => db.deleteExperience(id),
  countDocuments: async () => (await db.getExperiences()).length,
};
