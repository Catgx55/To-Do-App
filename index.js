function addTask() {
    const input = document.getElementById('taskInput');
    const list = document.getElementById('taskList');

    if (input.value.trim() !== "") {
        // crea el elemento de la lista (li)
        const li = document.createElement('li')
        li.innerHTML = `${input.value}
        <button class="delete-btn" onclick="this.parentElement.remove()">X</button>`;

        // agregar a la lista visual
        list.appendChild(li);

        // limpiar el cuadro de texto
        input.value = "";
    }
}