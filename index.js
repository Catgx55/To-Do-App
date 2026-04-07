// 1. al cargar la pagina, intentamos recuperar las tareas guardadas
let tareas = JSON.parse(localStorage.getItem('misTareas')) || [];
renderizarTareas(); // Dibujamos lo que se haya guardado

function addTask() {
    const input = document.getElementById('taskInput');
    
    
    if (input.value.trim() !== "") {
        const nuevaTarea = {
            id: Date.now(), // Se genera un ID
            texto: input.value,
            completada: false
        };
        // 2. Agregamos la nueva tarea al arreglo
        console.log(nuevaTarea)
        tareas.push(nuevaTarea);
        //tareas.push(input.value);
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
    const counterElement = document.getElementById('taskCounter');
    list.innerHTML = ""; // limpiamos la lista

    tareas.forEach((tarea) => {
        const li = document.createElement('li');
        const estiloTachado = tarea.completada ? 'text-decoration: line-through; color: gray;' : '';
        li.innerHTML = `
        <span style="${estiloTachado}" onclick="toggleTarea(${tarea.id})">
        ${tarea.texto}
        </span>
        <button class="delete-btn" onclick="eliminarTarea(${tarea.id})">X</button>`;
        list.appendChild(li);
    });

    const pendientes = tareas.filter(t => !t.completada).length;

    if(tareas.length === 0) {
        counterElement.innerText = "No tienes tareas, puedes descansar";
    } else {
        counterElement.innerText = `Tareas pendientes ${pendientes}`;
    }
}

function toggleTarea(id) {
    // 1. buscamos la tarea por el ID
    const tareaEncontrada = tareas.find(t => t.id === id);

    if(tareaEncontrada) {
        // 2. aca cambiamos el estado de true a false o de false a true
        tareaEncontrada.completada = !tareaEncontrada.completada;
        // 3. guardamos el nuevo estado
        actualizarStorage();
        renderizarTareas();
    }
}

function eliminarTarea(id) {
    // Quitamos la tarea del arreglo, actualizamos localStorage
    tareas = tareas.filter(t => Number(t.id) !== Number(id));
    // se guarda el nuevo arreglo sin la tareas borradas
    actualizarStorage();
    renderizarTareas();
}