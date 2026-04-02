import React, { useState, useEffect } from "react";

export const TodoListApi = () => {
    const [lista, setLista] = useState([]);
    const [tarea, setTarea] = useState("");

    const API_URL = "https://playground.4geeks.com/todo";

    const crearUsuario = () => {
        fetch(API_URL + "/users/jessica", {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        })
            .then(response => response.json())
            .then(data => console.log("Usuario creado:", data))
            .catch(error => console.error("Error al crear usuario:", error));
    };

    const obtenerLista = () => {
        fetch(API_URL + "/users/jessica")
            .then(response => {
                if (response.status === 404) crearUsuario();
                return response.json();
            })
            .then(data => setLista(data.todos))
            .catch(error => console.error("Error al obtener la lista:", error));
    };

    const agregarTarea = (e) => {
        // 👇 ahora se agrega con Enter, igual que en Todolist.jsx
        if (e.key === "Enter") {
            if (tarea.trim() === "") return;

            fetch(API_URL + "/todos/jessica", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ label: tarea, is_done: false })
            })
                .then(response => response.json())
                .then(() => {
                    obtenerLista();
                    setTarea("");
                })
                .catch(error => console.error("Error al agregar tarea:", error));
        }
    };

    const eliminarTarea = (id) => {
        fetch(API_URL + "/todos/" + id, {
            method: "DELETE"
        })
            .then(() => obtenerLista())
            .catch(error => console.error("Error al eliminar tarea:", error));
    };

    useEffect(() => {
        obtenerLista();
    }, []);

    // ── MISMOS ESTILOS QUE Todolist.jsx ────────────────────
    const styles = {
        pagina: {
            minHeight: "100vh",
            backgroundColor: "#f5f5f5",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "80px",
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
        },
        titulo: {
            fontSize: "80px",
            fontWeight: "100",
            color: "rgba(220, 150, 150, 0.5)",
            marginBottom: "20px",
            letterSpacing: "5px",
        },
        input: {
            width: "100%",
            padding: "18px 25px",
            fontSize: "22px",
            fontWeight: "300",
            border: "none",
            borderBottom: "1px solid #eee",
            outline: "none",
            color: "#555",
            boxSizing: "border-box",
        },
        lista: {
            listStyle: "none",
            margin: 0,
            padding: 0,
        },
        item: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "18px 25px",
            fontSize: "22px",
            fontWeight: "300",
            color: "#777",
            borderBottom: "1px solid #eee",
        },
        botonX: {
            cursor: "pointer",
            color: "#ccc",
            fontSize: "16px",
        },
        contador: {
            padding: "12px 25px",
            fontSize: "14px",
            color: "#bbb",
            margin: 0,
        },
    };

    return (
        <div style={styles.pagina}>
            <h1 style={styles.titulo}>todos</h1>

            <div className="tarjeta-bottom" style={{ width: "550px" }}>
                <input
                    type="text"
                    placeholder="What needs to be done?"
                    value={tarea}
                    onChange={(e) => setTarea(e.target.value)}
                    onKeyDown={agregarTarea} 
                    style={styles.input}
                />

                <ul style={styles.lista}>
                    {lista.map((item) => (
                        <li key={item.id} style={styles.item}>
                            <span>{item.label}</span>
                            <span
                                onClick={() => eliminarTarea(item.id)}
                                style={styles.botonX}
                            >
                                ✕
                            </span>
                        </li>
                    ))}
                </ul>

                <p style={styles.contador}>{lista.length} item left</p>
            </div>
        </div>
    );
};