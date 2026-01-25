import { PrismaClient } from "@prisma/client";
import { GraphQLError } from "graphql";

const prisma = new PrismaClient();

const utilisateurs = async (parent, args, context) => {
  // 🔐 Vérification JWT
  if (!context.utilisateur) {
    throw new GraphQLError("Accès refusé 🔐");
  }

  return await prisma.utilisateur.findMany();
};

export { utilisateurs };

