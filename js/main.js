import { renderScreen } from './screens.js';

const app = document.getElementById('app');

// Створюємо основний контейнер
const container = document.createElement('div');
container.className = 'playable-container';
app.appendChild(container);

function nextScreen(type) {
  renderScreen(type, container, nextScreen);
}
window.onload = () => { nextScreen("welcome"); };
