#!/usr/bin/env bash
# Переміщує перелічені невикористані файли в ./unused_assets/ з збереженням структури
set -euo pipefail
IFS=$'\n\t'

DEST="./unused_assets"
mkdir -p "$DEST"

files_to_move=(
  "assets/animations/gool_hv_1.gif"
  "assets/animations/gool_hv_2.gif"
  "assets/animations/gool_hv_3.gif"
  "assets/animations/gool_hv_4.gif"
  "assets/animations/gool_lv_1_orange-gool_lv_1_orange.gif"
  "assets/animations/gool_lv_2_purple-gool_lv_2_purple.gif"
  "assets/animations/gool_lv_3_yellow-gool_lv_3_yellow.gif"
  "assets/animations/gool_lv_4_green-gool_lv_4_green.gif"
  "assets/animations/gool_lv_5_blue-gool_lv_5_blue.gif"
  "assets/animations/gool_scatter-gool_scatter_anticipation.gif"
  "assets/animations/gool_scatter-gool_scatter_landing.gif"
  "assets/animations/gool_scatter-gool_scatter_win.gif"
  "assets/animations/gool_scatter_win.gif"
  "assets/animations/gool_wild-gool_wild_idle.gif"
  "assets/animations/gool_wild-gool_wild_win.gif"
  "assets/symbol_win_animation.svg"
  "assets/png/characters/Character.png"
  "assets/png/game_props/Divider.png"
  "assets/png/game_props/Reel_Base.png"
  "assets/png/game_props/Reel_Frame.png"
  "assets/png/logo/GOOL_horizontal_logo_EN.png"
  "assets/png/logo/GOOL_vertical_logo_EN.png"
  "assets/audio/cascade.mp3"
  "assets/png/background/Freegame_BG.png"
  "css/main.css"
  "css/.css"
  "js/main.js"
  "js/animations.js"
  "js/symbols.js"
  "js/utils.js"
  "js/screens.js"
  "unused_assets_backup_2025-11-13.zip"
)

echo "Перевірка та переміщення файлів у $DEST ..."
for f in "${files_to_move[@]}"; do
  if [ -e "$f" ]; then
    target_dir="$DEST/$(dirname "$f")"
    mkdir -p "$target_dir"
    echo "Moving: $f -> $target_dir/"
    mv "$f" "$target_dir/"
  else
    echo "Not found (skipping): $f"
  fi
done

echo "Готово. Перевірте каталог: $DEST"
