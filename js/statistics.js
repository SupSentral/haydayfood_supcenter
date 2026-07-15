// ==========================================
// statistics.js
// Mengelola Statistik
// ==========================================

import { foodsData } from "./data.js";

// ==========================================
// Render Semua Statistik
// ==========================================

export function renderStatistics(selectedFoods = {}) {

    renderTotalFoods();

    renderTotalMachines();

    renderHighestLevel();

    renderSelectedCount(selectedFoods);

}

// ==========================================
// Total Food
// ==========================================

export function renderTotalFoods() {

    const totalFoods = document.getElementById("totalFoods");

    if (!totalFoods) return;

    totalFoods.textContent = foodsData.length;

}

// ==========================================
// Total Mesin
// ==========================================

export function renderTotalMachines() {

    const totalMachines = document.getElementById("totalMachines");

    if (!totalMachines) return;

    const machines = [...new Set(

        foodsData.map(food => food.fn)

    )];

    totalMachines.textContent = machines.length;

}

// ==========================================
// Level Tertinggi
// ==========================================

export function renderHighestLevel() {

    const highestLevel = document.getElementById("highestLevel");

    if (!highestLevel) return;

    const maxLevel = Math.max(

        ...foodsData.map(food => food.lvl)

    );

    highestLevel.textContent = maxLevel;

}

// ==========================================
// Total Dipilih
// ==========================================

export function renderSelectedCount(selectedFoods = {}) {

    const selectedCount = document.getElementById("selectedCount");

    if (!selectedCount) return;

    let total = 0;

    Object.values(selectedFoods).forEach(qty => {

        total += qty;

    });

    selectedCount.textContent = total;

}