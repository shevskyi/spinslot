// Простий утилітний файл для швидкого доступу, рендеру і локалізації
export function qs(selector, el = document) {
    return el.querySelector(selector);
  }
  
  export function qsa(selector, el = document) {
    return Array.from(el.querySelectorAll(selector));
  }
  
  export const texts = {
    welcome: "Battle for the Power of Olympus",
    subtitle: "Натисни SPIN і випробуй удачу",
    notBad: "Неплохо. Продолжим?",
    almost: "Близко. Ещё один шаг.",
    tryAgain: "Попробуй ще раз",
    megaWin: "MEGA WIN",
    getBonus: "Забрать бонус"
  };
  