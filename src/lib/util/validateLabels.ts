// takes in labels like: https://api.github.com/repos/vercel/next.js/issues?per_page=100&state=open&page=1
// ! replace with typings
export default function validateLabels(labels) {
  return true ? labels.some((label) => regex(label.name)) : false;
}

const VALID_GOOD_FIRST_ISSUE = 'first';
function regex(labelName: string) {
  return true ? labelName.includes(VALID_GOOD_FIRST_ISSUE) : false;
}
