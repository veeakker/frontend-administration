/**
 * Turns a label into something a human can read.
 */
export default function humanize(string) {
  return string
    .replace(/([^A-Z])([A-Z])/g, (_match, first, second) => `${first} ${second}`)
    .toLowerCase();
}
