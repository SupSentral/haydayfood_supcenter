// ==========================================
// storage.js
// Local Storage
// ==========================================

const STORAGE_KEY = "SUPCENTER_HAYDAY_SELECTED";

// ==========================================
// Simpan Data
// ==========================================

export function saveSelectedFoods(selectedFoods) {

    try {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(selectedFoods)
        );

    } catch (error) {

        console.error("Gagal menyimpan data:", error);

    }

}

// ==========================================
// Load Data
// ==========================================

export function loadSelectedFoods() {

    try {

        const data = localStorage.getItem(STORAGE_KEY);

        if (!data) {

            return {};

        }

        return JSON.parse(data);

    } catch (error) {

        console.error("Gagal membaca data:", error);

        return {};

    }

}

// ==========================================
// Hapus Data
// ==========================================

export function clearSelectedFoods() {

    localStorage.removeItem(STORAGE_KEY);

}