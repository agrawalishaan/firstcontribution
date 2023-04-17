-- DropForeignKey
ALTER TABLE "RepositoryLanguage" DROP CONSTRAINT "RepositoryLanguage_repositoryId_fkey";

-- AddForeignKey
ALTER TABLE "RepositoryLanguage" ADD CONSTRAINT "RepositoryLanguage_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "Repository"("repoId") ON DELETE RESTRICT ON UPDATE CASCADE;
