import { PrismaClient } from "@prisma/client";
import { GraphQLError } from "graphql";

const prisma = new PrismaClient();

//  afficher le profil de l'utilisateur connecté
const utilisateur = async (parent, args, context) => {
  //  Vérification de l'authentification
  if (!context.utilisateur) {
    throw new GraphQLError("Accès refusé 🔐");
  }

  //  ID récupéré UNIQUEMENT depuis le JWT
  const utilisateurId = context.utilisateur.utilisateurId;

  //  Récupération de l'utilisateur
  return await prisma.utilisateur.findUnique({
    where: { id_utilisateur: utilisateurId },
  });
};

export { utilisateur };
