import React from "react";

export default function SecaoExibeTexto() {

    const [texto, setTexto] = React.useState("Vamos começar a aprender sobre testes");

    return (
        <div>
            <h1>Hello World!</h1>
            <p>{texto}</p>
            <button onClick={() => setTexto("Alterado texto")}>Mudar texto</button>
        </div>
    );
}
