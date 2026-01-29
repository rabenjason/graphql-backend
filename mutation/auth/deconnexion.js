import { GraphQLError } from "graphql";
import constantes from "../../constantes.js";
import { Client } from "./redis.js";

async function deconnexion(parent, args, context) {
  try {
    const utilisateurId = context.utilisateur?.utilisateurId;

    if (!utilisateurId) {
      return new GraphQLError(constantes.VERIFICATION_TOKEN);
    }

    // Supprime l'utilisateur dans Redis
    await Client.del(utilisateurId);

    return {
      success: true,
      message: constantes.DECONNEXION_REUSSIE,
    };
  } catch (err) {
    // console.error("Erreur lors de la déconnexion :", err);
    return new GraphQLError(constantes.ERREUR_DECONNEXION);
  }
}

export { deconnexion };
