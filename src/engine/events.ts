import type { GameEvent } from "./types";

// 40 handcrafted events for ages 16–20.
// Focus: ripples (flags), delayed consequences (queueEvents), hidden traits.
export const EVENTS: GameEvent[] = [
  // ---------------- AGE 16 ----------------
  {
    id: "first_day_16",
    title: "The First Day",
    description:
      "It's the first morning of a new school year. Your alarm blares. The sun sneaks through the blinds. A whole life stretches ahead of you.",
    category: "school",
    emoji: "🌅",
    weight: 30,
    requires: { minAge: 16, maxAge: 16, notFlags: ["seen_first_day"] },
    choices: [
      {
        id: "leap",
        label: "Leap out of bed",
        description: "Attack the day head-on.",
        effects: {
          stats: { happiness: 5, stress: -3, health: 2 },
          traits: { discipline: 4, ambition: 3 },
          flags: ["seen_first_day", "morning_person"],
          memory: { title: "Started the year strong", description: "You promised yourself things would be different.", tone: "positive", icon: "🌅" },
        },
      },
      {
        id: "snooze",
        label: "Hit snooze… twice",
        effects: {
          stats: { happiness: 2, stress: 2 },
          traits: { discipline: -3 },
          flags: ["seen_first_day"],
          memory: { title: "Slept in on day one", description: "A small choice, but a pattern begins.", tone: "neutral", icon: "😴" },
        },
      },
    ],
  },
  {
    id: "cafeteria_seat",
    title: "The Empty Seat",
    description:
      "The cafeteria hums with chatter. A new student sits alone, tray untouched. Your usual table is across the room.",
    category: "friends",
    emoji: "🥪",
    weight: 20,
    requires: { minAge: 16, maxAge: 17 },
    choices: [
      {
        id: "sit_with",
        label: "Sit with them",
        effects: {
          stats: { relationships: 6, happiness: 3, reputation: 2 },
          traits: { empathy: 5, confidence: 2 },
          flags: ["met_newcomer"],
          queueEvents: [{ eventId: "newcomer_returns", inTurns: 12 }],
          memory: { title: "Made a stranger feel seen", description: "Small kindness. Long echoes.", tone: "positive", icon: "🤝" },
        },
      },
      {
        id: "join_usual",
        label: "Join your usual table",
        effects: {
          stats: { relationships: 2 },
          traits: { empathy: -1 },
        },
      },
      {
        id: "sit_alone",
        label: "Eat alone with a book",
        effects: {
          stats: { happiness: -2, skill: 2 },
          traits: { curiosity: 3, confidence: -1 },
        },
      },
    ],
  },
  {
    id: "pop_quiz",
    title: "Surprise Quiz",
    description: "Ms. Rivera drops a pop quiz. You barely studied. The kid next to you nudges their paper closer.",
    category: "school",
    emoji: "📝",
    weight: 25,
    requires: { minAge: 16, maxAge: 18 },
    choices: [
      {
        id: "own_it",
        label: "Do your best honestly",
        effects: {
          stats: { education: 3, stress: 5 },
          traits: { honesty: 4, discipline: 2 },
          memory: { title: "Failed honestly", description: "You could have cheated. You didn't.", tone: "neutral", icon: "📝" },
        },
      },
      {
        id: "peek",
        label: "Peek at their paper",
        effects: {
          stats: { education: 5, stress: 3, reputation: -2 },
          traits: { honesty: -6, risk: 3 },
          flags: ["has_cheated"],
          queueEvents: [{ eventId: "cheating_caught_up", inTurns: 6 }],
        },
      },
      {
        id: "walk_out",
        label: "Refuse to take it",
        effects: {
          stats: { education: -6, reputation: -3, happiness: 2 },
          traits: { confidence: 3, discipline: -3 },
          flags: ["defied_teacher"],
        },
      },
    ],
  },
  {
    id: "parents_argue",
    title: "Voices Downstairs",
    description: "You hear your parents arguing again. It's late. The words are muffled but sharp.",
    category: "family",
    emoji: "🏠",
    weight: 15,
    requires: { minAge: 16, maxAge: 19 },
    choices: [
      {
        id: "check_mom",
        label: "Check on Mom",
        effects: {
          stats: { happiness: -3, stress: 4, relationships: 3 },
          traits: { empathy: 4, responsibility: 3 },
          relationships: [{ id: "mother", trust: 6, love: 4 }],
        },
      },
      {
        id: "headphones",
        label: "Put on headphones",
        effects: {
          stats: { stress: 3, happiness: -1 },
          traits: { empathy: -2 },
        },
      },
      {
        id: "yell_stop",
        label: "Yell at them to stop",
        effects: {
          stats: { stress: 8, relationships: -4 },
          traits: { confidence: 2, empathy: -1 },
          relationships: [{ id: "mother", trust: -3 }, { id: "father", respect: -4 }],
        },
      },
    ],
  },
  {
    id: "coding_bootcamp_flyer",
    title: "A Weird Flyer",
    description: "A flyer on the library bulletin: 'Free after-school coding club. Snacks provided.'",
    category: "education",
    emoji: "💻",
    weight: 18,
    requires: { minAge: 16, maxAge: 17 },
    choices: [
      {
        id: "join_code",
        label: "Show up",
        effects: {
          stats: { skill: 8, education: 3, happiness: 3, stress: 2 },
          traits: { curiosity: 5, discipline: 3 },
          flags: ["learned_to_code"],
          memory: { title: "First line of code", description: "print('hello, world')", tone: "positive", icon: "💻" },
        },
      },
      {
        id: "ignore_flyer",
        label: "Ignore it",
        effects: { traits: { curiosity: -2 } },
      },
    ],
  },
  {
    id: "guitar_shop",
    title: "The Guitar in the Window",
    description: "You pass a music shop. A worn acoustic guitar sits in the window with a $200 tag.",
    category: "life",
    emoji: "🎸",
    weight: 15,
    requires: { minAge: 16, maxAge: 18 },
    choices: [
      {
        id: "buy_guitar",
        label: "Buy it and teach yourself",
        requires: { minStats: { money: 20 } },
        effects: {
          stats: { money: -20, happiness: 8, skill: 5, stress: -4 },
          traits: { creativity: 6, discipline: 3 },
          flags: ["plays_music"],
          memory: { title: "Bought a guitar", description: "You had no idea it would matter this much.", tone: "positive", icon: "🎸" },
        },
      },
      {
        id: "keep_walking",
        label: "Keep walking",
        effects: {},
      },
    ],
  },
  {
    id: "party_invite",
    title: "The Party",
    description: "A senior invites you to a party this weekend. There will be drinking. Your parents don't know.",
    category: "friends",
    emoji: "🎉",
    weight: 22,
    requires: { minAge: 16, maxAge: 18 },
    choices: [
      {
        id: "go_wild",
        label: "Go and let loose",
        effects: {
          stats: { happiness: 6, health: -3, reputation: 3, stress: -2 },
          traits: { risk: 5, confidence: 3, discipline: -3 },
          flags: ["party_kid"],
          queueEvents: [{ eventId: "party_photo_leaks", inTurns: 4 }],
        },
      },
      {
        id: "go_stay_sober",
        label: "Go but stay sober",
        effects: {
          stats: { happiness: 4, reputation: 2, relationships: 3 },
          traits: { discipline: 3, responsibility: 2 },
        },
      },
      {
        id: "skip_party",
        label: "Stay home",
        effects: {
          stats: { happiness: -2, stress: -2, education: 2 },
          traits: { discipline: 2, confidence: -1 },
        },
      },
    ],
  },
  {
    id: "shoplift_dare",
    title: "The Dare",
    description: "Your friends dare you to slip a candy bar into your pocket. It's small. Nobody's looking.",
    category: "crime",
    emoji: "🍫",
    weight: 12,
    requires: { minAge: 16, maxAge: 17 },
    choices: [
      {
        id: "steal",
        label: "Do it",
        effects: {
          stats: { happiness: 2, reputation: 1, stress: 4 },
          traits: { honesty: -6, risk: 5 },
          flags: ["shoplifted"],
          queueEvents: [{ eventId: "store_owner_remembers", inTurns: 20 }],
        },
      },
      {
        id: "refuse",
        label: "Refuse the dare",
        effects: {
          stats: { relationships: -2, reputation: -1 },
          traits: { honesty: 4, confidence: 3 },
        },
      },
      {
        id: "pay_for_it",
        label: "Buy candy for everyone",
        requires: { minStats: { money: 10 } },
        effects: {
          stats: { money: -10, relationships: 5, happiness: 3 },
          traits: { empathy: 3, honesty: 2 },
        },
      },
    ],
  },
  {
    id: "elderly_neighbor",
    title: "Mrs. Halloran's Groceries",
    description: "Your elderly neighbor is struggling with grocery bags in the rain.",
    category: "life",
    emoji: "🛒",
    weight: 14,
    requires: { minAge: 16, maxAge: 20 },
    choices: [
      {
        id: "help",
        label: "Help her home",
        effects: {
          stats: { happiness: 3, reputation: 3 },
          traits: { empathy: 5, responsibility: 3 },
          flags: ["helped_neighbor"],
          queueEvents: [{ eventId: "neighbor_gift", inTurns: 30 }],
          memory: { title: "Helped Mrs. Halloran", description: "She thanked you three times.", tone: "positive", icon: "🌧️" },
        },
      },
      {
        id: "walk_by",
        label: "Pretend not to see",
        effects: { traits: { empathy: -3 } },
      },
    ],
  },
  {
    id: "sports_tryouts",
    title: "Tryouts",
    description: "The soccer team is holding tryouts. You've never played competitively.",
    category: "school",
    emoji: "⚽",
    weight: 18,
    requires: { minAge: 16, maxAge: 17 },
    choices: [
      {
        id: "try_out",
        label: "Try out anyway",
        effects: {
          stats: { health: 6, happiness: 4, stress: 3, relationships: 4 },
          traits: { confidence: 4, discipline: 4, ambition: 3 },
          flags: ["athletic"],
          queueEvents: [{ eventId: "sports_offer", inTurns: 8 }],
        },
      },
      {
        id: "skip_tryouts",
        label: "Skip it",
        effects: { stats: { happiness: -1 } },
      },
    ],
  },

  // ---------------- AGE 17 ----------------
  {
    id: "first_job_offer",
    title: "The Coffee Shop is Hiring",
    description: "A café near your house has a 'Help Wanted' sign in the window.",
    category: "career",
    emoji: "☕",
    weight: 22,
    requires: { minAge: 16, maxAge: 18 },
    choices: [
      {
        id: "apply",
        label: "Apply",
        effects: {
          stats: { money: 15, stress: 5, skill: 4, relationships: 2 },
          traits: { responsibility: 5, discipline: 3 },
          flags: ["worked_service"],
          memory: { title: "First paycheck", description: "Fifty-two dollars. It felt like a fortune.", tone: "positive", icon: "☕" },
        },
      },
      {
        id: "focus_school",
        label: "Focus on school instead",
        effects: {
          stats: { education: 5 },
          traits: { discipline: 2, ambition: 1 },
        },
      },
    ],
  },
  {
    id: "driving_test",
    title: "Driver's Test",
    description: "The road test is today. You almost hit a cone during practice.",
    category: "life",
    emoji: "🚗",
    weight: 20,
    requires: { minAge: 17, maxAge: 18, notFlags: ["has_license"] },
    choices: [
      {
        id: "take_test",
        label: "Take the test",
        effects: {
          stats: { happiness: 6, stress: -3, reputation: 2 },
          traits: { confidence: 4 },
          flags: ["has_license"],
        },
      },
      {
        id: "reschedule",
        label: "Reschedule",
        effects: { stats: { stress: 4 }, traits: { confidence: -2, discipline: -1 } },
      },
    ],
  },
  {
    id: "first_crush",
    title: "That Look Across the Room",
    description: "Someone in your class keeps catching your eye. You've never spoken.",
    category: "romance",
    emoji: "💘",
    weight: 20,
    requires: { minAge: 16, maxAge: 18, notFlags: ["has_partner"] },
    choices: [
      {
        id: "ask_out",
        label: "Ask them out",
        effects: {
          stats: { happiness: 6, relationships: 4, stress: 3 },
          traits: { confidence: 5, risk: 3 },
          flags: ["has_partner", "first_relationship"],
          queueEvents: [{ eventId: "first_breakup", inTurns: 10 }],
          memory: { title: "First date", description: "You laughed until your face hurt.", tone: "positive", icon: "💘" },
        },
      },
      {
        id: "write_note",
        label: "Slip them a handwritten note",
        effects: {
          stats: { happiness: 4, relationships: 2 },
          traits: { creativity: 4, confidence: 2 },
        },
      },
      {
        id: "do_nothing",
        label: "Say nothing. Ever.",
        effects: {
          stats: { happiness: -3 },
          traits: { confidence: -3 },
        },
      },
    ],
  },
  {
    id: "cheating_caught_up",
    title: "The Investigation",
    description: "The school opened an academic dishonesty case. Your name came up.",
    category: "school",
    emoji: "⚖️",
    weight: 100, // queued
    requires: { flags: ["has_cheated"] },
    choices: [
      {
        id: "confess",
        label: "Confess everything",
        effects: {
          stats: { reputation: -6, stress: -4, education: -4 },
          traits: { honesty: 8, responsibility: 5 },
          removeFlags: ["has_cheated"],
          memory: { title: "Confessed to cheating", description: "It was the hardest sentence you ever spoke.", tone: "neutral", icon: "⚖️" },
        },
      },
      {
        id: "deny",
        label: "Deny it",
        effects: {
          stats: { stress: 8, reputation: -2 },
          traits: { honesty: -5 },
          flags: ["habitual_liar"],
        },
      },
    ],
  },
  {
    id: "party_photo_leaks",
    title: "That Photo Surfaces",
    description: "A photo from the party is circulating. It's not flattering.",
    category: "friends",
    emoji: "📸",
    weight: 100,
    requires: { flags: ["party_kid"] },
    choices: [
      {
        id: "own_it",
        label: "Own it publicly",
        effects: {
          stats: { reputation: -2, happiness: 3 },
          traits: { confidence: 4, honesty: 2 },
        },
      },
      {
        id: "delete_beg",
        label: "Beg everyone to delete it",
        effects: {
          stats: { stress: 6, reputation: -4 },
          traits: { confidence: -3 },
        },
      },
    ],
  },
  {
    id: "newcomer_returns",
    title: "A Familiar Face",
    description:
      "The student you sat with in the cafeteria years ago finds you. They've never forgotten.",
    category: "friends",
    emoji: "🤝",
    weight: 100,
    requires: { flags: ["met_newcomer"] },
    choices: [
      {
        id: "reconnect",
        label: "Reconnect properly",
        effects: {
          stats: { relationships: 8, happiness: 5, reputation: 3 },
          traits: { empathy: 3 },
          memory: { title: "The ripple came back", description: "One kindness circled home.", tone: "positive", icon: "💫" },
        },
      },
      {
        id: "brush_off",
        label: "Politely brush them off",
        effects: {
          stats: { relationships: -3 },
          traits: { empathy: -2 },
        },
      },
    ],
  },
  {
    id: "band_forms",
    title: "Start a Band?",
    description: "Some kids from class heard you play guitar. They want to jam.",
    category: "friends",
    emoji: "🎶",
    weight: 22,
    requires: { minAge: 16, maxAge: 19, flags: ["plays_music"] },
    choices: [
      {
        id: "form_band",
        label: "Form the band",
        effects: {
          stats: { happiness: 8, relationships: 6, skill: 5, stress: 2 },
          traits: { creativity: 6, confidence: 3 },
          flags: ["in_a_band"],
          queueEvents: [{ eventId: "first_gig", inTurns: 6 }],
        },
      },
      {
        id: "solo",
        label: "Prefer to play solo",
        effects: {
          stats: { skill: 3, happiness: 2 },
          traits: { creativity: 3 },
        },
      },
    ],
  },
  {
    id: "first_gig",
    title: "The First Gig",
    description: "Someone booked your band at a coffee shop open mic. Twelve people in the audience.",
    category: "life",
    emoji: "🎤",
    weight: 100,
    requires: { flags: ["in_a_band"] },
    choices: [
      {
        id: "play_heart_out",
        label: "Play your heart out",
        effects: {
          stats: { happiness: 10, reputation: 5, skill: 4, stress: -3 },
          traits: { confidence: 6, creativity: 4 },
          memory: { title: "First gig", description: "The applause was small. It sounded like an ocean.", tone: "positive", icon: "🎤" },
        },
      },
      {
        id: "chicken_out",
        label: "Freeze up",
        effects: {
          stats: { happiness: -6, reputation: -3, stress: 5 },
          traits: { confidence: -5 },
        },
      },
    ],
  },
  {
    id: "sibling_secret",
    title: "Kai's Secret",
    description: "Your sibling admits they're failing a class and asks you not to tell your parents.",
    category: "family",
    emoji: "🤫",
    weight: 15,
    requires: { minAge: 16, maxAge: 19 },
    choices: [
      {
        id: "keep_secret_help",
        label: "Keep the secret and tutor them",
        effects: {
          stats: { skill: 2, stress: 3, education: 2 },
          traits: { empathy: 5, responsibility: 4 },
          relationships: [{ id: "sibling", trust: 12, love: 8, closeness: 8 }],
        },
      },
      {
        id: "tell_parents",
        label: "Tell your parents anyway",
        effects: {
          traits: { honesty: 4, empathy: -3 },
          relationships: [{ id: "sibling", trust: -18, love: -8 }, { id: "mother", trust: 3 }],
        },
      },
    ],
  },
  {
    id: "test_cheating_offer",
    title: "The Study Guide",
    description: "A classmate offers you next week's test answers for $30.",
    category: "school",
    emoji: "📄",
    weight: 15,
    requires: { minAge: 16, maxAge: 18, minStats: { money: 30 } },
    choices: [
      {
        id: "buy_answers",
        label: "Buy them",
        effects: {
          stats: { money: -30, education: 4, stress: 5 },
          traits: { honesty: -5, risk: 3 },
          flags: ["has_cheated"],
        },
      },
      {
        id: "refuse_offer",
        label: "Refuse",
        effects: { traits: { honesty: 4, discipline: 2 } },
      },
    ],
  },

  // ---------------- AGE 18 ----------------
  {
    id: "college_decision",
    title: "The College Envelope",
    description: "A thick envelope arrives. You've been accepted — but it's expensive.",
    category: "education",
    emoji: "🎓",
    weight: 30,
    requires: { minAge: 17, maxAge: 19, minStats: { education: 55 }, notFlags: ["in_college", "skipped_college"] },
    choices: [
      {
        id: "go_college",
        label: "Enroll and take loans",
        effects: {
          stats: { education: 15, money: -40, stress: 6, happiness: 4 },
          traits: { ambition: 5, discipline: 3 },
          flags: ["in_college", "has_loans"],
          memory: { title: "Enrolled in college", description: "The debt was terrifying. So was the excitement.", tone: "positive", icon: "🎓" },
        },
      },
      {
        id: "gap_year",
        label: "Take a gap year to work",
        effects: {
          stats: { money: 20, skill: 5, stress: 2 },
          traits: { responsibility: 4, ambition: 2 },
          flags: ["gap_year"],
        },
      },
      {
        id: "skip_college",
        label: "Skip college. Build something.",
        effects: {
          stats: { stress: 4, skill: 3 },
          traits: { risk: 6, ambition: 4, discipline: -1 },
          flags: ["skipped_college"],
        },
      },
    ],
  },
  {
    id: "startup_idea",
    title: "The Idea That Won't Leave You Alone",
    description: "A product idea has been rattling around your head for weeks. You could actually build it.",
    category: "career",
    emoji: "💡",
    weight: 20,
    requires: { minAge: 17, maxAge: 22, flags: ["learned_to_code"] },
    choices: [
      {
        id: "build_it",
        label: "Build a prototype",
        effects: {
          stats: { skill: 10, stress: 6, happiness: 4, money: -10 },
          traits: { ambition: 6, creativity: 5, discipline: 4 },
          flags: ["building_startup"],
          queueEvents: [{ eventId: "startup_launch", inTurns: 8 }],
        },
      },
      {
        id: "write_it_down",
        label: "Write it down and move on",
        effects: {
          stats: { happiness: -1 },
          traits: { ambition: -2, curiosity: 1 },
        },
      },
    ],
  },
  {
    id: "startup_launch",
    title: "Launch Day",
    description: "Your prototype is ready. Do you launch it publicly?",
    category: "business",
    emoji: "🚀",
    weight: 100,
    requires: { flags: ["building_startup"] },
    choices: [
      {
        id: "launch_public",
        label: "Launch it publicly",
        effects: {
          stats: { reputation: 8, money: 20, stress: 8, happiness: 8 },
          traits: { confidence: 6, risk: 4 },
          flags: ["founder"],
          removeFlags: ["building_startup"],
          memory: { title: "Shipped v1", description: "The first sign-up email made you cry.", tone: "positive", icon: "🚀" },
        },
      },
      {
        id: "shelve_it",
        label: "Shelve it. Not ready.",
        effects: {
          stats: { happiness: -5, stress: -3 },
          traits: { confidence: -3, risk: -2 },
          removeFlags: ["building_startup"],
        },
      },
    ],
  },
  {
    id: "roommate_offer",
    title: "The Roommate Ask",
    description: "A friend from class needs a roommate. Rent would be steep but the apartment is beautiful.",
    category: "housing",
    emoji: "🏙️",
    weight: 18,
    requires: { minAge: 18, maxAge: 25, notFlags: ["moved_out"] },
    choices: [
      {
        id: "move_in",
        label: "Move in together",
        requires: { minStats: { money: 30 } },
        effects: {
          stats: { money: -30, happiness: 5, relationships: 5, stress: 3 },
          traits: { responsibility: 5, risk: 2 },
          flags: ["moved_out"],
        },
      },
      {
        id: "stay_home",
        label: "Stay with your parents",
        effects: {
          stats: { money: 5, happiness: -2, stress: 2 },
          relationships: [{ id: "mother", closeness: 3 }],
        },
      },
    ],
  },
  {
    id: "first_breakup",
    title: "The Slow Fade",
    description: "Your first relationship has been strained for months. Tonight they want to talk.",
    category: "romance",
    emoji: "💔",
    weight: 100,
    requires: { flags: ["has_partner"] },
    choices: [
      {
        id: "break_up",
        label: "End it kindly",
        effects: {
          stats: { happiness: -8, stress: 6 },
          traits: { honesty: 4, empathy: 3, confidence: 2 },
          removeFlags: ["has_partner"],
          flags: ["first_heartbreak"],
          memory: { title: "First heartbreak", description: "You cried in the shower so no one would hear.", tone: "negative", icon: "💔" },
        },
      },
      {
        id: "work_on_it",
        label: "Fight for it",
        effects: {
          stats: { happiness: -2, stress: 5, relationships: 3 },
          traits: { responsibility: 3, empathy: 3 },
        },
      },
    ],
  },
  {
    id: "burnout_warning",
    title: "The Quiet Warning",
    description: "You've been running on four hours of sleep for weeks. Your hands shake when you hold coffee.",
    category: "health",
    emoji: "⚠️",
    weight: 20,
    requires: { minAge: 17, maxAge: 30, minStats: { stress: 65 } },
    choices: [
      {
        id: "rest",
        label: "Take a real weekend off",
        effects: {
          stats: { stress: -20, health: 8, happiness: 6 },
          traits: { responsibility: 3 },
        },
      },
      {
        id: "push_through",
        label: "Push through",
        effects: {
          stats: { stress: 10, health: -10, skill: 3, money: 5 },
          traits: { discipline: 3, responsibility: -2 },
          queueEvents: [{ eventId: "burnout_crash", inTurns: 4 }],
        },
      },
    ],
  },
  {
    id: "burnout_crash",
    title: "The Crash",
    description: "Your body finally quits. You wake up in the ER.",
    category: "health",
    emoji: "🏥",
    weight: 100,
    choices: [
      {
        id: "reset",
        label: "Actually change your habits",
        effects: {
          stats: { health: 10, stress: -30, money: -20, happiness: 4 },
          traits: { responsibility: 6 },
          memory: { title: "Hospitalized from burnout", description: "The doctor made you promise.", tone: "negative", icon: "🏥" },
        },
      },
      {
        id: "denial",
        label: "Discharge yourself and get back to work",
        effects: {
          stats: { health: -5, stress: 10, money: -10 },
          traits: { discipline: -3, responsibility: -4 },
        },
      },
    ],
  },
  {
    id: "sports_offer",
    title: "A Scout in the Bleachers",
    description: "Someone in a windbreaker asks about your plans after graduation.",
    category: "career",
    emoji: "🏆",
    weight: 100,
    requires: { flags: ["athletic"] },
    choices: [
      {
        id: "commit_sports",
        label: "Commit to a training program",
        effects: {
          stats: { health: 10, happiness: 6, reputation: 8, education: -3 },
          traits: { ambition: 5, discipline: 6 },
          flags: ["semi_pro_athlete"],
        },
      },
      {
        id: "keep_it_hobby",
        label: "Keep it a hobby",
        effects: {
          stats: { happiness: 2, health: 3 },
        },
      },
    ],
  },
  {
    id: "family_business_ask",
    title: "Dad's Business",
    description: "Your dad hints he'd love for you to help run the family shop.",
    category: "family",
    emoji: "🏪",
    weight: 15,
    requires: { minAge: 17, maxAge: 22 },
    choices: [
      {
        id: "join_family",
        label: "Join him",
        effects: {
          stats: { money: 20, relationships: 4, skill: 4, stress: 4 },
          traits: { responsibility: 5, ambition: 2 },
          relationships: [{ id: "father", love: 10, respect: 8 }],
          flags: ["family_business"],
        },
      },
      {
        id: "polite_no",
        label: "Politely decline",
        effects: {
          relationships: [{ id: "father", love: -3, closeness: -2 }],
          traits: { confidence: 3, ambition: 3 },
        },
      },
    ],
  },
  {
    id: "internet_stranger",
    title: "A Stranger Online",
    description: "Someone online offers to buy your art / music / code for $500. They want to meet.",
    category: "opportunities",
    emoji: "💬",
    weight: 15,
    requires: { minAge: 16, maxAge: 20 },
    choices: [
      {
        id: "meet_safe",
        label: "Meet in a public place with a friend",
        effects: {
          stats: { money: 25, skill: 3, happiness: 4 },
          traits: { risk: 2, ambition: 3, confidence: 3 },
        },
      },
      {
        id: "meet_alone",
        label: "Meet them alone",
        effects: {
          stats: { money: 25, stress: 6, health: -3 },
          traits: { risk: 8, responsibility: -4 },
          queueEvents: [{ eventId: "sketchy_deal", inTurns: 6 }],
        },
      },
      {
        id: "ignore_stranger",
        label: "Don't respond",
        effects: { traits: { risk: -3 } },
      },
    ],
  },
  {
    id: "sketchy_deal",
    title: "The Message Comes Back",
    description: "The stranger you met wants another deal — and this one crosses a line.",
    category: "crime",
    emoji: "🚨",
    weight: 100,
    choices: [
      {
        id: "refuse_bad",
        label: "Refuse and cut contact",
        effects: {
          stats: { stress: 5, reputation: 2 },
          traits: { honesty: 4, confidence: 3 },
        },
      },
      {
        id: "go_along",
        label: "Take the money",
        effects: {
          stats: { money: 60, stress: 12, reputation: -6 },
          traits: { honesty: -8, risk: 6 },
          flags: ["criminal_record_risk"],
          queueEvents: [{ eventId: "arrest_knock", inTurns: 10 }],
        },
      },
    ],
  },
  {
    id: "arrest_knock",
    title: "A Knock at the Door",
    description: "Two officers are on your porch. They know your name.",
    category: "crime",
    emoji: "👮",
    weight: 100,
    requires: { flags: ["criminal_record_risk"] },
    choices: [
      {
        id: "cooperate",
        label: "Cooperate fully",
        effects: {
          stats: { reputation: -12, money: -30, stress: 15 },
          traits: { honesty: 5 },
          flags: ["arrested"],
          removeFlags: ["criminal_record_risk"],
          memory: { title: "Arrested", description: "Your mother's face when they read your rights.", tone: "negative", icon: "👮" },
        },
      },
      {
        id: "lawyer_up",
        label: "Say nothing. Get a lawyer.",
        requires: { minStats: { money: 50 } },
        effects: {
          stats: { money: -50, reputation: -4, stress: 10 },
          traits: { responsibility: 3, risk: 2 },
          flags: ["fought_charges"],
        },
      },
    ],
  },

  // ---------------- AGE 19–20 ----------------
  {
    id: "college_slump",
    title: "The Slump",
    description: "Halfway through the semester, you can barely open a textbook.",
    category: "education",
    emoji: "📚",
    weight: 20,
    requires: { minAge: 18, maxAge: 22, flags: ["in_college"] },
    choices: [
      {
        id: "study_group",
        label: "Join a study group",
        effects: {
          stats: { education: 8, relationships: 5, stress: -3, happiness: 3 },
          traits: { discipline: 4, empathy: 2 },
        },
      },
      {
        id: "drop_a_class",
        label: "Drop a class",
        effects: {
          stats: { stress: -6, education: -4, happiness: 2 },
          traits: { responsibility: 2 },
        },
      },
      {
        id: "drop_out",
        label: "Drop out entirely",
        effects: {
          stats: { stress: -12, education: -20, money: 10 },
          traits: { risk: 5, discipline: -4 },
          removeFlags: ["in_college"],
          flags: ["dropped_out"],
          memory: { title: "Dropped out of college", description: "The relief scared you.", tone: "neutral", icon: "🎓" },
        },
      },
    ],
  },
  {
    id: "backpacking_trip",
    title: "A Cheap Flight",
    description: "A ridiculously cheap flight to somewhere far shows up. You'd have to leave in two weeks.",
    category: "travel",
    emoji: "✈️",
    weight: 18,
    requires: { minAge: 18, maxAge: 30, minStats: { money: 40 } },
    choices: [
      {
        id: "go_travel",
        label: "Book it",
        effects: {
          stats: { money: -40, happiness: 15, stress: -8, skill: 3, reputation: 2 },
          traits: { curiosity: 6, confidence: 4, risk: 3 },
          flags: ["traveled_abroad"],
          memory: { title: "First trip abroad", description: "You slept on a train and felt free.", tone: "positive", icon: "✈️" },
        },
      },
      {
        id: "responsible",
        label: "Save the money",
        effects: {
          stats: { money: 5, happiness: -3 },
          traits: { discipline: 3, responsibility: 2 },
        },
      },
    ],
  },
  {
    id: "volunteer_shelter",
    title: "The Shelter Needs Hands",
    description: "A local shelter is desperate for weekend volunteers.",
    category: "life",
    emoji: "🤲",
    weight: 14,
    requires: { minAge: 16, maxAge: 25 },
    choices: [
      {
        id: "volunteer",
        label: "Show up every weekend",
        effects: {
          stats: { happiness: 6, reputation: 5, relationships: 4 },
          traits: { empathy: 8, responsibility: 5 },
          flags: ["volunteered"],
          queueEvents: [{ eventId: "shelter_reference", inTurns: 12 }],
        },
      },
      {
        id: "one_time",
        label: "Go once",
        effects: {
          stats: { happiness: 2 },
          traits: { empathy: 2 },
        },
      },
      {
        id: "skip_vol",
        label: "Not this time",
        effects: {},
      },
    ],
  },
  {
    id: "shelter_reference",
    title: "A Letter of Reference",
    description: "The shelter director writes you a stunning reference letter.",
    category: "opportunities",
    emoji: "✉️",
    weight: 100,
    requires: { flags: ["volunteered"] },
    choices: [
      {
        id: "use_it",
        label: "Use it for opportunities",
        effects: {
          stats: { reputation: 8, happiness: 3 },
          traits: { confidence: 3 },
          flags: ["strong_reference"],
        },
      },
      {
        id: "frame_it",
        label: "Just frame it and smile",
        effects: {
          stats: { happiness: 5 },
        },
      },
    ],
  },
  {
    id: "store_owner_remembers",
    title: "A Face You Recognize",
    description:
      "You walk into a small business and the owner narrows their eyes. It's the shop you stole from years ago.",
    category: "crime",
    emoji: "👁️",
    weight: 100,
    requires: { flags: ["shoplifted"] },
    choices: [
      {
        id: "apologize_pay",
        label: "Apologize and offer to pay",
        requires: { minStats: { money: 15 } },
        effects: {
          stats: { money: -15, reputation: 4, happiness: 4, stress: -3 },
          traits: { honesty: 6, responsibility: 5 },
          removeFlags: ["shoplifted"],
          memory: { title: "Made it right", description: "Ten years late. Still counted.", tone: "positive", icon: "🙏" },
        },
      },
      {
        id: "walk_out_scared",
        label: "Leave the store fast",
        effects: {
          stats: { stress: 8 },
          traits: { confidence: -3 },
        },
      },
    ],
  },
  {
    id: "neighbor_gift",
    title: "An Envelope in the Mail",
    description:
      "Mrs. Halloran passed away. Her family sends you an envelope. Inside: a note thanking you, and a check.",
    category: "life",
    emoji: "💌",
    weight: 100,
    requires: { flags: ["helped_neighbor"] },
    choices: [
      {
        id: "accept_gift",
        label: "Accept it. Feel it.",
        effects: {
          stats: { money: 40, happiness: 8, stress: -4 },
          traits: { empathy: 4, optimism: 4 },
          memory: { title: "Mrs. Halloran remembered", description: "Small kindness. Long, long echo.", tone: "positive", icon: "💌" },
        },
      },
    ],
  },
  {
    id: "second_chance_partner",
    title: "A New Someone",
    description: "You meet someone new. Different this time.",
    category: "romance",
    emoji: "💞",
    weight: 20,
    requires: { minAge: 18, maxAge: 30, notFlags: ["has_partner"] },
    choices: [
      {
        id: "take_it_slow",
        label: "Take it slow",
        effects: {
          stats: { happiness: 6, relationships: 4, stress: -2 },
          traits: { responsibility: 3, empathy: 3, confidence: 2 },
          flags: ["has_partner", "healthy_relationship"],
        },
      },
      {
        id: "dive_in",
        label: "Dive in fast",
        effects: {
          stats: { happiness: 8, stress: 4 },
          traits: { risk: 4, confidence: 3 },
          flags: ["has_partner"],
        },
      },
      {
        id: "not_ready",
        label: "You're not ready yet",
        effects: { traits: { responsibility: 2, confidence: -1 } },
      },
    ],
  },
  {
    id: "found_wallet",
    title: "A Wallet on the Sidewalk",
    description: "You find a wallet. Fat with cash. No one saw.",
    category: "luck",
    emoji: "👛",
    weight: 15,
    requires: { minAge: 16, maxAge: 25 },
    choices: [
      {
        id: "return_wallet",
        label: "Return it with everything",
        effects: {
          stats: { happiness: 5, reputation: 4 },
          traits: { honesty: 7, empathy: 4 },
          queueEvents: [{ eventId: "wallet_reward", inTurns: 4 }],
        },
      },
      {
        id: "keep_wallet",
        label: "Keep the cash. Ditch the wallet.",
        effects: {
          stats: { money: 40, stress: 4 },
          traits: { honesty: -8 },
        },
      },
    ],
  },
  {
    id: "wallet_reward",
    title: "An Old-Fashioned Thank You",
    description: "The wallet's owner tracks you down with a warm handshake and an offer.",
    category: "opportunities",
    emoji: "🎁",
    weight: 100,
    choices: [
      {
        id: "accept_thanks",
        label: "Accept the thanks and their business card",
        effects: {
          stats: { reputation: 6, money: 15, happiness: 4 },
          traits: { optimism: 4 },
          flags: ["mentor_connection"],
        },
      },
    ],
  },
  {
    id: "mentor_offer",
    title: "The Mentor Calls",
    description: "That contact from before calls with a real opportunity — a foot in the door.",
    category: "career",
    emoji: "📞",
    weight: 100,
    requires: { flags: ["mentor_connection"], minAge: 18 },
    choices: [
      {
        id: "accept_mentor",
        label: "Take the meeting",
        effects: {
          stats: { skill: 6, reputation: 6, money: 20, happiness: 5 },
          traits: { ambition: 5, confidence: 4 },
          flags: ["has_mentor"],
          memory: { title: "Found a mentor", description: "They said, 'I see something in you.'", tone: "positive", icon: "📞" },
        },
      },
      {
        id: "decline_mentor",
        label: "Politely decline",
        effects: { traits: { ambition: -3 } },
      },
    ],
  },
  {
    id: "quiet_sunday",
    title: "A Quiet Sunday",
    description: "Nothing is happening today. The house is still. What do you do?",
    category: "life",
    emoji: "🌤️",
    weight: 10,
    requires: { minAge: 16, maxAge: 80 },
    choices: [
      {
        id: "call_mom",
        label: "Call your mom",
        effects: {
          stats: { happiness: 4, stress: -3, relationships: 2 },
          relationships: [{ id: "mother", love: 4, closeness: 3 }],
        },
      },
      {
        id: "read",
        label: "Read a book",
        effects: {
          stats: { happiness: 3, skill: 2, stress: -4 },
          traits: { curiosity: 2, creativity: 1 },
        },
      },
      {
        id: "walk",
        label: "Take a long walk",
        effects: {
          stats: { health: 4, happiness: 3, stress: -6 },
          traits: { discipline: 1, optimism: 2 },
        },
      },
      {
        id: "scroll",
        label: "Scroll on your phone all day",
        effects: {
          stats: { happiness: -3, stress: 2, health: -1 },
          traits: { discipline: -2 },
        },
      },
    ],
  },
];

export const EVENTS_BY_ID: Record<string, GameEvent> = Object.fromEntries(
  EVENTS.map((e) => [e.id, e])
);
