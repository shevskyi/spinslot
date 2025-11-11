import { slotSymbols, slotSpins, winIndexes } from './symbols.js';
import { zeusStates } from './animations.js';
import { texts } from './utils.js';

export function renderScreen(type, container, nextScreen) {
  container.innerHTML = '';
  let slotArea = renderSlotArea(type); container.appendChild(slotArea);

  let zeusImage = document.createElement('img');
  zeusImage.className = "zeus-img";
  zeusImage.src = zeusStates[type] || zeusStates.neutral;
  container.appendChild(zeusImage);

  const ui = document.createElement('div'); ui.className = 'bottom-ui';
  let text = '', btnText = '', btnAct;
  if (type === "welcome") {
    text = `<div class="text-title">${texts.welcome}</div><div class="text-subtitle">${texts.subtitle}</div>`;
    btnText = "SPIN"; btnAct = () => reelSpin(slotArea, 'win1', nextScreen);
  }
  if (type === "win1") {
    text = `<div class="text-title">${texts.notBad}</div>`; btnText = "SPIN"; btnAct = () => reelSpin(slotArea, 'win2', nextScreen);
  }
  if (type === "win2") {
    text = `<div class="text-title">${texts.almost}</div>`; btnText = "SPIN"; btnAct = () => reelSpin(slotArea, 'fake', nextScreen);
  }
  if (type === "fake") {
    text = `<div class="text-title">${texts.tryAgain}</div>`; btnText = "SPIN"; btnAct = () => reelSpin(slotArea, 'mega', nextScreen);
  }
  if (type === "mega") {
    text = `<div class="text-title mega">${texts.megaWin}</div>`; btnText = texts.getBonus; btnAct = () => window.location.href="#bonus";
  }
  ui.innerHTML = text;
  const btn = document.createElement('button');
  btn.className = (btnText==="SPIN"?"btn-spin":"btn-bonus");
  btn.innerText = btnText; btn.onclick = btnAct;
  ui.appendChild(btn); container.appendChild(ui);
}

// Реалізація slot-reel: кожний reel - окремий div; символи - стрічка
function renderSlotArea(type) {
  let idx =
    type==="win1"?0 : type==="win2"?1 : type==="fake"?2 : type==="mega"?3 : 0;
  const spins = slotSpins[idx];
  let slotArea = document.createElement('div');
  slotArea.className = 'slot-area';

  for (let col = 0; col < 5; col++) {
    const reel = document.createElement('div');
    reel.className = 'reel';
    const strip = document.createElement('div');
    strip.className = 'symbols-strip';
    // gen 12 random + final 6 (for spin-loop)
    for (let i=0; i<12; i++) {
      let rndId = slotSymbols[Math.floor(Math.random()*slotSymbols.length)].id;
      let symbol = slotSymbols.find(s=>s.id===rndId);
      const img = document.createElement('img');
      img.className = "symbol-img";
      img.src = symbol.img;
      strip.appendChild(img);
    }
    for (let row=0; row<6; row++) {
      let symId = spins[col][row];
      let symbol = slotSymbols.find(s=>s.id===symId);
      const img = document.createElement('img');
      img.className = "symbol-img";
      img.src = symbol.img;
      strip.appendChild(img);
    }
    reel.appendChild(strip);
    slotArea.appendChild(reel);
  }
  return slotArea;
}

// SPIN-Реалізація: крутить кожний reel, зупиняє, виділяє
function reelSpin(slotArea, type, nextScreen) {
  let idx = type==="win1"?0 : type==="win2"?1 : type==="fake"?2 : type==="mega"?3 : 0;
  const spins = slotSpins[idx];
  let reels = Array.from(slotArea.children);

  reels.forEach((reel, colIdx)=>{
    let strip = reel.querySelector('.symbols-strip');
    // початковий (скролимо вверх далеко!)
    strip.style.transition = 'transform 0.68s cubic-bezier(.58,.14,.42,.92)';
    strip.style.transform = `translateY(-${strip.children.length*52}px)`;
    setTimeout(()=>{
      // фініальний: показати 6 фінальних, швидкий bounce-down
      strip.style.transition = 'transform 0.17s cubic-bezier(.53,.18,.88,1.18)';
      strip.style.transform = `translateY(-${12*52}px)`;
      setTimeout(()=>{
        // Highlight win (всі, які у winIndexes)
        Array.from(strip.children).slice(12,18).forEach((img,rowIdx)=>{
          let flatIdx = colIdx*6+rowIdx;
          if (winIndexes[type]?.includes(flatIdx)) {
            img.classList.add('highlight');
            setTimeout(()=>img.classList.remove('highlight'), 610);
          }
        });
        // vanish-win, tumble
        setTimeout(()=>{
          Array.from(strip.children).slice(12,18).forEach((img,rowIdx)=>{
            let flatIdx = colIdx*6+rowIdx;
            if (winIndexes[type]?.includes(flatIdx)) img.classList.add('vanish');
          });
          // оновити стрічку: видалити виграшні — додати win cascade
          setTimeout(()=>{
            let updated = [];
            let srcList = Array.from(strip.children).slice(12,18);
            for(let r=0;r<6;r++){
              let flatIdx = colIdx*6+r;
              if (winIndexes[type]?.includes(flatIdx)) {
                // Додаємо новий символ зверху!
                let newId = slotSymbols[Math.floor(Math.random()*slotSymbols.length)].id;
                let symbol = slotSymbols.find(s=>s.id===newId);
                const img = document.createElement('img');
                img.className="symbol-img"; img.src=symbol.img;
                updated.push(img);
              } else{
                updated.push(srcList[r]);
              }
            }
            // переписуємо стрічку
            strip.innerHTML='';
            for(let i=0;i<12;i++){
              // генеруємо рендом для reel-loop
              let rndId=slotSymbols[Math.floor(Math.random()*slotSymbols.length)].id;
              let symbol=slotSymbols.find(s=>s.id===rndId);
              const img=document.createElement('img');
              img.className="symbol-img"; img.src=symbol.img;
              strip.appendChild(img);
            }
            updated.forEach(img=>strip.appendChild(img));
            // анімуємо tumble-down
            strip.style.transition='none';
            strip.style.transform=`translateY(-${12*52}px)`;
            setTimeout(()=>{
              strip.style.transition='transform 0.23s cubic-bezier(.7,.22,.84,1.18)';
              strip.style.transform=`translateY(-${12*52}px)`;
            },6);
            // перехід екрану через затримку!
            setTimeout(()=>nextScreen(type),590);
          },210);
        },610);
      },210);
    },760+colIdx*85);
  });
}
