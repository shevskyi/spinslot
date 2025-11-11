export const zeusStates = {
    neutral: "assets/png/characters/zeus_idle.png",
    happy: "assets/png/characters/zeus_idle_thunder.png",
    strong: "assets/png/characters/zeus_summon_titan.png",
    sad: "assets/png/characters/zeus_idle.png", // використання лайтової розчарованої
    mega: "assets/png/characters/zeus_suuper_charging_wild.png"
  };
  
  // Для gif анімацій - підставляй власні .gif, коли потрібно
  export function changeZeus(state, el) {
    if (!zeusStates[state]) return;
    el.src = zeusStates[state];
    el.classList.add('animated');
    setTimeout(() => el.classList.remove('animated'), 1200);
  }
  
  // Анімації рилзів через CSS + JS (або бібліотеки типу anime.js)
  export function animateReels(reels, duration = 1200, callback) {
    reels.forEach((reel, i) => {
      reel.classList.add('spin');
      setTimeout(() => { reel.classList.remove('spin'); if (i === reels.length - 1 && callback) callback(); }, duration);
    });
  }
  