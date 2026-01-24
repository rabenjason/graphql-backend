import { addUtilisateur } from "../mutation/utilisateur/addUtilisateur.js";
import { utilisateurs } from "../query/utilisateur/findMany.js";
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
  },
};

export default resolvers_utilisateur;
