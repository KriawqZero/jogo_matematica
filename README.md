# Labirinto Geométrico

Um web game de labirinto focado em geometria plana, desenvolvido como trabalho acadêmico da disciplina de Matemática V do Instituto Federal de Mato Grosso do Sul (IFMS).

## Contexto

Este projeto foi construído em novembro de 2024. A proposta da disciplina era criar uma solução relacionada ao tema estudado no semestre (Geometria Plana). O trabalho foi realizado em grupo, onde atuei como o desenvolvedor responsável pela programação, enquanto os demais membros cuidaram do design visual, criação dos labirintos, formulação das questões matemáticas e elaboração das regras.

Todo o código foi escrito manualmente, utilizando tecnologias web padrão, sem motores de jogos ou geração de código por inteligência artificial.

## Objetivo

A aplicação é um jogo onde o usuário precisa navegar por um labirinto e encontrar a saída. O desafio principal envolve resolver problemas de geometria plana encontrados pelo caminho. O jogador possui um campo de visão limitado e, ao interagir com caixas específicas, precisa responder questões sobre áreas, perímetros e ângulos para avançar sem perder vidas.

## Funcionalidades

- Renderização 2D construída diretamente utilizando a Canvas API do HTML5.
- Mecânica de campo de visão limitado (fog of war) calculada com base na distância do jogador.
- Sistema de interrupção com perguntas matemáticas essenciais para a progressão.
- Controle de estado local que gerencia o cronômetro, contagem de vidas e dicas.
- Persistência básica do progresso da sessão utilizando `sessionStorage`.
- Suporte a controles via teclado (WASD / Setas) e interface com botões para navegação.

## Tecnologias

- **JavaScript (Vanilla):** Lógica do jogo, manipulação do DOM e renderização gráfica.
- **HTML5 e CSS3:** Estrutura e estilização das interfaces.
- **Bootstrap 5:** Utilizado pontualmente para alinhar elementos de interface e estilizar botões.

## Como executar

Como o projeto é estático e não possui dependências de backend ou processos de build, a execução é direta:

1. Clone o repositório para sua máquina local.
2. Abra o arquivo `index.html` em qualquer navegador web moderno.
3. Alternativamente, sirva o diretório através de um servidor HTTP simples (como o Live Server do VS Code).

## Aprendizados

O maior ganho técnico deste projeto foi a oportunidade de trabalhar com a Canvas API de forma manual. Implementar o ciclo de renderização e calcular distâncias matemáticas no grid do labirinto para gerar o efeito de visão limitada ajudaram a solidificar conceitos visuais em JavaScript. Também foi necessário aplicar interpolação para suavizar o movimento do bloco do jogador na tela. Gerenciar a separação de arquivos lógicos em módulos puros reforçou fundamentos importantes da linguagem.
