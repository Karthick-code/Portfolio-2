import { db } from "../config/db.js";

export const getExperiences = async (req, res) => {
  try {
    const experiences = await db.getExperiences();
    return res.status(200).json({
      success: true,
      count: experiences.length,
      data: experiences,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to retrieve experience", error: error.message });
  }
};

export const createExperience = async (req, res) => {
  try {
    const { company, position, location, startDate, endDate, description, responsibilities, technologies, order, displayOrder } = req.body;

    if (!company || !position || !startDate) {
      return res.status(400).json({ success: false, message: "Company, position, and start date are required" });
    }

    const exp = await db.createExperience({
      company: company.trim(),
      position: position.trim(),
      location: location || "Remote",
      startDate: startDate.trim(),
      endDate: endDate || "Present",
      description: description || "",
      responsibilities: Array.isArray(responsibilities) ? responsibilities : [],
      technologies: Array.isArray(technologies) ? technologies : [],
      order: order !== undefined ? Number(order) : (displayOrder !== undefined ? Number(displayOrder) : undefined),
    });

    return res.status(201).json({
      success: true,
      message: "Experience created successfully",
      data: exp,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to create experience", error: error.message });
  }
};

export const updateExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await db.updateExperience(id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: "Experience entry not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Experience updated successfully",
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to update experience", error: error.message });
  }
};

export const deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await db.deleteExperience(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Experience entry not found" });
    }
    return res.status(200).json({ success: true, message: "Experience deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to delete experience", error: error.message });
  }
};
