import { db } from "../config/db.js";

export const getSkills = async (req, res) => {
  try {
    const skills = await db.getSkills();
    return res.status(200).json({
      success: true,
      count: skills.length,
      data: skills,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to retrieve skills", error: error.message });
  }
};

export const createSkill = async (req, res) => {
  try {
    const { name, category, icon, description, displayOrder, featured, animationEnabled, proficiency, color } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: "Skill name is required" });
    }

    const newSkill = await db.createSkill({
      name: name.trim(),
      category: category || "Frontend",
      icon: icon || "code",
      description: description || "",
      displayOrder: displayOrder !== undefined ? Number(displayOrder) : undefined,
      featured: Boolean(featured),
      animationEnabled: animationEnabled !== undefined ? Boolean(animationEnabled) : true,
      proficiency: proficiency !== undefined ? Number(proficiency) : 85,
      color: color || "#06b6d4",
    });

    return res.status(201).json({
      success: true,
      message: "Skill created successfully",
      data: newSkill,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to create skill", error: error.message });
  }
};

export const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await db.updateSkill(id, req.body);

    if (!updated) {
      return res.status(404).json({ success: false, message: "Skill not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Skill updated successfully",
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to update skill", error: error.message });
  }
};

export const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await db.deleteSkill(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Skill not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Skill deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to delete skill", error: error.message });
  }
};

export const reorderSkills = async (req, res) => {
  try {
    const { order } = req.body;
    if (!Array.isArray(order)) {
      return res.status(400).json({ success: false, message: "Expected an array of id and displayOrder" });
    }

    for (const item of order) {
      await db.updateSkill(item.id || item._id, { displayOrder: item.displayOrder });
    }

    return res.status(200).json({ success: true, message: "Skills reordered successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to reorder skills", error: error.message });
  }
};
