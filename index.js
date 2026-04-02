// 1. al cargar la pagina, intentamos recuperar las tareas guardadas
let tareas = JSON.parse(localStorage.getItem('misTareas')) || [];
renderizarTareas(); // Dibujamos lo que se haya guardado

function addTask() {
    const input = document.getElementById('taskInput');
    
    if (input.value.trim() !== "") {
        // 2. Agregamos la nueva tarea al arreglo
        tareas.push(input.value);
        // 3. Guardamos el arreglo actualizado en el localstorage
        actualizarStorage();
        
        // limpiar el cuadro de texto
        input.value = "";
        renderizarTareas();
    }
}

function actualizarStorage(){
    localStorage.setItem('misTareas', JSON.stringify(tareas));
}

function renderizarTareas(){
    const list = document.getElementById('taskList');
    list.innerHTML = ""; // limpiamos la lista

    tareas.forEach((tareas, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
        ${tareas}
        <button class="delete-btn" onclick="eliminarTarea(${index})">X</button>`;
        list.appendChild(li);
    });
}

function eliminarTarea(index) {
    //4. Quitamos la tarea del arreglo, actualizamos localStorage
    tareas.splice(index, 1);
    actualizarStorage();
    renderizarTareas();
}