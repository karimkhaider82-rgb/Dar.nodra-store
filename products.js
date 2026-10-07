// مصفوفة المنتجات: يمكنك تعديل، حذف، أو إضافة أي منتج هنا مستقبلاً
const products = [
    {
        id: 1,
        name: "ساعة جيب كلاسيكية ميكانيكية",
        category: "watches",
        price: 450,
        description: "ساعة جيب نحاسية عتيقة تعمل بنظام التعبئة اليدوية.",
        image: "https://unsplash.com",
        externalLink: "https://amazon.com" // 👈 رابط المنتج على أمازون إذا كنت تبيعه هناك أيضاً
    },
    {
        id: 2,
        name: "فانوس ديكور نحاسي عتيق",
        category: "decor",
        price: 299,
        description: "فانوس مصنوع يدوياً يضفي لمسة دافئة وتاريخية على بيتك.",
        image: "https://unsplash.com",
        externalLink: "" // اتركه فارغاً إذا كنت تبيعه في متجرك فقط
    },
    {
        id: 3,
        name: "آلة كاتبة قديمة من طراز 1950",
        category: "antiques",
        price: 1200,
        description: "آلة كاتبة ملكية أثرية صالحة للعمل بحالة ممتازة جداً.",
        image: "https://unsplash.com",
        externalLink: "https://ebay.com" // 👈 رابط المنتج على إيباي مثلاً
    }
];

// دالة عرض المنتجات في الصفحة الرئيسية
function displayProducts(productsToRender) {
    const grid = document.getElementById('products-grid');
    if (!grid) return;
    grid.innerHTML = '';

    productsToRender.forEach(product => {
        // التحقق مما إذا كان المنتج مربوطاً بمتجر خارجي كأمازون
        const actionButton = product.externalLink 
            ? `<a href="${product.externalLink}" target="_blank" class="w-full text-center bg-amber-700 text-white text-sm px-3 py-2 rounded-md hover:bg-amber-800 transition block">شراء من أمازون/المنصة</a>`
            : `<button onclick="addToCart(${product.id})" class="bg-gray-900 text-white text-sm px-3 py-2 rounded-md hover:bg-gray-800 transition">إضافة للسلة</button>`;

        grid.innerHTML += `
            <div class="product-card bg-white rounded-xl overflow-hidden border border-amber-100/50 shadow-sm flex flex-col justify-between">
                <div>
                    <img src="${product.image}" alt="${product.name}" class="w-full h-56 object-cover">
                    <div class="p-5">
                        <span class="text-xs font-bold text-amber-700 uppercase tracking-wide">${translateCategory(product.category)}</span>
                        <h3 class="font-serif font-bold text-lg text-gray-950 mt-1 mb-2">${product.name}</h3>
                        <p class="text-gray-500 text-xs line-clamp-2">${product.description}</p>
                    </div>
                </div>
                <div class="p-5 pt-0 flex justify-between items-center gap-2">
                    <span class="text-amber-900 font-bold text-lg">${product.price} درهم</span>
                    ${actionButton}
                </div>
            </div>
        `;
    });
}

function translateCategory(cat) {
    if(cat === 'watches') return 'ساعات يدوية';
    if(cat === 'decor') return 'ديكور عتيق';
    return 'تحف قديمة';
}

function filterCategory(category) {
    if (category === 'all') {
        displayProducts(products);
    } else {
        const filtered = products.filter(p => p.category === category);
        displayProducts(filtered);
    }
}

// تشغيل العرض عند تحميل الصفحة
window.onload = () => { displayProducts(products); };
