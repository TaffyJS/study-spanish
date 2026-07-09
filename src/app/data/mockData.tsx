import {
  Home, BookOpen, Zap, Library, GraduationCap, Dumbbell, BarChart3, User,
  RotateCcw, Headphones, PenTool, Mic, MessageCircle, Clock, Shuffle,
  Coffee, Globe, Building2, ShoppingBag, Stethoscope, Briefcase, MapPin,
} from "lucide-react";
import { defaultAnimalAvatar } from "../avatars";
import type { Screen } from "../types";

export const nav = [
  { id: "home" as Screen, label: "Home", icon: Home },
  { id: "learn" as Screen, label: "Learn", icon: BookOpen },
  { id: "tests" as Screen, label: "Tests", icon: PenTool },
  { id: "challenges" as Screen, label: "Challenges", icon: Zap },
  { id: "vocabulary" as Screen, label: "Vocabulary", icon: Library },
  { id: "grammar" as Screen, label: "Grammar", icon: GraduationCap },
  { id: "practice" as Screen, label: "Practice", icon: Dumbbell },
  { id: "progress" as Screen, label: "Progress", icon: BarChart3 },
  { id: "profile" as Screen, label: "Profile", icon: User },
];

export const user = {
  name: "Sofia",
  username: "sofia_learns",
  avatar: defaultAnimalAvatar,
  level: "A1",
  levelLabel: "Beginner",
  streak: 0,
  xp: 0,
  nextLevelXp: 5000,
  wordsLearned: 0,
  totalWords: 3000,
  grammarTopics: 0,
  lessonsCompleted: 0,
  dailyGoal: 15,
  dailyDone: 0,
};

export type LearnerProfile = typeof user;

export type LearnerSettings = {
  dailyStudyGoal: number;
  dailyWordGoal: number;
  spanishRegion: "Latin American" | "Spain" | "Mixed";
  learningGoal: "General Fluency" | "Travel" | "Work" | "School" | "Conversation";
  audio: boolean;
  accessibility: "Standard" | "Large Text" | "High Contrast";
};

export const weekDays = ["M", "T", "W", "T", "F", "S", "S"];
export const weekActivity = [false, false, false, false, false, false, false];

export const weeklyData = [
  { day: "Mon", xp: 0 }, { day: "Tue", xp: 0 }, { day: "Wed", xp: 0 },
  { day: "Thu", xp: 0 }, { day: "Fri", xp: 0 }, { day: "Sat", xp: 0 }, { day: "Sun", xp: 0 },
];

export const monthlyData = [
  { week: "W1", xp: 0 }, { week: "W2", xp: 0 }, { week: "W3", xp: 0 },
  { week: "W4", xp: 0 }, { week: "W5", xp: 0 },
];

