export function getShortInitials(input: string): string {
  return input
    .trim()
    .split(/\s+/)
    .map((word) => word[0]?.toUpperCase())
    .filter(Boolean)
    .slice(0, 2)
    .join("");
}
