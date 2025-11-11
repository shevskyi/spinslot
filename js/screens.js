import { slotSymbols, slotSpins, winIndexes } from './symbols.js';
import { zeusStates } from './animations.js';
import { texts } from './utils.js';

// Всі стани Zeus, всі screen transitions

export function renderScreen(type, container, nextScreen) {
  container.innerHTML = '';
  let overlay = document.createElement('div'); overlay.className = 'bg-overlay'; container.appendChild(overlay);
  let grid = renderSlotGrid(type); container.appendChild(grid);

  // Зевс: GIF для анімації або png з CSS-левітацією
  let zeusImage = document.createElement('img');
  zeusImage.className = "zeus-img";
  if(['win1','win2','mega'].includes(type)){zeusImage.classList.add('levitate')}
  switch (type) {
    case "welcome": zeusImage.src = zeusStates.neutral; break;
    case "win1":    zeusImage.src = zeusStates.happy; break;
    case "win2":    zeusImage.src = zeusStates.strong; break;
    case "fake":    zeusImage.src = zeusStates.sad; break;
    case "mega":    zeusImage.src = zeusStates.mega; break;
    default:        zeusImage.src = zeusStates.neutral;
  }
  container.appendChild(zeusImage);

  // Нижній UI
  const ui = document.createElement('div');
  ui.className = 'bottom-ui';
  let text = '', btnText = '', btnAct = undefined;
  switch (type) {
    case "welcome":
      text = `<div class="text-title">${texts.welcome}</div>
              <div class="text-subtitle">${texts.subtitle}</div>`;
      btnText = "SPIN";
      btnAct = () => spinAnimation(grid, () => nextScreen("win1"))
      break;
    case "win1":
      text = `<div class="text-title">${texts.notBad}</div>`;
      btnText = "SPIN";
      btnAct = () => spinAnimation(grid, () => nextScreen("win2"))
      break;
    case "win2":
      text = `<div class="text-title">${texts.almost}</div>`;
      btnText = "SPIN";
      btnAct = () => spinAnimation(grid, () => nextScreen("fake"))
      break;
    case "fake":
      text = `<div class="text-title">${texts.tryAgain}</div>`;
      btnText = "SPIN";
      btnAct = () => spinAnimation(grid, () => nextScreen("mega"))
      break;
    case "mega":
      text = `<div class="text-title mega">${texts.megaWin}</div>`;
      btnText = texts.getBonus;
      btnAct = () => window.location.href = "#bonus";
      break;
    default:
      text = '';
      btnText = "SPIN";
      btnAct = () => spinAnimation(grid, () => nextScreen("win1"))
  }
  ui.innerHTML = text;
  const btn = document.createElement('button');
  btn.className = (btnText === "SPIN" ? "btn-spin" : "btn-bonus");
  btn.innerText = btnText;
  btn.onclick = btnAct;
  ui.appendChild(btn);
  container.appendChild(ui);
}

// Генерує сітку (5x6) та підключає анімації виграшу (highlight)
function renderSlotGrid(type) {
  const grid = document.createElement('div');
  grid.className = 'slot-grid';
  let spins;
  switch(type) {
    case "win1": spins = slotSpins[0]; break;
    case "win2": spins = slotSpins[1]; break;
    case "fake": spins = slotSpins[2]; break;
    case "mega": spins = slotSpins[3]; break;
    default: spins = slotSpins[0];
  }
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 5; col++) {
      let symId = spins[col][row] || slotSymbols[0].id;
      let symbol = slotSymbols.find(s=>s.id===symId);
      let symImg = document.createElement('img');
      symImg.src = symbol.img;
      symImg.className = "symbol-img";
      grid.appendChild(symImg);
    }
  }
  // Highlight виграшних символів після анімації
  grid.highlightWin = () => {
    if(winIndexes[type]){
      winIndexes[type].forEach(i => grid.children[i].classList.add('highlight'));
      setTimeout(() => winIndexes[type].forEach(i => grid.children[i].classList.remove('highlight')), 1200);
    }
  }
  return grid;
}

// Анімація спіну + показ виграшу
function spinAnimation(grid, cb){
  for(let i=0; i<grid.children.length; i++){
    grid.children[i].classList.add('spinning'); grid.children[i].classList.remove('show');
    setTimeout(() => {
      grid.children[i].classList.remove('spinning'); grid.children[i].classList.add('show');
      if(i===grid.children.length-1){
        grid.highlightWin && grid.highlightWin();
        setTimeout(()=>cb(),900);
      }
    }, 185 + i*52);
  }
}
