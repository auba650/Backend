import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// ✅ Route de test
app.get("/", (req, res) => {
  res.send("🚀 Backend en ligne avec Railway !");
});

app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "abdoutonzar@gmail.com",
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: email,
      to: "abdoutonzar@gmail.com",
      subject: `📩 Nouveau message de ${name}`,
      html: `<p><b>Nom :</b> ${name}<br><b>Email :</b> ${email}<br><b>Message :</b> ${message}</p>`,
    });

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`🚀 Serveur démarré sur le port ${PORT}`)
);
