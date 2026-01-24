import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const utilisateurs = async (parent, args) => {
  return await prisma.utilisateur.findMany();
};

export { utilisateurs };
