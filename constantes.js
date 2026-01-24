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
  VERIFICATION_TOKEN: "Token invalide"
};

export default constantes;
