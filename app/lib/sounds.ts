export const createSoundFile = (base64Data: string) => {
  if (typeof window !== 'undefined') {
    const blob = new Blob(
      [Uint8Array.from(atob(base64Data), c => c.charCodeAt(0))],
      { type: 'audio/mp3' }
    );
    return new Audio(URL.createObjectURL(blob));
  }
  return null;
};

// Short beep sounds encoded in base64
const SOUND_DATA = {
  success: 'SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAAFbgCenp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6e//////////////////////////////////////////////////////////////////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAYAAAAAAAAABW7hZ+xL//vSZBMAFHFD0n1ngAIPAGoj0MwAUPkPVfmsgAg3AalPBDAD//+z/V/v/f/r+mFf6YV+gKv/2f/4ov4I6//+KBQL///8QQP//+UBf/4C///BApwA0IAABAADQBzACAEAIYBhwGAYcLFDf/BCAD/+D5QFDEOg+D5//y4Pg+XB8/8uD4Pg+D5//Lg+D5cHwfB8H6gAIAAAEAAAAABgIAYDAQAwEAMBADDhYob/4IQAf/wfKAoYh0HwfB//lwfB8uD5//lwfB8HwfB//lwfB8uD4Pg+D9QAEAAACAAAAAAwEAMBADAQAwEAMOFihv/ghAB//B8oChi',
  error: 'SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAAFbgCenp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6e//////////////////////////////////////////////////////////////////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAQAAAAAAAAABW5C7y1P//vSZBMAFGpD1X5rIAIOoGpTwQwAUbUPVfmsgAg3AalPBDAD//+7/9X+///9fpin+mNfoK3/s//yi/gjr//+KhQL///8QQP//+eCv/8Bf//BCpwA0IAABAADQBzACAEAIYBhwGAYcLFDf/BCAD/+D5QFDEOg+D5//y4Pg+XB8/8uD4Pg+D5//Lg+D5cHwfB8H6gAIAAAEAAAAABgIAYDAQAwEAMBADDhYob/4IQAf/wfKAoYh0HwfB//lwfB8uD5//lwfB8HwfB//lwfB8uD4Pg+D9QAEAAACAAAAAAwEAMBADAQAwEAMOFihv/ghAB//B8oChi',
  warning: 'SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAAFbgCenp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6e//////////////////////////////////////////////////////////////////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAMAAAAAAAAABW4/iYhx//vSZBMAFGFD1X5rIAINYGpTwQwAUYUPVfmsgAg2galPBDAD//+//9X+///9NKf6Y1+grf+z//KL+COv//4qFAv///xBA///54K//wF//8EKnADQgAAEAANAHMAIAQAhgGHAYBhwsUN/8EIAP/4PlAUMQ6D4Pn//Lg+D5cHz/y4Pg+D4Pn//Lg+D5cHwfB8H6gAIAAAEAAAAABgIAYDAQAwEAMBADDhYob/4IQAf/wfKAoYh0HwfB//lwfB8uD5//lwfB8HwfB//lwfB8uD4Pg+D9QAEAAACAAAAAAwEAMBADAQAwEAMOFihv/ghAB//B8oChi',
  info: 'SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAAFbgCenp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6e//////////////////////////////////////////////////////////////////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAUAAAAAAAAABW6WFHpA//vSZBMAFHBD1X5rIAIOYGpTwQwAUUkPVfmsgAg1AalPBDAD//+//V/v//9MU/0xr9BW/9n/+UX8Edf//xUKBf///iCB///zwV//gL//4IVOAGhAAAIAAaAOYAQAgBDAMOAwDDhYob/4IQAf/wfKAoYh0HwfP/+XB8Hy4Pn/lwfB8HwfP/+XB8Hy4Pg+D4P1AAQAAAgAAAAAMBADAQAwEAMBADDhYob/4IQAf/wfKAoYh0HwfB//lwfB8uD5//lwfB8HwfB//lwfB8uD4Pg+D9QAEAAACAAAAAAwEAMBADAQAwEAMOFihv/ghAB//B8oChi'
};

export const sounds = {
  success: createSoundFile(SOUND_DATA.success),
  error: createSoundFile(SOUND_DATA.error),
  warning: createSoundFile(SOUND_DATA.warning),
  info: createSoundFile(SOUND_DATA.info)
}; 