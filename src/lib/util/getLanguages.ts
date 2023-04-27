import getWithAuth from '@/lib/util/getWithAuth';

import { RepositoryShaped } from '@/lib/util/getTopReposByStars';

// getLanguageRows will construct rows for all repos, even ones that don't yet have valid languages, but the inefficiency is smaller and allows for better future extensibility or code re-use

// { javascript: 456, html: 123 }
interface LanguageBytes {
  [key: string]: number;
}
// { javascript: 83.33, html: 16.66 }
interface LanguagePercents {
  [key: string]: number;
}

interface languageResponseWithPercents {
  repositoryId: number;
  languages: LanguagePercents;
}

interface LanguageRow {
  repositoryId: number;
  language: string;
  percentage: number;
}

//constructs language rows from the repos
export default async function getLanguageRows(
  repos: RepositoryShaped[]
): Promise<LanguageRow[]> {
  const promises = repos.map((repo) => getLanguagePercents(repo));
  const responses = await Promise.all(promises);
  const languageRows = [];
  for (let response of responses) {
    for (let language in response.languages) {
      languageRows.push({
        repositoryId: response.repositoryId,
        language: language,
        percentage: response.languages[language],
      });
    }
  }
  return languageRows;
}

// gets the language response for a single repo and adds in percentage data
async function getLanguagePercents(
  repo: RepositoryShaped
): Promise<languageResponseWithPercents> {
  const languageResponse = await getWithAuth(repo.languagesUrl);
  const percentagesMapping = calculatePercentages(languageResponse.data);
  return {
    repositoryId: repo.repoId,
    languages: percentagesMapping,
  };
}

function calculatePercentages(languages: LanguageBytes): LanguagePercents {
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
