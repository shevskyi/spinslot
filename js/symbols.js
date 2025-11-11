export const slotSymbols = [
    { id: "hv1", img: "assets/png/symbols/gool_hv1.png" },
    { id: "hv2", img: "assets/png/symbols/gool_hv_2.png" },
    { id: "hv3", img: "assets/png/symbols/gool_hv3.png" },
    { id: "hv4", img: "assets/png/symbols/gool_hv4.png" },
    { id: "lv1", img: "assets/png/symbols/gool_lv_1_orange.png" },
    { id: "lv2", img: "assets/png/symbols/gool_lv_2_purple.png" },
    { id: "lv3", img: "assets/png/symbols/gool_lv_3_yellow.png" },
    { id: "lv4", img: "assets/png/symbols/gool_lv_4_green.png" },
    { id: "lv5", img: "assets/png/symbols/gool_lv_5_blue.png" },
    { id: "wild", img: "assets/png/symbols/gool_wild_idle.png" },
    { id: "scatter", img: "assets/png/symbols/gool_scatter_win.png" }
];
export const slotSpins = [
    [["lv1", "lv2", "hv1", "lv3", "lv1", "lv2"], ["lv2", "lv1", "lv3", "hv2", "lv2", "wild"], ["hv3", "lv4", "scatter", "lv5", "lv4", "lv3"], ["lv1", "hv4", "hv2", "lv3", "lv5", "lv2"], ["lv2", "lv3", "hv1", "lv1", "scatter", "lv4"]],
    [["hv2", "wild", "lv2", "hv2", "lv3", "lv2"], ["wild", "hv2", "lv2", "lv2", "wild", "lv3"], ["hv2", "scatter", "hv3", "hv4", "wild", "hv3"], ["scatter", "wild", "lv3", "hv2", "lv2", "hv4"], ["lv1", "lv3", "hv2", "wild", "hv3", "hv2"]],
    [["lv2", "lv3", "lv4", "lv5", "lv1", "lv3"], ["lv1", "lv5", "lv2", "lv4", "lv3", "lv2"], ["lv3", "lv4", "lv1", "lv2", "lv3", "lv4"], ["lv2", "lv3", "lv2", "lv4", "lv1", "lv3"], ["lv5", "lv4", "lv3", "lv1", "lv2", "lv1"]],
    [["hv1", "hv2", "wild", "scatter", "hv3", "hv4"], ["hv2", "wild", "scatter", "hv2", "wild", "scatter"], ["wild", "scatter", "hv2", "wild", "scatter", "hv4"], ["scatter", "hv3", "hv4", "wild", "hv2", "wild"], ["hv3", "hv4", "wild", "scatter", "hv2", "wild"]]
];
export const winIndexes = {
    win1: [2, 3, 4, 17, 19],
    win2: [7, 8, 9, 10, 11, 12],
    mega: [0, 3, 5, 8, 15, 30, 31],
};
