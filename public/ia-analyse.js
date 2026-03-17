/**
 * CERVEAU IA - DERRIÈRE LE MASQUE
 * Génération de l'analyse psychologique personnalisée (15 paragraphes)
 */

async function genererAnalyse(reponsesClient, texteLibre) {
    // Connexion sécurisée au coffre-fort de Railway
    const apiKey = process.env.OPENAI_API_KEY; 
    
    // Récupération du profil capturé sur la page d'accueil
    const genre = localStorage.getItem('user_genre') || "Non précisé";
    const age = localStorage.getItem('user_age') || "Non précisé";

    // LE SUPER-PROMPT (La consigne secrète Style Gris & Or)
    const prompt = `Tu es un expert en psychologie analytique et comportementale, spécialisé dans le profilage de haut niveau. 
    Ton style est celui de la collection 'Derrière le Masque' : prestigieux, mystérieux, profond et d'une élégance rare (Style Gris & Or).

    DONNÉES CLIENT :
    - Profil : ${genre}, tranche d'âge ${age}
    - Structure QCM : ${JSON.stringify(reponsesClient)}
    - L'Empreinte de l'Esprit (Confidences) : "${texteLibre}"

    CONSIGNE DE RÉDACTION :
    Rédige 15 paragraphes denses et percutants, sans titres de section visibles, mais structurés selon cette progression :
    1. L'ARCHITECTURE DE L'ÂME : Analyse les fondations invisibles de son caractère.
    2. LA DYNAMIQUE DE L'ACTION : Sa manière de transformer ses pensées en actes (Travail et Ambition).
    3. LE MIROIR DE L'AUTRE : Sa mécanique relationnelle et sa perception d'autrui.
    4. L'HORIZON DES POSSIBLES : Conseils stratégiques basés spécifiquement sur son texte libre.

    VOCABULAIRE SIGNATURE : 'Clair-obscur', 'Mécanique du désir', 'Équilibre fragile', 'Dissonance', 'Instinct', 'Héritage émotionnel'.
    
    RÈGLE D'OR : Le texte doit être si précis que le client doit avoir l'impression que tu lis dans ses pensées les plus secrètes. 
    L'analyse doit être rédigée à la deuxième personne du singulier (Tu) ou du pluriel (Vous) selon un ton respectueux mais pénétrant.
    NE PAS FAIRE DE RÉSUMÉ À LA FIN.`;

    try {
        const response = await fetch("https://api.openai.com", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo", // Utilisation du modèle stable
                messages: [
                    {
                        role: "system", 
                        content: "Tu es un expert en psychologie de luxe. Tu ne réponds qu'en français avec un style littéraire soutenu."
                    },
                    {
                        role: "user", 
                        content: prompt
                    }
                ],
                temperature: 0.8, // Niveau de créativité pour l'analyse personnalisée
                max_tokens: 2500  // Assure la longueur des 15 paragraphes
            })
        });

        const data = await response.json();

        // Vérification du résultat
        if (data.choices && data.choices[0]) {
            const analyseFinale = data.choices[0].message.content;
            console.log("Analyse générée avec succès.");
            return analyseFinale;
        } else {
            console.error("Réponse vide de l'IA", data);
            return "Désolé, l'IA a rencontré une zone d'ombre. Veuillez réessayer.";
        }

    } catch (error) {
        console.error("Erreur technique lors de l'appel OpenAI:", error);
        return "Une erreur technique est survenue. L'analyse n'a pas pu être finalisée.";
    }
}
