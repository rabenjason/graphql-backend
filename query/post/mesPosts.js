import { PrismaClient } from "@prisma/client";
import { GraphQLError } from "graphql";
import constantes from "../../constantes.js";

const prisma = new PrismaClient();

const mesPosts = async (parent, args, context) => {
  try {
    // Vérification que l'utilisateur est connecté
    if (!context.utilisateur || !context.utilisateur.utilisateurId) {
      throw new GraphQLError(constantes.UTILISATEUR_NON_AUTHENTIFIE);
    }

    // Récupérer tous les posts de l'utilisateur connecté
    const posts = await prisma.post.findMany({
      where: {
        utilisateurId: context.utilisateur.utilisateurId,
      },
      include: {
        utilisateur: {
          select: {
            id_utilisateur: true,
            nom: true,
            prenom: true,
            email: true,
            photo: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc", // Les plus récents en premier
      },
    });

    return posts;

  } catch (error) {
    console.error("Erreur mesPosts:", error.message);
    throw new GraphQLError(constantes.ERREUR_RECUPERATION_POSTS);
  }
};

export { mesPosts };