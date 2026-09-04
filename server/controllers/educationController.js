

import { db } from "../config/db.js";

export const getEducations = async (req, res) => {
  try {
    const educations = await db.getEducations();
    return res.status(200).json({
      success: true,
      count: educations.length,
      data: educations,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to retrieve education", error: error.message });
  }
};

export const createEducation = async (req, res) => {
  try {
    const {
      institution,
      degree,
      field,
      location,
      startDate,
      endDate,
      description,
      order,
      displayOrder,
      category,
      catgry,
    } = req.body;

    if (!institution || !degree || !field || !startDate) {
      return res.status(400).json({ success: false, message: "Institution, degree, field, and start date are required" });
    }

    const rawCat = category !== undefined ? category : (catgry !== undefined ? catgry : "");
    const cleanCat = typeof rawCat === "string" ? rawCat.trim() : (rawCat || "");
    const resolvedCat = cleanCat || (degree.toLowerCase().includes("cert") ? "Certificate" : "Education");
    const cleanEndDate = endDate !== undefined && endDate !== null ? endDate.trim() : "";

    const edu = await db.createEducation({
      institution: institution.trim(),
      degree: degree.trim(),
      field: field.trim(),
      location: location || "",
      startDate: startDate.trim(),
      endDate: cleanEndDate,
      description: description || "",
      category: resolvedCat,
      catgry: resolvedCat,
      order: order !== undefined ? Number(order) : (displayOrder !== undefined ? Number(displayOrder) : undefined),
    });

    return res.status(201).json({
      success: true,
      message: "Education created successfully",
      data: edu,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to create education", error: error.message });
  }
};

export const updateEducation = async (req, res) => {
  try {
    const { id } = req.params;
    const body = { ...req.body };

    if (body.category !== undefined || body.catgry !== undefined) {
      const rawCat = body.category !== undefined ? body.category : body.catgry;
      const cleanCat = typeof rawCat === "string" ? rawCat.trim() : rawCat;
      body.category = cleanCat;
      body.catgry = cleanCat;
    }

    if (body.endDate !== undefined && body.endDate !== null) {
      body.endDate = typeof body.endDate === "string" ? body.endDate.trim() : body.endDate;
    }

    const updated = await db.updateEducation(id, body);
    if (!updated) {
      return res.status(404).json({ success: false, message: "Education entry not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Education updated successfully",
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to update education", error: error.message });
  }
};

export const deleteEducation = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await db.deleteEducation(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Education entry not found" });
    }
    return res.status(200).json({ success: true, message: "Education deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to delete education", error: error.message });
  }
};
