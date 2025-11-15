# 🎰 Процес визначення та обробки виграшних символів

## 📍 ЕТАП 1: ВИЗНАЧЕННЯ ВИГРАШНИХ ПОЗИЦІЙ

### Де це відбувається?
**Файл:** `clean.html` (лінія ~3510-3550)  
**Функція:** `showWinningAnimations(winPositions)`

```javascript
async function showWinningAnimations(winPositions) {
    return new Promise(async resolve => {
        // winPositions - це масив координат [col, row] виграшних символів
        // Приклад: [[0, 1], [0, 2], [1, 1]]  (колона 0 рядок 1, колона 0 рядок 2, колона 1 рядок 1)
        
        const winLevel = calculateWinLevel(winPositions);  // Визначаємо рівень перемоги
        
        // Запускаємо кінематик-контролер (анімація)
        cinematicController.startCinematicWin(winPositions, winLevel);
        
        setTimeout(checkCompletion, 3000); // Чекаємо 3 сек
    });
}
```

---

## 🌟 ЕТАП 2: ВИДІЛЕННЯ СИМВОЛІВ (HIGHLIGHTING)

### Де це відбувається?
**Файл:** `clean.html` (лінія ~4022-4036)  
**Клас:** `CinematicWinController`  
**Метод:** `highlightWinningSymbols()`

```javascript
highlightWinningSymbols() {
    const reels = this.slotArea.querySelectorAll('.reel');  // Беремо все рилі (барабани)
    
    this.winPositions.forEach(([col, row]) => {
        const reel = reels[col];  // Знаходимо рилю за колоною
        if (reel) {
            const column = reel.querySelector('.symbols-column');
            const totalSymbols = column.children.length;
            
            // ВАЖЛИВО: Визначаємо DOM індекс символу
            const symbolIndex = totalSymbols - 6 + row;  // Видимі символи - це останні 6
            
            const symbolElement = column.children[symbolIndex];
            if (symbolElement) {
                // ДОДАЄМО CSS-КЛАСИ для виділення
                symbolElement.classList.add('winning', 'golden-highlight');
                // Це створює золотий ореол навколо символу (див. CSS)
            }
        }
    });
}
```

### Що робиться в CSS?
**Файл:** `clean.html` (лінія ~716-730)

```css
.symbol-item.winning {
    z-index: 10;
    position: relative;
    border: 3px solid #ffd700 !important;  /* Золотий бордюр */
    box-shadow: 
        0 0 10px #ffd700,      /* Ореол */
        0 0 20px #ffd700,      /* Ореол */
        0 0 30px #ffd700,      /* Ореол */
        inset 0 0 10px rgba(255, 215, 0, 0.3);  /* Внутрішній сяйво */
}
```

---

## 💥 ЕТАП 3: ТРАНСФОРМАЦІЯ (TRANSFORM) - ДОДАВАННЯ ЕФЕКТІВ

### Де це відбувається?
**Файл:** `clean.html` (лінія ~2463-2550)  
**Функція:** `addExplosionEffect(element, winLevel)`

Ця функція робить 4 речі:

### 3.1 ДОДАВАННЯ КЛАСУ "EXPLODING"
```javascript
element.classList.add('exploding');
```

### 3.2 ДОДАВАННЯ ПОЗИЦІОНУВАННЯ
```javascript
element.style.position = 'relative';
element.style.zIndex = '15';  // Підіймаємо вище за інші елементи
```

### 3.3 СТВОРЕННЯ FRAME (РАМКА)
```javascript
const frame = document.createElement('div');
frame.className = 'winning-frame';
element.appendChild(frame);  // Додаємо рамку всередину символу
```

### 3.4 СТВОРЕННЯ SHARDS (УЛАМКІВ)
```javascript
// Створюємо 8-22 уламків (залежно від winLevel)
for (let i = 0; i < shardCount; i++) {
    const shard = document.createElement('div');
    shard.className = 'shard';
    
    // Задаємо розмір уламка
    shard.style.width = w + 'px';
    shard.style.height = h + 'px';
    
    // Розраховуємо напрямок і дистанцію вильоту
    const angle = Math.random() * Math.PI * 2;
    const distance = 40 + Math.random() * 120 * shardPower;
    const tx = Math.round(Math.cos(angle) * distance) + 'px';
    const ty = Math.round(Math.sin(angle) * distance) + 'px';
    
    // ТРАНСФОРМАЦІЯ - Стартова позиція
    shard.style.transform = 'translate(-50%, -50%) rotate(' + (Math.random()*360) + 'deg)';
    
    // Додаємо до символу
    element.appendChild(shard);
    
    // АНІМАЦІЯ - Уламок летить геть (0-900ms)
    shard.animate([
        // Кадр 0% - Старт (в центрі, маленький)
        { 
            transform: 'translate(-50%, -50%) scale(1) rotate(0deg)', 
            opacity: 1 
        },
        // Кадр 50% - Середина польоту
        { 
            transform: `translate(-50%, -50%) translate(calc(${tx} * 0.6), calc(${ty} * 0.6)) scale(1.2) rotate(${rot/2}deg)`, 
            opacity: 1, 
            offset: 0.5 
        },
        // Кадр 100% - Кінець (далеко, прозорий)
        { 
            transform: `translate(-50%, -50%) translate(${tx}, ${ty}) scale(0.3) rotate(${rot}deg)`, 
            opacity: 0 
        }
    ], { 
        duration: dur,  // 700-1300ms
        easing: 'cubic-bezier(0.2,0.8,0.2,1)' 
    });
}
```

