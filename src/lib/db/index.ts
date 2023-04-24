// ! use native Repository typing and LanguageRow typing
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import {
  getLanguageRows,
  getLanguagesPercentsMany,
} from '@/lib/util/getLanguages';
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
  // don't fully unroll the repos yet into individual language rows, as we want to filter out repos that don't meet certain language criteria, and it is hard to do that with just language rows
  const languagesPercents = await getLanguagesPercentsMany(repos);
  const validIds = new Set();
  languagesPercents.forEach((repo) => {
    if (validateLanguages(repo.languages)) {
      validIds.add(repo.repositoryId);
    }
  });
  // now build the rows with the filtered data
  const languagesPercentsFiltered = languagesPercents.filter((repo) =>
    validIds.has(repo.repositoryId)
  );
  const languageRowsFiltered = await getLanguageRows(languagesPercentsFiltered);
  const reposFiltered = repos.filter((repo) => validIds.has(repo.repoId));
  // seed the repos
  await prisma.repository.createMany({
    data: reposFiltered,
  });
  // !
  console.log(`repos seeded:`);
  const dbRepos = await prisma.repository.findMany();
  console.log(dbRepos);
  // seed languages
  await prisma.repositoryLanguage.createMany({
    data: languageRowsFiltered,
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
