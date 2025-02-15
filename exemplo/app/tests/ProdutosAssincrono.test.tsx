import React from "react";
import { describe, expect, test } from "@jest/globals";
import { render, screen, waitFor } from "@testing-library/react";
import ProdutosAssincrono from "../components/ProdutosAssincrono";
import '@testing-library/jest-dom';

describe("Produtos", () => {
    test("Se há produtos exibidos na tela com find", async () => {
        render(<ProdutosAssincrono />)

        expect(await screen.findAllByRole("product-item", {}, {timeout: 2100}))
    })

    test("Se há produtos exibidos na tela com waitFor", async () => {
        render(<ProdutosAssincrono />)

        waitFor(() => {
            screen.findAllByRole("product-item")
        }, {
            timeout: 2000
        })
    })
});