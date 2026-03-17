async function genererAnalyse(reponsesClient) {
    const apiKey = process.env.OPENAI_API_KEY; 
    
    const prompt = `Tu es un expert en psychologie comportementale. Analyse ces 7 réponses : ${JSON.stringify(reponsesClient)}. Rédige 15 paragraphes élégants et profonds (style luxe). Divise en 4 sections : Personnalité, Travail, Relations, Futur.`;

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
        // Vérification si l'IA a bien répondu
        if (data.choices && data.choices[0]) {
            return data.choices[0].message.content;
        } else {
            return "Désolé, l'analyse n'a pas pu être générée.";
        }
    } catch (error) {
        console.error("Erreur technique:", error);
        return "Une erreur est survenue.";
    }
}
