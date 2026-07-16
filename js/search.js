// ==========================================
// search.js
// Search, Filter, Sort & Reset
// ==========================================

import { foodsData } from "./data.js";
import { renderFoods } from "./render.js";
import { selectedFoods, resetSelected} from "./selected.js";

let currentFoods = [...foodsData];

// ==========================================
// LOAD MACHINE
// ==========================================

export function loadMachines() {

    const machineFilter = document.getElementById("machineFilter");

    if (!machineFilter) return;

    machineFilter.innerHTML = "";

    machineFilter.innerHTML += `
        <option value="all">Semua Mesin</option>
    `;

    const machines = [...new Set(foodsData.map(food => food.fn))]
        .sort((a, b) => a.localeCompare(b));

    machines.forEach(machine => {

        machineFilter.innerHTML += `
            <option value="${machine}">
                ${machine}
            </option>
        `;

    });

}

// ==========================================
// INIT SEARCH
// ==========================================

export function initSearch() {

    const searchInput = document.getElementById("searchInput");
    const machineFilter = document.getElementById("machineFilter");
    const sortFilter = document.getElementById("sortFilter");
    const resetBtn = document.getElementById("resetBtn");

    if (!searchInput) return;

    searchInput.addEventListener("input", updateFoods);

    machineFilter.addEventListener("change", updateFoods);

    sortFilter.addEventListener("change", updateFoods);

    resetBtn.addEventListener("click", resetSearch);

}

// ==========================================
// UPDATE
// ==========================================

function updateFoods() {

    const keyword = document
        .getElementById("searchInput")
        .value
        .trim()
        .toLowerCase();

    const machine = document
        .getElementById("machineFilter")
        .value;

    const sort = document
        .getElementById("sortFilter")
        .value;

    currentFoods = [...foodsData];

    // ==========================
    // SEARCH
    // ==========================

    if (keyword !== "") {

        currentFoods = currentFoods.filter(food =>

            food.en.toLowerCase().includes(keyword)

        );

    }

    // ==========================
    // FILTER MACHINE
    // ==========================

    if (machine !== "all") {

        currentFoods = currentFoods.filter(food =>

            food.fn === machine

        );

    }

    // ==========================
    // SORT
    // ==========================

    switch (sort) {

        case "Level Terendah":

            currentFoods.sort((a, b) => a.lvl - b.lvl);

            break;

        case "Level Tertinggi":

            currentFoods.sort((a, b) => b.lvl - a.lvl);

            break;

        case "A - Z":

            currentFoods.sort((a, b) =>

                a.en.localeCompare(b.en)

            );

            break;

        default:

            currentFoods.sort((a, b) =>

                a.lvl - b.lvl

            );

    }

    renderFoods(currentFoods, selectedFoods);

}

// ==========================================
// RESET
// ==========================================

function resetSearch() {

    // Kosongkan list pilihan
    resetSelected();

    // Reset search
    document.getElementById("searchInput").value = "";

    // Reset filter
    document.getElementById("machineFilter").value = "all";

    document.getElementById("sortFilter").selectedIndex = 0;

    currentFoods = [...foodsData];

    renderFoods(currentFoods, selectedFoods);

}

// ==========================================
// REFRESH HASIL SEARCH
// ==========================================

export function refreshSearch() {
    updateFoods();
}
