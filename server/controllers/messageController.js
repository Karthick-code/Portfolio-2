// import { db } from "../config/db.js";

// export const createMessage = async (req, res) => {
//   try {
//     const { name, email, subject, message } = req.body;

//     if (!name || !email || !message) {
//       return res.status(400).json({
//         success: false,
//         message: "Please fill in all required fields (name, email, message).",
//       });
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       return res.status(400).json({
//         success: false,
//         message: "Please provide a valid email address.",
//       });
//     }

//     const newMessage = await db.createMessage({
//       name: name.trim(),
//       email: email.trim().toLowerCase(),
//       subject: subject ? subject.trim() : "Portfolio Inquiry",
//       message: message.trim(),
//     });

//     return res.status(201).json({
//       success: true,
//       message: "Thank you! Your message has been sent successfully.",
//       data: newMessage,
//     });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: "Failed to send message", error: error.message });
//   }
// };

// export const getMessages = async (req, res) => {
//   try {
//     const messages = await db.getMessages();
//     return res.status(200).json({
//       success: true,
//       count: messages.length,
//       data: messages,
//     });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: "Failed to retrieve messages", error: error.message });
//   }
// };

// export const markMessageAsRead = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { read } = req.body;

//     const message = await db.updateMessageReadStatus(id, read !== undefined ? Boolean(read) : true);

//     if (!message) {
//       return res.status(404).json({ success: false, message: "Message not found" });
//     }

//     return res.status(200).json({
//       success: true,
//       message: `Message marked as ${message.read ? "read" : "unread"}`,
//       data: message,
//     });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const deleteMessage = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deleted = await db.deleteMessage(id);

//     if (!deleted) {
//       return res.status(404).json({ success: false, message: "Message not found" });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Message deleted successfully",
//     });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

import { db } from "../config/db.js";

const sendSlackNotification = async (contact) => {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn("SLACK_WEBHOOK_URL is not configured.");
    return;
  }

  const payload = {
    text: "📩 New Portfolio Contact Message",
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "📩 New Contact Message",
        },
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*Name:*\n${contact.name}`,
          },
          {
            type: "mrkdwn",
            text: `*Email:*\n${contact.email}`,
          },
          {
            type: "mrkdwn",
            text: `*Subject:*\n${contact.subject || "Portfolio Inquiry"}`,
          },
        ],
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Message:*\n${contact.message}`,
        },
      },
    ],
  };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();

      console.error(
        `Slack notification failed (${response.status}):`,
        errorText
      );
    }
  } catch (error) {
    console.error("Slack notification error:", error.message);
  }
};

export const createMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields (name, email, message).",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    const newMessage = await db.createMessage({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject ? subject.trim() : "Portfolio Inquiry",
      message: message.trim(),
    });

    // Send Slack notification after the message
    // has been successfully saved to the database.
    await sendSlackNotification({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject ? subject.trim() : "Portfolio Inquiry",
      message: message.trim(),
    });

    return res.status(201).json({
      success: true,
      message: "Thank you! Your message has been sent successfully.",
      data: newMessage,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to send message",
      error: error.message,
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await db.getMessages();

    return res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve messages",
      error: error.message,
    });
  }
};

export const markMessageAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const { read } = req.body;

    const message = await db.updateMessageReadStatus(
      id,
      read !== undefined ? Boolean(read) : true
    );

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: `Message marked as ${message.read ? "read" : "unread"}`,
      data: message,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await db.deleteMessage(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};