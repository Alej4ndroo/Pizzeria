document.addEventListener("DOMContentLoaded", () => {
    // Elementos del DOM
    const carritoItems = document.querySelector(".carrito-items");
    const resumenItems = document.querySelector(".resumen-items");
    const subtotalElement = document.getElementById("subtotal");
    const impuestosElement = document.getElementById("impuestos");
    const envioElement = document.getElementById("envio");
    const totalElement = document.getElementById("total");
    const emptyCartMessage = document.querySelector(".empty-cart-message");
    const checkoutButton = document.getElementById("btn-checkout");
    const seguirComprandoButton = document.getElementById("btn-seguir-comprando");
    const modal = document.getElementById("modal");
    const closeModalBtn = document.querySelector(".close-btn");

    // Obtener carrito del localStorage
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let pizzasInventario = JSON.parse(localStorage.getItem('pizzasInventario')) || [];

    // Manejar el botón de seguir comprando
    seguirComprandoButton.addEventListener("click", () => {
        window.location.href = "menu.html";
    });

    // Función para actualizar la visualización del carrito
    function actualizarCarrito() {
        // Limpiar los contenedores
        carritoItems.innerHTML = '';
        resumenItems.innerHTML = '';

        // Si el carrito está vacío, mostrar mensaje
        if (carrito.length === 0) {
            emptyCartMessage.style.display = "block";
            checkoutButton.disabled = true;
            subtotalElement.textContent = "$0.00";
            impuestosElement.textContent = "$0.00";
            totalElement.textContent = "$0.00";
            return;
        }

        // Ocultar mensaje de carrito vacío
        emptyCartMessage.style.display = "none";
        checkoutButton.disabled = false;

        // Variables para cálculos
        let subtotal = 0;

        // Crear elementos para cada item en el carrito
        carrito.forEach(item => {
            // Crear elemento en la sección principal del carrito
            const carritoItem = document.createElement("div");
            carritoItem.classList.add("carrito-item");
            carritoItem.innerHTML = `
                <img src="${item.imagen}" alt="${item.nombre}" class="carrito-item-img">
                <div class="carrito-item-details">
                    <h3>${item.nombre}</h3>
                    <p>Precio: ${item.precio}</p>
                    <div class="cantidad-control">
                        <button class="btn-decrease" data-id="${item.id}">-</button>
                        <span class="cantidad-carrito">${item.cantidadEnCarrito}</span>
                        <button class="btn-increase" data-id="${item.id}">+</button>
                    </div>
                </div>
                <div class="carrito-item-total">
                    <p>$${(item.precioNumerico * item.cantidadEnCarrito).toFixed(2)}</p>
                    <button class="btn-remove" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            carritoItems.appendChild(carritoItem);

            // Crear elemento en el resumen
            const resumenItem = document.createElement("div");
            resumenItem.classList.add("resumen-item");
            resumenItem.innerHTML = `
                <p>${item.nombre} x${item.cantidadEnCarrito}</p>
                <p>$${(item.precioNumerico * item.cantidadEnCarrito).toFixed(2)}</p>
            `;
            resumenItems.appendChild(resumenItem);

            // Sumar al subtotal
            subtotal += item.precioNumerico * item.cantidadEnCarrito;
        });

        // Calcular impuestos y total
        const impuestos = subtotal * 0.10;
        const envio = 2.99;
        const total = subtotal + impuestos + envio;

        // Actualizar elementos del resumen
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        impuestosElement.textContent = `$${impuestos.toFixed(2)}`;
        envioElement.textContent = `$${envio.toFixed(2)}`;
        totalElement.textContent = `$${total.toFixed(2)}`;

        // Añadir event listeners a los botones de control de cantidad
        addEventListenersToButtons();
    }

    // Función para añadir event listeners a los botones de control
    function addEventListenersToButtons() {
        // Botones para disminuir cantidad
        document.querySelectorAll('.btn-decrease').forEach(button => {
            button.addEventListener('click', () => {
                const itemId = parseInt(button.getAttribute('data-id'));
                decrementarItem(itemId);
            });
        });

        // Botones para aumentar cantidad
        document.querySelectorAll('.btn-increase').forEach(button => {
            button.addEventListener('click', () => {
                const itemId = parseInt(button.getAttribute('data-id'));
                incrementarItem(itemId);
            });
        });

        // Botones para eliminar item
        document.querySelectorAll('.btn-remove').forEach(button => {
            button.addEventListener('click', () => {
                const itemId = parseInt(button.getAttribute('data-id'));
                eliminarItem(itemId);
            });
        });
    }

    // Función para decrementar la cantidad de un item
    function decrementarItem(itemId) {
        const itemIndex = carrito.findIndex(item => item.id === itemId);
        
        if (itemIndex !== -1) {
            // Si hay más de uno, decrementamos
            if (carrito[itemIndex].cantidadEnCarrito > 1) {
                carrito[itemIndex].cantidadEnCarrito -= 1;
                
                // Devolver uno al inventario
                const pizzaInventarioIndex = pizzasInventario.findIndex(pizza => pizza.id === itemId);
                if (pizzaInventarioIndex !== -1) {
                    pizzasInventario[pizzaInventarioIndex].cantidad += 1;
                    localStorage.setItem('pizzasInventario', JSON.stringify(pizzasInventario));
                }
            } else {
                // Si solo hay uno, lo eliminamos
                eliminarItem(itemId);
                return;
            }
            
            // Actualizar localStorage y visualización
            localStorage.setItem('carrito', JSON.stringify(carrito));
            actualizarCarrito();
        }
    }

    // Función para incrementar la cantidad de un item
    function incrementarItem(itemId) {
        const itemIndex = carrito.findIndex(item => item.id === itemId);
        
        // Verificar disponibilidad en inventario
        const pizzaInventarioIndex = pizzasInventario.findIndex(pizza => pizza.id === itemId);
        
        if (itemIndex !== -1 && pizzaInventarioIndex !== -1) {
            if (pizzasInventario[pizzaInventarioIndex].cantidad > 0) {
                // Incrementar en carrito
                carrito[itemIndex].cantidadEnCarrito += 1;
                
                // Decrementar en inventario
                pizzasInventario[pizzaInventarioIndex].cantidad -= 1;
                
                // Actualizar localStorage y visualización
                localStorage.setItem('carrito', JSON.stringify(carrito));
                localStorage.setItem('pizzasInventario', JSON.stringify(pizzasInventario));
                actualizarCarrito();
            } else {
                // Mostrar mensaje de no disponibilidad
                alert("Lo sentimos, no hay más unidades disponibles de esta pizza.");
            }
        }
    }

    // Función para eliminar un item completamente
    function eliminarItem(itemId) {
        const itemIndex = carrito.findIndex(item => item.id === itemId);
        
        if (itemIndex !== -1) {
            // Devolver unidades al inventario
            const cantidadADevolver = carrito[itemIndex].cantidadEnCarrito;
            const pizzaInventarioIndex = pizzasInventario.findIndex(pizza => pizza.id === itemId);
            
            if (pizzaInventarioIndex !== -1) {
                pizzasInventario[pizzaInventarioIndex].cantidad += cantidadADevolver;
                localStorage.setItem('pizzasInventario', JSON.stringify(pizzasInventario));
            }
            
            // Eliminar del carrito
            carrito.splice(itemIndex, 1);
            
            // Actualizar localStorage y visualización
            localStorage.setItem('carrito', JSON.stringify(carrito));
            actualizarCarrito();
        }
    }

    // Manejar el botón de checkout
    checkoutButton.addEventListener('click', () => {
        // Vaciar el carrito
        localStorage.setItem('carrito', JSON.stringify([]));
        carrito = [];
        
        // Mostrar modal de confirmación
        modal.style.display = 'block';
    });

    // Cerrar el modal
    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        // Redirigir a la página de inicio
        window.location.href = 'index.html';
    });

    // Cerrar el modal si se hace clic fuera del contenido
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            // Redirigir a la página de inicio
            window.location.href = 'index.html';
        }
    });

    // Inicializar carrito
    actualizarCarrito();
});