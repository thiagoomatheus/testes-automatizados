import React from "react";

export default function BotaoComEstilo( { disabled }: { disabled: boolean} ) {

    return (
        <button style={{ backgroundColor: disabled ? "red" : "green" }}>Clique</button>
    );
}
