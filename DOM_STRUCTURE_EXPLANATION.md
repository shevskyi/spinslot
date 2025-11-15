# 🎯 DOM СТРУКТУРА І ТРАНСФОРМАЦІЇ СИМВОЛІВ

## 📊 ІЄРАРХІЯ DOM

```
slot-area
  ├── reel (6 шт - колонки)
  │   ├── reel
  │   ├── reel
  │   ├── reel
  │   ├── reel
  │   ├── reel
  │   └── reel
  │
  └── КОЖНА reel МІСТИТЬ:
      └── symbols-column (список символів)
          ├── symbol-item  (індекс 0)
          ├── symbol-item  (індекс 1)
          ├── symbol-item  (індекс 2)
          ├── symbol-item  (індекс 3)
          ├── symbol-item  (індекс 4)
          ├── symbol-item  (індекс 5) ← ВИДИМИЙ РЯДОК 0
          ├── symbol-item  (індекс 6) ← ВИДИМИЙ РЯДОК 1
          ├── symbol-item  (індекс 7) ← ВИДИМИЙ РЯДОК 2
          ├── symbol-item  (індекс 8) ← ВИДИМИЙ РЯДОК 3
          ├── symbol-item  (індекс 9) ← ВИДИМИЙ РЯДОК 4
          ├── symbol-item  (індекс 10) ← ВИДИМИЙ РЯДОК 5 (Остання видима)
          ├── symbol-item  (індекс 11)
          └── symbol-item  (індекс 12)
          
КОЖНИЙ symbol-item ЗАРАЗ СТВОРЮЄТЬСЯ ТАК:
```

---

## 🔍 ДЕТАЛЬНА СТРУКТУРА ОДНОГО СИМВОЛУ

```html
<div class="symbol-item" data-row="5">
    ↓ ЦЕ - symbol-item (батьківський DIV)
    ├─ <img src="path/to/symbol.png" style="width:92%; height:92%; object-fit:contain;">
    │  ↑ ЦЕ - symbol-item img (ЗОБРАЖЕННЯ)
    │
    └─ [Додається під час вибуху]:
       ├─ <div class="winning-frame"></div>
       ├─ <div class="shard"></div>
       ├─ <div class="shard"></div>
       ├─ <div class="shard"></div>
       └─ ... (8-22 уламків)
```

---

## ⚡ ЧИ ЕЛЕМЕНТ ОТРИМУЄ ТРАНСФОРМАЦІЮ?

### ВІДПОВІДЬ: **БАТЬКІВСЬКИЙ DIV (symbol-item)** отримує трансформацію

```javascript
// ЛІ 4650 -選ER символу для вибуху:
const symbolElement = column.children[symbolIndex];
//      ↑ ЦЕ - `.symbol-item` (не img!)

// ЛІ 2657 - ПЕРЕДАЧА ЕЛЕМЕНТУ:
addExplosionEffect(symbolElement, winLevel);
//                 ↑ символьный DIV, не img!

// ЛІ 2463 - ВСТАВЛЕННЯ ТРАНСФОРМАЦІЙ:
function addExplosionEffect(element, winLevel) {
    // element = .symbol-item (DIV)
    
    element.style.position = 'relative';  // ← На символьний DIV
    element.style.zIndex = '15';           // ← На символьний DIV
    
    const frame = document.createElement('div');
    element.appendChild(frame);  // ← Додаємо рамку КУ DIV
    
    const shard = document.createElement('div');
    element.appendChild(shard);  // ← Додаємо уламки КУ DIV
    //                 ↑ Всі діти додаються до `.symbol-item`, не до `img`!
}
```

---

## 📌 ЧИ ОТРИМУЄ IMG ТРАНСФОРМАЦІЮ?

### ВІДПОВІДЬ: **НІ, img отримує лише opacity**

```javascript
// ЛІ 2535 - Через 120ms:
setTimeout(() => {
    const img = element.querySelector('img');  // Знаходимо IMG всередину symbol-item
    if (img) img.style.opacity = '0';  // ← ТІЛЬКИ opacity змінюється для IMG!
    // НЕ transform! ТІЛЬКИ opacity!
}, 120);
```

### IMG НЕ отримує:
❌ `element.style.transform`
❌ `element.style.position`
❌ `element.style.zIndex`

### IMG отримує ТІЛЬКИ:
✅ `img.style.opacity = '0'` (через 120ms)

---

## 🎬 ПОСЛІДОВНІСТЬ ТРАНСФОРМАЦІЙ

### КРОК 1: Знаходимо елемент (ЛІ 4650)
```javascript
const symbolIndex = totalSymbols - 6 + row;
const symbolElement = column.children[symbolIndex];
// symbolElement = <div class="symbol-item">
//                     <img ... />
//                 </div>
```

### КРОК 2: Передаємо DIV до функції вибуху (ЛІ 2657)
```javascript
addExplosionEffect(symbolElement, winLevel);
// ПЕРЕДАЄМО: .symbol-item DIV (не img!)
```

### КРОК 3: Трансформуємо БАТЬКІВСЬКИЙ DIV (ЛІ 2463-2475)
```javascript
function addExplosionEffect(element, winLevel) {
    // element = .symbol-item DIV
    
    element.style.position = 'relative';  // ← DIV
    element.style.zIndex = '15';           // ← DIV
    
    // Додаємо frame рамку КУ DIV
    const frame = document.createElement('div');
    frame.className = 'winning-frame';
    element.appendChild(frame);  // ← appendChild на DIV
```

