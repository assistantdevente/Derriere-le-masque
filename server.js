const express = require('express');
const path = require('path');
const Mailjet = require('node-mailjet');
const { OpenAI } = require('openai');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Configuration des API via les variables d'environnement Railway
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const mailjet = Mailjet.apiConnect(
    process.env.MAILJET_API_KEY,
    process.env.MAILJET_SECRET_KEY
);

// Middleware
app.use(express.json());
app.use(cors());
// Sert les fichiers HTML/JS/CSS depuis le dossier 'public'
app.use(express.static(path.join(__dirname, 'public')));

/**
 * ROUTE : Envoi de l'analyse par Email
 */
app.post('/api/send-email', async (req, res) => {
    const { to, html } = req.body;
    const senderEmail = process.env.SENDER_EMAIL;

    try {
        const result = await mailjet
            .post("send", { version: 'v3.1' })
            .request({
                Messages: [{
                    From: { Email: senderEmail, Name: "Derrière le Masque" },
                    To: [{ Email: to }],
                    Subject: "✨ Votre Analyse Signature : Les 15 Révélations",
                    HTMLPart: `
                        <div style="font-family:'Georgia', serif; background-color:#2c2c2c; color:#ffffff; padding:40px; border:2px solid #d4af37; max-width:600px; margin:auto;">
                            <h1 style="color:#d4af37; text-align:center; text-transform:uppercase;">Derrière le Masque</h1>
                            <div style="background-color:#3d3d3d; padding:25px; border-radius:10px; line-height:1.8; border-left:4px solid #d4af37;">
                                ${html}
                            </div>
                        </div>`
                }]
            });

        console.log("Email envoyé avec succès");
        res.status(200).json({ success: true });
    } catch (err) {
        console.error("Erreur Mailjet:", err.statusCode);
        res.status(500).json({ error: "Erreur lors de l'envoi de l'email" });
    }
});

// Lance le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
