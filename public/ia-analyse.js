async function genererAnalyse(reponsesClient) {
    // On demande à Railway d'aller chercher la clé dans ses variables secrètes
    const apiKey = process.env.OPENAI_API_KEY; 
    
    const prompt = `Tu es un expert en psychologie comportementale. 
    Analyse ces 7 réponses : ${JSON.stringify(reponsesClient)}. 
    Rédige 15 paragraphes élégants et profonds (style luxe). 
    Divise en 4 sections : Personnalité, Travail, Relations, Futur.`;

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
                temperature: 0.7
            })
        });

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error("Erreur IA:", error);
        return "Une erreur est survenue lors de la génération de l'analyse.";
    }
}
