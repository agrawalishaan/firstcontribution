// ! use native Repository typing and LanguageRow typing
import prisma from '@/lib/db/client';

import getIssueRowsMany from '@/lib/util/getIssues';
import getLanguageRows from '@/lib/util/getLanguages';
import getTopReposByStars from '@/lib/util/getTopReposByStars';
import checkLanguage from '@/lib/util/validateLanguages';

// npm run startdb
async function main() {
  // ! clear all repos before seeding
  await prisma.issue.deleteMany();
  await prisma.repositoryLanguage.deleteMany();
  await prisma.repository.deleteMany();

  console.log('all repos deleted');
  console.log('all repo languages deleted');

  // get the repos and language rows from the repos
  const repos = await getTopReposByStars();
  const languageRows = await getLanguageRows(repos);
  // filter out repos to only include repos that have at least one valid language. If a repo contained no valid languages, it would be filtered out here
  const validIds = new Set();
  languageRows.forEach((row) => {
    if (checkLanguage(row.language)) {
      validIds.add(row.repositoryId);
    }
  });
  // filter the data
  const reposFiltered = repos.filter((repo) => validIds.has(repo.repoId));
  const languageRowsFiltered = languageRows.filter((row) =>
    validIds.has(row.repositoryId)
  );
  // now that we have the filtered data as determined by the languages, we can get the issues
  const issuesFiltered = await getIssueRowsMany(reposFiltered);
  // seed the data
  await prisma.repository.createMany({
    data: reposFiltered,
  });
  await prisma.repositoryLanguage.createMany({
    data: languageRowsFiltered,
  });
  await prisma.issue.createMany({
    data: issuesFiltered,
  });
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
