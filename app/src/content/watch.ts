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

export const WATCH: WatchItem[] = [
  {
    title: 'Private Pilot Ground School (16.687)',
    who: 'MIT OpenCourseWare',
    url: 'https://ocw.mit.edu/courses/16-687-private-pilot-ground-school-january-iap-2019/',
    length: 'A full lecture course, ~25 hours',
    blurb:
      'A complete university ground school, free and unlisted behind no signup. Closest thing to the "one really long one" — start at lecture 1 and work down.',
    featured: true,
  },
  {
    title: 'Free Private Pilot Ground School',
    who: 'Pilot Institute',
    url: 'https://pilotinstitute.com/course/free-private-pilot-ground-school/',
    length: 'First ~8 hours free',
    blurb:
      'The most polished production of the bunch, and structured in the same order as the written exam. Free tier needs an account.',
  },
  {
    title: 'Free Private Pilot Ground School',
    who: 'FLY8MA',
    url: 'https://fly8ma.com/courses/free-private-pilot-ground-school-pilot-course/',
    length: '100+ short videos',
    blurb:
      'Practical and scenario-heavy — feels like a lesson debrief rather than a lecture. Good when a concept has not clicked yet.',
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
