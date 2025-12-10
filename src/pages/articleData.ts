export type Article = {
  id: number;
  slug: string;
  title: string;
  blurb: string;
  category: "Campus" | "Sports" | "Opinion" | "Tech";
  author: string;
  date: string;
  imageUrl: string;
  body: string[];
};

export const ARTICLES: Article[] = [
  {
    id: 6,
    slug: "flagpole-sptv-intro",
    title: "Skyline student licks flagpole for 30 minutes during lunch??",
    blurb: "He says it’s for an SPTV intro.",
    category: "Campus",
    author: "Onlooker",
    date: "Nov 28, 2025",
    imageUrl: "https://adfdx2zloe.ufs.sh/f/dJTKSQhkzQKhJ3jveeQCmWdfzlHQS2DkvAxZuaobFGs7trP8",
    body: [
      "Witnesses report that a senior voluntarily attached himself to the courtyard flagpole for a full half hour, explaining through chattering teeth that it was \"for the cold open.\"",
      "Friends filming the ordeal offered lukewarm encouragement while repeatedly reminding him they could add CGI frost in post. He declined, saying authenticity mattered to his art.",
      "Campus security briefly approached but left after determining there was technically no policy against licking school property for extended periods of time, as long as it was \"educational media.\"",
      "When asked if it was worth it, the student stated he could no longer feel his face but believed the dedication would earn at least ten likes on the morning show stream.",
      "Sources confirmed the flagpole was later wrapped in caution tape with a handwritten sign that read simply: \"Do Not Attempt.\"",
    ],
  },
  {
    id: 1,
    slug: "group-projects-democracy",
    title: "Group projects prove democracy was a mistake",
    blurb: "Majority votes to do nothing.",
    category: "Opinion",
    author: "Staff",
    date: "Dec 10, 2025",
    imageUrl: "https://picsum.photos/seed/skyline-bee-101/1280/720",
    body: [
      "After another quarter of group projects, students have concluded that voting leads mostly to unanimous decisions to procrastinate.",
      "Minutes from a recent meeting show the only agenda item was choosing a group chat name. The resulting vote produced seven options and zero completed slides.",
      "Teachers responded by assigning peer evaluations, which were promptly ignored by the same committees formed to avoid the original work.",
    ],
  },
  {
    id: 2,
    slug: "club-fair-record-signups",
    title: "Club fair produces record number of signups",
    blurb: "Attendance drops to executive board only.",
    category: "Campus",
    author: "Campus Desk",
    date: "Dec 8, 2025",
    imageUrl: "https://picsum.photos/seed/skyline-bee-102/1280/720",
    body: [
      "Student leaders celebrated a record-breaking list of new members, immediately followed by a record-breaking ghosting rate.",
      "By week three, the club GroupMe contained fifty members, two unread announcements, and one extremely active treasurer reminding everyone to pay dues.",
      "Organizers remain hopeful the excitement returns once free pizza is mentioned in bold, underlined text.",
    ],
  },
  {
    id: 3,
    slug: "senioritis-chronic-condition",
    title: "Senioritis officially upgraded to chronic condition",
    blurb: "“I’ve had this since sophomore year”.",
    category: "Opinion",
    author: "Editorial Board",
    date: "Dec 6, 2025",
    imageUrl: "https://picsum.photos/seed/skyline-bee-103/1280/720",
    body: [
      "Doctors warn symptoms now include ignoring alarms, deleting Schoology notifications, and forgetting which day it is during midterms.",
      "Treatment options remain limited to sheer willpower and the promise of spring break, which studies show is only temporarily effective.",
      "One patient reports the condition started during remote learning and simply never left the building when students returned.",
    ],
  },
  {
    id: 4,
    slug: "parking-lot-etiquette-low",
    title: "Parking lot etiquette reaches historic low, drivers consider using turn signals for the first time",
    blurb: "Who gave these kids licenses?",
    category: "Sports",
    author: "Automotive Enthusiast",
    date: "Dec 3, 2025",
    imageUrl: "https://picsum.photos/seed/skyline-bee-104/1280/720",
    body: [
      "Officials report that the morning commute now resembles a slow-motion action movie, minus the budget for special effects or choreography.",
      "Student drivers were seen rolling down windows to ask, politely, what a blinker does. Research is ongoing.",
      "Meanwhile, crosswalks remain decorative suggestions, according to an anonymous traffic cone.",
    ],
  },
  {
    id: 5,
    slug: "bathrooms-missing-dispensers",
    title: "Bathrooms updated with missing soap dispensers",
    blurb: "Why are children breaking them off the walls?",
    category: "Tech",
    author: "Facilities Beat",
    date: "Nov 30, 2025",
    imageUrl: "https://picsum.photos/seed/skyline-bee-105/1280/720",
    body: [
      "Maintenance crews unveiled the district's newest minimalist bathroom design: soap dispensers removed entirely after the fifth replacement week.",
      "Students describe the look as \"industrial chic\" and \"hope you brought hand sanitizer.\"",
      "Administrators promise to revisit the issue as soon as they solve the paper towel dispenser mystery.",
    ],
  },
];

export function getArticleBySlugOrId(slugParam?: string | null, idParam?: string | null): Article {
  const normalizedSlug = slugParam?.toLowerCase();
  const id = idParam ? Number(idParam) : undefined;

  const bySlug = normalizedSlug
    ? ARTICLES.find((article) => article.slug.toLowerCase() === normalizedSlug)
    : undefined;

  if (bySlug) return bySlug;

  if (!Number.isNaN(id)) {
    const byId = ARTICLES.find((article) => article.id === id);
    if (byId) return byId;
  }

  return ARTICLES[0];
}
