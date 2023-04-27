import { Issue } from '@prisma/client';

import getWithAuth from '@/lib/util/getWithAuth';
import validateLabels from '@/lib/util/validateLabels';
import { RepositoryInput } from '@/lib/util/getTopReposByStars';

type IssueInput = Omit<Issue, 'id'>;
// ! add native typings

export default async function getIssueRowsMany(
  repos: RepositoryInput[]
): Promise<IssueInput[]> {
  const issueRowsMany = [];
  for (let repo of repos) {
    issueRowsMany.push(getIssueRows(repo));
  }
  const issueRowsManyResolved = await Promise.all(issueRowsMany);
  const issueRowsManyResolvedFlat = issueRowsManyResolved.flat();
  return issueRowsManyResolvedFlat;
}

const PER_PAGE = 100; // max allowed by github is 100
const STATE = 'open'; // only want open issues

// iterates over multiple API calls to get all issue rows for a given repo
// example call: https://api.github.com/repos/vercel/next.js/issues?per_page=100&state=open&page=1
async function getIssueRows(repo: RepositoryInput): Promise<IssueInput[]> {
  const baseUrl = `${repo.issuesUrl}?per_page=${PER_PAGE}&state=${STATE}`;
  const numPages = Math.ceil(repo.openIssues / PER_PAGE);
  const promises = [];
  for (let i = 1; i <= numPages; i++) {
    promises.push(getWithAuth(`${baseUrl}&page=${i}`));
  }
  const issuesAll = await Promise.all(promises);
  const issuesAllFlat = issuesAll.map((issues) => issues.data).flat();
  // !
  const issuesAllShaped: IssueInput[] = issuesAllFlat.map((issue) => ({
    repositoryId: repo.repoId,
    issueId: issue.id,
    issueNumber: issue.number,
    title: issue.title,
    // labels is false if there are no labels, or if the existing labels aren't validated
    labels: false ? issue.labels : validateLabels(issue.labels),
    pullRequest: Boolean(issue.pull_request),
  }));
  // only include good first issues and issues that don't have active pull requests
  const issueRowsFiltered = issuesAllShaped
    .filter((issue) => issue.labels)
    .filter((issue) => !issue.pullRequest);
  return issueRowsFiltered;
}
