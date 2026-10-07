let cart = [];
const whatsappNumber = "212600000000"; // ⚠️ ضع رقمك هنا بدون مفتاح +

function toggleCart() {
    const drawer = document.getElementById('cart-drawer');
    drawer.classList.toggle('hidden');
    setTimeout(() => drawer.classList.toggle('-translate-x-full'), 10);
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);
    
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartUI();
}

function updateCartUI() {
    const container = document.getElementById('cart-items');
    const countEl = document.getElementById('cart-count');
    const totalEl = document.getElementById('cart-total');
    
    if (cart.length === 0) {
        container.innerHTML = '<p class="text-gray-400 text-center py-8">السلة فارغة.</p>';
        countEl.innerText = 0;
        totalEl.innerText = '0 درهم';
        return;
    }

    container.innerHTML = '';
    let total = 0, count = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        count += item.quantity;
        container.innerHTML += `
            <div class="flex justify-between items-center bg-stone-50 p-3 rounded-lg border">
                <div>
                    <h4 class="font-bold text-sm">${item.name}</h4>
                    <p class="text-xs text-gray-500">${item.price} د.م × ${item.quantity}</p>
                </div>
                <span class="font-bold text-sm text-amber-800">${item.price * item.quantity} د.م</span>
            </div>
        `;
    });

    countEl.innerText = count;
    totalEl.innerText = total + ' درهم';
}

function checkoutWhatsApp() {
    if (cart.length === 0) return alert('السلة فارغة!');
    let msg = "مرحباً، أريد طلب التحف التالية:\n\n";
    let total = 0;
    cart.forEach(item => {
        msg += `🕰️ *${item.name}* (الكمية: ${item.quantity}) -> ${item.price * item.quantity} درهم\n`;
        total += item.price * item.quantity;
    });
    msg += `\n💰 *المجموع الإجمالي: ${total} درهم*`;
    window.open(`https://wa.me{whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
}
