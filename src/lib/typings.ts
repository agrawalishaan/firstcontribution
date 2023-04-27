import { Repository, RepositoryLanguage, Issue } from '@prisma/client';

export interface RepositoryExtended extends Repository {
  issues: Issue[];
  languages: RepositoryLanguage[];
}
