/**
 * Código do jogo escrito por Marcilio Ortiz
 * no grupo de trabalho escolar de Geometria Plana
 * de Matemática 5 com a professora Mariana Manfroi.
 * Turma: 20210 - 5º Semestre
 * Alunos: Marcilio Ortiz - Desenvolvedor do script do jogo
 * Davi - Design das imagens e da parte gráfica do jogo, também fez os labirintos
 * Luiza Mabel - Designer das regras e panfletagem
 * Maria Clara - Fez e analisou todas as questões e respostas das questões
 */

import {
    drawMaze,
    getActualMaze,
    getLevel,
    getTimerValue,
    movePlayer,
    player,
    setActualMaze,
    setLevel, setMinutes,
    setPlayerRelease, setSeconds,
    timerID,
    loadTimer,
    setTimerStart,
    timerStart, seconds, minutes
} from "./main.js";
import {hardMaze, mediumMaze, questions, setPlayer, setQuestions} from "./consts.js";

/**
 * Representa o índice da questão atualmente ativa em um questionário ou questionário.
 * Esta variável é tipicamente usada para acompanhar em qual questão o usuário está.
 * O índice é baseado em zero, ou seja, começa em 0 para a primeira pergunta.
 */
let currentQuestionIndex;

/**
 * O número de vidas que um jogador tem no jogo.
 *
 * @type {number}
 */
let lifeCount = 5;

/**
 * Exibe uma pergunta aleatória para o jogador, selecionando entre as perguntas não usadas.
 * Se todas as perguntas tiverem sido usadas, ele redefine e começa novamente.
 *
 * @return {void}
 */
function showQuestion() {
    let unusedQuestions = questions.filter(q => !q.used);
    if (unusedQuestions.length === 0) {
        questions.forEach(q => q.used = false); // Reinicia todas as perguntas
        unusedQuestions = questions;
    }

    const randomIndex = Math.floor(Math.random() * unusedQuestions.length);
    const index = questions.indexOf(unusedQuestions[randomIndex]);
    setPlayerRelease(false);
    currentQuestionIndex = index;

    document.body.classList.add('modal-open');
    document.getElementById('questionLifeCount').innerText = `Vidas: ${lifeCount}`;
    document.getElementById('questionText').innerText = `Pergunta: ${index + 1} / ${questions.length}`;
    document.getElementById('questionImage').style.display = 'none';
    document.getElementById('answerInput').value = '';
    document.getElementById('questionImage').style.display = 'inline-block';
    document.getElementById("questionImage").src = `Imagens/ImagensJogo/${questions[currentQuestionIndex].image}`;
    document.getElementById('questionText').innerText = questions[index].text;
    document.getElementById('questionBox').style.display = 'block';
    document.getElementById('blur-background').style.display = 'block';
}

/**
 * Verifica a resposta do jogador em relação à resposta correta dentro de uma margem de erro.
 *
 * Esta função recupera a resposta do jogador do DOM, processa e compara com a resposta correta
 * usando uma margem de erro predefinida. Se a resposta estiver correta, a posição do jogador no labirinto
 * é atualizada e sua vida é aumentada. Se a resposta estiver incorreta, a vida do jogador é reduzida.
 *
 * @return {boolean} Retorna true se a resposta estiver correta dentro da margem de erro, caso contrário false.
 */
export function checkAnswer() {
    let marginError = player.marginError;
    let answer = document.getElementById('answerInput').value.trim();
    let correctAnswer = questions[currentQuestionIndex].answer;

    if (answer.includes(',')) answer = answer.replace(',', '.'); // Substitui vírgula por ponto
    try {
        answer = parseFloat(answer);
    } catch {
        alert('Resposta inválida, tente um valor numérico');
        return false;
    }

    function isInMarginError(answer, correctAnswer, marginError) {
        return Math.abs(answer - correctAnswer) <= marginError;
    }

    if (isInMarginError(answer, correctAnswer, marginError)) {
        const maze = getActualMaze();
        maze[player.y][player.x] = 0;
        setActualMaze(maze);

        updateLife(1);

        document.getElementById("questionImage").style.display = 'none';
        document.getElementById('answerInput').value = '';
        document.body.classList.remove('modal-open');
        document.getElementById('questionBox').style.display = 'none';
        document.getElementById('blur-background').style.display = 'none';
        drawMaze();
        questions[currentQuestionIndex].used = true;
        setPlayerRelease(true);

        currentQuestionIndex = null;
    } else {
        alert("Resposta incorreta. Tente novamente.");
        updateLife(-1);
        setPlayerRelease(false);
    }
}

/**
 * Lida com as ações a serem tomadas ao ganhar um nível no jogo.
 * Isso inclui atualizar o nível, desenhar o labirinto,
 * atualizar a posição do jogador e modificar o estado do jogo.
 *
 * @return {void}
 */
function onWin() {
    let level = getLevel();
    drawMaze();
    if (level === 1) {
        console.log('Jogador alcançou a caixa de vitória 1');
        document.getElementById('winBox').innerHTML = '<span style="color: black">Level 2</span>';
        setLevel(level + 1);
        setActualMaze(mediumMaze);
        updateLife(1);
        player.x = 0;
        player.y = 0;
        console.log("Level 2");
        saveGame(player, getActualMaze(), level, questions)
    } else if(level === 2) {
        document.getElementById('winBox').innerHTML = '<span style="color: black">Level 3<span>';
        setLevel(level + 1);
        setActualMaze(hardMaze);
        updateLife(1);
        player.x = 0;
        player.y = 0;
        console.log("Level 3");
        saveGame(player, getActualMaze(), level, questions)
    } else if (level === 3) {
        console.log("Fim do jogo");
        clearInterval(timerID);

        document.getElementById('winBox').innerHTML =
            `<span class='text-center' style="color: green">
                                Parabéns! Você ganhou! 
                              </span> <br/>
                              <span class='text-center' style="color: green">
                                Tempo: ${getTimerValue()} <br/>
                                Vidas restantes: ${lifeCount}
                              </span>`;

        document.getElementById('timer').style.display = 'none';
        document.getElementById('lifeCount').style.display = 'none';
        document.getElementById('resetButton').style.display = 'inline-block';
        setPlayerRelease(false);
    }
    drawMaze();
    movePlayer(0, 0);
}

