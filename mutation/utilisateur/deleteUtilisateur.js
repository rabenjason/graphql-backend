
import { PrismaClient } from "@prisma/client";
import { GraphQLError } from "graphql";
import { Client } from "../auth/redis.js";
import constantes from "../../constantes.js";

const prisma = new PrismaClient();

const deleteUtilisateur = async (parent, args, context) => {
  // Vérifier si l'utilisateur est authentifié
  if (!context.utilisateur) {
    throw new GraphQLError("Accès refusé. Connectez-vous.");
  }

  const utilisateurId = context.utilisateur.utilisateurId;

  // Récupérer l'utilisateur
  const utilisateur = await prisma.utilisateur.findUnique({
    where: { id_utilisateur: utilisateurId },
  });

  if (!utilisateur) {
    throw new GraphQLError("Utilisateur introuvable.");
  }

  // Vérifier si le compte est déjà marqué pour suppression
  if (utilisateur.dateSuppression) {
    throw new GraphQLError(constantes.COMPTE_DEJA_MARQUE_SUPPRESSION);
  }

  // Calculer la date de suppression (30 jours à partir de maintenant)
  const dateSuppression = new Date();
  dateSuppression.setDate(dateSuppression.getDate() + 30);

  // Mettre à jour l'utilisateur avec la date de suppression
  const utilisateurMarque = await prisma.utilisateur.update({
    where: { id_utilisateur: utilisateurId },
    data: {
      dateSuppression: dateSuppression,
    },
  });

  // Supprimer le token de Redis pour déconnecter immédiatement l'utilisateur
  await Client.del(utilisateurId);

  return {
    success: true,
    message: constantes.COMPTE_SUPPRESSION_EN_ATTENTE,
    utilisateur: utilisateurMarque,
  };
};

export { deleteUtilisateur };