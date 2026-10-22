import { db } from "../config/db.js";

export const Skill = {
  find: () => db.getSkills(),
  create: (data) => db.createSkill(data),
  findByIdAndUpdate: (id, data) => db.updateSkill(id, data),
  findByIdAndDelete: (id) => db.deleteSkill(id),
  countDocuments: async () => (await db.getSkills()).length,
};
