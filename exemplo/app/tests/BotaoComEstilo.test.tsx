import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "@jest/globals";
import BotaoComEstilo from "../components/BotaoComEstilo";
import '@testing-library/jest-dom/jest-globals'

describe("BotaoComEstilo", () => {
    test("Cor do botão quando desabilitado", () => {
        render(<BotaoComEstilo disabled />)

        const botao = screen.getByRole("button", { name: "Clique" })

        expect(botao).toHaveStyle({ backgroundColor: "red" })
    })
})