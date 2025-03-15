document.addEventListener("DOMContentLoaded", () => {
    const pizzas = [
        {
            "nombre": "Margherita",
            "descripcion": "Tomate, mozzarella fresca y albahaca",
            "precio": "$8.99",
            "imagen": "../images/margarita.png",
            "cantidad": 0
        },
        {
            "nombre": "Pepperoni",
            "descripcion": "Tomate, mozzarella y pepperoni italiano",
            "precio": "$10.99",
            "imagen": "../images/pepperoni.png",
            "cantidad": 0
        },
        {
            "nombre": "Prosciutto",
            "descripcion": "Tomate, mozzarella, jamón y rúcula",
            "precio": "$12.99",
            "imagen": "../images/prosciutto.png",
            "cantidad": 0
        },
        {
            "nombre": "Cuatro Quesos",
            "descripcion": "Mozzarella, gorgonzola, parmesano y queso de cabra",
            "precio": "$13.99",
            "imagen": "../images/quesos.png",
            "cantidad": 0
        },
        {
            "nombre": "Hawaiana",
            "descripcion": "Tomate, mozzarella, jamón y piña",
            "precio": "$11.99",
            "imagen": "../images/hawaiana.png",
            "cantidad": 0
        },
        {
            "nombre": "BBQ Chicken",
            "descripcion": "Pollo a la BBQ, mozzarella y cebolla morada",
            "precio": "$14.99",
            "imagen": "../images/chicken.png",
            "cantidad": 0
        },
        {
            "nombre": "Vegetariana",
            "descripcion": "Tomate, mozzarella, champiñones, pimientos y aceitunas",
            "precio": "$9.99",
            "imagen": "../images/vegetariana.png",
            "cantidad": 0
        }
    ];
    
    const pizzaContainer = document.querySelector(".pizza-cards");
    pizzaContainer.innerHTML = "";

    pizzas.slice(0, 3).forEach(pizza => {
        const pizzaCard = document.createElement("div");
        pizzaCard.classList.add("pizza-card");
        pizzaCard.innerHTML = `
            <img src="${pizza.imagen}" alt="${pizza.nombre}" class="pizza-img">
            <h3>${pizza.nombre}</h3>
            <p>${pizza.descripcion}</p>
            <span class="price">${pizza.precio}</span>
        `;
        pizzaContainer.appendChild(pizzaCard);
    });

    const testimonios = [
        {
            mensaje: "La mejor pizza que he probado fuera de Italia. ¡Los ingredientes son de primera calidad!",
            cliente: "Lua."
        },
        {
            mensaje: "El ambiente, el servicio y la comida son excelentes. Venimos cada fin de semana.",
            cliente: "Cesar F."
        },
        {
            mensaje: "Su masa es perfecta, fina y crujiente. La masa fermentada 48 horas hace toda la diferencia.",
            cliente: "Kelly M."
        }
    ];

    const testimoniosContainer = document.querySelector(".testimonios-container");
    testimoniosContainer.innerHTML = "";

    testimonios.forEach(testimonio => {
        const testimonioDiv = document.createElement("div");
        testimonioDiv.classList.add("testimonio");
        testimonioDiv.innerHTML = `
            <p>"${testimonio.mensaje}"</p>
            <span class="cliente">- ${testimonio.cliente}</span>
        `;
        testimoniosContainer.appendChild(testimonioDiv);
    });

    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    menuToggle.addEventListener("click", function () {
        navMenu.classList.toggle("active");
    });
});