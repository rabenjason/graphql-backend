import resolvers_utilisateur from "./resolvers_utilisateur.js";

const resolvers = {
  Query: {},
  Mutation: {}
};

Object.assign(resolvers.Mutation, resolvers_utilisateur.Mutation);
Object.assign(resolvers.Query, resolvers_utilisateur.Query);


// Object.assign(resolvers.Query , resolvers_utilisateur.Query);
// Object.assign(resolvers.Mutation , resolvers_utilisateur.Mutation);
// pour voir si ça se ne coupe pas 
// console.log (resolvers); 

export default resolvers_utilisateur;
