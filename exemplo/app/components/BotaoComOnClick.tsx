import React from "react";

export default function BotaoComOnClick( {...rest} : React.ButtonHTMLAttributes<HTMLButtonElement> ) {

    return (
        <button {...rest} >Clique</button>
    );
}
