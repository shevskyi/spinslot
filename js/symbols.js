export const slotSymbols = [
    { id: "hv1", img: "assets/png/symbols/gool_hv1.png"},
    { id: "hv2", img: "assets/png/symbols/gool_hv_2.png"},
    { id: "hv3", img: "assets/png/symbols/gool_hv3.png"},
    { id: "hv4", img: "assets/png/symbols/gool_hv4.png"},
    { id: "lv1", img: "assets/png/symbols/gool_lv_1_orange.png"},
    { id: "lv2", img: "assets/png/symbols/gool_lv_2_purple.png"},
    { id: "lv3", img: "assets/png/symbols/gool_lv_3_yellow.png"},
    { id: "lv4", img: "assets/png/symbols/gool_lv_4_green.png"},
    { id: "lv5", img: "assets/png/symbols/gool_lv_5_blue.png"},
    { id: "wild", img: "assets/png/symbols/gool_wild_idle.png" },
    { id: "scatter", img: "assets/png/symbols/gool_scatter_win.png" }
  ];
  
  export const slotSpins = [
    // Screen 2: Light Win
    [[ "lv1", "lv2", "hv1", "lv1", "lv2", "lv3" ], ["lv2","lv3","lv1","lv2","lv3","lv4"], ["lv3","lv4","lv2","lv3","lv4","lv5"], ["hv1","hv2","hv3","hv4","lv1","lv2"], ["lv1","lv2","lv3","lv4","lv5","wild"]],
    // Screen 3: Medium Win
    [[ "hv2", "lv3", "wild", "hv2", "lv4", "lv2" ], ["hv2", "wild", "hv3", "hv4", "lv2", "lv3"], ["wild","hv2","lv2","hv2","wild","hv4"], ["lv4","hv3","hv2","hv3","wild","scatter"], ["hv3","lv4","wild","lv2","hv2","wild"]],
    // Screen 4: Fake Lose
    [[ "lv2", "lv3", "lv4", "lv2", "lv5", "lv1" ], ["lv3","lv4","lv1","lv2","lv3","lv2"], ["lv4","lv2","lv3","lv4","lv1","lv2"], ["lv2","lv1","lv3","lv4","lv1","lv2"], ["lv3","lv4","lv2","lv3","lv1","lv2"]],
    // Screen 5: Mega Win
    [[ "hv1", "hv2", "wild", "scatter", "hv3", "hv4" ], ["hv2", "wild", "scatter", "hv2", "wild", "scatter"], ["wild", "scatter", "hv2", "wild", "scatter", "hv4"], ["scatter", "scatter", "hv3", "hv4", "wild", "hv2"], ["hv3","hv4","wild","lv2","hv2","wild"]]
  ];
  