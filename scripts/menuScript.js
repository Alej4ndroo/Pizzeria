document.addEventListener("DOMContentLoaded", () => {
    const pizzas = [
        {
            "nombre": "Margherita",
            "descripcion": "Tomate, mozzarella fresca y albahaca",
            "precio": "$8.99",
            "imagen": "../images/margarita.png",
            "cantidad": 5 // Cantidad inicial
        },
        {
            "nombre": "Pepperoni",
            "descripcion": "Tomate, mozzarella y pepperoni italiano",
            "precio": "$10.99",
            "imagen": "../images/pepperoni.png",
            "cantidad": 3 // Cantidad inicial
        },
        {
            "nombre": "Prosciutto",
            "descripcion": "Tomate, mozzarella, jamón y rúcula",
            "precio": "$12.99",
            "imagen": "../images/prosciutto.png",
            "cantidad": 2 // Cantidad inicial
        },
        {
            "nombre": "Cuatro Quesos",
            "descripcion": "Mozzarella, gorgonzola, parmesano y queso de cabra",
            "precio": "$13.99",
            "imagen": "../images/cuatroquesos.png",
            "cantidad": 4 // Cantidad inicial
        },
        {
            "nombre": "Hawaiana",
            "descripcion": "Tomate, mozzarella, jamón y piña",
            "precio": "$11.99",
            "imagen": "../images/hawaiana.png",
            "cantidad": 0 // Cantidad inicial
        },
        {
            "nombre": "BBQ Chicken",
            "descripcion": "Pollo a la BBQ, mozzarella y cebolla morada",
            "precio": "$14.99",
            "imagen": "../images/bbqchicken.png",
            "cantidad": 1 // Cantidad inicial
        },
        {
            "nombre": "Vegetariana",
            "descripcion": "Tomate, mozzarella, champiñones, pimientos y aceitunas",
            "precio": "$9.99",
            "imagen": "../images/vegetariana.png",
            "cantidad": 6 // Cantidad inicial
        },
        {
            "nombre": "Carbonara",
            "descripcion": "Salsa de crema, panceta, huevo y queso parmesano",
            "precio": "$13.99",
            "imagen": "../images/carbonara.png",
            "cantidad": 5 // Cantidad inicial
        },
        {
            "nombre": "Marinera",
            "descripcion": "Mariscos frescos, tomate y ajo",
            "precio": "$15.99",
            "imagen": "../images/marinera.png",
            "cantidad": 4 // Cantidad inicial
        },
        {
            "nombre": "Mexicana",
            "descripcion": "Carne picada, jalapeños, cebolla y queso",
            "precio": "$12.99",
            "imagen": "../images/mexicana.png",
            "cantidad": 3 // Cantidad inicial
        },
        {
            "nombre": "Napolitana",
            "descripcion": "Tomate, mozzarella, albahaca y aceite de oliva",
            "precio": "$11.99",
            "imagen": "../images/napolitana.png",
            "cantidad": 2 // Cantidad inicial
        }
    ];

    const pizzaContainer = document.querySelector(".pizza-cards");
    const modal = document.getElementById("modal");
    const closeModalButton = document.querySelector(".close-btn");
    pizzaContainer.innerHTML = ""; // Limpiar el contenedor

    // Generar las tarjetas de pizza
    pizzas.forEach(pizza => {
        const pizzaCard = document.createElement("div");
        pizzaCard.classList.add("pizza-card");
        pizzaCard.innerHTML = `
            <img src="${pizza.imagen}" alt="${pizza.nombre}" class="pizza-img">
            <h3>${pizza.nombre}</h3>
            <p>${pizza.descripcion}</p>
            <span class="price">${pizza.precio}</span>
            <div>
                <button class="btn-add" data-nombre="${pizza.nombre}">Agregar al Carrito</button>
                <br>
                <span class="cantidad" style="font-weight: bold;">
            <i class="fas fa-pizza-slice" style="color: gray;"></i> 
            <span class="cantidad-value">${pizza.cantidad}</span>
        </span>
            </div>
        `;
        pizzaContainer.appendChild(pizzaCard);

        // Agregar evento al botón de agregar al carrito
        const addButton = pizzaCard.querySelector(".btn-add");
        const cantidadValue = pizzaCard.querySelector(".cantidad-value");

        addButton.addEventListener("click", () => {
            if (pizza.cantidad > 0) {
                pizza.cantidad -= 1; // Decrementar la cantidad de la pizza
                cantidadValue.textContent = pizza.cantidad; // Actualizar el contador en la tarjeta
                console.log(`${pizza.nombre} agregado al carrito. Cantidad restante: ${pizza.cantidad}`);
            } else {
                showModal(); // Mostrar el modal si no hay más pizzas disponibles
            }
        });
    });

    // Función para mostrar el modal
    function showModal() {
        modal.style.display = "block"; // Mostrar el modal
    }

    // Evento para cerrar el modal
    closeModalButton.addEventListener("click", () => {
        modal.style.display = "none"; // Ocultar el modal
    });

    // Cerrar el modal si se hace clic fuera del contenido del modal
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none"; // Ocultar el modal
        }
    });
});