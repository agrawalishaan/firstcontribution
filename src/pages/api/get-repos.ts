import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/lib/db/client';

import { RepositoryExtended } from '@/lib/typings';

// ! remove data from database that is private such as repoId and whatnot

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const [repos, languages, issues] = await Promise.all([
    prisma.repository.findMany(),
    prisma.repositoryLanguage.findMany(),
    prisma.issue.findMany(),
  ]);

  // force a type cast as we are converting the repos to extended versions
  const reposExtended = repos as RepositoryExtended[];
  // map repoIds to repos, so that they can be populated with relevant issues
  const mapping: Record<string, RepositoryExtended> = {};
  reposExtended.forEach((repo) => {
    mapping[repo.repoId] = repo;
    repo.issues = [];
    repo.languages = [];
  });

  // populate repos with issues
  issues.forEach((issue) => {
    const repo = mapping[issue.repositoryId];
    // case where an issue exists but a repo doesn't
    if (repo) {
      // ! add error handling for the else case
      repo.issues.push(issue);
    }
  });

  // populate repos with languages
  languages.forEach((language) => {
    const repo = mapping[language.repositoryId];
    // case where a language exists but a repo doesn't
    if (repo) {
      // ! add error handling for the else case
      repo.languages.push(language);
    }
  });

  const reposNested = Object.values(mapping);
  res.status(200).json(reposNested);
}
