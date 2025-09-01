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

// ✅ Route d'envoi d'email
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
      html: `
        <p><b>Nom :</b> ${name}</p>
        <p><b>Email :</b> ${email}</p>
        <p><b>Message :</b></p>
        <div>${message}</div>
      `,
    });

    res.json({ success: true, message: "Email envoyé avec succès 🚀" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ✅ Utiliser le port Railway (ou 5000 par défaut)
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`🚀 Serveur démarré sur le port ${PORT}`)
);
