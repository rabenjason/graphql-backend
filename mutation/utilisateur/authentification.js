import { PrismaClient } from "@prisma/client";
import constantes from "../../constantes.js";
import { GraphQLError } from "graphql";
import { formerToken } from "./jwt.js";
import { Client } from "./redis.js";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Fonction pour l'authentification d'un utilisateur
async function authentification(parent, args) {
  try {
    const { email, motDePasse } = args; // récupérer les valeurs des arguments

    const utilisateur = await prisma.utilisateur.findUnique({
      where: {
        email: email,
      },
    });

    // Vérifier si l'utilisateur existe dans la base de données
    if (!utilisateur) {
      return new GraphQLError(constantes.UTILISATEUR_NE_PAS_DANS_LA_BD);
    }

    // Vérifier si le mot de passe fourni correspond au mot de passe enregistré pour l'utilisateur
    const motDePasseValide = await bcrypt.compare(
      motDePasse,
      utilisateur.motDePasse
    );

    if (!motDePasseValide) {
      return new GraphQLError(constantes.MOT_DE_PASSE_INCORRECT);
    }

    // Initialiser l'ID de l'utilisateur
    const utilisateurId = utilisateur.id_utilisateur;

    // Créer un jeton JWT
    const token = formerToken(utilisateurId);

    // console.log(token); // à debugger au cas d'erreur

    // Enregistrer le jeton dans Redis avec une clé = utilisateurID (unique)
    await Client.set(utilisateurId, token);

    // Expiration en 1 jour (24h)
    await Client.expire(utilisateurId, 86400);

    return { utilisateur, token };
  } catch (err) {
    console.error(err); // Affiche l'erreur dans la console d'erreur
    return new GraphQLError(constantes.ERREUR_AUTH_UTILISATEUR);
  }
}

// Exporter la fonction d'authentification
export { authentification };
