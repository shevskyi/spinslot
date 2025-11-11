import { slotSymbols, slotSpins } from './symbols.js';
import { zeusStates } from './animations.js';
import { texts } from './utils.js';

export function renderScreen(type, container, nextScreen) {
  container.innerHTML = '';

  // Overlay background для глибини
  let overlay = document.createElement('div');
  overlay.className = 'bg-overlay';
  container.appendChild(overlay);

  // Сітка слотів (background + symbols)
  container.appendChild(renderSlotGrid(type));

  // Зевс зверху (поверх slot-grid)
  let zeusImage = document.createElement('img');
  zeusImage.className = "zeus-img";
  switch (type) {
    case "welcome": zeusImage.src = zeusStates.neutral; break;
    case "win1":    zeusImage.src = zeusStates.happy; break;
    case "win2":    zeusImage.src = zeusStates.strong; break;
    case "fake":    zeusImage.src = zeusStates.sad; break;
    case "mega":    zeusImage.src = zeusStates.mega; break;
    default:        zeusImage.src = zeusStates.neutral;
  }
  container.appendChild(zeusImage);

  // Нижній UI: текст та кнопка
  const ui = document.createElement('div');
  ui.className = 'bottom-ui';

  let text = '';
  let btnText = '';
  let btnAct = undefined;

  switch (type) {
    case "welcome":
      text = `<div class="text-title">${texts.welcome}</div>
              <div class="text-subtitle">${texts.subtitle}</div>`;
      btnText = "SPIN";
      btnAct = () => nextScreen("win1");
      break;
    case "win1":
      text = `<div class="text-title">${texts.notBad}</div>`;
      btnText = "SPIN";
      btnAct = () => nextScreen("win2");
      break;
    case "win2":
      text = `<div class="text-title">${texts.almost}</div>`;
      btnText = "SPIN";
      btnAct = () => nextScreen("fake");
      break;
    case "fake":
      text = `<div class="text-title">${texts.tryAgain}</div>`;
      btnText = "SPIN";
      btnAct = () => nextScreen("mega");
      break;
    case "mega":
      text = `<div class="text-title mega">${texts.megaWin}</div>`;
      btnText = texts.getBonus;
      btnAct = () => window.location.href = "#bonus";
      break;
    default:
      text = '';
      btnText = "SPIN";
      btnAct = () => nextScreen("win1");
  }

  ui.innerHTML = text;
  const btn = document.createElement('button');
  btn.className = (btnText === "SPIN" ? "btn-spin" : "btn-bonus");
  btn.innerText = btnText;
  btn.onclick = btnAct;
  ui.appendChild(btn);

  container.appendChild(ui);
}

// Сітка рилзів (5x6)
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
  return grid;
}
