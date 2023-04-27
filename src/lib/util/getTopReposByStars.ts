import { Repository } from '@prisma/client';

import constants from '@/lib/constants';
import getWithAuth from '@/lib/util/getWithAuth';
import { trimGithubEnding } from '@/lib/util/trimUrl';

export type RepositoryShaped = Omit<Repository, 'id'>;

// ! add error handling for all API calls if the data doesn't fit a shape

interface RepositoryResponse {
  id: number; // refers to the unique repository ID not our prisma ID
  name: string;
  full_name: string;
  private: boolean;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  has_issues: boolean;
  open_issues_count: number;
  updated_at: Date;
  languages_url: string;
  issues_url: string;
  owner: {
    avatar_url: string;
  };
  homepage: string;
}

// ! todo: add error handling for if the api changes or a parameter does not fit
// gets the top repos from the github API, shapes them, and returns them
// npm run startrepos
export default async function getTopReposByStars(
  pages = 1
): Promise<RepositoryShaped[]> {
  const promises = [];
  // iterate over each page, grabbing new results, at most 1000 results are allowed by the github api, hence 10 pages of 100 results
  // github api pages start from page 1
  for (let i = 1; i <= pages; i++) {
    const url = `${constants.TOP_REPOS_BY_STARS_ENDPOINT}&page=${i}`;
    const promise = getWithAuth(url);
    promises.push(promise);
  }
  let apiData = await Promise.all(promises);
  // retrieve data and flatten the array due to querying by page
  apiData = apiData.map((repo) => repo.data.items).flat();
  // shape api data to fit the prisma model
  let apiDataShaped: RepositoryShaped[] = apiData.map(
    (repo: RepositoryResponse) => ({
      repoId: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      private: repo.private,
      description: repo.description,
      url: repo.html_url,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      hasIssues: repo.has_issues,
      openIssues: repo.open_issues_count,
      updatedAt: repo.updated_at,
      languagesUrl: repo.languages_url,
      issuesUrl: trimGithubEnding(repo.issues_url),
      avatarUrl: repo.owner.avatar_url,
      homepage: repo.homepage,
    })
  );
  // remove repos that are private or don't have issues
  return apiDataShaped
    .filter((repo) => !repo.private)
    .filter((repo) => repo.hasIssues);
}
