export function playSound(name) {
    const sounds = {
      spin: "assets/audio/spin.mp3",
      win: "assets/audio/win.mp3",
      megaWin: "assets/audio/mega_win.mp3",
      cta: "assets/audio/cta.mp3"
    };
  
    if (sounds[name]) {
      const audio = new Audio(sounds[name]);
      audio.play();
    }
  }
  