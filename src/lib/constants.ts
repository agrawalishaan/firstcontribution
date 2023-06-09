const RESULTS_PER_PAGE = 10;
// stars>1000 is needed so github can reduce the amount of data searched, meaning the query finishes within their time limit, meaning we get consistent results
const TOP_REPOS_BY_STARS_ENDPOINT = `https://api.github.com/search/repositories?q=stars:>1000&sort=stars&per_page=${RESULTS_PER_PAGE}`;

// details about a given issue:
// https://api.github.com/repos/freeCodeCamp/freeCodeCamp/issues/49846
// list for all issues:
// https://api.github.com/repos/freeCodeCamp/freeCodeCamp/issues
// will not have the .pull_request key if it is not a pull request

// on github repos, some languages are not actually programming languages, and we only want repos to show where users can make contributions in actual langages, this variable stores invalid languages that we want to filter out
const INVALID_PROGRAMMING_LANGUAGES = [
  'Markdown',
  'HTML',
  'CSS',
  'Other',
  'Dockerfile',
];

const constants = {
  INVALID_PROGRAMMING_LANGUAGES,
  TOP_REPOS_BY_STARS_ENDPOINT,
};

export default constants;
