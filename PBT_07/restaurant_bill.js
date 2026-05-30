
const menuItems = [
    { name: "Phở bò", price: 65000, quantity: 2 },
    { name: "Trà đá", price: 5000, quantity: 3 },
    { name: "Bún chả", price: 55000, quantity: 1 }
];

const isWednesday = true; // Thứ 4 = false, Thứ 3 = true
const hasTip = true;

// Hàm định dạng tiền
function formatMoney(amount) {
    return amount.toLocaleString("vi-VN") + "đ";
}

// Tính tổng tiền món ăn
let subtotal = 0;

for (let i = 0; i < menuItems.length; i++) {
    subtotal += menuItems[i].price * menuItems[i].quantity;
}

// Tính giảm giá
let discountPercent = 0;

if (subtotal > 1000000) {
    discountPercent = 15;
} else if (subtotal > 500000) {
    discountPercent = 10;
}

if (isWednesday) {
    discountPercent += 5;
}

const discountAmount = subtotal * discountPercent / 100;
const afterDiscount = subtotal - discountAmount;

// VAT 8%
const vat = afterDiscount * 0.08;

// Tip 5%
const tip = hasTip ? afterDiscount * 0.05 : 0;

// Tổng thanh toán
const totalPayment = afterDiscount + vat + tip;

// In hóa đơn
console.log("╔════════════════════════════════════════════════════╗");
console.log("║                 HÓA ĐƠN NHÀ HÀNG                 ║");
console.log("╠════════════════════════════════════════════════════╣");

for (let i = 0; i < menuItems.length; i++) {
    const item = menuItems[i];
    const itemTotal = item.price * item.quantity;

    console.log(
        `║ ${i + 1}. ${item.name.padEnd(12)} x${item.quantity} @${Math.round(item.price / 1000)}k = ${Math.round(itemTotal / 1000)}k`.padEnd(51) + "║"
    );
}

console.log("╠════════════════════════════════════════════════════╣");
console.log(`║ Tổng cộng:           ${formatMoney(subtotal).padStart(20)} ║`);
console.log(`║ Giảm giá (${discountPercent}%):    ${formatMoney(discountAmount).padStart(20)} ║`);
console.log(`║ VAT (8%):            ${formatMoney(vat).padStart(20)} ║`);
console.log(`║ Tip (5%):            ${formatMoney(tip).padStart(20)} ║`);
console.log("╠════════════════════════════════════════════════════╣");
console.log(`║ THANH TOÁN:          ${formatMoney(totalPayment).padStart(20)} ║`);
console.log("╚════════════════════════════════════════════════════╝");
