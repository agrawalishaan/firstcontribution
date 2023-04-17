// ! use native Repository typing and LanguageRow typing
import { PrismaClient, Repository } from '@prisma/client';
const prisma = new PrismaClient();

import {
  constructLanguageRows,
  processAllRepos,
} from '@/lib/util/constructLanguageRows';
import { getTopReposByStars } from '@/lib/util/getTopReposByStars';
import validateLanguages from '@/lib/util/validateLanguages';

// npm run startdb
async function main() {
  // ! clear all repos before seeding
  await prisma.repositoryLanguage.deleteMany();
  await prisma.repository.deleteMany();
  console.log('all repos deleted');
  console.log('all repo languages deleted');

  const repos = await getTopReposByStars();
  // don't fully unroll the repos yet into individual language rows, as we want to filter out repos that don't meet certain language criteria
  const processedRepos = await processAllRepos(repos);
  const validIds = new Set();
  processedRepos.forEach((repo) => {
    if (validateLanguages(repo.languages)) {
      validIds.add(repo.repositoryId);
    }
  });
  // now build the prisma language rows and filter the repos and language rows
  const languageRows = await constructLanguageRows(processedRepos);
  const filteredRepos = repos.filter((repo) => validIds.has(repo.repoId));
  const filteredLanguageRows = languageRows.filter((languageInfo) =>
    validIds.has(languageInfo.repositoryId)
  );
  // seed the repos
  await prisma.repository.createMany({
    data: filteredRepos,
  });
  // !
  console.log(`repos seeded:`);
  const dbRepos = await prisma.repository.findMany();
  console.log(dbRepos);
  // seed languages
  await prisma.repositoryLanguage.createMany({
    data: filteredLanguageRows,
  });
  console.log(`languages seeded:`);
  const dbLanguages = await prisma.repositoryLanguage.findMany();
  console.log(dbLanguages);
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('prisma disconnected!');
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
