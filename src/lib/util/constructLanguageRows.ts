import getWithAuth from '@/lib/util/getWithAuth';

import { Repository } from '@/lib/util/getTopReposByStars';

interface LanguageRow {
  repositoryId: number;
  language: string;
  percentage: number;
}
//takes in the output from processAllRepos and construct rows for the prisma model
export async function constructLanguageRows(
  processedRepos: processedRepo[]
): Promise<LanguageRow[]> {
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
export async function processAllRepos(
  repos: Repository[]
): Promise<processedRepo[]> {
  const promises = repos.map((repo) => processRepo(repo));
  const languageRows = await Promise.all(promises);
  return languageRows;
}

interface processedRepo {
  repositoryId: number;
  languages: LanguagePercents;
}

async function processRepo(repo: Repository): Promise<processedRepo> {
  const languageResponse = await getWithAuth(repo.languagesUrl);
  const percentagesMapping = calculatePercentages(languageResponse.data);
  return {
    repositoryId: repo.repoId,
    languages: percentagesMapping,
  };
}

// { javascript: 456, html: 123 }
interface Languages {
  [key: string]: number;
}
// { javascript: 83.33, html: 16.66 }
export interface LanguagePercents {
  [key: string]: number;
}

function calculatePercentages(languages: Languages): LanguagePercents {
  // get the total bytes of data in all languages
  let total = 0;
  for (let key in languages) {
    total += languages[key];
  }
  // calculate the percentage of bytes for each language
  const percentages = {} as { [key: string]: number };
  for (let key in languages) {
    percentages[key] = (languages[key] / total) * 100;
  }
  return percentages;
}
