import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// afficher un seul utilisateur
const utilisateur = async (parent, { id }) => {
  return await prisma.utilisateur.findUnique({
    where: { id_utilisateur: id },
  });
};

export { utilisateur };
