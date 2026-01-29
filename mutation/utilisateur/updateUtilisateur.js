import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { GraphQLError } from "graphql";
import constantes from "../../constantes.js";

const prisma = new PrismaClient();

const updateUtilisateur = async (parent, args, context) => {
  // Vérifier si l'utilisateur est authentifié
  if (!context.utilisateur) {
    throw new GraphQLError("Accès refusé. Connectez-vous.");
  }

  const utilisateurId = context.utilisateur.utilisateurId;

  // Récupérer les données à mettre à jour
  const { nom, prenom, email, motDePasse, telephone, facebook, whatsapp, photo } = args;

  // Vérifier si l'email est valide (si fourni)
  if (email && !constantes.REGEX_VERIFICATION_EMAIL.test(email)) {
    throw new GraphQLError(constantes.EMAIL_INVALIDE);
  }

  // Vérifier si le mot de passe est valide (si fourni)
  if (motDePasse && !constantes.REGEX_VERIFICATION_MDP.test(motDePasse)) {
    throw new GraphQLError(constantes.MOT_DE_PASSE_INVALIDE);
  }

  // Vérifier si l'email est déjà utilisé par un autre utilisateur
  if (email) {
    const utilisateurExist = await prisma.utilisateur.findUnique({
      where: { email },
    });

    if (utilisateurExist && utilisateurExist.id_utilisateur !== utilisateurId) {
      throw new GraphQLError(`Cet email est déjà utilisé : ${email}`);
    }
  }

  // Préparer les données à mettre à jour
  let donneesMiseAJour = {
    nom,
    prenom,
    email,
    telephone,
    facebook,
    whatsapp,
    photo,
  };

  // Si le mot de passe est fourni, le hasher
  if (motDePasse) {
    donneesMiseAJour.motDePasse = await bcrypt.hash(motDePasse, 10);
  } else {
    delete donneesMiseAJour.motDePasse;
  }

  // Filtrer les champs non définis
  Object.keys(donneesMiseAJour).forEach(key => {
    if (donneesMiseAJour[key] === undefined) {
      delete donneesMiseAJour[key];
    }
  });

  // Mettre à jour l'utilisateur dans la base de données
  try {
    const utilisateurMisAJour = await prisma.utilisateur.update({
      where: { id_utilisateur: utilisateurId },
      data: donneesMiseAJour,
    });

    // Retourner l'utilisateur mis à jour (sans mot de passe)
    const { motDePasse: _, ...utilisateurSansMotDePasse } = utilisateurMisAJour;
    return utilisateurSansMotDePasse;
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
    throw new GraphQLError(constantes.ERREUR_MISE_A_JOUR_UTILISATEUR || "Erreur interne");
  }
};

export { updateUtilisateur };