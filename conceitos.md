# Testes Automatizados

## Por quê?

- Testes garantem a funcionalidade esperada do componente.

- Trazem mais confiança na hora de fazer deploy para produção.

- Testes também são fundamentais para colocar a prova o código, ou seja, eles vão mostrar se nosso código é bom ou não.

- Como eles são automatizadas, você pode com um comando rodar muitos cenários de testes.

- Testes são indispensáveis para aplicações escaláveis.

- Testes facilitam refatorações e diminuem os bugs em produção.

- Salva tempo e dinheiro.

## Tipo de testes

- Unitários
    - Desacoplados do restante do app
    - Específicos
        - Componentes
        - Funções
    - Nesses testes não chamamos agentes externo, ex. API.
        - Presença de mocks (respostas fakes para testar funções)
    - Ex: testar button
    - Frequência: Maior
    - Tempo de execução: Rápido

- Integração
    - Como os componentes se comportam quando estão juntos
    - 2 ou mais componentes se interagindo
    - Ex: Página de produtos onde temos uma lista de produtos e um botão para adicionar produtos. Testa como os componentes estão interagindo entre sí.
    - Presença de mocks
    - Frequência: Médio
    - Tempo de execução: Médio

- E2E (End to End)
    - Simulam a interação do usuário total
    - Comunicação com banco de dados e APIs
        - Sem mocks
    - Ex: Acessar página de login, preencher email, preencher senha, clicar no botão entrar, verifica o acesso
    - Frequência: Baixa
    - Tempo de execução: Lento

## Como escrevemos testes

Para escrever testes usamos bibliotecas. Para JS, as bibliotecas mais utilizadas são Jest e Testing Library para testes unitários e de integração, enquanto, Cypress e Playwright são as mais recomendadas para testes E2E.

Mas, vale destacar a biblioteca Poku, que é brasileira e está crescendo e chamando a atençao até de grandes empresas que estão reescreverndo seu código com ele. O Poku se destaca por sua abordagem de simplificar testes, trazendo uma sintaxe simples e sendo um pacote leve.

## Jest

