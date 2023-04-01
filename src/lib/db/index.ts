import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import constructLanguageRows from '@/lib//helpers/constructLanguageRows';
import getTopReposByStars from '@/lib/helpers/getTopReposByStars';
import validateLanguages from '@/lib/helpers/validateLanguages';

// npm run startdb
async function main() {
  // ! clear all repos before seeding
  await prisma.repository.deleteMany();
  console.log('all repos deleted');
  await prisma.repositoryLanguage.deleteMany();
  console.log('all repo languages deleted');

  // get data from helper functions that invoke API
  const repos = await getTopReposByStars();
  const languageRows = await constructLanguageRows(repos);
  // now that we have the top repos and their respective languages, we need to create a set of IDs representing valid repos, since we want to filter out repos that don't meet certain language criteria
  const validIds = new Set();
  languageRows.forEach((languageInfo) => {
    if (validateLanguages(languageInfo.languages)) {
      validIds.add(languageInfo.repositoryId);
    }
  });
  // now that we have a set of valid ids, we can filter out the repos that don't meet the criteria
  const filteredRepos = repos.filter((repo) => validIds.has(repo.repoId));
  const filteredLanguageRows = languageRows.filter((languageInfo) =>
    validIds.has(languageInfo.repositoryId)
  );
  console.log('the filtered repos are:');
  console.log(filteredRepos);
  console.log('the filtered language rows are:');
  console.log(filteredLanguageRows);
  // seed the repos
  await prisma.repository.createMany({
    data: filteredRepos,
  });
  console.log(`repos seeded:`);
  const dbRepos = await prisma.repository.findMany();
  console.log(dbRepos);
  // // shape the languages to fit the prisma model

  // // seed languages
  /* for (let languageRow of filteredLanguageRows) {
    await prisma.language.create({
      data: {
        repositoryId: languageRow.repositoryId,
        size: languageRow.size,
      },
    });
  } */
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