### КРОК 4: Створюємо уламки КУ DIV (ЛІ 2490-2530)
```javascript
    // Уламки ТАКОЖ додаються КУ DIV (не КУ img!)
    const shard = document.createElement('div');
    shard.className = 'shard';
    shard.style.left = '50%';
    shard.style.top = '50%';
    shard.style.transform = 'translate(-50%, -50%) rotate(...)';
    
    element.appendChild(shard);  // ← На DIV, не на img!
    
    // Анімуємо трансформацію уламка
    shard.animate([
        { transform: '...', opacity: 1 },
        { transform: '...', opacity: 0 }
    ], { duration: 700-1300ms });
}
```

### КРОК 5: Приховуємо img через 120ms (ЛІ 2535)
```javascript
setTimeout(() => {
    const img = element.querySelector('img');  // Знаходимо IMG всередину
    if (img) img.style.opacity = '0';  // ← IMG стає прозоре
}, 120);
```

### КРОК 6: Видаляємо frame через 1200ms (ЛІ 2540)
```javascript
setTimeout(() => {
    try { frame.remove(); } catch(e){}
}, 1200);
```

### КРОК 7: Видаляємо весь DIV через 1100ms (ЛІ 2545)
```javascript
setTimeout(() => {
    try { element.remove(); } catch(e){}  // ← ВИДАЛЯЄМО весь DIV (.symbol-item)
}, 1100);
```

---

## 📐 СТРУКТУРА ПІСЛЯ ДОДАВАННЯ ЕФЕКТІВ

```html
ДО ВИБУХУ:
<div class="symbol-item" data-row="5">
    <img src="..." />
</div>

ПІД ЧАС ВИБУХУ (0-120ms):
<div class="symbol-item exploding" style="position:relative; z-index:15;">
    <img src="..." style="opacity:1" />  ← Ще видима
    
    <div class="winning-frame"></div>
    ↑ Додана рамка
    
    <div class="shard" style="transform: translate(-50%, -50%) rotate(45deg);">
    <div class="shard" style="transform: translate(-50%, -50%) rotate(12deg);">
    <div class="shard" style="transform: translate(-50%, -50%) rotate(89deg);">
    ... (ще 5-19 уламків)
</div>

ПІД ЧАС АНІМАЦІЇ (120-700ms):
<div class="symbol-item exploding" style="position:relative; z-index:15;">
    <img src="..." style="opacity:0" />  ← Зараз 0, невидима!
    
    <div class="winning-frame"></div>
    
    <div class="shard" style="transform: translate(-50%, -50%) translate(45px, -32px) scale(0.3) rotate(360deg); opacity:0;">
    ↑ Летять геть, стають прозорі
    
    <div class="shard" style="transform: translate(-50%, -50%) translate(-52px, 28px) scale(0.3) rotate(180deg); opacity:0;">
    ...
</div>

ПІСЛЯ ВИБУХУ (>1100ms):
[ВЕСЬ DIV ВИДАЛЕНИЙ ІЗ DOM]
```

---

## 🎯 ПІДСУМОК

| Елемент | Отримує трансформацію? | Що змінюється |
|---------|------------------------|---------------|
| `.symbol-item` (DIV) | ✅ **ДА** | `position`, `z-index`, `classList.add('exploding')` |
| `.symbol-item img` | ❌ **НІ** | Тільки `opacity` через 120ms |
| `.shard` (уламки) | ✅ **ДА** | `transform` (translate, scale, rotate), `opacity` |
| `.winning-frame` (рамка) | ❌ **НІ** | Не змінюється, просто видаляється |

---

## 💡 ЦІКАВІ ФАКТИ

### 1. IMG НІКОЛИ НЕ АНІМУЄТЬСЯ
- IMG отримує тільки `opacity = 0` через 120ms
- IMG НЕ отримує `transform`
- IMG НЕ летить і НЕ обертається

### 2. БАТЬКІВСЬКИЙ DIV КОНТРОЛЮЄ РОЗТАШУВАННЯ
- Уламки розраховуються відносно ЦЕНТРУ `.symbol-item` DIV
- Коли видаляємо DIV, видаляються ВСІ його діти (img, frame, shards)

### 3. КАСКАДНЕ ВИДАЛЕННЯ
1. 120ms → IMG.opacity = 0
2. 700-1300ms → SHARDS видаляються (індивідуально)
3. 1100ms → element.remove() (весь DIV)
4. 1200ms → frame.remove() (якщо ще існує)

### 4. ВРЕМЕННІ ОКНА ПЕРЕКРИВАЮТЬСЯ
```
IMG opacity:        120ms
SHARDS animation:   0-1300ms ← Це довше за видалення DIV!
DIV removal:        1100ms
Frame removal:      1200ms
```

Уламки можуть ще мати `opacity: 0` коли батьківський DIV видаляється (тому що анімація довша).

---

## 🔗 ПОСИЛАННЯ НА КОД

| Операція | Лінія | Функція |
|----------|------|---------|
| Знаходимо елемент | 4650 | `simultaneousExplodeAndFill()` |
| Викликаємо вибух | 2657 | `simultaneousExplodeAndFill()` |
| Додаємо transform | 2466-2468 | `addExplosionEffect()` |
| Додаємо рамку | 2469-2472 | `addExplosionEffect()` |
| Створюємо уламки | 2492-2530 | `addExplosionEffect()` |
| Робимо img прозоре | 2535-2538 | `addExplosionEffect()` |
| Видаляємо frame | 2540-2542 | `addExplosionEffect()` |
| Видаляємо весь DIV | 2545-2547 | `addExplosionEffect()` |