---

## 🫥 ЕТАП 4: ЗНИКНЕННЯ (REMOVAL)

### Де це відбувається?
**Файл:** `clean.html` (лінія ~2530-2550)

```javascript
// 1️⃣ Через 120ms - Приховуємо зображення (img)
setTimeout(() => {
    try { 
        const img = element.querySelector('img');  // Знаходимо картинку
        if (img) img.style.opacity = '0';  // Робимо прозорою
    } catch(e){}
}, 120);

// 2️⃣ Через 1200ms - Видаляємо рамку (frame)
setTimeout(() => {
    try { frame.remove(); } catch(e){}
}, 1200);

// 3️⃣ Через 1100ms - ВИДАЛЯЄМО ВСЕ (весь DOM елемент)
setTimeout(() => {
    try { element.remove(); } catch(e){}
}, 1100);

// 4️⃣ Уламки видаляються індивідуально після їх анімації (700-1300ms)
setTimeout(() => { 
    try { shard.remove(); } catch(e){} 
}, dur + 80);  // dur = 700-1300ms
```

---

## 📊 СХЕМА ЧАСОВОЇ ШКАЛИ

```
ВІДСУТНЕМО                    0ms
│
├─ ВИДЕННЯ СИМВОЛУ (з золотим ореолом)
│   ├─ Додаємо класи: 'winning', 'golden-highlight'
│   └─ CSS box-shadow робить виділення
│
├─ ВИБУХ ЕФЕКТ (0-1100ms)
│   ├─ 0ms: Створюємо frame
│   ├─ 0-900ms: Уламки летять (8-22 шт)
│   │   └─ scale: 1 → 1.2 → 0.3
│   │   └─ opacity: 1 → 1 → 0
│   │   └─ rotate: 0° → 180° → 360°
│   │   └─ translate:Center → Mid → Far
│   ├─ 120ms: Зображення стає прозоре (opacity: 0)
│   ├─ 780ms: Перший уламок видаляється
│   ├─ 1100ms: ВЕСЬ СИМВОЛ ВИДАЛЯЄТЬСЯ
│   └─ 1200ms: Frame видаляється
│
└─ КАСКАД (1200-1700ms)
    ├─ Новi символи падають зверху
    └─ Процес повторюється якщо ще є виграші
```

---

## 🔗 ДЕ ВИКЛИКАЄТЬСЯ ЦЕ ВСЕ?

### Основна послідовність:
1. **spinReels()** (лінія ~3195)
   ↓
2. **showWinningAnimations(winPositions)** (лінія ~3510)
   ↓
3. **cinematicController.startCinematicWin()** (лінія ~3860)
   ↓
4. **highlightWinningSymbols()** (лінія ~4013) ← ВИДІЛЕННЯ
   ↓
5. **simultaneousExplodeAndFill(winPositions)** (лінія ~4610) ← ВИБУХ
   ↓
6. **addExplosionEffect(symbolElement, winLevel)** (лінія ~2463) ← ТРАНСФОРМАЦІЯ + ЗНИКНЕННЯ

---

## 💡 КЛЮЧОВІ ТРАНСФОРМАЦІЇ

### CSS Transform для символу:
```css
.symbol-item.exploding {
    /* Де це прописується? В функції addExplosionEffect */
    /* element.classList.add('exploding') */
    /* Потім в CSS робиться ефект */
}
```

### JavaScript Transform для уламків:
```javascript
// Стартова позиція (element.style.transform)
'translate(-50%, -50%) rotate(0deg)'

// Кінцева позиція (в animate())
`translate(-50%, -50%) translate(${tx}, ${ty}) scale(0.3) rotate(${rot}deg)`

// Компоненти трансформації:
// 1. translate(-50%, -50%) = центрування по центру батька
// 2. translate(${tx}, ${ty}) = рухання геть по вектору
// 3. scale(0.3) = зменшення (1 → 0.3)
// 4. rotate(${rot}deg) = обертання
// 5. opacity = прозорість (1 → 0)
```

---

## ❓ ЧАСТІ ПИТАННЯ

### P: Чому символ не видаляється?
**A:** Перевір `addExplosionEffect()` - там 3 setTimeout'а, які видаляють елемент через 1100ms

### P: Де встановлюється золотий ореол?
**A:** В CSS класі `.symbol-item.winning` з `box-shadow` і в методі `highlightWinningSymbols()`

### P: Чому уламки летять в різні боки?
**A:** В `addExplosionEffect()` обчислюється випадковий кут:
```javascript
const angle = Math.random() * Math.PI * 2;  // 0-360 градусів
const distance = 40 + Math.random() * 120 * shardPower;  // 40-160px
```

### P: Де задається швидкість анімації?
**A:** В функції `shard.animate()` - тривалість `dur = 700 + Math.random() * 600` (700-1300ms)

### P: Коли додаються нові символи (каскад)?
**A:** Після `await new Promise(r => setTimeout(r, 1200))` в `simultaneousExplodeAndFill()`
