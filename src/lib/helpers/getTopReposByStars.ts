import constants from '@/lib/constants';
import getWithAuth from '@/lib/helpers//getWithAuth';
import trimUrl from '@/lib/helpers/trimUrl';
import { get } from 'https';

// gets the top repos from the github API, shapes them, and returns them
// npm run startrepos
export default async function getTopReposByStars(pages = 1) {
  const promises = [];
  // iterate over each page, grabbing new results, at most 1000 results are allowed by the github api, hence 10 pages of 100 results
  // github api pages start from page 1
  for (let i = 1; i <= +pages; i++) {
    const url = `${constants.TOP_REPOS_BY_STARS_ENDPOINT}&page=${i}`;
    const promise = getWithAuth(url);
    promises.push(promise);
  }
  let apiData = await Promise.all(promises);
  // retrieve data and flatten the array due to querying by page
  apiData = apiData.map((repo) => repo.data.items).flat();
  // shape api data to fit the prisma model
  let shapedApiData = apiData.map((repo) => ({
    repoId: repo.id,
    name: repo.name,
    fullName: repo.full_name,
    private: repo.private,
    description: repo.description,
    url: repo.html_url,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    hasIssues: repo.has_issues,
    updatedAt: repo.updated_at,
    languagesUrl: repo.languages_url,
    issuesUrl: trimUrl(repo.issues_url),
    avatarUrl: repo.owner.avatar_url,
    homepage: repo.homepage, // can be blank string, otherwise usually an external website
  }));
  // remove repos that are private, or don't have issues
  shapedApiData = shapedApiData.filter((repo) => !repo.private);
  shapedApiData = shapedApiData.filter((repo) => repo.hasIssues);
  return shapedApiData;
}

// example
/* {
    id: 82227585,
    name: 'design-patterns-for-humans',
    full_name: 'kamranahmedse/design-patterns-for-humans',
    private: false,
    description: 'An ultra-simplified explanation to design patterns',
    url: 'https://github.com/kamranahmedse/design-patterns-for-humans',
    stars: 40118,
    forks: 4781,
    has_issues: true,
    updated_at: '2023-03-31T20:26:15Z',
    languages_url: 'https://api.github.com/repos/kamranahmedse/design-patterns-for-humans/languages',
    issues_url: 'https://api.github.com/repos/kamranahmedse/design-patterns-for-humans/issues',
    avatar_url: 'https://avatars.githubusercontent.com/u/4921183?v=4',
    homepage: ''
  }, */
