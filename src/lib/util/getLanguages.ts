import getWithAuth from '@/lib/util/getWithAuth';

import { RepositoryShaped } from '@/lib/util/getTopReposByStars';

// { javascript: 456, html: 123 }
interface LanguageBytes {
  [key: string]: number;
}

// { javascript: 83.33, html: 16.66 }
export interface LanguagePercents {
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

// This module takes in a list of shaped repositories, and returns the rows for their languages. Two functions are exported because we need to filter repos that don't have a valid language, but it's harder to do it once the languages are divided out into individual rows

//constructs language rows from the responses with percents
export async function getLanguageRows(
  responsesWithPercents: languageResponseWithPercents[]
): Promise<LanguageRow[]> {
  const languageRows = [];
  for (let repo of responsesWithPercents) {
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

// gets for all repos
export async function getLanguagesPercentsMany(
  repos: RepositoryShaped[]
): Promise<languageResponseWithPercents[]> {
  const promises = repos.map((repo) => getLanguagePercents(repo));
  const responses = await Promise.all(promises);
  return responses;
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
