// =====================
// DATA
// =====================

const products = [
    { id:1,name:"iPhone 16",price:25990000,category:"phone",image:"https://placehold.co/200",rating:4.8,inStock:true },
    { id:2,name:"Samsung S25",price:22990000,category:"phone",image:"https://placehold.co/200",rating:4.7,inStock:true },
    { id:3,name:"Xiaomi 15",price:15990000,category:"phone",image:"https://placehold.co/200",rating:4.5,inStock:true },

    { id:4,name:"MacBook Air M4",price:32990000,category:"laptop",image:"https://placehold.co/200",rating:4.9,inStock:true },
    { id:5,name:"Dell XPS 15",price:35990000,category:"laptop",image:"https://placehold.co/200",rating:4.6,inStock:true },
    { id:6,name:"Asus Vivobook",price:18990000,category:"laptop",image:"https://placehold.co/200",rating:4.3,inStock:true },

    { id:7,name:"AirPods Pro",price:5990000,category:"audio",image:"https://placehold.co/200",rating:4.8,inStock:true },
    { id:8,name:"Sony WH1000XM5",price:7990000,category:"audio",image:"https://placehold.co/200",rating:4.9,inStock:true },
    { id:9,name:"JBL Tune",price:1990000,category:"audio",image:"https://placehold.co/200",rating:4.2,inStock:true },

    { id:10,name:"Apple Watch",price:9990000,category:"watch",image:"https://placehold.co/200",rating:4.8,inStock:true },
    { id:11,name:"Galaxy Watch",price:7990000,category:"watch",image:"https://placehold.co/200",rating:4.5,inStock:true },
    { id:12,name:"Xiaomi Watch",price:2990000,category:"watch",image:"https://placehold.co/200",rating:4.1,inStock:true }
];

let currentProducts = [...products];
let cartCount = 0;

// =====================
// UI
// =====================

const container = document.createElement("div");
container.className = "container";

container.innerHTML = `
<div class="topbar">
    <input id="searchInput" placeholder="Search...">
    
    <select id="sortSelect">
        <option value="">Sort</option>
        <option value="priceAsc">Giá tăng</option>
        <option value="priceDesc">Giá giảm</option>
        <option value="name">Tên A-Z</option>
        <option value="rating">Đánh giá cao nhất</option>
    </select>

    <button id="darkBtn">🌙 Dark Mode</button>
</div>

<div class="categories">
    <button data-category="all">All</button>
    <button data-category="phone">Phone</button>
    <button data-category="laptop">Laptop</button>
    <button data-category="audio">Audio</button>
    <button data-category="watch">Watch</button>
</div>

<div id="productContainer" class="products"></div>

<div class="badge-cart" id="cartBadge">0</div>

<div id="modal" class="modal hidden">
    <div class="modal-content">
        <div id="modalBody"></div>
        <button id="closeModal">Close</button>
    </div>
</div>
`;

document.body.appendChild(container);

const productContainer =
    document.getElementById("productContainer");

// =====================
// RENDER
// =====================

function renderProducts(data){

    productContainer.innerHTML = "";

    data.forEach(product=>{

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${product.image}">
            <div class="card-body">
                <h3>${product.name}</h3>
                <p class="price">
                    ${product.price.toLocaleString("vi-VN")}đ
                </p>
                <p>⭐ ${product.rating}</p>
                <button class="add-cart">
                    Thêm giỏ
                </button>
            </div>
        `;

        card.addEventListener("click",(e)=>{

            if(e.target.classList.contains("add-cart")){
                e.stopPropagation();

                cartCount++;

                document.getElementById("cartBadge")
                    .textContent = cartCount;

                return;
            }

            openModal(product);
        });

        productContainer.appendChild(card);
    });
}

// =====================
// SEARCH
// =====================

function searchProducts(keyword){

    currentProducts = products.filter(product =>
        product.name
        .toLowerCase()
        .includes(keyword.toLowerCase())
    );

    renderProducts(currentProducts);
}

// =====================
// FILTER
// =====================

function filterByCategory(category){

    if(category === "all"){
        currentProducts = [...products];
    }else{
        currentProducts = products.filter(
            p => p.category === category
        );
    }

    renderProducts(currentProducts);
}

// =====================
// SORT
// =====================

function sortProducts(type){

    const data = [...currentProducts];

    switch(type){

        case "priceAsc":
            data.sort((a,b)=>a.price-b.price);
            break;

        case "priceDesc":
            data.sort((a,b)=>b.price-a.price);
            break;

        case "name":
            data.sort((a,b)=>
                a.name.localeCompare(b.name)
            );
            break;

        case "rating":
            data.sort((a,b)=>
                b.rating-a.rating
            );
            break;
    }

    renderProducts(data);
}

// =====================
// MODAL
// =====================

function openModal(product){

    const modal =
        document.getElementById("modal");

    const body =
        document.getElementById("modalBody");

    body.innerHTML = `
        <h2>${product.name}</h2>
        <img src="${product.image}">
        <p>Price:
            ${product.price.toLocaleString("vi-VN")}đ
        </p>
        <p>Rating: ${product.rating}</p>
        <p>
            ${product.inStock ? "Còn hàng" : "Hết hàng"}
        </p>
    `;

    modal.classList.remove("hidden");
}

// =====================
// EVENTS
// =====================

document
.getElementById("searchInput")
.addEventListener("input",(e)=>{
    searchProducts(e.target.value);
});

document
.querySelector(".categories")
.addEventListener("click",(e)=>{

    if(e.target.dataset.category){
        filterByCategory(
            e.target.dataset.category
        );
    }
});

document
.getElementById("sortSelect")
.addEventListener("change",(e)=>{
    sortProducts(e.target.value);
});

document
.getElementById("closeModal")
.addEventListener("click",()=>{
    document
    .getElementById("modal")
    .classList.add("hidden");
});

document
.getElementById("darkBtn")
.addEventListener("click",()=>{

    document.body
    .classList.toggle("dark-mode");
});

// =====================

renderProducts(products);
