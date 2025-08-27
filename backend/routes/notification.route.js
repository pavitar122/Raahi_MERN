app.post("/send-notification", async (req, res) => {
  const { token, title, body, image } = req.body;

  const message = {
    token,
    notification: {
      title,
      body,
      image,
    },
  };

  try {
    const response = await admin.messaging().send(message);
    res.json({ success: true, response });
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});