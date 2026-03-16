async function genererAnalyse(reponsesClient) {
    const apiKey = "TON_CODE_SK_ICI"; // Colle ta clé sk-... ici
    
    const prompt = `Tu es un expert en psychologie comportementale de luxe. 
    Analyse ces 7 réponses : ${JSON.stringify(reponsesClient)}. 
    Rédige une analyse de 15 paragraphes élégants, profonds et mystérieux. 
    Le ton doit être prestigieux (style Gris & Or). 
    Divise en 4 sections : Personnalité, Travail, Relations, Futur.`;

    const response = await fetch("https://api.openai.com", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${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
}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo", // Plus stable et moins cher que le nano pour débuter


            messages: [{role: "user", content: prompt}],
            temperature: 0.7
        })
    });

    const data = await response.json();
    return data.choices[0].message.content;
}
