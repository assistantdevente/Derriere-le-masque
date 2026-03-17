/**
 * FACTEUR MAILJET - DERRIÈRE LE MASQUE
 * Envoi de l'analyse générée par l'IA vers l'email du client
 */

async function envoyerAnalyseParMail(emailClient, analyseTexte) {
    const apiKey = process.env.MAILJET_API_KEY;
    const secretKey = process.env.MAILJET_SECRET_KEY;
    const sender = process.env.SENDER_EMAIL;

    // On transforme le texte pour qu'il soit joli dans l'email (sauts de ligne)
    const corpsEmail = analyseTexte.split('\n').map(para => `<p style="margin-bottom:15px;">${para}</p>`).join('');

    const payload = {
        "Messages": [{
            "From": { "Email": sender, "Name": "Derrière le Masque" },
            "To": [{ "Email": emailClient }],
            "Subject": "✨ Votre Analyse Signature - Les 15 Révélations",
            "HTMLPart": `
                <div style="font-family:Georgia, serif; background:#2c2c2c; color:#ffffff; padding:40px; border:2px solid #d4af37;">
                    <h1 style="color:#d4af37; text-align:center;">DERRIÈRE LE MASQUE</h1>
                    <div style="background:#3d3d3d; padding:20px; border-radius:10px; line-height:1.6;">
                        ${corpsEmail}
                    </div>
                    <p style="text-align:center; margin-top:30px; color:#aaa; font-size:12px;">
                        © Derrière le Masque - Analyse Psychologique de Prestige
                    </p>
                </div>`
        }]
    };

    try {
        const response = await fetch("https://api.mailjet.com", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic " + btoa(apiKey + ":" + secretKey)
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            console.log("Email envoyé avec succès !");
            return true;
        } else {
            console.error("Erreur Mailjet:", await response.text());
            return false;
        }
    } catch (error) {
        console.error("Erreur technique envoi mail:", error);
        return false;
    }
}
