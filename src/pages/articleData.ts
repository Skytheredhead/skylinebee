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
    id: 10,
    slug: "admin-rules-just-suggestions",
    title: "Admin admits rules were ‘more of a suggestion anyway’",
    blurb: "Hallway vaping rings thrive while enforcement hinges on break-room coffee quality.",
    category: "Campus",
    author: "Skylar Enns",
    date: "Jan 5, 2026",
    imageUrl: "https://picsum.photos/seed/skyline-bee-304/1280/720",
    body: [
      "Gangsters have been rampaging through the hallways of Skyline High School, ripping fat vapes in the bathrooms, and having one member stick in the hallway outside to “look out for Admin.”",
      "In front of a “please walk!” sign, I interviewed an anonymous admin member who said that he enforces the rules depending on how good the coffee was in the break room.",
      "As I was exiting the building, I observed a group of students in full sprint coming out of the bathroom. It appears that Admin has enforcement strictly under control. I’m glad to be a part of this safe community!",
    ],
  },
  {
    id: 11,
    slug: "senioritis-upgraded-chronic-condition",
    title: "Senioritis officially upgraded to chronic condition | “I’ve had this since sophomore year”",
    blurb: "District jokes about returning to online school as symptoms spread faster than expected.",
    category: "Campus",
    author: "Skylar Enns",
    date: "Jan 5, 2026",
    imageUrl: "https://picsum.photos/seed/skyline-bee-305/1280/720",
    body: [
      "According to a study from the Department of Teaching Assistants, senioritis has started to spread to more than just the senior class. It started to spread to the Juniors approximately 6 years ago, and this year, it’s even been reported reaching the sophomores.",
      "An anonymous student said “I had senioritis back in 8th grade.” That report seems to render the previous study inaccurate, as senioritis is spreading much faster than anticipated.",
      "Update: The district just posted on X “We need to go back to online schooling to prevent the spread of senioritis”",
    ],
  },
  {
    id: 8,
    slug: "district-surveys-do-nothing",
    title: "District studies show the district’s surveys do nothing",
    blurb: "Annual results unchanged; students admit to speed-running the answers.",
    category: "Campus",
    author: "Skylar Enns",
    date: "Jan 5, 2026",
    imageUrl: "https://picsum.photos/seed/skyline-bee-302/1280/720",
    body: [
      "The Issaquah School District has yet again released a set of “survey results”. Scrolling down to the “comparison to previous years” section, the district reveals no change from last year’s results.",
      "An anonymous student said, “I clicked random answers so I could go back to scrolling TikTok.” It appears that the only thing these surveys have done is take up students’ time.",
      "Next year’s survey is bound to show some promising results. It’s always “just one more”.",
    ],
  },
  {
    id: 9,
    slug: "school-spirit-approaches-zero",
    title: "Math teachers confirm school spirit approaches zero",
    blurb: "Logarithmic decline charts the vanishing hype heading into finals week.",
    category: "Campus",
    author: "Skylar Enns",
    date: "Jan 5, 2026",
    imageUrl: "https://picsum.photos/seed/skyline-bee-303/1280/720",
    body: [
      "As we approach finals week, school spirit is clearly at an all time low. I interviewed a person in the Skyline Commons who claimed he was a math teacher.",
      "He said, “Yeah, I used a logarithmic decline with the line of y = mx+b” So much did it actually decline? “Compared to five years ago, spirit has declined over 80 percent!”  He exclaimed proudly.",
      "Compare that to the neighboring school, Eastlake, which is focused on things like “moving the library to a portable in the middle of the parking lot” which has somehow led to exceeding amounts of school spirit! Maybe they should do a district survey to show the results!",
    ],
  },
  {
    id: 7,
    slug: "club-attendance-drops-after-fair",
    title: "Club attendance drops to executive board only after club fair",
    blurb: "Record signups evaporate into radio silence once the raffle tickets run out.",
    category: "Campus",
    author: "Skylar Enns",
    date: "Jan 5, 2026",
    imageUrl: "https://picsum.photos/seed/skyline-bee-301/1280/720",
    body: [
      "With the students forced to go to the annual Skyline Club Fair earlier this school year, it led to a record number of signups compared to the number zero.",
      "However, after the hype of said club fair, none of the signups actually led to real attendees, in fact the members who were attending have stopped due to “homework” which we all know means “Minecraft”.",
      "Anyone want to start a Minecraft club?",
    ],
  },
  {
    id: 6,
    slug: "flagpole-sptv-intro",
    title: "Skyline student licks flagpole for 30 minutes during lunch??",
    blurb: "Lincoln Reynolds licks a flagpole for a new SPTV intro filming during lunch.",
    category: "Campus",
    author: "Skylar Enns",
    date: "Dec 10, 2025",
    imageUrl: "https://8ky41qbhzw.ufs.sh/f/JiAETYwVkpaWiyfhz4ejAkrPYaTithnO9G2q5pNL78KFlzs3",
    body: [
      "Lincoln Reynolds, a prominent “intro maker” of SPTV, stars in another intro for Episode 10 (coming out 12/16 on <a href=\"https://www.youtube.com/@SPTVSpartans\">Youtube</a>). This new episode’s minute-long intro will feature a film of him getting convinced to lick a flagpole by another SPTV member, Elliot Roper.",
      "He then proceeds to be a public spectacle in the middle of the drop-off loop for students and parents to stare at during lunch.",
      "Skylar Enns, the director of SPTV, says he was questioned by Skyline’s Admin about what Reynolds was doing and he explained what it was. Enns adds that Admin restricts certain phrases on SPTV, like saying “Merry Christmas,” but doubts they will cut this intro given Reynolds’ dedication.",
    ],
  },
  {
    id: 1,
    slug: "group-projects-democracy",
    title: "Group projects prove democracy was a mistake",
    blurb: "Majority votes to do nothing.",
    category: "Opinion",
    author: "Skylar Enns",
    date: "Dec 10, 2025",
    imageUrl: "https://picsum.photos/seed/skyline-bee-201/1280/720",
    body: [
      "Let’s be honest here. When a teacher announces that there will be a group project, everyone pretends to be excited but we all know what's coming.",
      "One strategy we all try in group projects is democracy. In the group chat, a leader is chosen and distributes the work. The leader usually does such a bad job that all of the work ends up piling on one person to finish at two in the morning before we present it the next day.",
      "Also, when the members vote on a way of doing something in the project, the leader interrupts and overwrites the change. It moves quickly from a democracy to a dictatorship.",
      "The leaders can’t keep getting away with this! Maybe socialism is the answer for group projects. Wait... don’t socialists have leaders too?",
    ],
  },
  {
    id: 2,
    slug: "club-fair-record-signups",
    title: "Club fair produces record number of signups",
    blurb: "Attendance drops to executive board only.",
    category: "Campus",
    author: "Skylar Enns",
    date: "Dec 8, 2025",
    imageUrl: "https://8ky41qbhzw.ufs.sh/f/JiAETYwVkpaWy4GNcyVnUlYqAjT8Wbrw3gKpRdGPIN92ZxSX",
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
    author: "Skylar Enns",
    date: "Dec 6, 2025",
    imageUrl: "https://8ky41qbhzw.ufs.sh/f/JiAETYwVkpaWR3tXEanK6xSchCDJZrQTIA0Ny7pWnwvLBEPd",
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
    author: "Skylar Enns",
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
    author: "Skylar Enns",
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
