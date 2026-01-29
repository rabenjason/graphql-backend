import { updateUtilisateur } from "../mutation/utilisateur/updateUtilisateur.js";
import { addUtilisateur } from "../mutation/utilisateur/addUtilisateur.js";
import { authentification } from "../mutation/auth/authentification.js";
import { utilisateurs } from "../query/utilisateur/findMany.js";
import { deconnexion } from "../mutation/auth/deconnexion.js";
import { utilisateur } from "../query/utilisateur/findOne.js";

const resolvers_utilisateur = {
  Query: {
    // findMany
    utilisateurs,

    // findOne
    utilisateur,
  },
  Mutation: {
    // Ajouter un utilisateur
    addUtilisateur,
    authentification,
    deconnexion,
    updateUtilisateur
  },
};

export default resolvers_utilisateur;
