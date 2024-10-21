document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:5000/api/products')
        .then(response => {
            if (!response.ok) {
                console.log('Response status:', response.status);
                throw new Error('Erro ao buscar produtos');
            }
            return response.json();
        })
        .then(products => {
            const productList = document.getElementById('product-list');
            productList.innerHTML = ''; // Limpa o conteúdo anterior

            products.forEach(product => {
                // Cria um elemento para cada produto
                const productItem = document.createElement('div');
                productItem.classList.add('product-item');

                // Monta o HTML do produto
                productItem.innerHTML = `
                    <h2>${product.name}</h2>
                    <p>Preço: R$ ${product.price}</p>
                    <button class="add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">Adicionar ao carrinho</button>
                `;

                // Adiciona o item ao contêiner
                productList.appendChild(productItem);
            });

            // Adiciona evento para os botões "Adicionar ao carrinho"
            const addToCartButtons = document.querySelectorAll('.add-to-cart');
            addToCartButtons.forEach(button => {
                button.addEventListener('click', event => {
                    const productId = event.target.dataset.id;
                    const productName = event.target.dataset.name;
                    const productPrice = event.target.dataset.price;

                    // Chama a função para adicionar o produto ao carrinho
                    addToCart(productId, productName, productPrice);
                });
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
});


