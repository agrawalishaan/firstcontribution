// takes a number such as the number of stars a repo has, and returns an abbreviated count
export default function roundCount(number: number): string {
  if (number >= 1_000_000) {
    return (number / 1_000_000).toFixed(2) + 'm';
  } else if (number >= 100_000) {
    return (number / 1000).toFixed(0) + 'k';
  } else if (number >= 10_000) {
    return (number / 1000).toFixed(1) + 'k';
  } else if (number >= 1000) {
    return (number / 1000).toFixed(2) + 'k';
  } else {
    return number.toString();
  }
}
