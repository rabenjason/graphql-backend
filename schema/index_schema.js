import fs from "fs";

const utilisateur = fs.readFileSync("./Schema/Utilisateur.graphql", {encoding: "utf-8",});
const post = fs.readFileSync("./Schema/Post.graphql", { encoding: "utf-8" });

// par ailleurs ça aura des erreurs sans ./Schema
const typeDefs = utilisateur  + post ;

// console.log(typeDefs); // commentaire debug
export default typeDefs;
