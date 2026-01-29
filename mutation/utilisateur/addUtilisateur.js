import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import constantes from "../../constantes.js";

const prisma = new PrismaClient();

const addUtilisateur = async (parent, args) => {
  try {
    const { nom, prenom, email, motDePasse, telephone, facebook, whatsapp, photo } = args;

    // Vérification de l'email avec la regex
    if (!constantes.REGEX_VERIFICATION_EMAIL.test(email)) {
      throw new Error(constantes.EMAIL_INVALIDE);
    }

    // Vérification du mot de passe de l'utilisateur avec la regex
    if (!constantes.REGEX_VERIFICATION_MDP.test(motDePasse)) {
      throw new Error(constantes.MOT_DE_PASSE_INVALIDE);
    }

    // Vérification si l'email est déjà utilisé
    const utilisateurExist = await prisma.utilisateur.findUnique({
      where: { email: email },
    });

    if (utilisateurExist) {
      throw new Error(`${constantes.EMAIL_DEJA_UTILISE} ${email}`);
    }

    // Hashage du mot dePasse
    const hashMotDePasse = await bcrypt.hash(motDePasse, 10);

    // Création de l'utilisateur dans la base de données
    const nouvelUtilisateur = await prisma.utilisateur.create({
      data: {
        nom,
        prenom,
        email,
        motDePasse: hashMotDePasse,
        telephone,
        facebook,
        whatsapp,
        photo,
      },
    });

    // Ne jamais retourner le mot de passe
    const { motDePasse: _, ...utilisateurSansMotDePasse } = nouvelUtilisateur;
    return utilisateurSansMotDePasse;

  } catch (error) {
    console.error(error);
    throw new Error(constantes.ERREUR_CREATION_UTILISATEUR);
  }
};

export { addUtilisateur };