let cart = [];

// Função para adicionar um produto ao carrinho
function addToCart(id, name, price) {
    const product = { id, name, price: parseFloat(price) };

    // Verifica se o produto já está no carrinho
    const existingProduct = cart.find(item => item.id === id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }

    updateCart();
}

// Função para remover um produto do carrinho
function removeFromCart(id) {
    cart = cart.filter(product => product.id !== id);
    updateCart();
}

// Função para atualizar o carrinho na tela
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    cartItems.innerHTML = ''; // Limpa os itens do carrinho

    let total = 0;

    cart.forEach(product => {
        total += product.price * product.quantity;

        const li = document.createElement('li');
        li.innerHTML = `
            ${product.name} - R$ ${product.price.toFixed(2)} x ${product.quantity}
            <button class="remove-from-cart" data-id="${product.id}">Remover</button>
        `;

        cartItems.appendChild(li);
    });

    cartTotal.textContent = `Total: R$ ${total.toFixed(2)}`;

    // Adiciona o evento de remoção para os botões "Remover"
    const removeFromCartButtons = document.querySelectorAll('.remove-from-cart');
    removeFromCartButtons.forEach(button => {
        button.addEventListener('click', event => {
            const productId = event.target.dataset.id;
            removeFromCart(productId);
        });
    });
}

// Evento para o botão de finalizar compra (checkout)
document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('O carrinho está vazio!');
        return;
    }

    alert('Compra finalizada!');
    cart = []; // Limpa o carrinho
    updateCart();
});
