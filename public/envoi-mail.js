/**
 * FACTEUR MAILJET - DERRIÈRE LE MASQUE
 * Prend les 15 paragraphes et les envoie par email.
 */

async function envoyerAnalyseParMail(emailClient, analyseTexte) {
    // Connexion au coffre-fort de Railway
    const apiKey = process.env.MAILJET_API_KEY;
    const secretKey = process.env.MAILJET_SECRET_KEY;
    const senderEmail = process.env.SENDER_EMAIL;

    // Mise en page élégante du texte (sauts de ligne en paragraphes HTML)
    const texteFormate = analyseTexte.split('\n').filter(p => p.trim() !== '').map(para => `<p style="margin-bottom:18px;">${para}</p>`).join('');

    const payload = {
        "Messages": [{
            "From": { "Email": senderEmail, "Name": "Derrière le Masque" },
            "To": [{ "Email": emailClient }],
            "Subject": "✨ Votre Analyse Signature : Les 15 Révélations",
            "HTMLPart": `
                <div style="font-family:'Georgia', serif; background-color:#2c2c2c; color:#ffffff; padding:40px; border:2px solid #d4af37; max-width:600px; margin:auto;">
                    <h1 style="color:#d4af37; text-align:center; text-transform:uppercase; letter-spacing:2px;">Derrière le Masque</h1>
                    <p style="font-style:italic; text-align:center; color:#aaa; border-bottom:1px solid #d4af37; padding-bottom:20px; margin-bottom:30px;">
                        Votre Signature Psychologique Unique
                    </p>
                    <div style="background-color:#3d3d3d; padding:25px; border-radius:10px; line-height:1.8; text-align:justify; border-left:4px solid #d4af37;">
                        ${texteFormate}
                    </div>
                    <div style="margin-top:40px; text-align:center; font-size:12px; color:#aaa;">
                        <p>© Derrière le Masque - Analyse de Prestige</p>
                        <p>Rentabilisez votre test en parrainant vos proches (3 € par ami).</p>
                    </div>
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
            console.log("Facteur : Email expédié avec succès !");
            return true;
        } else {
            const errorData = await response.json();
            console.error("Erreur Mailjet :", errorData);
            return false;
        }
    } catch (error) {
        console.error("Erreur technique envoi mail :", error);
        return false;
    }
}
