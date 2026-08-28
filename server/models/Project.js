import { db } from "../config/db.js";

export const Project = {
  find: () => db.getProjects(),
  findOne: ({ slug }) => db.getProjectBySlug(slug),
  create: (data) => db.createProject(data),
  findByIdAndUpdate: (id, data) => db.updateProject(id, data),
  findByIdAndDelete: (id) => db.deleteProject(id),
  countDocuments: async () => (await db.getProjects()).length,
};
