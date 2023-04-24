import getWithAuth from '@/lib/util/getWithAuth';

import { RepositoryShaped } from '@/lib/util/getTopReposByStars';

// ! add native typings

const PER_PAGE = 100; // max allowed by github is 100
const STATE = 'open'; // only want open issues

async function getIssuesRows() {}

// get issues for all repos
async function getIssuesResponsesMany(repos: RepositoryShaped[]) {
  const promises = repos.map((repo) => getIssuesResponse(repo));
  const responses = await Promise.all(promises);
  return responses;
}

// get the issues for a given repo
// example: https://api.github.com/repos/freeCodeCamp/freeCodeCamp/issues?per_page=100&state=open
async function getIssuesResponse(repo: RepositoryShaped) {
  const url = `${repo.issuesUrl}?per_page=${PER_PAGE}&state=${STATE}`;
  const issuesResponse = await getWithAuth(url);
  return issuesResponse;
}
