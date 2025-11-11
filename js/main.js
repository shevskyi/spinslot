import { renderScreen } from './screens.js';

const app = document.getElementById('app');
const container = document.createElement('div');
container.className = 'playable-container';
app.appendChild(container);

function nextScreen(type) {
  renderScreen(type, container, nextScreen);
}
window.onload = () => nextScreen("welcome");
