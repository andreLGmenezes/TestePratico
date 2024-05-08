document.addEventListener('DOMContentLoaded', () => {
    const addForm = document.getElementById('formulario');
    const itemInput = document.getElementById('adiciona');
    const tableBody = document.getElementById('tabela');

    // Dados de exemplo
    let items = [
        { id: 1, name: 'Andre' },
        { id: 2, name: 'Luiz' },
        { id: 3, name: 'Menezes' },
    ];

    // Exibe itens na tabela
    function displayItems() {
        tableBody.innerHTML = '';
        items.forEach((item) => {
            const row = document.createElement('tr');
            row.id = `listaitens-${item.id}`;
            row.innerHTML = `
                <td>${item.name}</td>
                <td>
                    <button class="editar-btn" data-id="${item.id}">Editar</button>
                    <button class="delete-btn" data-id="${item.id}">Excluir</button>
              </td>
            `;

            // Adiciona ouvintes de eventos para botões de editar e excluir
            row.querySelector('.editar-btn').addEventListener('click', (e) => {
                editItem(e);
            });
            row.querySelector('.delete-btn').addEventListener('click', (e) => {
                deleteItem(e);
            });

            tableBody.appendChild(row);
        });
    }

    // Adiciona um item
    addForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newItem = {
            id: Date.now(),
            name: itemInput.value.trim(),
        };
        items.push(newItem);
        displayItems();
        itemInput.value = '';
    });

    // Exibe itens iniciais
    displayItems();
});

// Edita um item
function editItem(e) {
    const id = e.target.dataset.id;
    const itemToEdit = items.find((item) => item.id === parseInt(id));
    const newName = prompt('Digite o novo nome:');

    if (newName) {
        itemToEdit.name = newName;
        displayItems();
    }
}

// Exclui um item
function deleteItem(e) {
    const id = e.target.dataset.id;
    items = items.filter((item) => item.id !== parseInt(id));
    displayItems();
}