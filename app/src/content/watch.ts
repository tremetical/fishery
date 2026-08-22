/*
 * Curated outside video courses.
 *
 * Flashcards drill recall; they are a poor way to meet an idea for the
 * first time. Video is better for that, so the app points at the best free
 * courses rather than pretending to replace them.
 *
 * These are third-party links that this app does not control — titles and
 * URLs can change. Nothing here is FAA-official except where marked.
 */

export interface WatchItem {
  title: string;
  who: string;
  url: string;
  length: string;
  blurb: string;
  /** the single best starting point */
  featured?: boolean;
}

/** The literal first thing to press play on. One link, no choosing. */
export const FIRST = {
  title: 'Lesson 1 — Flight Training 101',
  who: 'FLY8MA · free ground school',
  url: 'https://fly8ma.com/lessons/lesson-1-flight-training-101/',
  blurb:
    'Built for exactly where you are: what to know before your first flight lesson. Watch it, then keep going down that course in order. Do not mix sources — one course start to finish beats five half-watched.',
};

export const WATCH: WatchItem[] = [
  {
    title: 'Private Pilot Ground School (16.687)',
    who: 'MIT OpenCourseWare',
    url: 'https://ocw.mit.edu/courses/16-687-private-pilot-ground-school-january-iap-2019/',
    length: 'A full lecture course, ~25 hours',
    blurb:
      'A real university ground school, free with no signup. Dense and fast — it is the best second pass on a topic you have already met, not the place to meet it. Its weather and aerodynamics lectures are worth the trip.',
  },
  {
    title: 'Free Private Pilot Ground School',
    who: 'Pilot Institute',
    url: 'https://pilotinstitute.com/course/free-private-pilot-ground-school/',
    length: 'First ~8 hours free',
    blurb:
      'Beginner-paced and ordered like the written exam. The best alternative if FLY8MA\'s style does not suit you — pick one, not both.',
  },
  {
    title: 'Free Private Pilot Ground School',
    who: 'FLY8MA',
    url: 'https://fly8ma.com/courses/free-private-pilot-ground-school-pilot-course/',
    length: '100+ short videos',
    blurb:
      'Practical and scenario-heavy — feels like a lesson debrief rather than a lecture. This is the course Lesson 1 above belongs to; work straight down it.',
  },
  {
    title: 'Free Private Pilot Videos',
    who: 'King Schools',
    url: 'https://www.youtube.com/playlist?list=PLQTup63Foj4Si57jzEUT-KGtbaAsjkbAE',
    length: 'Playlist of excerpts',
    blurb:
      'The classic written-test prep style: plain, repetitive, aimed squarely at passing. Dry, but it sticks.',
  },
  {
    title: 'Air Safety Institute',
    who: 'AOPA',
    url: 'https://www.aopa.org/training-and-safety/air-safety-institute',
    length: 'Short videos and case studies',
    blurb:
      'Accident case studies and real ATC audio. The best material anywhere on judgement and decision-making.',
  },
];

export interface PlanStep {
  when: string;
  watch: string;
  then: string;
}

/*
 * The order to actually do this in. The mistake worth preventing is
 * binge-watching a full course before ever touching the airplane: video is
 * first contact, the cards are retention, and the lesson is what makes any
 * of it mean anything. One topic per sitting, in that order.
 */
export const PLAN: PlanStep[] = [
  {
    when: 'Before your next lesson',
    watch: 'Controls and the four forces · what a stall really is · the traffic pattern',
    then: 'Run the Start here unit. Aim to follow what your CFI is doing, not to pass anything yet.',
  },
  {
    when: 'Weeks 1–2',
    watch: 'Aircraft systems, then principles of flight',
    then: 'Systems and Aerodynamics units. Touch the parts on the real airplane during preflight.',
  },
  {
    when: 'Weeks 3–4',
    watch: 'Airports, markings and lighting · radio communications',
    then: 'Airport and Radio units, plus the spoken drills. Say the calls out loud in the car.',
  },
  {
    when: 'Weeks 5–6',
    watch: 'Airspace',
    then: 'Airspace unit and the Airspace explorer. Expect this one to take two passes.',
  },
  {
    when: 'Weeks 7–9',
    watch: 'Weather theory, then reports and forecasts',
    then: 'Weather units and METAR Lab. The biggest chunk of the written lives here.',
  },
  {
    when: 'Weeks 10–11',
    watch: 'Navigation and cross-country planning · weight, balance and performance',
    then: 'Nav, W&B and Performance units. Plan a real cross-country you would actually fly.',
  },
  {
    when: 'Weeks 12+',
    watch: 'Regulations · aeromedical · decision making',
    then: 'Regs and Aeromedical units, then start full practice exams until you clear 80%.',
  },
];
