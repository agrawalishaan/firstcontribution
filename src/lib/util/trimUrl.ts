// we receive data from the github API as such: https://api.github.com/repos/freeCodeCamp/freeCodeCamp/issues/{/number}
// the trimUrl function is a non-brittle solution to trim the {/number} at the end, as we need the plain url to query all issues
function trimGithubEnding(url: string): string {
  for (let i = url.length - 1; i >= 0; i--) {
    if (url[i] === '{') {
      return url.slice(0, i);
    }
  }
  throw new Error('bad url');
}

export { trimGithubEnding };
