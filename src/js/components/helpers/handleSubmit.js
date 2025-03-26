export const handleSubmit = (event) => {
  event.preventDefault();
  console.log(event);

  if (nuevaTarea.trim() === "") {
    alert("Ingresa una tarea valida");
    event.target.value = "";
    return;
  }

  return {
    listaActualizada: [...listaTareas, nuevaTarea],
    nuevaTarea: "",
  };
};
