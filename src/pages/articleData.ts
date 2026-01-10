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
    id: 14,
    slug: "students-ignore-new-chant",
    title: "Students respectfully ignore new chant introduced in assembly",
    blurb: "It already moved to the poster wall.",
    category: "Campus",
    author: "Skylar Enns",
    date: "Jan 12, 2026",
    imageUrl: "https://8ky41qbhzw.ufs.sh/f/JiAETYwVkpaWBFhqfPokK3exYpJl5UGsRXyo8jhWL9qMPCQr",
    body: [
      "After Skyline’s chant debut a few assemblies ago, it seemingly has faded to just a poster on the wall next to the gym.",
      "The students don’t even remember it happened. They were all on TikTok watching other school’s assemblies.",
      "While admin confirmed the chant is still ‘rolling out’, verified by a leaked email saying “we need to try again in spring”. Despite multiple home games, the chant never made it off the wall.",
      "At the end of the day, the chant’s biggest impact has been taking up wall space.",
    ],
  },
  {
    id: 13,
    slug: "girls-flag-football-empty-stands",
    title: "Girls flag football dominates state rankings, plays to empty stands",
    blurb: "The crowd is quieter than the sideline whistles.",
    category: "Sports",
    author: "Skylar Enns",
    date: "Jan 11, 2026",
    imageUrl: "https://8ky41qbhzw.ufs.sh/f/JiAETYwVkpaWjSRQpflrQ58RPzsbnV4Xmr10NFxofAB7JyDw",
    body: [
      "Skyline’s Girls Flag Football team has been ranked #1 in Washington State despite zero fans.",
      "The crowd consists of five sets of parents, two boyfriends, and a girl whose best friend is a benchwarmer.",
      "Players reported being able to hear individual cleats on the sideline during touchdowns, while the announcer was forced to clap for himself after each score.",
      "At one point, a referee asked the stands to quiet down.",
      "The team’s current record is 6-1, with all wins occurring in near-total silence.",
    ],
  },
  {
    id: 12,
    slug: "study-links-academics-school-spirit",
    title: "New district-funded study finds academics behind 76% decline in school spirit",
    blurb: "The pythagorean theorem is winning.",
    category: "Campus",
    author: "Skylar Enns",
    date: "Jan 10, 2026",
    imageUrl: "https://8ky41qbhzw.ufs.sh/f/JiAETYwVkpaWjMuOgBrQ58RPzsbnV4Xmr10NFxofAB7JyDwa",
    body: [
      "A district-funded study into Skyline’s lack of school spirit showed a shocking correlation between academic success and school spirit.",
      "The students may not know what a touchdown is, or that we got to the State Quarterfinals, but they sure know the pythagorean theorem.",
      "When compared to other Issaquah School District schools, Issaquah High School has an average GPA .7 points lower than Skyline’s but their school spirit is thriving.",
      "Down the street, Eastlake High School’s average is 1.3 points lower but their school spirit is an octave above Issaquah’s.",
      "This decline is bound to continue unless the school board does something about this.",
    ],
  },
  {
    id: 10,
    slug: "admin-rules-just-suggestions",
    title: "Admin admits rules were ‘more of a suggestion anyway’",
    blurb: "Rules don't even do anything.",
    category: "Campus",
    author: "Skylar Enns",
    date: "Jan 5, 2026",
    imageUrl: "https://8ky41qbhzw.ufs.sh/f/JiAETYwVkpaWlBJp4kE1dzRnjLrmiMJY27TBcOoVh08HqvQZ",
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
    blurb: "It's becoming a pandemic.",
    category: "Campus",
    author: "Skylar Enns",
    date: "Jan 5, 2026",
    imageUrl: "https://8ky41qbhzw.ufs.sh/f/JiAETYwVkpaWR3tXEanK6xSchCDJZrQTIA0Ny7pWnwvLBEPd",
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
    blurb: "We all knew they didn't do anything.",
    category: "Campus",
    author: "Skylar Enns",
    date: "Jan 5, 2026",
    imageUrl: "https://8ky41qbhzw.ufs.sh/f/JiAETYwVkpaWo1uOMj5DbYXnsWkB2FH4KjwZUaGQdq9R7eO1",
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
    blurb: "y=mx+b or something",
    category: "Campus",
    author: "Skylar Enns",
    date: "Jan 5, 2026",
    imageUrl: "https://8ky41qbhzw.ufs.sh/f/JiAETYwVkpaWUXIKvVZ1aFBK7ZfeczNIL9umHj3okdW5iPGA",
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
    blurb: "Attendance is lower than the sign-up sheet",
    category: "Campus",
    author: "Skylar Enns",
    date: "Jan 5, 2026",
    imageUrl: "https://8ky41qbhzw.ufs.sh/f/JiAETYwVkpaWy4GNcyVnUlYqAjT8Wbrw3gKpRdGPIN92ZxSX",
    body: [
      "With the students forced to go to the annual Skyline Club Fair earlier this school year, it led to a record number of signups compared to the number zero.",
      "However, after the hype of said club fair, none of the signups actually led to real attendees, in fact the members who were attending have stopped due to “homework” which we all know means “Minecraft”.",
      "Anyone want to start a Minecraft club?",
    ],
  },
  {
    id: 6,
    slug: "flagpole-sptv-intro",
    title: "Skyline student licks flagpole for 30 minutes during lunch",
    blurb: "These kids are crazy",
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
    imageUrl: "https://8ky41qbhzw.ufs.sh/f/JiAETYwVkpaWQNLmcgCuL0Dbpg5v6Uw9YofTVneNGri2dtlB",
    body: [
      "Let’s be honest here. When a teacher announces that there will be a group project, everyone pretends to be excited but we all know what's coming.",
      "One strategy we all try in group projects is democracy. In the group chat, a leader is chosen and distributes the work. The leader usually does such a bad job that all of the work ends up piling on one person to finish at two in the morning before we present it the next day.",
      "Also, when the members vote on a way of doing something in the project, the leader interrupts and overwrites the change. It moves quickly from a democracy to a dictatorship.",
      "The leaders can’t keep getting away with this! Maybe socialism is the answer for group projects. Wait... don’t socialists have leaders too?",
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
