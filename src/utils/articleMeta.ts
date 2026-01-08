export function hashString(value: string): number {
  return Array.from(value).reduce((acc, ch) => (acc * 31 + ch.charCodeAt(0)) % 2147483647, 0);
}

export function getDailySeed(date = new Date()): number {
  const key = date.toLocaleDateString("en-CA");
  return hashString(key);
}

export function shuffleWithSeed<T>(items: T[], seed: number): T[] {
  const result = [...items];
  let state = seed || 1;
  const random = () => {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

export function getDailyShuffle<T>(items: T[], date = new Date()): T[] {
  return shuffleWithSeed(items, getDailySeed(date));
}

export function getReadingTime(body: string[]): string {
  const words = body.join(" ").split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(3, Math.round(words / 180));
  return `${minutes} min read`;
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase())
    .slice(0, 2)
    .join("");
}

export function formatTimestamp(date: string, slug: string): string {
  const baseDate = new Date(date);
  if (Number.isNaN(baseDate.getTime())) {
    return date;
  }
  const timeSeed = hashString(slug);
  const minutes = timeSeed % 60;
  const hours = 7 + (timeSeed % 10);
  baseDate.setHours(hours, minutes);
  return baseDate.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
