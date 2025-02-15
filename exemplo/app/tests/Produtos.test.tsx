import React from "react";
import { describe, expect, test } from "@jest/globals";
import Produtos from "../components/Produtos";
import { fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';

describe("Produtos", () => {
    test("Se há produtos exibidos na tela", () => {
        render(<Produtos />)

        const produtos = screen.queryAllByRole("product-item")

        expect(produtos.length).toBeGreaterThan(0)
    })

    test("Se ao deletar um produto ele nao aparece na tela", () => {
        render(<Produtos />)

        const botao = screen.getByRole("button", { name: "Deletar" })

        fireEvent.click(botao, "click")

        const produto1 = screen.queryByRole("product-item", { name: /id: 1/i })

        expect(produto1).not.toBeInTheDocument()
        
    })

    test("Se ao deletar um produto a quantidade de itens diminui em 1", () => {
        render(<Produtos />)

        const produtosIniciais = screen.queryAllByRole("product-item");

        expect(produtosIniciais.length).toBeGreaterThan(0);

        const botao = screen.getByRole("button", { name: "Deletar" })

        fireEvent.click(botao)

        const produtosAtuais = screen.queryAllByRole("product-item");

        expect(produtosAtuais.length).toBe(produtosIniciais.length - 1)
    })
});