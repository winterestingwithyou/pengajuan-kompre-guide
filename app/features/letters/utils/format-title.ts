export function toCapitalizedTitle(value: string) {
  return value
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((word) => word.replace(/(^|[-/])([a-z])/g, (_, prefix, letter) => {
      return `${prefix}${letter.toUpperCase()}`;
    }))
    .join(" ");
}
