// ==========================================
// clipboard.js
// ==========================================

import { selectedFoods } from "./selected.js";

export function initClipboard() {

    const copyBtn = document.getElementById("copyBtn");

    if (!copyBtn) return;

    copyBtn.addEventListener("click", () => {

        const entries = Object.entries(selectedFoods);

        if (entries.length === 0) {

            alert("Belum ada item dipilih.");

            return;

        }

        let totalFood = 0;

        let text = "📋 LIST FOOD HAY DAY\n\n";

        entries
            .sort((a, b) => a[0].localeCompare(b[0]))
            .forEach(([name, qty]) => {

                totalFood += qty;

                text += `${name} x${qty}\n`;

            });

        const price = Number(
            document.getElementById("foodPrice")?.value || 35
        );

        const totalHarga = totalFood * price;

        text += "\n────────────────────\n\n";

        text += `Total Food : ${totalFood}\n\n`;

        text += `Harga / Food : Rp${price.toLocaleString("id-ID")}\n\n`;

        text += "────────────────────\n\n";

        text += `TOTAL : Rp${totalHarga.toLocaleString("id-ID")}`;

        navigator.clipboard.writeText(text)
            .then(() => {

                copyBtn.textContent = "✅ Tersalin";

                setTimeout(() => {

                    copyBtn.textContent = "📄 Salin";

                }, 1500);

            })
            .catch(() => {

                alert("Gagal menyalin.");

            });

    });

}