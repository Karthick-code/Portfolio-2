import { db } from "../config/db.js";

export const getProfile = async (req, res) => {
  try {
    const profile = await db.getProfile();
    return res.status(200).json({ success: true, data: profile || null });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to retrieve profile", error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const updated = await db.updateProfile(req.body);
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to update profile", error: error.message });
  }
};
