/**
 * Represents a player object with position, movement, and game-related attributes.
 *
 * @typedef {Object} Player
 * @property {number} x - The current horizontal position of the player.
 * @property {number} y - The current vertical position of the player.
 * @property {number} oldX - The previous horizontal position of the player.
 * @property {number} oldY - The previous vertical position of the player.
 * @property {string} name - The name of the player.
 * @property {boolean} released - Indicates if the player has been released into the game.
 * @property {number} viewDistance - The distance the player can view in the game.
 * @property {number} marginError - The margin of error allowed for the player's movements.
 */

export let player = {
    x: 0, y: 0,
    oldX: 0, oldY: 0,
    name: '',
    released: false,
    viewDistance: 3,
    level: 1,
    marginError: 1
};
export function setPlayer(_player) {
    player = _player;
}
// Labirinto fácil
/**
 * mazeEasy is a 2D array representing an easy maze configuration.
 * Each element in the array represents a cell in the maze with the following values:
 * - 0: An open path
 * - 1: A wall
 * - 2: The starting point
 * - 4: The endpoint
 *
 * Example of the maze layout:
 * [
 *    [0, 1, 0, 1, 0, 0, 1, 4],
 *    [0, 1, 0, 1, 0, 1, 1, 0],
 *    [0, 0, 0, 0, 0, 0, 2, 0],
 *    [1, 1, 0, 1, 1, 0, 1, 1],
 *    [0, 0, 0, 0, 1, 0, 0, 0],
 *    [0, 1, 1, 0, 1, 1, 1, 0],
 *    [2, 0, 0, 0, 1, 0, 0, 0],
 *    [0, 0, 1, 0, 1, 0, 2, 0]
 * ]
 *
 * @type {number[][]}
 */
export const mazeEasy = [
    [0, 1, 0, 1, 0, 0, 1, 4],
    [0, 1, 0, 1, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 2, 0],
    [1, 1, 0, 1, 1, 0, 1, 1],
    [0, 0, 0, 0, 1, 0, 0, 0],
    [0, 1, 1, 0, 1, 1, 1, 0],
    [2, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 1, 0, 2, 0]
];

// Labirinto médio
/**
 * A matrix representing a medium-difficulty maze for a game.
 *
 * Each number in the matrix corresponds to a different type of cell:
 * - 0: Walkable path
 * - 1: Wall
 * - 2: Question box
 * - 4: Victory box
 *
 * The maze is represented as a 2D array where each sub-array is a row of the maze.
 */