export const challenges = [
  { id: 1, icon: BookOpen, title: "Learn Today's Vocabulary", desc: "Study 10 new words", xp: 50, total: 10, done: 0, completed: false, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-950" },
  { id: 2, icon: GraduationCap, title: "Grammar Lesson", desc: "Complete one grammar topic", xp: 75, total: 1, done: 0, completed: false, color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-950" },
  { id: 3, icon: RotateCcw, title: "Review Questions", desc: "Answer 10 review questions", xp: 40, total: 10, done: 0, completed: false, color: "text-orange-600", bg: "bg-orange-50 dark:bg-orange-950" },
  { id: 4, icon: Headphones, title: "Listening Exercise", desc: "Finish one listening exercise", xp: 60, total: 1, done: 0, completed: false, color: "text-green-600", bg: "bg-green-50 dark:bg-green-950" },
  { id: 5, icon: PenTool, title: "Build Sentences", desc: "Construct 5 Spanish sentences", xp: 80, total: 5, done: 0, completed: false, color: "text-pink-600", bg: "bg-pink-50 dark:bg-pink-950" },
];

export const achievements = [
  { label: "First Lesson", icon: "🎉", earned: false },
  { label: "7-Day Streak", icon: "🔥", earned: false },
  { label: "100 Words", icon: "📚", earned: false },
  { label: "30-Day Streak", icon: "⚡", earned: false },
  { label: "Perfect Exam", icon: "💯", earned: false },
  { label: "500 Words", icon: "🏆", earned: false },
];

export const vocabWords = [
  { word: "hablar", translation: "to speak", pos: "verb", phonetic: "/a.ˈblaɾ/", sentence: "Me gusta hablar español.", sentenceTrans: "I like to speak Spanish.", saved: false, known: false, topic: "Common Verbs" },
  { word: "el desayuno", translation: "breakfast", pos: "noun (m)", phonetic: "/el de.sa.ˈʝu.no/", sentence: "El desayuno está listo.", sentenceTrans: "Breakfast is ready.", saved: false, known: false, topic: "Food & Drinks" },
  { word: "hermoso", translation: "beautiful", pos: "adjective", phonetic: "/eɾ.ˈmo.so/", sentence: "¡Qué hermoso día!", sentenceTrans: "What a beautiful day!", saved: false, known: false, topic: "Adjectives" },
  { word: "el trabajo", translation: "work / job", pos: "noun (m)", phonetic: "/el tɾa.ˈβa.xo/", sentence: "Voy al trabajo mañana.", sentenceTrans: "I'm going to work tomorrow.", saved: false, known: false, topic: "Work" },
  { word: "comer", translation: "to eat", pos: "verb", phonetic: "/ko.ˈmeɾ/", sentence: "¿Quieres comer conmigo?", sentenceTrans: "Do you want to eat with me?", saved: false, known: false, topic: "Common Verbs" },
  { word: "la ciudad", translation: "the city", pos: "noun (f)", phonetic: "/la θju.ˈðað/", sentence: "Vivo en una ciudad grande.", sentenceTrans: "I live in a big city.", saved: false, known: false, topic: "Travel" },
  { word: "rápido", translation: "fast / quick", pos: "adjective", phonetic: "/ˈra.pi.ðo/", sentence: "El tren es muy rápido.", sentenceTrans: "The train is very fast.", saved: false, known: false, topic: "Adjectives" },
  { word: "empezar", translation: "to start / begin", pos: "verb", phonetic: "/em.pe.ˈsaɾ/", sentence: "Vamos a empezar ahora.", sentenceTrans: "We are going to start now.", saved: false, known: false, topic: "Common Verbs" },
];

export const vocabTopics = ["All", "Common Verbs", "Food & Drinks", "Travel", "Adjectives", "Work", "Family", "Technology"];

export const grammarTopics = [
  { title: "Present Tense (-ar verbs)", level: "A1", done: false, lessons: 4, color: "bg-orange-500", current: true },
  { title: "Gender & Articles", level: "A1", done: false, lessons: 3, color: "bg-gray-300" },
  { title: "Subject Pronouns", level: "A1", done: false, lessons: 2, color: "bg-gray-300" },
  { title: "Present Tense (-er/-ir verbs)", level: "A1", done: false, lessons: 4, color: "bg-gray-300" },
  { title: "Negative Sentences", level: "A1", done: false, lessons: 3, color: "bg-gray-300" },
  { title: "Question Words", level: "A1", done: false, lessons: 3, color: "bg-gray-300" },
  { title: "Reflexive Verbs", level: "A2", done: false, lessons: 5, color: "bg-gray-300" },
  { title: "Preterite Tense", level: "A2", done: false, lessons: 6, color: "bg-gray-300" },
  { title: "Ser vs. Estar", level: "A2", done: false, lessons: 4, color: "bg-gray-300" },
  { title: "Comparisons", level: "A2", done: false, lessons: 3, color: "bg-gray-300" },
  { title: "Future Tense", level: "B1", done: false, lessons: 4, color: "bg-gray-300" },
  { title: "Subjunctive Basics", level: "B1", done: false, lessons: 5, color: "bg-gray-300" },
];

export const practiceTypes = [
  { icon: Library, label: "Vocabulary Review", desc: "Reinforce learned words", color: "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300" },
  { icon: GraduationCap, label: "Grammar Drill", desc: "Practice grammar rules", color: "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300" },
  { icon: Headphones, label: "Listening", desc: "Train your ear", color: "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300" },
  { icon: Mic, label: "Pronunciation", desc: "Perfect your accent", color: "bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300" },
  { icon: BookOpen, label: "Reading", desc: "Comprehension texts", color: "bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300" },
  { icon: PenTool, label: "Sentence Builder", desc: "Construct sentences", color: "bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300" },
  { icon: MessageCircle, label: "Conversation", desc: "Realistic dialogues", color: "bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300" },
  { icon: RotateCcw, label: "Mistake Review", desc: "Revisit errors", color: "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300" },
  { icon: Clock, label: "Timed Quiz", desc: "Speed challenge", color: "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300" },
  { icon: Shuffle, label: "Custom Session", desc: "Mix it up", color: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300" },
];

export const conversationScenarios = [
  { icon: Coffee, label: "At a Café", level: "A1" },
  { icon: Globe, label: "Asking Directions", level: "A2" },
  { icon: Building2, label: "Booking a Hotel", level: "A2" },
  { icon: ShoppingBag, label: "Shopping", level: "A2" },
  { icon: Stethoscope, label: "Visiting a Doctor", level: "B1" },
  { icon: Briefcase, label: "Job Interview", level: "B1" },
  { icon: MapPin, label: "Tourist Questions", level: "A1" },
];

export const learningRoadmap = {
  A1: {
    label: "Beginner A1", color: "from-green-500 to-emerald-600",
    lessons: [
      { id: 1, title: "Alphabet & Sounds", done: false, current: true },
      { id: 2, title: "Numbers & Formation", done: false },
      { id: 3, title: "Subject Pronouns", done: false },
      { id: 4, title: "Articles & Noun Gender", done: false },
      { id: 5, title: "Possessives: My, Your, His", done: false },
      { id: 6, title: "This, That & Possession", done: false },
      { id: 7, title: "Ser, Estar & Tener", done: false },
      { id: 8, title: "Greetings & Introductions", done: false },
      { id: 9, title: "Present Tense (-ar)", done: false },
      { id: 10, title: "Family, Colors & Description", done: false },
      { id: 31, title: "Everyday Questions", done: false },
      { id: 32, title: "A1 Milestone Test", done: false, isTest: true },
    ]
  },
  A2: {
    label: "Elementary A2", color: "from-blue-500 to-indigo-600",
    lessons: [
      { id: 11, title: "Past Expressions", done: false },
      { id: 12, title: "Reflexive Verbs", done: false },
      { id: 13, title: "Comparisons", done: false },
      { id: 14, title: "Directions & Travel", done: false },
      { id: 15, title: "Shopping", done: false },
      { id: 16, title: "Restaurants & Food", done: false },
      { id: 17, title: "Descriptions", done: false },
      { id: 18, title: "A2 Milestone Test", done: false, isTest: true },
    ]
  },
  B1: {
    label: "Intermediate B1", color: "from-purple-500 to-violet-600",
    lessons: [
      { id: 19, title: "Preterite Tense", done: false },
      { id: 20, title: "Imperfect Tense", done: false },
      { id: 21, title: "Future Tense", done: false },
      { id: 22, title: "Subjunctive Basics", done: false },
      { id: 23, title: "Opinions & Storytelling", done: false },
      { id: 24, title: "Idioms", done: false },
      { id: 25, title: "B1 Milestone Test", done: false, isTest: true },
    ]
  },
  C1: {
    label: "Advanced C1", color: "from-orange-500 to-red-600",
    lessons: [
      { id: 26, title: "Advanced Grammar", done: false },
      { id: 27, title: "Nuanced Vocabulary", done: false },
      { id: 28, title: "Professional Spanish", done: false },
      { id: 29, title: "Native Listening", done: false },
      { id: 30, title: "C1 Final Exam", done: false, isTest: true },
    ]
  },
};

export const skillData = [
  { skill: "Vocabulary", score: 0 },
  { skill: "Grammar", score: 0 },
  { skill: "Listening", score: 0 },
  { skill: "Speaking", score: 0 },
  { skill: "Reading", score: 0 },
  { skill: "Writing", score: 0 },
];

export const allAchievements = [
  { label: "First Lesson", icon: "🎉", desc: "Completed your first lesson", earned: false, xp: 50 },
  { label: "7-Day Streak", icon: "🔥", desc: "Studied 7 days in a row", earned: false, xp: 100 },
  { label: "100 Words", icon: "📚", desc: "Learned your first 100 words", earned: false, xp: 150 },
  { label: "Grammar Star", icon: "⭐", desc: "Completed a grammar level", earned: false, xp: 200 },
  { label: "30-Day Streak", icon: "⚡", desc: "Studied 30 days in a row", earned: false, xp: 500 },
  { label: "Perfect Exam", icon: "💯", desc: "Got 100% on a vocabulary exam", earned: false, xp: 300 },
  { label: "500 Words", icon: "🏆", desc: "Learned 500 words", earned: false, xp: 400 },
  { label: "All Challenges", icon: "🎯", desc: "Complete all 5 daily challenges", earned: false, xp: 200 },
  { label: "1000 Words", icon: "👑", desc: "Learned 1,000 words", earned: false, xp: 750 },
  { label: "365-Day Streak", icon: "🌟", desc: "One year of learning!", earned: false, xp: 2000 },
];

export type LessonQuestion = {
  type: "translate" | "choose" | "listen" | "build" | "match" | "pronounce" | "read";
  prompt: string;
  instruction?: string;
  audioText?: string;
  options: string[];
  correct: number;
  explanation: string;
};

export type LessonStudyItem = {
  label: string;
  spanish: string;
  english: string;
  note?: string;
  audioText?: string;
};

export type LessonStudySection = {
  title: string;
  explanation: string;
  items: LessonStudyItem[];
};

export type LessonContent = {
  id: number;
  title: string;
  level: string;
  duration: string;
  xp: number;
  words: string[];
  summary: string;
  studySections?: LessonStudySection[];
  questions: LessonQuestion[];
};

const fallbackLessonQuestions: LessonQuestion[] = [
  {
    type: "translate",
    prompt: "What does \"hola\" mean?",
    instruction: "Choose the best English translation.",
    options: ["Goodbye", "Hello", "Please", "Thanks"],
    correct: 1,
    explanation: "\"Hola\" is the everyday Spanish greeting for \"hello.\"",
  },
  {
    type: "choose",
    prompt: "Complete the phrase: Buenos ____.",
    instruction: "This greeting is used in the morning.",
    options: ["noches", "dias", "gracias", "favor"],
    correct: 1,
    explanation: "\"Buenos dias\" means \"good morning.\"",
  },
  {
    type: "build",
    prompt: "Pick the natural sentence for \"I am Ana.\"",
    options: ["Soy Ana.", "Es Ana.", "Ana soy.", "Estoy Ana."],
    correct: 0,
    explanation: "Use \"soy\" for names and identity: \"Soy Ana.\"",
  },
];

export const lessonCatalog: Record<number, LessonContent> = {
  1: {
    id: 1,
    title: "Alphabet & Sounds",
    level: "A1",
    duration: "18 min",
    xp: 80,
    words: ["abeja", "burro", "casa", "chocolate", "dado", "elefante", "flor", "gato", "hijo", "isla", "jamón", "kilo", "limón", "mano", "nube", "niño", "ojo", "perro", "queso", "ratón", "sol", "taza", "uva", "vaca", "wifi", "xilófono", "yogur", "zapato"],
    summary: "Study every Spanish letter with a real word, then practice the sounds that matter most: vowels, h, j, ll, n/ñ, r/rr, and z/c.",
    studySections: [
      {
        title: "The Spanish Alphabet With One Word Each",
        explanation: "Spanish has the same core letters as English plus ñ. The digraphs ch and ll are no longer separate alphabet letters, but learners still study their sounds.",
        items: [
          { label: "A", spanish: "abeja", english: "bee" }, { label: "B", spanish: "burro", english: "donkey" }, { label: "C", spanish: "casa", english: "house" }, { label: "CH", spanish: "chocolate", english: "chocolate" },
          { label: "D", spanish: "dado", english: "die / cube" }, { label: "E", spanish: "elefante", english: "elephant" }, { label: "F", spanish: "flor", english: "flower" }, { label: "G", spanish: "gato", english: "cat" },
          { label: "H", spanish: "hijo", english: "son", note: "h is silent" }, { label: "I", spanish: "isla", english: "island" }, { label: "J", spanish: "jamón", english: "ham", note: "j is a strong h sound" }, { label: "K", spanish: "kilo", english: "kilo" },
          { label: "L", spanish: "limón", english: "lemon" }, { label: "LL", spanish: "llave", english: "key", note: "often sounds like y" }, { label: "M", spanish: "mano", english: "hand" }, { label: "N", spanish: "nube", english: "cloud" },
          { label: "Ñ", spanish: "niño", english: "child", note: "ñ sounds like ny" }, { label: "O", spanish: "ojo", english: "eye" }, { label: "P", spanish: "perro", english: "dog", note: "rr is stronger than r" }, { label: "Q", spanish: "queso", english: "cheese" },
          { label: "R", spanish: "ratón", english: "mouse" }, { label: "S", spanish: "sol", english: "sun" }, { label: "T", spanish: "taza", english: "cup" }, { label: "U", spanish: "uva", english: "grape" },
          { label: "V", spanish: "vaca", english: "cow" }, { label: "W", spanish: "wifi", english: "wifi" }, { label: "X", spanish: "xilófono", english: "xylophone" }, { label: "Y", spanish: "yogur", english: "yogurt" }, { label: "Z", spanish: "zapato", english: "shoe" },
        ],
      },
      {
        title: "Sound Rules To Keep",
        explanation: "Spanish vowels stay short and steady. Most letters are pronounced every time, so reading aloud becomes predictable quickly.",
        items: [
          { label: "a e i o u", spanish: "casa, mesa, vino, solo, luna", english: "five steady vowels" },
          { label: "h", spanish: "hola", english: "hello", note: "silent h: say ola" },
          { label: "j", spanish: "jamón", english: "ham", note: "raspy h sound" },
          { label: "r / rr", spanish: "pero / perro", english: "but / dog", note: "single r is lighter; rr is stronger" },
        ],
      },
    ],
    questions: [
      { type: "listen", prompt: "Listen to \"casa\". Which vowel sounds like the a in father?", audioText: "casa", options: ["a", "e", "i", "u"], correct: 0, explanation: "Spanish a is open and steady, as in casa." },
      { type: "choose", prompt: "Which word shows the Spanish ñ sound?", options: ["nube", "niño", "gato", "queso"], correct: 1, explanation: "The word niño uses ñ, which sounds like ny." },
      { type: "pronounce", prompt: "Which pair contrasts single r and stronger rr?", audioText: "pero, perro", options: ["pero / perro", "mesa / mano", "gato / gota", "uva / una"], correct: 0, explanation: "Pero has a lighter r; perro has the stronger rr sound." },
      { type: "translate", prompt: "What does \"zapato\" mean?", options: ["shoe", "sun", "hand", "key"], correct: 0, explanation: "Zapato means shoe." },
    ],
  },
  2: {
    id: 2,
    title: "Numbers & Formation",
    level: "A1",
    duration: "16 min",
    xp: 75,
    words: ["uno", "dos", "diez", "quince", "veinte", "veintiuno", "treinta", "cien"],
    summary: "Learn numbers as a system, not a list: 0-20, the veinti- pattern, tens with y, and hundreds.",
    studySections: [
      {
        title: "Core Numbers",
        explanation: "Memorize 0-15 first, then the rest starts to form patterns.",
        items: [
          { label: "0", spanish: "cero", english: "zero" }, { label: "1", spanish: "uno", english: "one" }, { label: "2", spanish: "dos", english: "two" }, { label: "3", spanish: "tres", english: "three" },
          { label: "4", spanish: "cuatro", english: "four" }, { label: "5", spanish: "cinco", english: "five" }, { label: "6", spanish: "seis", english: "six" }, { label: "7", spanish: "siete", english: "seven" },
          { label: "8", spanish: "ocho", english: "eight" }, { label: "9", spanish: "nueve", english: "nine" }, { label: "10", spanish: "diez", english: "ten" }, { label: "11", spanish: "once", english: "eleven" },
          { label: "12", spanish: "doce", english: "twelve" }, { label: "13", spanish: "trece", english: "thirteen" }, { label: "14", spanish: "catorce", english: "fourteen" }, { label: "15", spanish: "quince", english: "fifteen" },
        ],
      },
      {
        title: "How Bigger Numbers Are Formed",
        explanation: "16-19 use dieci-. 21-29 use veinti-. From 31 onward, join tens and ones with y.",
        items: [
          { label: "16", spanish: "dieciséis", english: "ten-and-six" },
          { label: "21", spanish: "veintiuno", english: "twenty-one" },
          { label: "32", spanish: "treinta y dos", english: "thirty-two" },
          { label: "48", spanish: "cuarenta y ocho", english: "forty-eight" },
          { label: "100", spanish: "cien", english: "one hundred" },
        ],
      },
    ],
    questions: [
      { type: "translate", prompt: "What number is \"siete\"?", audioText: "siete", options: ["5", "6", "7", "10"], correct: 2, explanation: "Siete is 7." },
      { type: "choose", prompt: "How do you form 32?", options: ["treinta y dos", "veintidos", "tres y dos", "treinta dos"], correct: 0, explanation: "From 31 onward, use tens + y + ones: treinta y dos." },
      { type: "listen", prompt: "You hear: \"Tengo veintiuno años.\" What number did you hear?", audioText: "Tengo veintiuno años.", options: ["12", "15", "21", "30"], correct: 2, explanation: "Veintiuno means 21." },
      { type: "choose", prompt: "Which pattern is used for 21-29?", options: ["dieci-", "veinti-", "-mente", "muy"], correct: 1, explanation: "21-29 use veinti-: veintiuno, veintidos, veintitres." },
    ],
  },
  3: {
    id: 3,
    title: "Subject Pronouns",
    level: "A1",
    duration: "14 min",
    xp: 70,
    words: ["yo", "tu", "el", "ella", "usted", "nosotros", "ellos"],
    summary: "Study I, you, he, she, we, they, and formal you before building verb sentences.",
    studySections: [
      {
        title: "Who Is Doing The Action?",
        explanation: "Subject pronouns tell us who the sentence is about. Spanish often drops them when the verb ending makes the subject clear.",
        items: [
          { label: "I", spanish: "yo", english: "I" },
          { label: "you informal", spanish: "tu", english: "you" },
          { label: "he", spanish: "el", english: "he" },
          { label: "she", spanish: "ella", english: "she" },
          { label: "you formal", spanish: "usted", english: "you (formal)" },
          { label: "we", spanish: "nosotros / nosotras", english: "we" },
          { label: "they", spanish: "ellos / ellas", english: "they" },
          { label: "you plural", spanish: "ustedes", english: "you all" },
        ],
      },
      {
        title: "First Sentence Frames",
        explanation: "Use soy for identity, tengo for possession/age, and hablo for speaking.",
        items: [
          { label: "identity", spanish: "Yo soy Ana.", english: "I am Ana." },
          { label: "possession", spanish: "Ella tiene un libro.", english: "She has a book." },
          { label: "speaking", spanish: "Nosotros hablamos español.", english: "We speak Spanish." },
        ],
      },
    ],
    questions: [
      { type: "translate", prompt: "What does \"ella\" mean?", audioText: "ella", options: ["I", "you", "she", "they"], correct: 2, explanation: "Ella means she." },
      { type: "choose", prompt: "Which pronoun is formal \"you\"?", options: ["tu", "usted", "yo", "ellos"], correct: 1, explanation: "Usted is formal you. Tu is informal you." },
      { type: "build", prompt: "Choose the natural sentence for \"I am Ana.\"", options: ["Yo soy Ana.", "Ella soy Ana.", "Ana yo es.", "Usted somos Ana."], correct: 0, explanation: "Yo soy Ana is the natural sentence." },
      { type: "listen", prompt: "Listen to \"Nosotros hablamos español.\" Who is speaking?", audioText: "Nosotros hablamos español.", options: ["I", "we", "she", "you formal"], correct: 1, explanation: "Nosotros means we." },
    ],
  },
  4: {
    id: 4,
    title: "Articles & Noun Gender",
    level: "A1",
    duration: "15 min",
    xp: 75,
    words: ["el", "la", "los", "las", "un", "una", "libro", "mesa"],
    summary: "Learn how Spanish nouns pair with articles: el/la for the, un/una for a/an, and plural forms.",
    studySections: [
      {
        title: "Definite And Indefinite Articles",
        explanation: "Spanish nouns are masculine or feminine. The article changes with gender and number.",
        items: [
          { label: "the (m)", spanish: "el libro", english: "the book" },
          { label: "the (f)", spanish: "la casa", english: "the house" },
          { label: "a/an (m)", spanish: "un coche", english: "a car" },
          { label: "a/an (f)", spanish: "una mesa", english: "a table" },
          { label: "the plural (m)", spanish: "los libros", english: "the books" },
          { label: "the plural (f)", spanish: "las casas", english: "the houses" },
        ],
      },
      {
        title: "Useful Pattern",
        explanation: "Many nouns ending in -o are masculine and many ending in -a are feminine, but learn nouns with the article because exceptions exist.",
        items: [
          { label: "-o", spanish: "el zapato", english: "the shoe" },
          { label: "-a", spanish: "la taza", english: "the cup" },
          { label: "exception habit", spanish: "la mano", english: "the hand", note: "learn article + noun together" },
        ],
      },
    ],
    questions: [
      { type: "choose", prompt: "Choose the correct article: ____ casa.", options: ["el", "la", "los", "unos"], correct: 1, explanation: "Casa is feminine, so use la casa." },
      { type: "match", prompt: "Match \"el libro\".", audioText: "el libro", options: ["the book", "the table", "the city", "the family"], correct: 0, explanation: "Libro means book and uses masculine el." },
      { type: "translate", prompt: "What does \"una mesa\" mean?", audioText: "una mesa", options: ["a table", "the table", "some books", "a city"], correct: 0, explanation: "Una means a/an for feminine nouns." },
      { type: "choose", prompt: "Which phrase is plural feminine?", options: ["los libros", "las casas", "el coche", "una mesa"], correct: 1, explanation: "Las casas is plural feminine: the houses." },
    ],
  },
  5: {
    id: 5,
    title: "Possessives: My, Your, His",
    level: "A1",
    duration: "16 min",
    xp: 80,
    words: ["mi", "tu", "su", "nuestro", "mis", "tus", "sus"],
    summary: "Study possessive adjectives before nouns: my car, your house, his book, her book, their table.",
    studySections: [
      {
        title: "Possessive Adjectives Before Nouns",
        explanation: "Use these before the noun. They agree with the thing owned, not always with the owner.",
        items: [
          { label: "my", spanish: "mi coche / mis coches", english: "my car / my cars" },
          { label: "your informal", spanish: "tu casa / tus casas", english: "your house / your houses" },
          { label: "his/her/your formal", spanish: "su libro / sus libros", english: "his, her, your book / books" },
          { label: "our", spanish: "nuestro coche / nuestra casa", english: "our car / our house", note: "nuestro changes for gender and number" },
        ],
      },
      {
        title: "His Or Her? Context Decides",
        explanation: "Su can mean his, her, your formal, or their. Spanish often adds de el, de ella, or de ellos when the owner must be clear.",
        items: [
          { label: "his car", spanish: "su coche", english: "his/her car" },
          { label: "his car, clear", spanish: "el coche de el", english: "his car" },
          { label: "her car, clear", spanish: "el coche de ella", english: "her car" },
        ],
      },
    ],
    questions: [
      { type: "choose", prompt: "Which phrase means \"my car\"?", audioText: "mi coche", options: ["mi coche", "tu coche", "su coche", "mis coche"], correct: 0, explanation: "Mi coche means my car." },
      { type: "choose", prompt: "Choose the plural: \"my books\".", options: ["mi libros", "mis libros", "mi libro", "mios libros"], correct: 1, explanation: "Mi becomes mis before plural nouns: mis libros." },
      { type: "translate", prompt: "What can \"su casa\" mean?", options: ["his/her/your formal house", "my house only", "our houses", "a house"], correct: 0, explanation: "Su can mean his, her, your formal, or their depending on context." },
      { type: "listen", prompt: "Listen to \"nuestra casa\". What does it mean?", audioText: "nuestra casa", options: ["our house", "my house", "your house", "their house"], correct: 0, explanation: "Nuestra casa means our house." },
    ],
  },
  6: {
    id: 6,
    title: "This, That & Possession",
    level: "A1",
    duration: "17 min",
    xp: 85,
    words: ["este", "esta", "ese", "esa", "mio", "tuyo", "suyo"],
    summary: "Separate two ideas: \"his car\" uses su before the noun; \"this car is his\" uses suyo after ser.",
    studySections: [
      {
        title: "This And That",
        explanation: "Este/esta mean this. Ese/esa mean that. Match gender with the noun.",
        items: [
          { label: "this car", spanish: "este coche", english: "this car" },
          { label: "this house", spanish: "esta casa", english: "this house" },
          { label: "that book", spanish: "ese libro", english: "that book" },
          { label: "that table", spanish: "esa mesa", english: "that table" },
        ],
      },
      {
        title: "His Car vs This Car Is His",
        explanation: "Before a noun use mi/tu/su. After ser, use mine/yours/his forms: mio, tuyo, suyo. These also match the thing owned.",
        items: [
          { label: "my car", spanish: "mi coche", english: "my car" },
          { label: "this car is mine", spanish: "este coche es mio", english: "this car is mine" },
          { label: "his car", spanish: "su coche", english: "his car" },
          { label: "this car is his", spanish: "este coche es suyo", english: "this car is his" },
          { label: "her house", spanish: "su casa", english: "her house" },
          { label: "this house is hers", spanish: "esta casa es suya", english: "this house is hers" },
        ],
      },
    ],
    questions: [
      { type: "choose", prompt: "Which phrase means \"this car\"?", audioText: "este coche", options: ["este coche", "esta coche", "ese casa", "su coche"], correct: 0, explanation: "Coche is masculine, so use este coche." },
      { type: "build", prompt: "Choose: \"This car is his.\"", options: ["Este coche es suyo.", "Su coche es este.", "Este coche es su.", "Coche este suyo."], correct: 0, explanation: "Use suyo after es: Este coche es suyo." },
      { type: "choose", prompt: "Which phrase means \"his car\" before the noun?", options: ["su coche", "coche suyo", "este suyo", "el coche es"], correct: 0, explanation: "Use su before a noun: su coche." },
      { type: "listen", prompt: "Listen to \"Esta casa es mia.\" What does it mean?", audioText: "Esta casa es mia.", options: ["This house is mine.", "This car is mine.", "Her house is here.", "That house is yours."], correct: 0, explanation: "Mia agrees with casa: Esta casa es mia." },
    ],
  },
  7: {
    id: 7,
    title: "Ser, Estar & Tener",
    level: "A1",
    duration: "15 min",
    xp: 75,
    words: ["soy", "es", "estoy", "esta", "tengo", "tiene"],
    summary: "Use ser for identity, estar for location/state, and tener for having things or age.",
    studySections: [
      {
        title: "Three Essential Verbs",
        explanation: "These verbs carry a lot of beginner Spanish. Do not translate every English \"is\" the same way.",
        items: [
          { label: "identity", spanish: "Yo soy Ana.", english: "I am Ana." },
          { label: "description", spanish: "El coche es rojo.", english: "The car is red." },
          { label: "location", spanish: "El libro esta aqui.", english: "The book is here." },
          { label: "temporary state", spanish: "Estoy bien.", english: "I am well." },
          { label: "possession", spanish: "Tengo un libro.", english: "I have a book." },
          { label: "age", spanish: "Tengo veinte años.", english: "I am twenty years old." },
        ],
      },
    ],
    questions: [
      { type: "choose", prompt: "Choose the verb for identity: Yo ____ Ana.", options: ["soy", "estoy", "tengo", "esta"], correct: 0, explanation: "Use soy for identity and names." },
      { type: "translate", prompt: "What does \"Tengo un libro\" mean?", audioText: "Tengo un libro.", options: ["I have a book.", "I am a book.", "The book is here.", "I read a book."], correct: 0, explanation: "Tener means to have." },
      { type: "choose", prompt: "Choose the sentence for location.", options: ["El libro esta aqui.", "El libro es Ana.", "Yo tengo aqui.", "Este libro soy."], correct: 0, explanation: "Use estar for location: esta aqui." },
    ],
  },
  8: {
    id: 8,
    title: "Greetings & Introductions",
    level: "A1",
    duration: "12 min",
    xp: 60,
    words: ["hola", "adios", "gracias", "por favor", "me llamo"],
    summary: "Practice polite greetings and first mini-conversations.",
    studySections: [
      {
        title: "First Conversation",
        explanation: "These phrases let you open, close, and introduce yourself politely.",
        items: [
          { label: "hello", spanish: "hola", english: "hello" },
          { label: "good morning", spanish: "buenos dias", english: "good morning" },
          { label: "good afternoon", spanish: "buenas tardes", english: "good afternoon" },
          { label: "my name is", spanish: "me llamo Sofia", english: "my name is Sofia" },
          { label: "nice to meet you", spanish: "mucho gusto", english: "nice to meet you" },
          { label: "likewise", spanish: "igualmente", english: "likewise" },
        ],
      },
    ],
    questions: [
      { type: "translate", prompt: "How do you say \"thank you\"?", audioText: "gracias", options: ["Hola", "Gracias", "Perdon", "Adios"], correct: 1, explanation: "Gracias means thank you." },
      { type: "choose", prompt: "Choose the best response to \"Mucho gusto.\"", audioText: "Mucho gusto.", options: ["Igualmente.", "Manzana.", "Hasta ayer.", "Tengo dos."], correct: 0, explanation: "Igualmente means likewise and is a natural reply." },
      { type: "build", prompt: "Build: \"Good afternoon, my name is Sofia.\"", options: ["Buenas tardes, me llamo Sofia.", "Buenos dias, soy pan.", "Buenas noches, tengo Sofia.", "Hola tarde Sofia."], correct: 0, explanation: "Buenas tardes is good afternoon, and me llamo introduces your name." },
    ],
  },
  9: {
    id: 9,
    title: "Present Tense (-ar)",
    level: "A1",
    duration: "14 min",
    xp: 75,
    words: ["hablar", "trabajar", "caminar", "bailar"],
    summary: "Use regular -ar verb endings to make simple present-tense sentences.",
    studySections: [
      {
        title: "Regular -ar Endings",
        explanation: "Remove -ar and add the ending that matches the subject.",
        items: [
          { label: "yo", spanish: "yo hablo", english: "I speak" },
          { label: "tu", spanish: "tu hablas", english: "you speak" },
          { label: "el/ella/usted", spanish: "ella habla", english: "she speaks" },
          { label: "nosotros", spanish: "nosotros hablamos", english: "we speak" },
          { label: "ellos/ustedes", spanish: "ellos hablan", english: "they speak" },
        ],
      },
    ],
    questions: [
      { type: "translate", prompt: "How do you say \"I speak\" in Spanish?", audioText: "Yo hablo", options: ["Yo hablo", "Yo como", "Yo vivo", "Yo leo"], correct: 0, explanation: "For regular -ar verbs with yo, use -o: hablar -> hablo." },
      { type: "translate", prompt: "What does \"Ella trabaja\" mean?", audioText: "Ella trabaja.", options: ["She sleeps", "She works", "She eats", "She runs"], correct: 1, explanation: "Trabaja means works for el/ella/usted." },
      { type: "choose", prompt: "Choose the correct form: Nosotros _____ (hablar).", options: ["hablan", "hablo", "hablamos", "hablas"], correct: 2, explanation: "For nosotros, regular -ar verbs end in -amos." },
      { type: "choose", prompt: "Fill in: Tu _____ (caminar).", options: ["camina", "caminas", "caminamos", "caminan"], correct: 1, explanation: "For tu, regular -ar verbs end in -as." },
    ],
  },
  10: {
    id: 10,
    title: "Family, Colors & Description",
    level: "A1",
    duration: "13 min",
    xp: 70,
    words: ["madre", "padre", "hermano", "rojo", "azul", "grande", "pequeño"],
    summary: "Describe people and things with family words, colors, and simple adjectives that match the noun.",
    studySections: [
      {
        title: "Family Words",
        explanation: "Learn family nouns with their articles so gender becomes automatic.",
        items: [
          { label: "mother", spanish: "la madre", english: "the mother" },
          { label: "father", spanish: "el padre", english: "the father" },
          { label: "sister", spanish: "la hermana", english: "the sister" },
          { label: "brother", spanish: "el hermano", english: "the brother" },
        ],
      },
      {
        title: "Adjectives Usually Follow Nouns",
        explanation: "Colors and size words often come after the noun and agree in gender and number.",
        items: [
          { label: "red car", spanish: "el coche rojo", english: "the red car" },
          { label: "red house", spanish: "la casa roja", english: "the red house" },
          { label: "big table", spanish: "la mesa grande", english: "the big table" },
          { label: "small books", spanish: "los libros pequeños", english: "the small books" },
        ],
      },
    ],
    questions: [
      { type: "translate", prompt: "What does \"la madre\" mean?", audioText: "la madre", options: ["the mother", "the father", "the brother", "the book"], correct: 0, explanation: "La madre means the mother." },
      { type: "choose", prompt: "Choose the correct phrase for \"the red house\".", options: ["la casa roja", "el casa rojo", "la casa rojo", "casa la roja"], correct: 0, explanation: "Casa is feminine, so roja agrees with casa." },
      { type: "build", prompt: "Choose: \"My brother is tall.\"", options: ["Mi hermano es alto.", "Mi hermana es alto.", "Mi hermano esta alto.", "Hermano mi alto es."], correct: 0, explanation: "Mi hermano es alto describes identity/description." },
    ],
  },
  31: {
    id: 31,
    title: "Everyday Questions",
    level: "A1",
    duration: "13 min",
    xp: 70,
    words: ["que", "quien", "como", "donde", "cuando", "cuanto", "por que"],
    summary: "Build useful questions with what, who, how, where, when, how much, and why.",
    studySections: [
      {
        title: "Question Words",
        explanation: "Spanish question words carry written accents in full Spanish spelling: qué, quién, cómo, dónde, cuándo, cuánto, por qué.",
        items: [
          { label: "what", spanish: "¿Qué es?", english: "What is it?" },
          { label: "who", spanish: "¿Quién es?", english: "Who is it?" },
          { label: "how", spanish: "¿Cómo estás?", english: "How are you?" },
          { label: "where", spanish: "¿Dónde está?", english: "Where is it?" },
          { label: "when", spanish: "¿Cuándo empieza?", english: "When does it start?" },
          { label: "how much", spanish: "¿Cuánto cuesta?", english: "How much does it cost?" },
          { label: "why", spanish: "¿Por qué?", english: "Why?" },
        ],
      },
      {
        title: "Question Shape",
        explanation: "Spanish uses opening and closing question marks. Many yes/no questions keep normal word order and rely on intonation.",
        items: [
          { label: "yes/no", spanish: "¿Tienes un libro?", english: "Do you have a book?" },
          { label: "with question word", spanish: "¿Dónde está mi coche?", english: "Where is my car?" },
          { label: "name", spanish: "¿Cómo te llamas?", english: "What is your name?" },
        ],
      },
    ],
    questions: [
      { type: "choose", prompt: "Which question asks \"Where is my car?\"", options: ["¿Dónde está mi coche?", "¿Cuánto está mi coche?", "¿Quién es mi coche?", "¿Por qué mi coche?"], correct: 0, explanation: "Dónde asks where." },
      { type: "translate", prompt: "What does \"¿Cuánto cuesta?\" mean?", audioText: "¿Cuánto cuesta?", options: ["How much does it cost?", "Where is it?", "Who is it?", "When does it start?"], correct: 0, explanation: "Cuánto cuesta asks about price." },
      { type: "listen", prompt: "Listen to \"¿Cómo te llamas?\" What is being asked?", audioText: "¿Cómo te llamas?", options: ["What is your name?", "Where are you?", "How much is it?", "Who is she?"], correct: 0, explanation: "¿Cómo te llamas? asks for a name." },
    ],
  },
};

export type TestSession = {
  id: string;
  title: string;
  level: "A1" | "A2" | "B1";
  duration: string;
  xp: number;
  passingScore: number;
  summary: string;
  focus: string[];
  questions: LessonQuestion[];
};

export const testSessions: TestSession[] = [
  {
    id: "a1-milestone",
    title: "A1 Milestone Test",
    level: "A1",
    duration: "18 min",
    xp: 150,
    passingScore: 75,
    summary: "A longer checkpoint across pronunciation, greetings, numbers, articles, and simple present-tense sentences.",
    focus: ["Listening", "Vocabulary", "Grammar", "Reading"],
    questions: [
      { type: "listen", prompt: "You hear: \"Buenos dias, me llamo Ana.\" What did the speaker say?", options: ["Good morning, my name is Ana.", "Good night, Ana is here.", "Hello, I live with Ana.", "Good afternoon, I am going to Ana."], correct: 0, explanation: "\"Buenos dias\" is good morning, and \"me llamo\" introduces a name." },
      { type: "translate", prompt: "Choose the best translation of \"por favor\".", options: ["please", "thank you", "excuse me", "goodbye"], correct: 0, explanation: "\"Por favor\" means \"please.\"" },
      { type: "choose", prompt: "Complete the phrase: Muchas ____.", options: ["dias", "gracias", "noches", "gusto"], correct: 1, explanation: "\"Muchas gracias\" means \"thank you very much.\"" },
      { type: "translate", prompt: "What number is \"dieciseis\"?", options: ["6", "12", "16", "20"], correct: 2, explanation: "\"Dieciseis\" is 16." },
      { type: "choose", prompt: "Choose the correct article: ____ libro rojo.", options: ["la", "el", "una", "las"], correct: 1, explanation: "\"Libro\" is masculine, so it uses \"el.\"" },
      { type: "choose", prompt: "Choose the correct article: ____ ciudad grande.", options: ["el", "un", "la", "los"], correct: 2, explanation: "\"Ciudad\" is feminine, so it uses \"la.\"" },
      { type: "build", prompt: "Choose the natural sentence for \"I speak Spanish.\".", options: ["Yo hablo espanol.", "Yo habla espanol.", "Yo espanol hablo.", "Hablo yo el espanol."], correct: 0, explanation: "\"Yo\" uses the -o ending: hablo." },
      { type: "choose", prompt: "Complete: Nosotros ____ en una escuela.", options: ["trabajas", "trabaja", "trabajamos", "trabajan"], correct: 2, explanation: "\"Nosotros\" takes the -amos ending for regular -ar verbs." },
      { type: "read", prompt: "Read: \"Sofia tiene veinte anos y vive en una ciudad pequena.\" How old is Sofia?", options: ["12", "15", "20", "30"], correct: 2, explanation: "\"Veinte anos\" means twenty years old." },
      { type: "read", prompt: "Read: \"Carlos desayuna cafe y pan.\" What does Carlos have?", options: ["coffee and bread", "rice and water", "fish and coffee", "bread and tea"], correct: 0, explanation: "\"Cafe y pan\" means coffee and bread." },
      { type: "pronounce", prompt: "Which word has the stronger rr sound?", options: ["pero", "perro", "para", "mira"], correct: 1, explanation: "\"Perro\" uses the stronger rr sound." },
      { type: "build", prompt: "Choose the correct question: \"What is your name?\"", options: ["Como te llamas?", "Donde te llamas?", "Cuanto llamas?", "Te llamas que ciudad?"], correct: 0, explanation: "\"Como te llamas?\" asks for someone's name." },
    ],
  },
  {
    id: "a2-milestone",
    title: "A2 Milestone Test",
    level: "A2",
    duration: "22 min",
    xp: 190,
    passingScore: 78,
    summary: "A practical checkpoint for travel, restaurants, reflexive verbs, comparisons, and everyday past expressions.",
    focus: ["Travel", "Conversation", "Grammar", "Reading"],
    questions: [
      { type: "choose", prompt: "At a restaurant, choose the polite request.", options: ["Quisiera una mesa para dos.", "Soy una mesa para dos.", "Tengo la cuenta ayer.", "Mesa dos quisiera el."], correct: 0, explanation: "\"Quisiera\" is a polite way to say \"I would like.\"" },
      { type: "translate", prompt: "What does \"la cuenta\" mean in a restaurant?", options: ["the menu", "the bill", "the table", "the waiter"], correct: 1, explanation: "\"La cuenta\" is the bill or check." },
      { type: "choose", prompt: "Complete: Yo ____ levanto a las siete.", options: ["me", "te", "se", "nos"], correct: 0, explanation: "Reflexive verbs use \"me\" with \"yo.\"" },
      { type: "choose", prompt: "Complete: Ella ____ prepara para salir.", options: ["me", "te", "se", "nos"], correct: 2, explanation: "\"Ella\" uses the reflexive pronoun \"se.\"" },
      { type: "build", prompt: "Choose: \"The hotel is closer than the station.\".", options: ["El hotel esta mas cerca que la estacion.", "El hotel es cerca mas la estacion.", "La estacion esta que el hotel cerca.", "El hotel cerca menos estacion."], correct: 0, explanation: "\"Mas cerca que\" means \"closer than.\"" },
      { type: "listen", prompt: "You hear: \"Gire a la derecha.\" What should you do?", options: ["Turn right.", "Go straight.", "Turn left.", "Stop here."], correct: 0, explanation: "\"Derecha\" means right." },
      { type: "read", prompt: "Read: \"Ayer compre zapatos en el centro.\" What happened yesterday?", options: ["I bought shoes downtown.", "I cooked dinner at home.", "I asked for directions.", "I stayed at a hotel."], correct: 0, explanation: "\"Compre zapatos\" means \"I bought shoes.\"" },
      { type: "translate", prompt: "Choose the Spanish for \"I am looking for the pharmacy.\".", options: ["Busco la farmacia.", "Tengo la farmacia.", "Soy la farmacia.", "Pido farmacia ayer."], correct: 0, explanation: "\"Busco\" means \"I am looking for.\"" },
      { type: "choose", prompt: "Which reply fits \"Donde esta la estacion?\"", options: ["Esta cerca del parque.", "Cuesta veinte euros.", "Me llamo Lucia.", "Quiero cafe."], correct: 0, explanation: "The question asks where the station is." },
      { type: "build", prompt: "Choose the natural sentence: \"We went to the beach.\".", options: ["Fuimos a la playa.", "Vamos ayer a playa.", "Fui nosotros la playa.", "Somos a la playa."], correct: 0, explanation: "\"Fuimos\" is the preterite form for \"we went.\"" },
    ],
  },
  {
    id: "b1-milestone",
    title: "B1 Milestone Test",
    level: "B1",
    duration: "28 min",
    xp: 240,
    passingScore: 80,
    summary: "A deeper mixed test with narrative tenses, opinions, future plans, idioms, and short reading comprehension.",
    focus: ["Storytelling", "Tenses", "Opinions", "Comprehension"],
    questions: [
      { type: "choose", prompt: "Choose the preterite form: Ayer nosotros ____ una pelicula.", options: ["vemos", "vimos", "veiamos", "veremos"], correct: 1, explanation: "\"Vimos\" is the preterite for \"we saw.\"" },
      { type: "choose", prompt: "Choose the imperfect form: Cuando era nino, ____ al parque cada dia.", options: ["fui", "iba", "ire", "voy"], correct: 1, explanation: "Use the imperfect for repeated past habits: \"iba.\"" },
      { type: "build", prompt: "Choose: \"I think it is important to practice every day.\".", options: ["Creo que es importante practicar todos los dias.", "Creo es importante que practicar dia.", "Pienso practica todos importante.", "Es creo practicar importante cada."], correct: 0, explanation: "\"Creo que...\" introduces an opinion naturally." },
      { type: "choose", prompt: "Complete: Manana ____ con mi profesor.", options: ["hablare", "hable", "hablaba", "hablo ayer"], correct: 0, explanation: "\"Manana\" points to the future, so \"hablare\" fits." },
      { type: "translate", prompt: "What does \"tener ganas de\" mean?", options: ["to feel like doing something", "to be afraid of something", "to have to leave", "to know a place"], correct: 0, explanation: "\"Tener ganas de\" means to feel like or want to do something." },
      { type: "read", prompt: "Read: \"Aunque llovia, salimos temprano porque no queriamos perder el tren.\" Why did they leave early?", options: ["They did not want to miss the train.", "They wanted to buy umbrellas.", "The train was cancelled.", "It stopped raining."], correct: 0, explanation: "\"No queriamos perder el tren\" means they did not want to miss the train." },
      { type: "listen", prompt: "You hear: \"Si tengo tiempo, te llamare esta noche.\" What is the speaker saying?", options: ["If I have time, I will call you tonight.", "I called you last night.", "I never have time to call.", "Call me if you arrive."], correct: 0, explanation: "\"Te llamare\" means \"I will call you.\"" },
      { type: "choose", prompt: "Choose the best connector: Queria salir, ____ estaba muy cansado.", options: ["porque", "pero", "cuando", "desde"], correct: 1, explanation: "\"Pero\" shows contrast: wanted to go out, but was tired." },
      { type: "build", prompt: "Choose the natural sentence: \"She told me that she had a new job.\".", options: ["Me dijo que tenia un trabajo nuevo.", "Me dice ayer tener trabajo nuevo.", "Ella me decir que tuvo nuevo.", "Dijo me trabajo nuevo tener."], correct: 0, explanation: "\"Me dijo que tenia...\" is natural reported speech." },
      { type: "read", prompt: "Read: \"La conferencia fue util, pero el ponente hablo demasiado rapido.\" What was the problem?", options: ["The speaker talked too fast.", "The conference was useless.", "The room was too small.", "The speaker arrived late."], correct: 0, explanation: "\"Hablo demasiado rapido\" means spoke too fast." },
    ],
  },
];

export function getTestSession(testId: string): TestSession {
  return testSessions.find(test => test.id === testId) ?? testSessions[0];
}

export function getLessonContent(lessonId: number): LessonContent {
  if (lessonCatalog[lessonId]) return lessonCatalog[lessonId];

  const lesson = Object.values(learningRoadmap)
    .flatMap(level => level.lessons)
    .find(item => item.id === lessonId);

  return {
    id: lessonId,
    title: lesson?.title ?? "Spanish Lesson",
    level: lessonId < 11 ? "A1" : lessonId < 19 ? "A2" : lessonId < 26 ? "B1" : "C1",
    duration: lesson?.isTest ? "15 min" : "10 min",
    xp: lesson?.isTest ? 120 : 70,
    words: ["hola", "gracias", "hablar"],
    summary: "Practice a focused set of realistic Spanish questions for this topic.",
    questions: fallbackLessonQuestions,
  };
}

export type PracticeSession = {
  id: string;
  title: string;
  desc: string;
  questions: LessonQuestion[];
};

export const practiceSessions: PracticeSession[] = [
  {
    id: "Vocabulary Review",
    title: "Vocabulary Review",
    desc: "Spanish-to-English and English-to-Spanish review.",
    questions: [
      { type: "translate", prompt: "What does \"desayuno\" mean?", options: ["dinner", "breakfast", "work", "city"], correct: 1, explanation: "\"El desayuno\" means breakfast." },
      { type: "translate", prompt: "Choose the Spanish for \"to eat\".", options: ["comer", "hablar", "empezar", "vivir"], correct: 0, explanation: "\"Comer\" means \"to eat.\"" },
      { type: "match", prompt: "Match \"rapido\".", options: ["slow", "quick", "old", "near"], correct: 1, explanation: "\"Rapido\" means fast or quick." },
    ],
  },
  {
    id: "Grammar Drill",
    title: "Grammar Drill",
    desc: "Articles, sentence order, and verb endings.",
    questions: [
      { type: "choose", prompt: "Choose the correct article: ____ ciudad.", options: ["el", "la", "los", "un"], correct: 1, explanation: "\"Ciudad\" is feminine: la ciudad." },
      { type: "choose", prompt: "Complete: Yo no ____ ingles.", options: ["hablo", "hablas", "hablan", "hablamos"], correct: 0, explanation: "Use \"yo hablo\" and place \"no\" before the verb." },
      { type: "build", prompt: "Choose the natural question: \"What do you speak?\"", options: ["Que hablas?", "Hablas que tu?", "Tu que hablar?", "Que habla yo?"], correct: 0, explanation: "\"Que hablas?\" is the natural informal question." },
    ],
  },
  {
    id: "Listening",
    title: "Listening",
    desc: "Simulated audio prompts with transcripts after answering.",
    questions: [
      { type: "listen", prompt: "You hear: \"Me llamo Sofia.\" What did the speaker say?", options: ["My name is Sofia.", "I live in Sofia.", "Sofia is here.", "I speak Sofia."], correct: 0, explanation: "\"Me llamo Sofia\" means \"My name is Sofia.\"" },
      { type: "listen", prompt: "You hear: \"Quiero un cafe.\" What does it mean?", options: ["I want a coffee.", "I have a coffee.", "Coffee is cold.", "Where is coffee?"], correct: 0, explanation: "\"Quiero\" means \"I want.\"" },
      { type: "listen", prompt: "You hear: \"Hasta manana.\" Choose the meaning.", options: ["Good morning", "See you tomorrow", "Thank you", "Excuse me"], correct: 1, explanation: "\"Hasta manana\" means \"see you tomorrow.\"" },
    ],
  },
  {
    id: "Pronunciation",
    title: "Pronunciation",
    desc: "Pick stress and sound patterns before recording arrives.",
    questions: [
      { type: "pronounce", prompt: "Where is the stress in \"gracias\"?", options: ["GRA-cias", "gra-CIAS", "equal stress", "silent first syllable"], correct: 0, explanation: "\"Gracias\" is stressed at the beginning." },
      { type: "pronounce", prompt: "Which word has the softer single r?", options: ["perro", "carro", "pero", "tierra"], correct: 2, explanation: "\"Pero\" has a softer single r." },
      { type: "pronounce", prompt: "Choose the best pronunciation hint for \"llamo\" in many Latin American accents.", options: ["YA-mo", "LA-mo", "SHA-mo only", "KA-mo"], correct: 0, explanation: "In many regions, \"ll\" sounds close to English y." },
    ],
  },
  {
    id: "Reading",
    title: "Reading",
    desc: "Short texts with comprehension checks.",
    questions: [
      { type: "read", prompt: "Read: \"Ana vive en Madrid y trabaja en una escuela.\" Where does Ana work?", options: ["in a school", "in a hotel", "in a city hall", "in a cafe"], correct: 0, explanation: "\"Escuela\" means school." },
      { type: "read", prompt: "Read: \"Carlos desayuna cafe y pan.\" What does Carlos have for breakfast?", options: ["rice and fish", "coffee and bread", "tea and fruit", "milk only"], correct: 1, explanation: "\"Cafe y pan\" means coffee and bread." },
      { type: "read", prompt: "Read: \"La ciudad es grande.\" What is described?", options: ["a person", "a city", "a book", "a job"], correct: 1, explanation: "\"La ciudad\" means \"the city.\"" },
    ],
  },
  {
    id: "Sentence Builder",
    title: "Sentence Builder",
    desc: "Choose correctly built Spanish sentences.",
    questions: [
      { type: "build", prompt: "Build: \"I speak Spanish.\"", options: ["Yo hablo espanol.", "Yo espanol hablo.", "Hablo yo el espanol.", "Yo habla espanol."], correct: 0, explanation: "Subject + verb + object: Yo hablo espanol." },
      { type: "build", prompt: "Build: \"She does not work today.\"", options: ["Ella no trabaja hoy.", "Ella trabaja no hoy.", "No ella trabaja hoy.", "Ella no trabajar hoy."], correct: 0, explanation: "Put \"no\" before the conjugated verb." },
      { type: "build", prompt: "Build: \"Do you want coffee?\"", options: ["Quieres cafe?", "Cafe quieres tu no?", "Tu querer cafe?", "Quieres el cafe yo?"], correct: 0, explanation: "Spanish yes/no questions often keep statement order with question intonation." },
    ],
  },
  {
    id: "Conversation",
    title: "Conversation",
    desc: "Choose natural replies in realistic situations.",
    questions: [
      { type: "choose", prompt: "Cafe worker: \"Que desea?\" You want coffee. Reply:", options: ["Quiero un cafe, por favor.", "Soy un cafe.", "Cafe esta ciudad.", "No hablo mesa."], correct: 0, explanation: "This is a polite ordering phrase." },
      { type: "choose", prompt: "Someone says: \"Como te llamas?\" Reply:", options: ["Me llamo Sofia.", "Tengo Sofia.", "Estoy nombre.", "Hasta Sofia."], correct: 0, explanation: "\"Me llamo...\" means \"My name is...\"" },
      { type: "choose", prompt: "You need directions. What do you ask?", options: ["Donde esta la estacion?", "Cuanto cuesta pan?", "Tengo hambre.", "Hasta luego."], correct: 0, explanation: "\"Donde esta...?\" asks where something is." },
    ],
  },
  {
    id: "Mistake Review",
    title: "Mistake Review",
    desc: "Common beginner traps and corrections.",
    questions: [
      { type: "choose", prompt: "Fix the mistake: \"Yo habla espanol.\"", options: ["Yo hablo espanol.", "Yo hablan espanol.", "Yo hablar espanol.", "Yo hablas espanol."], correct: 0, explanation: "\"Yo\" uses the -o ending: hablo." },
      { type: "choose", prompt: "Fix the article: \"el casa\".", options: ["la casa", "los casa", "un casa", "las casa"], correct: 0, explanation: "\"Casa\" is feminine: la casa." },
      { type: "choose", prompt: "Fix the negative sentence: \"Yo hablo no ingles.\"", options: ["Yo no hablo ingles.", "No yo ingles hablo.", "Yo ingles no hablo.", "Hablo yo no ingles."], correct: 0, explanation: "\"No\" goes before the verb." },
    ],
  },
  {
    id: "Timed Quiz",
    title: "Timed Quiz",
    desc: "A quick mixed round.",
    questions: [
      { type: "translate", prompt: "\"Gracias\" means:", options: ["hello", "thanks", "tomorrow", "work"], correct: 1, explanation: "\"Gracias\" means thanks." },
      { type: "choose", prompt: "Choose 20:", options: ["doce", "quince", "veinte", "diez"], correct: 2, explanation: "20 is veinte." },
      { type: "build", prompt: "Choose: \"We speak.\"", options: ["Hablamos.", "Hablan.", "Hablo.", "Hablas."], correct: 0, explanation: "\"Nosotros\" uses -amos: hablamos." },
    ],
  },
  {
    id: "Custom Session",
    title: "Custom Session",
    desc: "A balanced mix across vocabulary, grammar, listening, and reading.",
    questions: [
      { type: "translate", prompt: "What does \"trabajo\" mean?", options: ["work", "food", "family", "health"], correct: 0, explanation: "\"Trabajo\" means work or job." },
      { type: "listen", prompt: "You hear: \"Buenos dias.\" Choose the meaning.", options: ["Good night", "Good morning", "Goodbye", "Please"], correct: 1, explanation: "\"Buenos dias\" means good morning." },
      { type: "read", prompt: "Read: \"Vivo en una ciudad grande.\" What is big?", options: ["a city", "a table", "a breakfast", "a word"], correct: 0, explanation: "\"Ciudad grande\" means big city." },
    ],
  },
];

export function getPracticeSession(sessionId: string): PracticeSession {
  return practiceSessions.find(session => session.id === sessionId) ?? practiceSessions[0];
}
