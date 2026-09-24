/**
 * Builds a YouTube search URL for an exercise's form.
 * We deliberately never hard-code video ids: they rot, and we can't vouch for them.
 */
export function youtubeSearchUrl(exerciseName: string): string {
  const query = `${exerciseName} form`.toLowerCase().replace(/\s+/g, " ").trim();
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query).replace(/%20/g, "+")}`;
}
