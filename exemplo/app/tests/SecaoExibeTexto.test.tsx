import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import SecaoExibeTexto from "../components/SecaoExibeTexto";
import { describe, test } from "@jest/globals";

describe("SecaoExibeTexto", () => {
    test("Texto altera quando há clique no botão", () => {
        render(<SecaoExibeTexto />)

        screen.getByText("Vamos começar a aprender sobre testes")

        const botao = screen.getByText("Mudar texto")

        fireEvent.click(botao)

        screen.getByText("Alterado texto")
    })
})