export const mediumMaze = [
    // Matriz representando o labirinto onde:
    // 0 - Caminho
    // 1 - Parede
    // 2 - Caixa de pergunta
    // 4 - Caixa de vitória
    [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0],
    [2, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1],
    [0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
    [0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
    [0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 2, 0],
    [0, 1, 1, 1, 1, 1, 0, 1, 2, 0, 1, 1, 0, 1, 1, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 0],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 4]
];

/**
 * A two-dimensional array representing a hard maze layout where each integer symbolizes a different type of cell:
 * - 0: Open path
 * - 1: Wall
 * - 2: Special item
 * - 4: Exit point
 */
export const hardMaze = [
    [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 2, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 2, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [1, 1, 0, 1, 1, 0, 1, 1, 2, 0, 0, 0, 2, 0, 1, 0, 1, 0, 1, 0, 1, 2, 0, 1],
    [0, 0, 0, 1, 0, 0, 2, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 0, 1, 0, 2, 0, 0, 1, 0, 1, 1, 1, 1, 2, 0, 1, 1, 1, 1, 1, 0],
    [2, 0, 0, 0, 1, 0, 1, 1, 0, 2, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 2, 0, 1],
    [0, 0, 1, 2, 1, 0, 1, 0, 0, 1, 1, 2, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0],
    [1, 0, 1, 0, 1, 0, 1, 0, 2, 0, 1, 1, 0, 1, 2, 0, 1, 0, 0, 0, 0, 1, 2, 1],
    [0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 2, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0],
    [1, 2, 1, 0, 1, 1, 0, 1, 0, 1, 2, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1],
    [0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 2, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0],
    [1, 1, 0, 0, 2, 0, 0, 0, 1, 1, 1, 0, 2, 2, 1, 1, 1, 0, 2, 1, 0, 0, 1, 1],
    [0, 1, 2, 1, 0, 1, 1, 2, 0, 0, 1, 2, 0, 0, 0, 0, 1, 1, 0, 0, 2, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 2, 1, 0, 0, 0, 1, 1, 2, 1, 0, 1, 1, 1, 0, 1, 1],
    [0, 0, 0, 1, 0, 0, 1, 0, 2, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 2, 0],
    [1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 2, 0, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 2, 0],
    [2, 1, 1, 0, 0, 0, 1, 0, 1, 2, 1, 1, 1, 0, 1, 1, 0, 2, 0, 1, 1, 0, 1, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 2, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0],
    [0, 1, 2, 0, 1, 1, 0, 1, 1, 0, 2, 1, 0, 1, 0, 2, 0, 1, 2, 0, 1, 1, 0, 1],
    [0, 1, 0, 0, 0, 0, 2, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 2, 0, 1, 0],
    [0, 1, 1, 1, 0, 1, 2, 0, 0, 1, 0, 1, 0, 1, 1, 0, 2, 0, 1, 0, 0, 0, 1, 4],
    [0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 1, 0, 0, 0],
];

// Lista das questões do jogo
// Lista das questões do jogo
/**
 * Array of question objects.
 *
 * @type {Array<Object>}
 * @property {string} text - Question text describing the problem to be solved.
 * @property {string} answer - Correct answer to the question.
 * @property {string} hint - Hint provided to help solve the question.
 * @property {string} image - File name of the image associated with the question.
 * @property {boolean} used - Flag indicating whether the question has been used.
 */
export function setQuestions(newQuestions) {
    questions = newQuestions;
}
export let questions = [
    {
        text: "Qual é a área de um triângulo com base 4 e altura 5?",
        answer: "10",
        hint: "A fórmula para a área de um triângulo é (base * altura) / 2",
        image: "triangulo4-5.png",
        used: false
    },
    {
        text: "Qual é o perímetro de um quadrado com lado 3?",
        answer: "12",
        hint: "Perímetro de um quadrado é 4 * lado",
        image: "Quadrado-3.png",
        used: false
    },
    {
        text: "Quantos lados possui um hexágono?",
        answer: "6",
        hint: "Um hexágono possui 6 lados",
        image: "Hexagono.png",
        used: false
    },
    {
        text: "Qual é a área de um retângulo com base 6 e altura 7?",
        answer: "42",
        hint: "A fórmula para a área de um retângulo é base * altura",
        image: "Retangulo-6-7.png",
        used: false
    },
    {
        text: "Qual é o comprimento da circunferência de um círculo com raio 3? (Aproximadamente)",
        answer: "18.8",
        hint: "Comprimento da circunferência é 2 * π * raio, considere π = 3.14",
        image: "Circulo-r=3.png",
        used: false
    },
    {
        text: "Quantos graus há na soma dos ângulos internos de um pentágono?",
        answer: "540",
        hint: "A soma dos ângulos internos de um polígono é (n-2) * 180°, onde n é o número de lados",
        image: "Angulosinternos-pentagono.png",
        used: false
    },
    {
        text: "Qual é o perímetro de um triângulo equilátero com lado 5?",
        answer: "15",
        hint: "Perímetro de um triângulo equilátero é 3 * lado",
        image: "TrianguloEquilatero-lado5.png",
        used: false
    },
    {
        text: "Quantos lados possui um decágono?",
        answer: "10",
        hint: "Um decágono possui 10 lados",
        image: "Decagono.png",
        used: false
    },
    {
        text: "Qual é a área de um círculo com raio 7? (Aproximadamente)",
        answer: "153.9",
        hint: "A fórmula da área do círculo é π * (raio^2), considere π = 3.14",
        image: "Circulo-raio7.png",
        used: false
    },
    {
        text: "Quantos graus possui cada ângulo interno de um quadrado?",
        answer: "90",
        hint: "Cada ângulo interno de um quadrado é 90°",
        image: "Quadrado-angulos.png",
        used: false
    },
    {
        text: "Qual é a área de um paralelogramo com base 8 e altura 3?",
        answer: "24",
        hint: "A fórmula para a área de um paralelogramo é base * altura",
        image: "Paralelogramo.png",
        used: false
    },
    {
        text: "Qual é o perímetro de um retângulo com comprimento 10 e largura 4?",
        answer: "28",
        hint: "Perímetro de um retângulo é 2 * (comprimento + largura)",
        image: "Captura de tela 2024-11-13 105900.png",
        used: false
    },
    {
        text: "Qual é a área de um triângulo equilátero com lado 6? (Aproximadamente)",
        answer: "15.6",
        hint: "A fórmula para a área de um triângulo equilátero é (lado^2 * √3) / 4",
        image: "triangulo-6.png",
        used: false
    },
    {
        text: "Quantos lados possui um heptágono?",
        answer: "7",
        hint: "Um heptágono possui 7 lados",
        image: "Heptagono.png",
        used: false
    },
    {
        text: "Qual é a área de um trapézio com bases 6 e 10 e altura 4?",
        answer: "32",
        hint: "A fórmula para a área de um trapézio é ((base1 + base2) * altura) / 2",
        image: "Captura de tela 2024-11-13 110326.png",
        used: false
    }
];