-- CreateTable
CREATE TABLE "Post" (
    "id_post" TEXT NOT NULL,
    "contenu" TEXT,
    "image" TEXT,
    "utilisateurId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id_post")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "Utilisateur"("id_utilisateur") ON DELETE RESTRICT ON UPDATE CASCADE;
