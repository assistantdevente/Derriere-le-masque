/**
 * FACTEUR - INTERFACE CLIENT
 * Envoie l'analyse au serveur privé pour expédition finale.
 */

async function envoyerAnalyseParMail(emailClient, analyseTexte) {
    // On formate le texte pour l'affichage HTML
    const texteFormate = analyseTexte
        .split('\n')
        .filter(p => p.trim() !== '')
        .map(para => `<p style="margin-bottom:18px;">${para}</p>`)
        .join('');

    try {
        // On appelle votre propre API sur Railway (pas directement Mailjet)
        const response = await fetch("/api/send-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                to: emailClient,
                html: texteFormate
            })
        });

        if (response.ok) {
            console.log("Serveur : Demande d'envoi acceptée !");
            return true;
        } else {
            const error = await response.json();
            console.error("Erreur Serveur :", error);
            return false;
        }
    } catch (error) {
        console.error("Erreur de connexion au serveur :", error);
        return false;
    }
}
