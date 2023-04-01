import getWithAuth from '@/lib/helpers//getWithAuth';

/*
takes in the output from processAllRepos and construct rows for the prisma model
*/
export default async function constructLanguageRows(repos) {
  const processedRepos = await processAllRepos(repos);
  const languageRows = [];
  for (let repo of processedRepos) {
    for (let language in repo.languages) {
      languageRows.push({
        repositoryId: repo.repositoryId,
        language: language,
        percentage: repo.languages[language],
      });
    }
  }
  return languageRows;
}

// runs the processRepo function on all repos
async function processAllRepos(repos) {
  const promises = repos.map((repo) => processRepo(repo));
  const languageRows = await Promise.all(promises);
  return languageRows;
}

/*
takes languages (retrieved from repo.languagesUrl):
{
  "javascript": 500,
  "html": 100,
}
outputs:
{
  "repositoryId": 123,
  languages: {
    "javascript": 83.33333333333334,
    "html": 16.666666666666664,
  }
}
*/
async function processRepo(repo) {
  const languageResponse = await getWithAuth(repo.languagesUrl);
  const percentages = calculatePercentages(languageResponse.data);
  return {
    repositoryId: repo.repoId,
    languages: percentages,
  };
}

// turn the bytes data for languages into percentages
function calculatePercentages(languages) {
  // get the total bytes of data in all languages
  let total = 0;
  for (let key in languages) {
    total += languages[key];
  }
  // calculate the percentage of bytes for each language
  const percentages = {};
  for (let key in languages) {
    percentages[key] = (languages[key] / total) * 100;
  }
  return percentages;
}
