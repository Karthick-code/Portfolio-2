import { db } from "../config/db.js";

export const getStats = async (req, res) => {
  try {
    const [projects, skills, experiences, educations, messages] = await Promise.all([
      db.getProjects(),
      db.getSkills(),
      db.getExperiences(),
      db.getEducations(),
      db.getMessages(),
    ]);

    const unreadMessages = messages.filter((m) => !m.read).length;
    const recentMessages = messages.slice(0, 5);

    // Group skills by category
    const categoryMap = {};
    skills.forEach((s) => {
      categoryMap[s.category] = (categoryMap[s.category] || 0) + 1;
    });
    const skillsByCategory = Object.entries(categoryMap).map(([cat, count]) => ({
      _id: cat,
      count,
    }));

    return res.status(200).json({
      success: true,
      data: {
        projects: projects.length,
        skills: skills.length,
        experience: experiences.length,
        education: educations.length,
        unreadMessages,
        totalMessages: messages.length,
        skillsByCategory,
        recentMessages,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to retrieve statistics", error: error.message });
  }
};
