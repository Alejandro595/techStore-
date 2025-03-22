// script.js
const products = [
    { id: 1, name: "Laptop HP", category: "laptop", price: 800, discount: 10, image: "https://www.asus.com/media/Odin/Websites/global/Series/24.png" },
    { id: 2, name: "Smartphone Samsung", category: "smartphone", price: 500, discount: 15, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5T89EjuRSmj9DFIzOvMmreVVpbuWpumBB0Q&s" },
    { id: 3, name: "Laptop Dell", category: "laptop", price: 900, discount: 5, image: "https://m.media-amazon.com/images/I/71gFkTZ1YmL.jpg" },
    { id: 4, name: "Smartphone Xiaomi", category: "smartphone", price: 300, discount: 20, image: "https://technologystore2006.com/wp-content/uploads/2022/02/xiamomi-note11-azul-128.webp" },
    { id: 5, name: "Tablet iPad", category: "tablet", price: 600, discount: 10, image: "https://m.media-amazon.com/images/I/91xk0o++tdL.jpg" },
    { id: 6, name: "Auriculares Bluetooth", category: "accesorios", price: 80, discount: 10, image: "https://http2.mlstatic.com/D_NQ_NP_833941-MLU78764933573_082024-O.webp" }
];

const productList = document.getElementById("productList");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const searchBar = document.getElementById("searchBar");
const categoryFilter = document.getElementById("categoryFilter");
const categoryButtons = document.querySelectorAll(".filterBtn");

let cart = [];

function displayProducts(filteredProducts = products) {
    productList.innerHTML = "";
    filteredProducts.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");
        const discountedPrice = product.price - (product.price * product.discount / 100);
        
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Precio: <s>$${product.price}</s> <strong style="color:red;">$${discountedPrice.toFixed(2)}</strong></p>
            <button onclick="addToCart(${product.id})">Añadir al carrito</button>
        `;
        productList.appendChild(productElement);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
}

function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(product => {
        const discountedPrice = product.price - (product.price * product.discount / 100);
        total += discountedPrice * product.quantity;

        const li = document.createElement("li");
        li.innerHTML = `${product.name} (x${product.quantity}) - $${(discountedPrice * product.quantity).toFixed(2)}
                        <button onclick="removeFromCart(${product.id})">🗑</button>`;
        cartItems.appendChild(li);
    });

    cartTotal.textContent = total.toFixed(2);
}

function removeFromCart(productId) {
    const productIndex = cart.findIndex(p => p.id === productId);
    if (productIndex !== -1) {
        if (cart[productIndex].quantity > 1) {
            cart[productIndex].quantity -= 1;
        } else {
            cart.splice(productIndex, 1);
        }
    }
    updateCart();
}

searchBar.addEventListener("input", () => {
    const searchText = searchBar.value.toLowerCase();
    const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchText));
    displayProducts(filteredProducts);
});

categoryFilter.addEventListener("change", () => {
    const selectedCategory = categoryFilter.value;
    const filteredProducts = selectedCategory === "all" ? products : products.filter(p => p.category === selectedCategory);
    displayProducts(filteredProducts);
});

categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
        const category = button.dataset.category;
        const filteredProducts = products.filter(p => p.category === category);
        displayProducts(filteredProducts);
    });
});

// Inicializar productos en la página
displayProducts();
