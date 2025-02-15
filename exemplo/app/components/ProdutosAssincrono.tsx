import React, { useEffect } from "react";

type Produtos = {
    id: number
    nome: string
    preco: number
}[]

const produtosInciais: Produtos = [
    {id: 1, nome: 'Notebook', preco: 1000},
    {id: 2, nome: 'Smartphone', preco: 500},
];

export default function Produtos() {

    const [produtos, setProdutos] = React.useState<Produtos | null>(null);

    useEffect(() => {
        setTimeout(() => {
            setProdutos(produtosInciais)
        }, 2000)
    }, [])

    return (
        <div>
            <h1>Produtos</h1>
            <ul role="products-list">
                {produtos && produtos.map((produto) => (
                    <li role="product-item" key={produto.id}>
                        id: {produto.id} - {produto.nome} - R$ {produto.preco}
                    </li>
                ))}
            </ul>
            {produtos && <button onClick={() => setProdutos(produtos.filter(produto => produto.id !== 1))}>Deletar</button>}
        </div>
    );
}