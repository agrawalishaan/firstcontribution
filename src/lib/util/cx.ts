// [true && 'string1', false && 'string2', 'string3']
export default function cx(...args: (string | boolean)[]): string {
  return args.filter((e) => Boolean(e)).join(' ');
}
