function envoyerAnalyse(emailClient, prenom) {
    // 1. TES CLÉS MAILJET (À REMPLACER)
    const apiKey = 'TA_CLE_API_ICI'; 
    const apiSecret = 'TA_CLE_SECRETE_ICI';
    const emailExpediteur = 'TON_EMAIL_VALIDE_DANS_MAILJET@ICI.COM';

    // 2. LE CONTENU (Tes 15 paragraphes - exemple)
    const sujet = "Votre Analyse : Derrière le Masque";
    const messageTexte = "Bonjour " + prenom + ",\n\nVoici vos 15 paragraphes d'analyse psychologique...\n(L'IA générera ce texte complet bientôt !)\n\nL'équipe Derrière le Masque.";

    // 3. L'ORDRE D'ENVOI (Appel à Mailjet)
    // Note : Pour un site statique, on utilise souvent une redirection ou un petit serveur. 
    // Pour l'instant, on simule l'envoi réussi pour valider ton parcours.
    
    console.log("Tentative d'envoi vers : " + emailClient);
    
    // Message de confirmation à l'utilisateur
    alert("Félicitations ! Votre analyse est en cours d'envoi vers " + emailClient + ". Vérifiez vos spams dans 2 minutes !");
    
    // Redirection finale vers l'accueil ou remerciements
    window.location.href = "index.html";
}
