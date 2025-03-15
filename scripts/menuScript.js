document.addEventListener("DOMContentLoaded", () => {
    const pizzas = [
        {
            "id": 1,
            "nombre": "Margherita",
            "descripcion": "Tomate, mozzarella fresca y albahaca",
            "precio": "$8.99",
            "precioNumerico": 8.99,
            "imagen": "../images/margarita.png",
            "cantidad": 5 // Cantidad inicial
        },
        {
            "id": 2,
            "nombre": "Pepperoni",
            "descripcion": "Tomate, mozzarella y pepperoni italiano",
            "precio": "$10.99",
            "precioNumerico": 10.99,
            "imagen": "../images/pepperoni.png",
            "cantidad": 3 // Cantidad inicial
        },
        {
            "id": 3,
            "nombre": "Prosciutto",
            "descripcion": "Tomate, mozzarella, jamón y rúcula",
            "precio": "$12.99",
            "precioNumerico": 12.99,
            "imagen": "../images/prosciutto.png",
            "cantidad": 2 // Cantidad inicial
        },
        {
            "id": 4,
            "nombre": "Cuatro Quesos",
            "descripcion": "Mozzarella, gorgonzola, parmesano y queso de cabra",
            "precio": "$13.99",
            "precioNumerico": 13.99,
            "imagen": "../images/cuatroquesos.png",
            "cantidad": 4 // Cantidad inicial
        },
        {
            "id": 5,
            "nombre": "Hawaiana",
            "descripcion": "Tomate, mozzarella, jamón y piña",
            "precio": "$11.99",
            "precioNumerico": 11.99,
            "imagen": "../images/hawaiana.png",
            "cantidad": 0 // Cantidad inicial
        },
        {
            "id": 6,
            "nombre": "BBQ Chicken",
            "descripcion": "Pollo a la BBQ, mozzarella y cebolla morada",
            "precio": "$14.99",
            "precioNumerico": 14.99,
            "imagen": "../images/bbqchicken.png",
            "cantidad": 1 // Cantidad inicial
        },
        {
            "id": 7,
            "nombre": "Vegetariana",
            "descripcion": "Tomate, mozzarella, champiñones, pimientos y aceitunas",
            "precio": "$9.99",
            "precioNumerico": 9.99,
            "imagen": "../images/vegetariana.png",
            "cantidad": 6 // Cantidad inicial
        },
        {
            "id": 8,
            "nombre": "Carbonara",
            "descripcion": "Salsa de crema, panceta, huevo y queso parmesano",
            "precio": "$13.99",
            "precioNumerico": 13.99,
            "imagen": "../images/carbonara.png",
            "cantidad": 5 // Cantidad inicial
        },
        {
            "id": 9,
            "nombre": "Marinera",
            "descripcion": "Mariscos frescos, tomate y ajo",
            "precio": "$15.99",
            "precioNumerico": 15.99,
            "imagen": "../images/marinera.png",
            "cantidad": 4 // Cantidad inicial
        },
        {
            "id": 10,
            "nombre": "Mexicana",
            "descripcion": "Carne picada, jalapeños, cebolla y queso",
            "precio": "$12.99",
            "precioNumerico": 12.99,
            "imagen": "../images/mexicana.png",
            "cantidad": 3 // Cantidad inicial
        },
        {
            "id": 11,
            "nombre": "Napolitana",
            "descripcion": "Tomate, mozzarella, albahaca y aceite de oliva",
            "precio": "$11.99",
            "precioNumerico": 11.99,
            "imagen": "../images/napolitana.png",
            "cantidad": 2 // Cantidad inicial
        }
    ];

    // Guardar el inventario en localStorage para que sea accesible desde otras páginas
    localStorage.setItem('pizzasInventario', JSON.stringify(pizzas));

    const pizzaContainer = document.querySelector(".pizza-cards");
    const modal = document.getElementById("modal");
    const closeModalButton = document.querySelector(".close-btn");
    pizzaContainer.innerHTML = ""; // Limpiar el contenedor

    // Inicializar carrito en localStorage si no existe
    if (!localStorage.getItem('carrito')) {
        localStorage.setItem('carrito', JSON.stringify([]));
    }

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
                <button class="btn-add" data-id="${pizza.id}">Agregar al Carrito</button>
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
                // Decrementar la cantidad de la pizza
                pizza.cantidad -= 1; 
                cantidadValue.textContent = pizza.cantidad;
                
                // Actualizar el inventario en localStorage
                localStorage.setItem('pizzasInventario', JSON.stringify(pizzas));
                
                // Añadir al carrito en localStorage
                const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
                
                // Verificar si la pizza ya está en el carrito
                const pizzaEnCarrito = carrito.find(item => item.id === pizza.id);
                
                if (pizzaEnCarrito) {
                    // Si ya está, aumentamos su cantidad
                    pizzaEnCarrito.cantidadEnCarrito += 1;
                } else {
                    // Si no está, la añadimos con cantidad 1
                    carrito.push({
                        id: pizza.id,
                        nombre: pizza.nombre,
                        precio: pizza.precio,
                        precioNumerico: pizza.precioNumerico,
                        imagen: pizza.imagen,
                        cantidadEnCarrito: 1
                    });
                }
                
                // Guardar el carrito actualizado
                localStorage.setItem('carrito', JSON.stringify(carrito));
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

    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    menuToggle.addEventListener("click", function () {
        navMenu.classList.toggle("active");
    });
});