async function genererAnalyse(reponsesClient, texteLibre) {
    // Railway injectera la clé ici via les variables
    const apiKey = process.env.OPENAI_API_KEY; 
    const genre = localStorage.getItem('user_genre') || "Non précisé";
    const age = localStorage.getItem('user_age') || "Non précisé";
    
    const prompt = `Tu es un expert en psychologie comportementale de luxe. 
    1. Analyse ces 7 réponses structurelles : ${JSON.stringify(reponsesClient)}.
    2. Profil : ${genre}, ${age}.
    3. MAIS SURTOUT, intègre ce texte personnel : "${texteLibre}".
    
    Rédige une analyse exclusive de 15 paragraphes élégants (style Gris & Or). 
    Divise impérativement en 4 sections : Architecture de l'âme, Action, Relations, Futur.`;

    try {
        // CORRECTION 1 : L'URL DOIT FINIR PAR /v1/chat/completions
        const response = await fetch("https://api.openai.com", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo", 
                messages: [{role: "user", content: prompt}],
                temperature: 0.7
            })
        });

        const data = await response.json();
        
        // CORRECTION 2 : AJOUT DE [0] POUR RÉCUPÉRER LA RÉPONSE
        if (data.choices && data.choices[0]) {
            return data.choices[0].message.content;
        } else {
            console.error("Réponse IA vide", data);
            return "Désolé, l'analyse n'a pas pu être générée.";
        }
    } catch (error) {
        console.error("Erreur IA:", error);
        return "Une erreur est survenue lors de la génération de l'analyse.";
    }
}
