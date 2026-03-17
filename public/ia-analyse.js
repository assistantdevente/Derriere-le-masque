async function genererAnalyse(reponsesClient, texteLibre) {
    const apiKey = process.env.OPENAI_API_KEY; 
    
    // LA CONSIGNE MAGIQUE (Le Prompt)
    const prompt = `Tu es un expert en psychologie comportementale de luxe. 
    1. Analyse ces 7 réponses structurelles : ${JSON.stringify(reponsesClient)}.
    2. MAIS SURTOUT, intègre et analyse profondément ce texte personnel : "${texteLibre}".
    
    Rédige une analyse exclusive de 15 paragraphes élégants (style Gris & Or). 
    Divise impérativement en 4 sections : 
    - L'Architecture de l'Âme (Personnalité)
    - La Dynamique de l'Action (Travail/Ambition)
    - Le Miroir de l'Autre (Relations)
    - L'Horizon des Possibles (Futur et conseils basés sur son texte libre).
    
    Le ton doit être mystérieux, valorisant et d'une précision chirurgicale.`;

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
