import { PrismaClient } from "@prisma/client";
import { GraphQLError } from "graphql";
import constantes from "../../constantes.js";

const prisma = new PrismaClient();

const createPost = async (parent, args, context) => {
  try {
    const { contenu, image } = args;

    // Vérification que l'utilisateur est connecté
    if (!context.utilisateur || !context.utilisateur.utilisateurId) {
      throw new GraphQLError(constantes.UTILISATEUR_NON_AUTHENTIFIE);
    }

    // Vérification que le contenu ou l'image est présent
    if (!contenu && !image) {
      throw new GraphQLError(constantes.POST_VIDE);
    }

    // Création du post dans la base de données
    const nouveauPost = await prisma.post.create({
      data: {
        contenu,
        image,
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
    });

    return {
      success: true,
      message: constantes.POST_CREE_AVEC_SUCCES,
      post: nouveauPost,
    };

  } catch (error) {
    console.error("Erreur createPost:", error.message);
    throw new GraphQLError(constantes.ERREUR_CREATION_POST);
  }
};

export { createPost };