Documentação - [aqui](https://jestjs.io/pt-BR/docs/getting-started)

### Instalação

Para instalar a biblioteca usamos o código a seguir:


    npm install --save-dev jest

Para usarmos com componentes React precisamos adicionar algumas outras bibliotecas. Para isso, usamos o seguinte código:


    npm install --save-dev jest babel-jest @babel/preset-env @babel/preset-react react-test-renderer

Em nosso arquivo package.json podemos adicionar o seguinte código:

    {
        "scripts": {
            "test": "jest"
        }
    }

Para usar com TypeScript você deverá rodar o seguinte comando adicional:

    npm install --save-dev @babel/preset-typescript

Além disso, será necessário criar um arquivo chamado `babel.config.js` e adicionar o seguinte código:

    module.exports = {
        presets: [
            ['@babel/preset-env', {targets: {node: 'current'}}],
            '@babel/preset-react',
            '@babel/preset-typescript',
        ],
    };

Depois, já podemos testar nossos componentes.

### Criando testes unitários

Para criarmos testes vamos adicionar um arquivo com a extensão `.test` ou `.spec`, sendo acompanhado da extensão `.ts` ou `.js`. Como exemplo, podemos criar um arquivo chamado `Home.test.ts` para testar o componente Home.

Para iniciarmos um teste com Jest usamos a função `describe()`, está função recebe dois parâmetros, sendo a primeira uma string com a descrição do teste e a segunda a função como callback com o teste em sí, como o exemplo a seguir:


    describe("Home component", () => {
        
    })

Dentro da função de callback podemos usar o método `it()` ou `test()`, sendo este último usado na documentação mais recente, onde, novamente, esse código recebe uma descrição do que queremos testar e em seguida o teste.

Testes são baseados em expectativas. Nós esperamos que algo aconteça, assim, se acontecer, o teste é passsa, mas se não, ele falha. Para isso nós usamos a função `expect()`.

Dentro da função expect nós passamos o que queremos que aconteça. 

Como exemplo, vamos usar uma função de soma de dois números:

    function somar(x:number, y:number) {
        return x + y
    }

Usando essa função, podemos passá-la para o expect junto com os valores possíveis, por exemplo, 4 e 4. Em seguida, vamos usar um matcher para verificar o resultado.

Lista com matchers - [aqui](https://jestjs.io/pt-BR/docs/using-matchers)

Em nosso exemplo vamos usar o matcher `toBe()` que verifica se o valor do resultado da função expect é igual ao valor recebebido como seu parâmetro, como no exemplo a seguir:

    expect(somar(4, 4)).toBe(8)

Assim, nosso primeiro teste fica assim:

    describe("Primeiro teste", () => {
        test("Somar corretamente", () => {
            expect(somar(4, 4)).toBe(8)
        })
    })

Para execurtarmos um teste podemos rodar o comando `npm run test`. Esse comando identifica todos os arquivos de teste, executa-os e exibe no console o resultado. Em nosso exemplo, acima, o teste passou. 

O Jest se sai melhor testando funções desde as mais simples como as mais complexas, mas ele não se sai bem quando é necessário acessar o DOM, como no caso de verificar a renderização de componenentes React.

Por isso, vamos a próxima bíblioteca.

## React Testing Library (RTL)

O RTL faz parte da biblioteca Testing Library, que também providencia ajuda para testes com outros freameworks, como Vue.js, Angular e Svelte.

Documentação - [aqui](https://testing-library.com/docs/react-testing-library/intro/)

### Instalação

Para instalar com suporte a TS:

    npm install --save-dev @testing-library/react @testing-library/dom @types/react @types/react-dom

Sem suporte a TS:

    npm install --save-dev @testing-library/react @testing-library/dom

Execute o comando a seguir para poder usar o Jest no modo de browser:

    npm install --save-dev jest-environment-jsdom

A seguir, adicione o arquivo jest.config.js com o código a seguir:

    ** @type {import('jest').Config} */
    const config = {
        testEnvironment: 'jest-environment-jsdom',
    }

    module.exports = config;

### Criando testes unitários e de integração

Podemos usar o RTL como um super-set do Jest, ou seja, podemos usar o mesmo código do Jest para criar os testes, mas usar algumas funções específicas do RTL para criar os testes para um componente React.

Duas funções que podemos usar do RTL é a `render()` e a `screen()`.

A função render, como o prórpio nome já diz, fará uma renderização do componente que recebe como parâmetro. Já a função screen faz com que consigamos pegar elementos desse componente renderizado.

Apenas um detalhe, ao usarmos a função render precisamos usar a extensão de nosso arquivo como `.tsx` ou `.jsx`.

Com a função screen podemos usar várias queries para selecionar o que desejamos encontrar na tela. As queries são como seletores CSS.

Para saber mais sobre as queries disponíveis podemos acessar [aqui](https://testing-library.com/docs/queries/about).

Vamos usar um exemplo simples inicialmente.

Como componente, temos um componente que exibe o título Hello World!, como no código a seguir:

    import React from "react";
    export default function Home() {
        return (
            <div>
            <h1>Hello World!</h1>
            <p>Vamos começar a aprender sobre testes</p>
            </div>
        );
    }

Note que importamos o React. Bem, nos testes que fiz isso se mostrou necessário já que ocorre um erro caso não esteja importado.

Voltando para o teste em sí, vamos usar a função `render()` passando o componente Home e vamos utilizar `screen()` para verificar a existência da palavra Hello World na página:

    import {describe, test} from '@jest/globals';
    import { render, screen } from '@testing-library/react';
    import React from 'react';
    import Home from '../page';

    describe("Primeiro teste", () => {
        test("Mensagem de Hello World aparece na página", () => {
            render(<Home />)
            
            screen.getByText("Hello World!")
        })
    });

Ao darmos o comando `npm run test` nos é retornado que o teste passou, já que encontrou o texto Hello World!.

### Testes de CSS

Também podemos testar estilos com a função `toHaveStyle()`. Apenas, como lembrete, para usar esse matcher nós precisamos instalar rodar o comando:

    npm install --save-dev @testing-library/jest-dom

Além disso, ao usar o mathcer precisamos importar no arquivo do teste a a biblioteca dessa forma:

    import '@testing-library/jest-dom/jest-globals'

Para usar essa função, nós definimos um elemento ondequeremos testar seu estilo, por exemplo, um button. Em seguida, usamos o expect() passando o elemento e adicionamos o matcher toHaveStyle(), passando como parâmetro o estilo que esperamos ter. Vamos a um exemplo. Este é nosso componente:

    import React from "react";
    export default function BotaoComEstilo( { disabled }: { disabled: boolean} ) {
        return (
            <button style={{ backgroundColor: disabled ? "red" : "green" }}>Clique</button>
        );
    }

Vamos testar se quando passamos a prop disabled nosso componente tem o estilo de bg red. Para selecionarmos o botão, podemos usar o matcher `getByRole()`, que recebe como parâmetro o role e é opcional opções para identificar o elemento. Vamos ao código:

    import React from "react";
    import { render, screen } from "@testing-library/react";
    import { describe, expect, test } from "@jest/globals";
    import BotaoComEstilo from "../components/BotaoComEstilo";
    import '@testing-library/jest-dom/jest-globals';

    describe("BotaoComEstilo", () => {
        test("Cor do botão quando desabilitado", () => {
            render(<BotaoComEstilo disabled />)

            const botao = screen.getByRole("button", { name: "Clique" })

            expect(botao).toHaveStyle({ backgroundColor: "red" })
        })
    })

### Testes verificando chamada de função

Outro teste importante é para verificar se uma função está sendo chamada.

Para esse teste vamos usar o matcher `toHaveBeenCalled()`. Esse matcher recebe um elemento para verificar se a função foi chamada, sendo que, em geral, esse elemento é um botão.

Para verificarmos se uma função foi chamada nós precisamos passar como função a função padrão disponibilizada pelo Jest, que emite um feedback após chamada para validar o teste.

Para isso, definimos como função do componente em nosso teste `jest.fn()`. Como no exemplo a seguir:

    describe("BotaoComOnClick", () => {
        test("Botao clicado dispara funcao atribuiuda no onClick", () => {

            const onClick = jest.fn();

            render(<BotaoComOnClick onClick={onClick} />)
        })
    });

Para testar se a função está sendo executada após o click nós vamos selecionar esse botão usando a função `screen()` e depois simular o click com a função `fireEvent()`. Em seguida, vamos testar a chamada da função com o `expect()`, passando o botão como parâmetro e verificar se ele foi chamado com o matcher `toHaveBeenCalled()`. Veja como fica o código:

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
    });

Além disso, também podemos verificar se a função foi chamada com determinado parâmetro. Para isso, usamos o matcher `toHaveBeenCalledWith()` e passamos como parâmetro o valor que esperamos como parâmetro da função. Por exemplo, veja o código:

    test("Verifica se parâmetro foi passado na função onClick", () => {

        const onClick = jest.fn();

        render(<BotaoComOnClick onClick={() => onClick(10)} />)

        const botao = screen.getByRole("button", { name: "Clique" })

        fireEvent.click(botao)

        expect(onClick).toHaveBeenCalledWith(10)
    })

Aqui, caso não seja recebido o parâmetro 10 na função, o teste vai falhar.

### Testes verificando a não existência de um elemento

Até agora vimos testes que visão encontrar um elemento ou algo na página ou verificar a chamada de uma função. Mas, e se quisermos verificar a não existência de um elemento?

Vamos pegar como exemplo um caso onde excluímos algo da tela. Nesse caso, gostaríamos de verificar se esse elemento não está na tela.

Nesses casos podemos usar o matcher de inversão `.not` que é chamado antes do matcher principal, exemplo, `expect(elemento).not.getByText("Produto 2")`.

Vamos ao código... Este é nosso componente:

    export default function Produtos() {

        const [produtos, setProdutos] = React.useState<Produtos>(produtosInciais);

        return (
            <div>
                <h1>Produtos</h1>
                <ul role="products-list">
                    {produtos.map((produto) => (
                        <li role="product-item" key={produto.id}>
                            id: {produto.id} - {produto.nome} - R$ {produto.preco}
                        </li>
                    ))}
                </ul>
                <button onClick={() => setProdutos(produtos.filter(produto => produto.id !== 1))}>Deletar</button>
            </div>
        );
    }

Temos uma lista de produtos e quando clicamos no deletar nós excluímos nosso produto com o id = 1.

Vamos ao teste. Primeiro, vamos verificar se os produtos aparece na tela:

    describe("Produtos", () => {
        test("Se há produtos exibidos na tela", () => {
            render(<Produtos />)

            const produtos = screen.queryAllByRole("product-item")

            expect(produtos.length).toBeGreaterThan(0)
        })
    });

Após isso, vamos testar se o produto com id 1 é deletado após o clique do botão:

    describe("Produtos", () => {
        test("Se há produtos exibidos na tela", () => {
            render(<Produtos />)

            const produtos = screen.queryAllByRole("product-item")

            expect(produtos.length).toBeGreaterThan(0)
        })

        test("Se ao deletar um produto ele nao aparece na tela", () => {
            render(<Produtos />)

            const botao = screen.getByRole("button", { name: "Deletar" })

            fireEvent.click(botao)

            const produto1 = screen.queryByRole("product-item", { name: /id: 1/i })

            expect(produto1).not.toBeInTheDocument()
        })
    });

Além disso, podemos criar um teste para verificar se ao deletar a lista de produtos contém o total de produtos anterior - 1. Veja o código completo:

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

            fireEvent.click(botao)

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

Este exemplo se caracteriza um teste de integração, já que utiliza-se de mais compoentes em seu teste.