import { foodsData } from "./data.js";

import { renderFoods } from "./render.js";

import {

    initSelected,

    renderSelected,

    selectedFoods

} from "./selected.js";

import {

    renderStatistics

} from "./statistics.js";

import {

    loadMachines,

    initSearch

} from "./search.js";

import {

    initClipboard

} from "./clipboard.js";

import {

    loadSelectedFoods

} from "./storage.js";

import {

    initToggleSelected

} from "./selected.js";

// =========================
// Load Storage
// =========================

Object.assign(

    selectedFoods,

    loadSelectedFoods()

);


// =========================
// Render Awal
// =========================

renderFoods(

    foodsData,

    selectedFoods

);

renderSelected();

renderStatistics(selectedFoods);


// =========================
// Init
// =========================

loadMachines();

initSelected();

initToggleSelected();

initSearch();

initClipboard();