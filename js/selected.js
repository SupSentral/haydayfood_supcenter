// ==========================================
// selected.js
// Mengelola Item yang Dipilih
// ==========================================

import { foodsData } from "./data.js";
import { renderFoods } from "./render.js";
import { renderSelectedCount } from "./statistics.js";
import { saveSelectedFoods, clearSelectedFoods } from "./storage.js";

export let selectedFoods = {};

// ==========================================
// INIT
// ==========================================

export function initSelected() {

    // Tombol + dan -
    document.addEventListener("click", (e) => {

        if (e.target.classList.contains("plus-btn")) {

            const name = e.target.dataset.name;

            changeQty(name, 10);

        }

        if (e.target.classList.contains("minus-btn")) {

            const name = e.target.dataset.name;

            changeQty(name, -5);

        }

    });

    // Input manual
    document.addEventListener("input", (e) => {

        if (!e.target.classList.contains("qty-input")) return;

        const name = e.target.dataset.name;

        let qty = parseInt(e.target.value);

        if (isNaN(qty)) qty = 0;

        updateQty(name, qty);

    });

        const priceInput = document.getElementById("foodPrice");

        if(priceInput){

        priceInput.addEventListener("input",()=>{

        renderSelected();

    });

}
}

// ==========================================
// Tambah / Kurang
// ==========================================

function changeQty(name, amount) {

    const qty = (selectedFoods[name] || 0) + amount;

    updateQty(name, qty);

}

// ==========================================
// Update Qty
// ==========================================

function updateQty(name, qty) {

    if (qty <= 0) {

        delete selectedFoods[name];

    } else {

        selectedFoods[name] = qty;

    }

    refreshUI();

}

// ==========================================
// Refresh Semua
// ==========================================

function refreshUI() {

    renderFoods(foodsData, selectedFoods);

    renderSelected();

    renderSelectedCount(selectedFoods);

    saveSelectedFoods(selectedFoods);

}

// ==========================================
// Render List
// ==========================================

export function renderSelected(){

    const selectedList=document.getElementById("selectedList");

    if(!selectedList) return;

    const entries=Object.entries(selectedFoods);

    if(entries.length===0){

        selectedList.innerHTML=`

            <div class="empty">

                Belum ada item dipilih.

            </div>

        `;

        return;

    }

    let html="";

    let totalFood=0;

    entries
    .sort((a,b)=>a[0].localeCompare(b[0]))
    .forEach(([name,qty])=>{

        totalFood+=qty;

        html+=`

            <div class="selected-item">

                <span>${name}</span>

                <strong>x${qty}</strong>

            </div>

        `;

    });

    const price=parseInt(document.getElementById("foodPrice").value)||35;
    
    const totalHarga=totalFood*price;

    html += `

<div class="summary">

    <div class="summary-card">

        <div class="summary-title">

            📊 Ringkasan Pesanan

        </div>

        <div class="summary-row">

            <span>Total Food</span>

            <strong>${totalFood}</strong>

        </div>
        
        <div class="summary-divider"></div>

        <div class="grand-total">

            Rp ${totalHarga.toLocaleString("id-ID")}

        </div>

    </div>

</div>

`;

    selectedList.innerHTML=html;

}

// ==========================================
// Reset
// ==========================================

export function resetSelected() {

    selectedFoods = {};
    clearSelectedFoods();

    refreshUI();

}

// ==========================================
// Getter
// ==========================================

export function getSelectedFoods() {

    return selectedFoods;

}

// ==========================================
// TOGGLE LIST
// ==========================================

export function initToggleSelected(){

    const btn = document.getElementById("toggleSelected");

    const list = document.getElementById("selectedList");

    if(!btn || !list) return;

    list.classList.add("closed");

    btn.addEventListener("click",()=>{

        list.classList.toggle("closed");

        list.classList.toggle("open");

        btn.textContent =

            list.classList.contains("closed")

            ? "▼"

            : "►";

    });

}
