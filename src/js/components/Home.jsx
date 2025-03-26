import { useState, useEffect } from "react";

//include images into your bundle

const Home = () => {
  // Estados de la tarea nueva y la lista de tareas existentes
  const [nuevaTarea, setNuevaTarea] = useState("");
  const [listaTareas, setListaTareas] = useState([]);
  const [displayBoton, setDisplayBoton] = useState(null);

  // Funcion para manejar el submit del formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);

    if (nuevaTarea.trim() === "") {
      alert("Ingresa una tarea valida");
      setNuevaTarea("");
      return;
    }
    fetchPostTarea();
  };

  // Funcion para manejar cuando cambia el input de la tarea nueva
  const handleChange = (event) => {
    setNuevaTarea(event.target.value);
    console.log(event);
  };

  // Funcion para borrar una tarea de la lista
  const borrarTarea = (e) => {
    console.log(e);
    setListaTareas(
      listaTareas.filter((tarea, index) => index !== Number(e.target.name))
    );

    fetchBorrarTarea();
  };

  // Funciones para mostrar y ocultar el boton de eliminar tarea

  const mostrarBoton = (index) => {
    setDisplayBoton(index);
  };

  const ocultarBoton = () => {
    setDisplayBoton(null);
  };

  const fetchTareas = async () => {
    try {
      const respuesta = await fetch(
        "https://playground.4geeks.com/todo/users/Carlos"
      );
      const data = await respuesta.json();
      console.log(data);
      setListaTareas(data.todos);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTareas();
  }, []);

  const fetchPostTarea = async () => {
    try {
      const envio = await fetch(
        "https://playground.4geeks.com/todo/todos/Carlos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            label: `${nuevaTarea}`,
            is_done: false,
          }),
        }
      );
      const data = await envio.json();
      console.log(data);
      setListaTareas([...listaTareas, data]);
      setNuevaTarea("");
    } catch (error) {
      console.error(error);
    }
    setNuevaTarea("");
  };

  const fetchBorrarTarea = async (id) => {
    try {
      console.log(id);
      const envio = await fetch(
        `https://playground.4geeks.com/todo/todos/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setListaTareas(listaTareas.filter((tarea) => tarea.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="container">
        <h1 className="text-center mt-5 mb-2">Mi Lista De Tareas</h1>
        <form className="list-group mb-2" onSubmit={handleSubmit}>
          <input
            className="list-group-item fs-3"
            type="text"
            placeholder="Agrega una nueva tarea a la lista"
            value={nuevaTarea}
            onChange={handleChange}
          />
        </form>

        <ul className="list-group">
          {listaTareas.map((tarea, index) => (
            <li
              onMouseEnter={() => mostrarBoton(index)}
              className="list-group-item fs-3 d-flex"
              key={tarea.id}
              onMouseLeave={ocultarBoton}
            >
              {tarea.label}
              <button
                type="button"
                className={`btn btn-light ms-auto ${
                  displayBoton === index ? "" : "d-none"
                }`}
                onClick={() => fetchBorrarTarea(tarea.id)}
                name={index}
              >
                ❌
              </button>
            </li>
          ))}
          <div className="list-group-item">
            {listaTareas.length}{" "}
            {listaTareas.length === 1 ? "Tarea por hacer" : "Tareas por hacer"}
          </div>
        </ul>
      </div>
    </>
  );
};

export default Home;
