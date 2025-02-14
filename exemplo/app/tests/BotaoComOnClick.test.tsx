import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, jest, test } from "@jest/globals";
import '@testing-library/jest-dom/jest-globals'
import BotaoComOnClick from "../components/BotaoComOnClick";

describe("BotaoComOnClick", () => {
    test("Botao clicado dispara funcao atribuiuda no onClick", () => {

        const onClick = jest.fn();

        render(<BotaoComOnClick onClick={onClick} />)
        
        const botao = screen.getByRole("button", { name: "Clique" })

        fireEvent.click(botao)

        expect(onClick).toHaveBeenCalled()
    })

    test("Verifica se parâmetro foi passado na função onClick", () => {

        const onClick = jest.fn();

        render(<BotaoComOnClick onClick={() => onClick(10)} />)

        const botao = screen.getByRole("button", { name: "Clique" })

        fireEvent.click(botao)

        expect(onClick).toHaveBeenCalledWith(10)
    })
});