async function genererAnalyse(reponsesClient, texteLibre) {
    // ⚠️ ATTENTION : Ne mettez JAMAIS votre clé API directement ici.
    // Pour Railway, vous devriez normalement passer par un petit fichier "server.js" 
    // qui cache la clé. Si vous testez en local, remplacez temporairement par votre clé,
    // mais ne poussez JAMAIS ce fichier sur GitHub avec la clé visible.
    const apiKey = "VOTRE_CLE_API_ICI"; 

    const genre = localStorage.getItem('user_genre') || "Non précisé";
    const age = localStorage.getItem('user_age') || "Non précisé";
    
    // Construction du prompt optimisé pour 15 paragraphes
    const prompt = `Tu es un expert en psychologie comportementale de luxe. 
    Analyse ce profil : ${genre}, ${age}.
    Réponses au questionnaire : ${JSON.stringify(reponsesClient)}.
    Texte personnel (Empreinte de l'Esprit) : "${texteLibre}".
    
    Rédige impérativement une analyse exclusive de 15 paragraphes élégants et profonds. 
    Structure l'analyse en 4 sections claires : 
    1. Architecture de l'âme 
    2. Dynamique de l'Action 
    3. Sphère des Relations 
    4. Horizons du Futur.
    Le ton doit être mystérieux, valorisant et haut de gamme.`;

    try {
        // CORRECTION : URL complète de l'API Chat Completions
        const response = await fetch("https://api.openai.com", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo", // Ou "gpt-4" pour plus de précision
                messages: [
                    { "role": "system", "content": "Tu es un psychologue de haut vol spécialisé en analyse de personnalité." },
                    { "role": "user", "content": prompt }
                ],
                temperature: 0.7
            })
        });

        const data = await response.json();
        
        // Vérification de la structure de réponse d'OpenAI
        if (data.choices && data.choices[0] && data.choices[0].message) {
            return data.choices[0].message.content;
        } else {
            console.error("Réponse API invalide :", data);
            throw new Error("L'IA n'a pas renvoyé de texte.");
        }
    } catch (error) {
        console.error("Erreur lors de l'appel OpenAI :", error);
        return "Désolé, une erreur technique empêche la génération de votre analyse. Veuillez réessayer.";
    }
}
