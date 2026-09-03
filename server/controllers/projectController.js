// import { db } from "../config/db.js";

// const slugify = (text) => {
//   return text
//     .toString()
//     .toLowerCase()
//     .trim()
//     .replace(/\s+/g, "-")
//     .replace(/[^\w\-]+/g, "")
//     .replace(/\-\-+/g, "-");
// };

// export const getProjects = async (req, res) => {
//   try {
//     const projects = await db.getProjects();
//     return res.status(200).json({
//       success: true,
//       count: projects.length,
//       data: projects,
//     });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: "Failed to retrieve projects", error: error.message });
//   }
// };

// export const getProjectBySlug = async (req, res) => {
//   try {
//     const { slug } = req.params;
//     const project = await db.getProjectBySlug(slug);
//     if (!project) {
//       return res.status(404).json({ success: false, message: "Project not found" });
//     }
//     return res.status(200).json({ success: true, data: project });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const createProject = async (req, res) => {
//   try {
//     const { title, description, fullDescription, technologies, githubUrl, liveUrl, featured, order, challenges, solutions, imageUrl, image } = req.body;

//     if (!title || !description) {
//       return res.status(400).json({ success: false, message: "Title and description are required" });
//     }

//     const slug = slugify(title) + "-" + Math.floor(1000 + Math.random() * 9000);

//     const newProject = await db.createProject({
//       title: title.trim(),
//       slug,
//       description: description.trim(),
//       fullDescription: fullDescription || description.trim(),
//       imageUrl: imageUrl || image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
//       technologies: Array.isArray(technologies) ? technologies : [],
//       githubUrl: githubUrl || "https://github.com",
//       liveUrl: liveUrl || "",
//       featured: Boolean(featured),
//       order: order !== undefined ? Number(order) : undefined,
//       challenges: Array.isArray(challenges) ? challenges : [],
//       solutions: Array.isArray(solutions) ? solutions : [],
//     });

//     return res.status(201).json({
//       success: true,
//       message: "Project created successfully",
//       data: newProject,
//     });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: "Failed to create project", error: error.message });
//   }
// };

// export const updateProject = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const body = { ...req.body };
//     if (body.title && !body.slug) {
//       body.slug = slugify(body.title);
//     }
//     if (body.image && !body.imageUrl) {
//       body.imageUrl = body.image;
//     }

//     const updated = await db.updateProject(id, body);
//     if (!updated) {
//       return res.status(404).json({ success: false, message: "Project not found" });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Project updated successfully",
//       data: updated,
//     });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: "Failed to update project", error: error.message });
//   }
// };

// export const deleteProject = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deleted = await db.deleteProject(id);
//     if (!deleted) {
//       return res.status(404).json({ success: false, message: "Project not found" });
//     }
//     return res.status(200).json({ success: true, message: "Project deleted successfully" });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: "Failed to delete project", error: error.message });
//   }
// };

import { db } from "../config/db.js";

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
};

export const getProjects = async (req, res) => {
  try {
    const projects = await db.getProjects();
    return res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to retrieve projects", error: error.message });
  }
};

export const getProjectBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const project = await db.getProjectBySlug(slug);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }
    return res.status(200).json({ success: true, data: project });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      fullDescription,
      technologies,
      githubUrl,
      liveUrl,
      featured,
      order,
      challenges,
      solutions,
      imageUrl,
      image,
      problem,
      solution,
      features,
      category,
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({ success: false, message: "Title and description are required" });
    }

    const slug = req.body.slug ? req.body.slug : (slugify(title) + "-" + Math.floor(1000 + Math.random() * 9000));
    const targetImage = image || imageUrl || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80";

    const projectChallenges = Array.isArray(challenges) && challenges.length > 0
      ? challenges
      : (problem ? [problem] : []);

    const projectSolutions = Array.isArray(solutions) && solutions.length > 0
      ? solutions
      : (Array.isArray(features) && features.length > 0 ? features : (solution ? [solution] : []));

    const newProject = await db.createProject({
      title: title.trim(),
      slug,
      description: description.trim(),
      fullDescription: fullDescription || description.trim(),
      imageUrl: targetImage,
      image: targetImage,
      technologies: Array.isArray(technologies) ? technologies : [],
      githubUrl: githubUrl || "https://github.com",
      liveUrl: liveUrl || "",
      featured: Boolean(featured),
      order: order !== undefined ? Number(order) : undefined,
      challenges: projectChallenges,
      solutions: projectSolutions,
      category: category || "Full Stack",
    });

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: newProject,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to create project", error: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const body = { ...req.body };
    if (body.title && !body.slug) {
      body.slug = slugify(body.title);
    }

    // Resolve preview image URL cleanly
    let resolvedImage = undefined;
    if (body.image !== undefined && body.imageUrl !== undefined) {
      resolvedImage = body.image !== "" ? body.image : body.imageUrl;
    } else if (body.image !== undefined) {
      resolvedImage = body.image;
    } else if (body.imageUrl !== undefined) {
      resolvedImage = body.imageUrl;
    }

    if (resolvedImage !== undefined) {
      body.imageUrl = resolvedImage;
      body.image = resolvedImage;
    }

    // Map problem / solution / features to challenges / solutions if provided
    if (body.problem !== undefined && (!body.challenges || body.challenges.length === 0)) {
      body.challenges = body.problem ? [body.problem] : [];
    }
    if (body.features !== undefined && (!body.solutions || body.solutions.length === 0)) {
      body.solutions = Array.isArray(body.features) ? body.features : [];
    } else if (body.solution !== undefined && (!body.solutions || body.solutions.length === 0)) {
      body.solutions = body.solution ? [body.solution] : [];
    }

    const updated = await db.updateProject(id, body);
    if (!updated) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to update project", error: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await db.deleteProject(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }
    return res.status(200).json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to delete project", error: error.message });
  }
};
