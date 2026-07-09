function svgToDataUri(svg: string) {
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

type AnimalAvatar = {
  id: string;
  label: string;
  src: string;
};

export const animalAvatars: AnimalAvatar[] = [
  {
    id: "fox",
    label: "Fox",
    src: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
        <rect width="120" height="120" rx="28" fill="#FFE3C2"/>
        <circle cx="60" cy="66" r="38" fill="#F97316"/>
        <path d="M27 27 48 48 37 61Z" fill="#EA580C"/>
        <path d="M93 27 72 48 83 61Z" fill="#EA580C"/>
        <path d="M39 66c7 24 35 24 42 0-9 10-33 10-42 0Z" fill="#FFF7ED"/>
        <circle cx="47" cy="58" r="5" fill="#292524"/>
        <circle cx="73" cy="58" r="5" fill="#292524"/>
        <path d="M55 70h10l-5 6Z" fill="#292524"/>
        <path d="M45 84c9 8 21 8 30 0" fill="none" stroke="#292524" stroke-width="4" stroke-linecap="round"/>
      </svg>
    `),
  },
  {
    id: "cat",
    label: "Cat",
    src: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
        <rect width="120" height="120" rx="28" fill="#E0F2FE"/>
        <circle cx="60" cy="66" r="39" fill="#94A3B8"/>
        <path d="M28 31 49 45 34 62Z" fill="#64748B"/>
        <path d="M92 31 71 45 86 62Z" fill="#64748B"/>
        <path d="M34 31 48 46 39 54Z" fill="#FBCFE8"/>
        <path d="M86 31 72 46 81 54Z" fill="#FBCFE8"/>
        <circle cx="47" cy="61" r="5" fill="#0F172A"/>
        <circle cx="73" cy="61" r="5" fill="#0F172A"/>
        <path d="M55 73h10l-5 6Z" fill="#0F172A"/>
        <path d="M32 73h18M70 73h18M34 83h16M70 83h16" stroke="#475569" stroke-width="3" stroke-linecap="round"/>
      </svg>
    `),
  },
  {
    id: "owl",
    label: "Owl",
    src: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
        <rect width="120" height="120" rx="28" fill="#EEF2FF"/>
        <path d="M29 69c0-28 14-44 31-44s31 16 31 44c0 22-12 36-31 36S29 91 29 69Z" fill="#8B5CF6"/>
        <path d="M33 34 53 45 38 54Z" fill="#7C3AED"/>
        <path d="M87 34 67 45 82 54Z" fill="#7C3AED"/>
        <circle cx="48" cy="62" r="15" fill="#FFFFFF"/>
        <circle cx="72" cy="62" r="15" fill="#FFFFFF"/>
        <circle cx="48" cy="62" r="6" fill="#1E1B4B"/>
        <circle cx="72" cy="62" r="6" fill="#1E1B4B"/>
        <path d="M55 75h10l-5 10Z" fill="#F59E0B"/>
        <path d="M44 91c10 5 22 5 32 0" fill="none" stroke="#6D28D9" stroke-width="4" stroke-linecap="round"/>
      </svg>
    `),
  },
  {
    id: "turtle",
    label: "Turtle",
    src: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
        <rect width="120" height="120" rx="28" fill="#DCFCE7"/>
        <circle cx="60" cy="63" r="38" fill="#16A34A"/>
        <circle cx="60" cy="53" r="27" fill="#22C55E"/>
        <path d="M36 54h48M45 33l30 45M75 33 45 78" stroke="#15803D" stroke-width="4" stroke-linecap="round"/>
        <circle cx="36" cy="70" r="13" fill="#86EFAC"/>
        <circle cx="84" cy="70" r="13" fill="#86EFAC"/>
        <circle cx="48" cy="48" r="4" fill="#052E16"/>
        <circle cx="72" cy="48" r="4" fill="#052E16"/>
        <path d="M52 66c5 4 11 4 16 0" fill="none" stroke="#052E16" stroke-width="3" stroke-linecap="round"/>
      </svg>
    `),
  },
  {
    id: "panda",
    label: "Panda",
    src: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
        <rect width="120" height="120" rx="28" fill="#F8FAFC"/>
        <circle cx="36" cy="39" r="15" fill="#1F2937"/>
        <circle cx="84" cy="39" r="15" fill="#1F2937"/>
        <circle cx="60" cy="66" r="40" fill="#FFFFFF"/>
        <ellipse cx="45" cy="61" rx="13" ry="16" fill="#1F2937"/>
        <ellipse cx="75" cy="61" rx="13" ry="16" fill="#1F2937"/>
        <circle cx="48" cy="60" r="4" fill="#FFFFFF"/>
        <circle cx="72" cy="60" r="4" fill="#FFFFFF"/>
        <path d="M54 75h12l-6 7Z" fill="#1F2937"/>
        <path d="M49 87c8 6 14 6 22 0" fill="none" stroke="#1F2937" stroke-width="4" stroke-linecap="round"/>
      </svg>
    `),
  },
  {
    id: "frog",
    label: "Frog",
    src: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
        <rect width="120" height="120" rx="28" fill="#ECFCCB"/>
        <circle cx="43" cy="43" r="16" fill="#65A30D"/>
        <circle cx="77" cy="43" r="16" fill="#65A30D"/>
        <circle cx="60" cy="70" r="38" fill="#84CC16"/>
        <circle cx="43" cy="43" r="8" fill="#FFFFFF"/>
        <circle cx="77" cy="43" r="8" fill="#FFFFFF"/>
        <circle cx="43" cy="43" r="4" fill="#1A2E05"/>
        <circle cx="77" cy="43" r="4" fill="#1A2E05"/>
        <circle cx="50" cy="68" r="3" fill="#365314"/>
        <circle cx="70" cy="68" r="3" fill="#365314"/>
        <path d="M44 82c10 10 22 10 32 0" fill="none" stroke="#365314" stroke-width="4" stroke-linecap="round"/>
      </svg>
    `),
  },
];

export const defaultAnimalAvatar = animalAvatars[0].src;
