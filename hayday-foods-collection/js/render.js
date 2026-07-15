// ==========================================
// render.js
// Render Food Cards
// ==========================================

import { foodsData } from "./data.js";

/**
 * Palet hue yang sudah dikurasi biar warna per-mesin tetap serasi
 * dengan tema (bukan warna acak yang bisa bentrok).
 */
const MACHINE_HUES = [18, 32, 48, 95, 140, 165, 205, 255, 320, 350];

function hueForMachine(name) {

    let hash = 0;

    for (let i = 0; i < name.length; i++) {

        hash = name.charCodeAt(i) + ((hash << 5) - hash);

    }

    const index = Math.abs(hash) % MACHINE_HUES.length;

    return MACHINE_HUES[index];

}

/**
 * Render semua makanan
 * @param {Array} data
 * @param {Object} selectedFoods
 */
export function renderFoods(data = foodsData, selectedFoods = {}) {

    const foodsGrid = document.getElementById("foodsGrid");

    if (!foodsGrid) return;

    foodsGrid.innerHTML = "";

    const fragment = document.createDocumentFragment();

    data.forEach(food => {

        const qty = selectedFoods[food.en] || 0;

        const fileName = food.en
            .replace(/\s+/g, "_")
            .replace(/'/g, "");

        const card = document.createElement("div");

        card.className = "food-card";

        card.style.setProperty("--hue", hueForMachine(food.fn));

        if (qty > 0) card.classList.add("selected");

        card.innerHTML = `
            <div class="food-top">

                <div class="food-image">

                    <img
                        src="foods/${fileName}.png"
                        alt="${food.en}"
                        loading="lazy"
                        onerror="this.src='foods/default.png'"
                    >

                </div>

                <div class="food-info">

                    <h3>${food.en}</h3>

                    <span class="machine">

                        ${food.fn}

                    </span>

                </div>

            </div>

            <div class="food-bottom">

                <div class="level">

                    Level <strong>${food.lvl}</strong>

                </div>

                <div class="counter">

                    <button
                        class="minus-btn"
                        data-name="${food.en}"
                    >
                        −
                    </button>

                    <input
                        type="number"
                        min="0"
                        value="${qty}"
                        class="qty-input"
                        data-name="${food.en}"
                    >

                    <button
                        class="plus-btn"
                        data-name="${food.en}"
                    >
                        +
                    </button>

                </div>

            </div>
        `;

        fragment.appendChild(card);

    });

    foodsGrid.appendChild(fragment);

}