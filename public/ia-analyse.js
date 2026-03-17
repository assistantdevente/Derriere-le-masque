async function genererAnalyse(reponsesClient, texteLibre) {
    const apiKey = process.env.OPENAI_API_KEY; 
    
    // LA CONSIGNE MAGIQUE (Le Prompt)
    const prompt = `Tu es un expert en psychologie analytique et comportementale, spécialisé dans le profilage de haut niveau. 
Ton style est celui de la collection 'Derrière le Masque' : prestigieux, mystérieux, profond et d'une élégance rare (Style Gris & Or).

DONNÉES CLIENT :
- Genre/Âge : ${genre}, ${age}
- Réponses QCM : ${JSON.stringify(reponsesClient)}
- L'Empreinte de l'Esprit (Témoignage personnel) : "${texteLibre}"

CONSIGNE DE RÉDACTION :
Rédige 15 paragraphes denses et percutants, sans titres de section visibles, mais structurés en 4 piliers :
1. L'ARCHITECTURE DE L'ÂME : Analyse les fondations de son caractère.
2. LA DYNAMIQUE DE L'ACTION : Comment il/elle transforme ses pensées en actes (Travail/Ambition).
3. LE MIROIR DE L'AUTRE : Sa façon d'aimer, de s'entourer et de percevoir autrui.
4. L'HORIZON DES POSSIBLES : Conseils stratégiques basés spécifiquement sur son texte libre.

VOCABULAIRE À UTILISER : 'Clair-obscur', 'Mécanique du désir', 'Équilibre fragile', 'Dissonance', 'Instinct', 'Héritage émotionnel'.
RÈGLE D'OR : Le texte doit être si précis que le client doit avoir l'impression que tu lis dans ses pensées les plus secrètes. 
NE PAS FAIRE DE RÉSUMÉ À LA FIN.`;

    try {
        const response = await fetch("https://api.openai.com", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo", 
                messages: [{role: "user", content: prompt}],
                temperature: 0.8 // Un peu plus de créativité pour coller au texte libre
            })
        });

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error("Erreur IA:", error);
        return "L'analyse n'a pas pu être finalisée. Veuillez contacter le support.";
    }
}
