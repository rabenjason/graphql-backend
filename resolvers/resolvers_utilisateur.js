import { addUtilisateur } from "../mutation/utilisateur/addUtilisateur.js";
import { authentification } from "../mutation/auth/authentification.js";
import { utilisateurs } from "../query/utilisateur/findMany.js";
import { utilisateur } from "../query/utilisateur/findOne.js";
import { deconnexion } from "../mutation/auth/deconnexion.js";

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
  },
};

export default resolvers_utilisateur;
