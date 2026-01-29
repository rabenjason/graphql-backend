const constantes = {
  REGEX_VERIFICATION_EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  REGEX_VERIFICATION_MDP: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  EMAIL_INVALIDE: "Email invalide",
  MOT_DE_PASSE_INVALIDE: "Mot de passe invalide (min 8 caractères)",
  EMAIL_DEJA_UTILISE: "Email déjà utilisé",
  ERREUR_CREATION_UTILISATEUR: "Erreur lors de la création de l'utilisateur",
  UTILISATEUR_NE_PAS_DANS_LA_BD: "Utilisateur inexistant",
  MOT_DE_PASSE_INCORRECT: "Mot de passe incorrect",
  ERREUR_CREATION_TOKEN: "Erreur création token",
  ERREUR_AUTH_UTILISATEUR: "Erreur authentification",
  VERIFICATION_TOKEN: "Token invalide",
  DECONNEXION_REUSSIE: "Déconnexion réussie",
  ERREUR_DECONNEXION: "Erreur lors de la déconnexion",
  ERREUR_MISE_A_JOUR_UTILISATEUR: "Erreur lors de la mise à jour du profil.",
  
  // Constantes pour la suppression
  COMPTE_SUPPRESSION_EN_ATTENTE: "Votre compte est marqué pour suppression. Vous pouvez le réactiver dans les 30 prochains jours.",
  COMPTE_DEJA_MARQUE_SUPPRESSION: "Votre compte est déjà marqué pour suppression.",
  COMPTE_REACTIVE_SUCCES: "Votre compte a été réactivé avec succès.",
  SUPPRESSION_DEFINITIVE_EFFECTUEE: "Suppression définitive effectuée.",
  ERREUR_SUPPRESSION_UTILISATEUR: "Erreur lors de la suppression du compte."
};

export default constantes;
