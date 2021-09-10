import { KillStreak } from '../../shared/types';

export const killStreakSounds: Record<KillStreak, string> = {
  [KillStreak.DOUBLE_KILL]: 'sounds/doublekill.mp3',
  [KillStreak.MULTI_KILL]: 'sounds/multikill.mp3',
  [KillStreak.MEGA_KILL]: 'sounds/megakill.mp3',
  [KillStreak.ULTRA_KILL]: 'sounds/ultrakill.mp3',
  [KillStreak.MONSTER_KILL]: 'sounds/monsterkill.mp3',
  [KillStreak.GOD_LIKE]: 'sounds/godlike.mp3',
};