/**
 * Verifica a posição atual do jogador no labirinto e lida com eventos de vitória ou pergunta de acordo.
 *
 * @param {number} pY - A coordenada Y da posição do jogador no labirinto.
 * @param {number} pX - A coordenada X da posição do jogador no labirinto.
 * @return {void} Esta função não retorna um valor.
 */
export function checkIfWinOrQuestion(pY, pX) {
    const maze = getActualMaze();

    if (maze[pY][pX] === 4) {
        console.log('Jogador alcançou a caixa de vitória');
        onWin();
        drawMaze();
        movePlayer(0, 0);
    }
    else if (maze[pY][pX] === 2) {
        showQuestion();
        setPlayerRelease(false);
    } else setPlayerRelease(true);

}

/**
 * Lida com a ação de desistir de uma pergunta. Este método:
 * - Limpa o campo de entrada da resposta.
 * - Remove a classe modal open do corpo.
 * - Oculta os elementos da caixa de pergunta e do fundo borrado.
 * - Atualiza a vida do jogador.
 * - Reseta o índice da pergunta atual.
 * - Libera o jogador e o move para a posição anterior.
 *
 * @return {void} Esta função não retorna um valor.
 */
export function giveUpQuestion() {
    document.getElementById('answerInput').value = '';
    document.body.classList.remove('modal-open');
    document.getElementById('questionBox').style.display = 'none';
    document.getElementById('blur-background').style.display = 'none';

    updateLife(-1);
    currentQuestionIndex = null;
    setPlayerRelease(true);
    movePlayer(player.oldX, player.oldY);
}

/**
 * Atualiza o contador de vida exibido na página web.
 *
 * @param {number} count - O número de vidas a ser adicionado ao contador de vidas atual.
 * @return {void}
 */
function updateLife(count) {
    lifeCount = lifeCount + count;
    document.getElementById('lifeCount').innerText = `Vidas: ${lifeCount}`;
    document.getElementById('questionLifeCount').innerText = `Vidas: ${lifeCount}`;

    if(lifeCount === 0) {
        document.getElementById('winBox').innerHTML =
            `<span class='text-center' style="color: red">
                                Você perdeu, suas vidas acabaram.
                              </span>`;

        document.getElementById('blur-background').style.display = 'none';
        document.getElementById('questionBox').style.display = 'none';
        document.getElementById('resetButton').style.display = 'inline-block';
        document.getElementById('lifeCount').style.display = 'none';
        document.getElementById('timer').style.display = 'none';
        setPlayerRelease(false);
        clearInterval(timerID);
    }
}

/**
 * Exibe uma dica para a pergunta atual se o usuário tiver vidas suficientes.
 *
 * Esta função verifica se o usuário tem mais de duas vidas. Se verdadeiro, deduz duas vidas
 * e mostra uma dica para a pergunta atual. Se falso, alerta o usuário que ele não
 * tem vidas suficientes.
 *
 * @return {void}
 */
export function showHint() {
    if(lifeCount > 2) {
        updateLife(-2);
        alert(questions[currentQuestionIndex].hint);
    }
    else alert("Você não possui vidas o suficiente.")
}


export function saveGame(player, maze, level, questions) {
    console.clear();
    console.log("Salvando jogo...");
    sessionStorage['player'] = JSON.stringify(player);
    sessionStorage['actualMaze'] = JSON.stringify(maze);
    sessionStorage['lifeCount'] = lifeCount;
    sessionStorage['level'] = level;
    sessionStorage['questions'] = JSON.stringify(questions);

    // Salva o estado do timer
    sessionStorage['timerMinutes'] = minutes;
    sessionStorage['timerSeconds'] = seconds;
    sessionStorage['timerStart'] = timerStart;
}

export function loadGame() {
    if (sessionStorage.length > 0 && JSON.parse(sessionStorage['player'])['name'] !== '') {

        document.getElementById('startMenu').style.display = 'none';
        document.getElementById('blur-background').style.display = 'none';

        console.log("Carregando jogo...");
        setPlayer(JSON.parse(sessionStorage['player']));
        setActualMaze(JSON.parse(sessionStorage['actualMaze']));
        setLevel(parseInt(sessionStorage['level']));
        setQuestions(JSON.parse(sessionStorage['questions']));
        lifeCount = parseInt(sessionStorage['lifeCount']);
        document.getElementById('lifeCount').innerText = `Vidas: ${lifeCount}`;

        // Carrega o timer
        setMinutes(parseInt(sessionStorage['timerMinutes']));
        setSeconds(parseInt(sessionStorage['timerSeconds']));
        setTimerStart(parseInt(sessionStorage['timerStart'])); // Define o ponto de início do cronômetro

        loadTimer(); // Reativa o timer carregado

        drawMaze();
        movePlayer(0, 0);
        console.log("Jogo carregado com sucesso!");
    }
}