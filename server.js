import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "abdoutonzar@gmail.com",
        pass: "pnno ecif omxi tnbz", // mot de passe application Gmail
      },
    });

await transporter.sendMail({
  from: email,
  to: "abdoutonzar@gmail.com",
  subject: `📩 Nouveau message de ${name}`,
  html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; background:#f9f9f9; border-radius:8px;">
      <h2 style="color:#e63946;">📩 Nouveau message reçu</h2>
      <p><strong>👤 Nom :</strong> ${name}</p>
      <p><strong>📧 Email :</strong> ${email}</p>
      <p><strong>💬 Message :</strong></p>
      <div style="background:#fff; border:1px solid #ddd; padding:15px; border-radius:5px; margin-top:10px;">
        ${message}
      </div>
      <hr style="margin:20px 0;" />
      <p style="font-size:12px; color:#888;">Cet email a été envoyé depuis ton portfolio 🚀</p>
    </div>
  `,
});

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.json({ success: true });
  }
});


app.listen(5000, () => console.log("🚀 Serveur démarré sur http://localhost:5000"));
