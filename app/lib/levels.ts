export interface Level {
  level: number;
  xpRequired: number;
  title: string;
  badge: string;
}

export const LEVELS: Level[] = [
  { level: 1, xpRequired: 0, title: "Beginner", badge: "🌱" },
  { level: 2, xpRequired: 100, title: "Novice", badge: "🌿" },
  { level: 3, xpRequired: 300, title: "Student", badge: "📚" },
  { level: 4, xpRequired: 600, title: "Scholar", badge: "🎓" },
  { level: 5, xpRequired: 1000, title: "Expert", badge: "⭐" },
  { level: 6, xpRequired: 1500, title: "Master", badge: "🌟" },
  { level: 7, xpRequired: 2100, title: "Guru", badge: "👑" },
  { level: 8, xpRequired: 2800, title: "Sage", badge: "🔮" },
  { level: 9, xpRequired: 3600, title: "Legend", badge: "⚡" },
  { level: 10, xpRequired: 4500, title: "Grandmaster", badge: "🌈" },
];

export function calculateLevel(xp: number): Level {
  return LEVELS.reduce((prev, curr) => 
    xp >= curr.xpRequired ? curr : prev
  );
}

export function calculateProgress(xp: number): number {
  const currentLevel = calculateLevel(xp);
  const nextLevel = LEVELS[currentLevel.level] || currentLevel;
  const xpForCurrentLevel = xp - currentLevel.xpRequired;
  const xpRequiredForNextLevel = nextLevel.xpRequired - currentLevel.xpRequired;
  return Math.min((xpForCurrentLevel / xpRequiredForNextLevel) * 100, 100);
} 