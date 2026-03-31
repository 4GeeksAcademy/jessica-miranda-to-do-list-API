import React, { useState } from "react";

export const Todolist = () => {
  const [tarea, setTarea] = useState("");
  const [lista, setLista] = useState([]);

  const agregar = (e) => {
    setTarea(e.target.value);
  };

  const agregarALaLista = (e) => {
    if (e.key === "Enter") {
      if (tarea.trim() === "") return;
      setLista([...lista, tarea]);
      setTarea("");
    }
  };

  const eliminarTarea = (paramIndex) => {
    let elementos = lista.filter((item, index) => index !== paramIndex);
    setLista(elementos);
  };

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
          onChange={agregar}
          onKeyDown={agregarALaLista}
          style={styles.input}
        />

        <ul style={styles.lista}>
          {lista.map((item, index) => (
            <li key={index} style={styles.item}>
              <span>{item}</span>
              <span onClick={() => eliminarTarea(index)} style={styles.botonX}>
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