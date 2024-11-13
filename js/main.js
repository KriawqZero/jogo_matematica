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

/* Constantes de tamanho definido */
import {mazeEasy, player, questions} from './consts.js';
import {checkIfWinOrQuestion, checkAnswer, giveUpQuestion, showHint, saveGame, loadGame} from './helperFunctions.js';
/* ------------- *///* ------------- */
/* Usada em outros scripts */
/**
 * Define o estado de liberação do jogador.
 *
 * @param {boolean} released - Um booleano indicando se o jogador está liberado.
 * @return {void}
 */
export function setPlayerRelease(released) { released ? player.released = true : player.released = false; }
export { movePlayer, player, drawMaze };
/* ------------- *///* ------------- */
// Obtém o contexto do canvas para desenhar o labirinto
/**
 * @type {HTMLCanvasElement} canvas - O elemento canvas usado para renderizar o labirinto.
 */
const canvas = document.getElementById('mazeCanvas');
/**
 * O contexto de renderização para uma superfície de desenho 2D de um elemento `<canvas>`.
 * Fornece métodos e propriedades para desenhar e manipular gráficos no canvas.
 */
const ctx = canvas.getContext('2d');
/**
 * A velocidade com que ocorrem as transições, medida em segundos.
 * Este valor determina quão rapidamente um efeito visual, como um fade ou slide, é concluído.
 * Um valor menor resulta em uma transição mais rápida, enquanto um valor maior resulta em uma transição mais lenta.
 *
 * @type {number}
 */
const transitionSpeed = 0.1; // Ajusta a velocidade para suavidade na transição de movimento

/**
 * A cor a ser usada para a parede na interface do usuário ou ambiente gráfico.
 * Especificado no formato de código de cor hexadecimal.
 *
 * @type {string}
 */
const wallColor = '#293630' // Cor das paredes
/**
 * Representa a cor usada para o elemento da caixa de perguntas.
 *
 * A cor é definida como um código de cor hexadecimal. O valor padrão é "#ffd700", que é um tom de dourado.
 *
 * @type {string}
 */
const questionBoxColor = '#ffd700'; // Cor das caixas de pergunta
/**
 * Um valor de cor hexadecimal que representa a cor da caixa de vitória do jogador em um jogo.
 *
 * Ele é usado para definir a cor de fundo do elemento que indica o vencedor.
 * Por exemplo, é definido para um tom de verde representado pelo código hexadecimal "#8fce00".
 *
 * @type {string}
 */
const winBoxColor = '#8fce00'; // Cor da caixa de vitória
/**
 * Representa a cor atribuída a um jogador no jogo.
 * A cor é definida como uma string hexadecimal.
 */
const playerColor = '#007bff'; // Cor do jogador
/**
 * Representa o código de cor usado para denotar um estado "off" para uma visualização ou elemento.
 * Essa cor é tipicamente usada quando um elemento está desativado, oculto ou em estado de desativação.
 *
 * O valor da cor é fornecido como uma string hexadecimal.
 *
 * @type {string}
 */
const offViewColor = '#000';
/**
 * Representa a cor de um caminho em formato hexadecimal.
 * Esta cor é usada para estilizar e renderizar caminhos na aplicação.
 *
 * A cor é especificada como uma string no formato `#RRGGBB`, onde `RR` representa o
 * componente vermelho, `GG` o componente verde e `BB` o componente azul.
 *
 * Exemplo de valor: '#cef5e3'
 */
const pathColor = '#cef5e3';
/**
 * A cor usada para o efeito de desfoque em formato hexadecimal.
 *
 * Esta variável armazena o código de cor hexadecimal que será
 * aplicado a elementos ou fundos que utilizam efeitos de desfoque
 * dentro da aplicação.
 */
const blurColor = '#111'
/* ------ *///* ------ */

// Variáveis do timer
/**
 * Uma variável que mantém o identificador de um temporizador.
 * Este identificador é inicialmente definido como nulo e pode ser atribuído
 * um ID numérico retornado por funções como setTimeout ou setInterval.
 * Ele é usado para manter o controle, controlar ou limpar o temporizador.
 *
 * @type {number|null}
 */
export let timerStart;
export function setTimerStart(newTimerStart) { timerStart = newTimerStart; }

export var timerID = null; // ID do timer, usado para limpar o intervalo
/**
 * Representa uma duração em minutos.
 * Esta variável mantém o número de minutos, normalmente usado para medir intervalos de tempo ou tempo passado.
 *
 * @type {number}
 */
export let minutes;
export function setMinutes (newMinutes) { minutes = newMinutes; }
/**
 * Representa uma duração em segundos.
 * Esta variável armazena o número de segundos e pode ser usada
 * para medir intervalos de tempo ou durações de atraso.
 *
 * @type {number}
 */
export let seconds;
export function setSeconds (newSeconds) { seconds = newSeconds; }
/**
 * Recupera o valor atual do temporizador no formato de minutos e segundos.
 *
 * @return {string} O valor atual do temporizador formatado como "minutos:segundos".
 */
export function getTimerValue() {
    return minutes + ':' + seconds;
}

// Variável usada principalmente para saber qual labirinto está (nível)
// E define que a primeira ao iniciar jogo é a nível fácil
/**
 * Representa o nível em uma estrutura ou sistema hierárquico.
 *
 * @type {number}
 */
let level = 1; // Define aqui a variável 'level'
/**
 * `actualMaze` representa a configuração atual do labirinto sendo usada na aplicação.
 * Ele é atribuído o valor de `mazeEasy`, um dos níveis de dificuldade predefinidos dos labirintos.
 *
 * A variável `mazeEasy` deve conter a estrutura de dados que define o layout
 * e as propriedades de um labirinto de nível fácil.
 */
let actualMaze = mazeEasy; // Define aqui a variável 'actualMaze'

/**
 * Recupera o nível atual.
 *
 * @return {number|string} O nível atual, que pode ser um número ou uma representação de string do nível.
 */
export function getLevel() { return level; }
/**
 * Define o nível atual para o valor especificado.
 *
 * @param {number} newLevel - O novo nível a ser definido.
 * @return {void} Esta função não retorna um valor.
 */
export function setLevel(newLevel) { level = newLevel; }
/**
 * Recupera o estado atual do labirinto.
 *
 * @return {Array<Array<number>>} O labirinto atual como uma matriz 2D de números.
 */
export function getActualMaze() { return actualMaze; }
/**
 * Define o labirinto atual para o labirinto fornecido.
 *
 * @param {Array} newMaze - O novo labirinto a ser definido.
 * @return {void}
 */
export function setActualMaze(newMaze) { actualMaze = newMaze; }

window.onload = () => {
    loadGame();
    // Bloqueia a movimentação da tela até o início do jogo
    document.getElementById('winBox').innerHTML = `<span style="color: black">Level ${level}</span>`;
    document.body.classList.add('modal-open');
};

/**
 * Inicializa e inicia o jogo configurando o nome do jogador,
 * ocultando o menu de início, habilitando o movimento do jogador, iniciando o temporizador do jogo,
 * e desenhando o labirinto inicial.
 *
 * @return {void}
 */
function startGame() {
    document.body.classList.remove('modal-open'); // Reabilita movimentação de tela

    player.name = document.getElementById('playerName').value.trim(); // Obtém o nome do jogador
    if (player.name === '') {
        alert('Por favor, insira seu nome.');
        return;
    }

    // Oculta o menu de início e a camada de fundo desfocada
    document.getElementById('startMenu').style.display = 'none';
    document.getElementById('blur-background').style.display = 'none';

    player.released = true; // Marca o jogador como pronto para movimentação
    startTimer(document.querySelector('#timer')); // Inicia o timer de 5 minutos
    drawMaze(); // Desenha o labirinto inicial
}

/**
 * Inicia um temporizador e atualiza o elemento de exibição fornecido com o tempo decorrido em minutos e segundos.
 *
 * @return {void}
 */
export function loadTimer() {
    function timer() {
        const diff = Math.floor((Date.now() - timerStart) / 1000); // Calcula o tempo decorrido em segundos
        minutes = Math.floor(diff / 60); // Converte o tempo decorrido em minutos
        seconds = diff % 60; // Calcula os segundos restantes

        // Formata os minutos e segundos para sempre exibir dois dígitos
        let displayMinutes = minutes < 10 ? '0' + minutes : minutes;
        let displaySeconds = seconds < 10 ? '0' + seconds : seconds;

        // Atualiza o display com o tempo decorrido
        let display = document.querySelector('#timer');
        display.textContent = displayMinutes + ':' + displaySeconds;
    }
    timerID = setInterval(timer, 1000); // Atualiza o timer a cada segundo
}

export function startTimer(display) {
    timerStart = Date.now(); // Marca o momento de início do cronômetro

    function timer() {
        const diff = Math.floor((Date.now() - timerStart) / 1000);
        minutes = Math.floor(diff / 60);
        seconds = diff % 60;

        // Formatação para dois dígitos
        let displayMinutes = minutes < 10 ? '0' + minutes : minutes;
        let displaySeconds = seconds < 10 ? '0' + seconds : seconds;

        // Atualiza o display com o tempo
        display.textContent = displayMinutes + ':' + displaySeconds;
    }

    timerID = setInterval(timer, 1000);
}


// Variáveis para o movimento do jogador
/**
 * A coordenada x do alvo, definida para a coordenada x atual do jogador.
 *
 * Esta variável é usada para determinar a posição horizontal de um alvo com base
 * na posição atual do jogador no jogo. Ela é atualizada dinamicamente
 * sempre que a coordenada x do jogador muda.
 *
 * @type {number}
 */
let targetX = player.x;
/**
 * A posição da coordenada y que o jogador está mirando ou apontando.
 * Isto é tipicamente usado em contextos onde a localização do jogador no eixo y precisa ser rastreada,
 * como em jogos 2D ou animações.
 *
 * @type {number}
 */
let targetY = player.y;
/**
 * Representa a coordenada x atual do jogador.
 * Este valor é definido dinamicamente para a posição x do jogador.
 * Ele é usado para rastrear a posição horizontal do jogador
 * dentro do ambiente do jogo.
 *
 * @type {number}
 */
let currentX = player.x;
/**
 * Representa a posição vertical atual do jogador.
 *
 * Esta variável armazena a coordenada y do personagem do jogador no ambiente do jogo.
 *
 * @type {number}
 */
let currentY = player.y;
/**
 * drawMaze é responsável por renderizar o labirinto no canvas. Ele ajusta
 * o tamanho das células com base nos tamanhos do labirinto e do canvas, limpa o canvas,
 * e percorre cada célula do labirinto para desenhá-la adequadamente com base na
 * distância de visualização do jogador. Ele lida com o desenho de diferentes tipos de células e
 * aplica um efeito de desfoque às áreas fora da visualização do jogador. Também lida com a
 * transição suave da posição do jogador e desenha o jogador no labirinto.
 *
 * @return {void} Esta função não retorna um valor.
 */
function drawMaze() {
    // Ajusta o tamanho das células com base no tamanho do labirinto e do canvas
    const rows = actualMaze.length;
    const cols = actualMaze[0].length;
    const cellSize = Math.min(canvas.width / cols, canvas.height / rows);
    let distanceFromPlayer;
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas
    // Loop para percorrer cada célula do labirinto e desenhá-la
    for (let i = 0; i < actualMaze.length; i++) {
        for (let j = 0; j < actualMaze[i].length; j++) {
            // Calcula a distância do jogador para a célula
            let distanceX = Math.abs(targetX - j);
            let distanceY = Math.abs(targetY - i);
            distanceFromPlayer = Math.sqrt(distanceX ** 2 + distanceY ** 2);
            // Desenha as células dentro do alcance de visão do jogador
            if (distanceFromPlayer <= player.viewDistance) {
                ctx.fillStyle = actualMaze[i][j] === 1 ? wallColor :
                    actualMaze[i][j] === 2 ? questionBoxColor :
                        actualMaze[i][j] === 4 ? winBoxColor : pathColor;
                ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize); // Desenha a célula
            } else if (distanceFromPlayer <= player.viewDistance + 1) {
                // Transição suave com desfoque para as áreas fora de vista
                Math.min(8, 2 * (distanceFromPlayer - player.viewDistance));
                // ctx.filter = `blur(${blurLevel}px)`;
                ctx.fillStyle = blurColor; // Cor da área borrada
                ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
            } else {
                // Área totalmente fora da visão
                // ctx.filter = 'blur(12px)';
                ctx.fillStyle = offViewColor; // Cor da área escura
                ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
            }
            ctx.filter = 'none'; // Reset do filtro de desfoque para a próxima célula
        }
    }
    // Interpolação suave para o movimento do personagem (suaviza a transição de posições)
    currentX += (targetX - currentX) * transitionSpeed;
    currentY += (targetY - currentY) * transitionSpeed;
    // Desenha o personagem no labirinto
    ctx.fillStyle = playerColor;
    ctx.beginPath();
    ctx.arc(
        currentX * cellSize + cellSize / 2,
        currentY * cellSize + cellSize / 2,
        cellSize / 3, 0, 2 * Math.PI
    );
    ctx.fill();
    requestAnimationFrame(drawMaze); // Requisição para desenhar o labirinto continuamente
}

/**
 * Move o jogador para uma nova posição com base nos valores delta fornecidos.
 * Verifica se o movimento é válido (dentro dos limites do labirinto e não colidindo com paredes).
 * Atualiza a posição do jogador e verifica a condição de vitória ou questão, então redesenha o labirinto.
 * @param {number} dx - A mudança na coordenada x do jogador.
 * @param {number} dy - A mudança na coordenada y do jogador.
 * @return {void}
 */
function movePlayer(dx, dy) {
    let newX = player.x + dx;
    let newY = player.y + dy;
    // Verifica se o movimento é válido (dentro dos limites do labirinto e sem colidir com uma parede)
    if (newX >= 0 &&
        newY >= 0 &&
        newX < actualMaze[0].length &&
        newY < actualMaze.length &&
        actualMaze[newY][newX] !== 1 && // Não permite mover em paredes
        player.released
    ) {
        player.oldX = -dx;
        player.oldY = -dy;
        targetX = newX;
        targetY = newY;
        player.x = newX;
        player.y = newY;

        checkIfWinOrQuestion(player.y, player.x); // Verifica vitória ou questão

        drawMaze(); // Redesenha o labirinto com o novo movimento
    }
    saveGame(player, actualMaze, getLevel(), questions, minutes, seconds, timerID);
}

// Função padrão para movimentar o jogador usando o teclado
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'Enter':
            if (document.getElementById('startMenu').style.display !== 'none') {
                startGame();
                break;
            }
            else if (document.getElementById('questionBox').style.display !== 'none') {
                checkAnswer();
                break
            }
            else break;

        case 'ArrowUp':
        case 'w':
            movePlayer(0, -1);
            break;
        case 'ArrowDown':
        case 's':
            movePlayer(0, 1);
            break;
        case 'ArrowLeft':
        case 'a':
            movePlayer(-1, 0);
            break;
        case 'ArrowRight':
        case 'd':
            movePlayer(1, 0);
            break;
    }
});


drawMaze(); // Chama a função para desenhar o labirinto inicial

/**
 * Expõe funções globais para uso em outros scripts
 * Inicializa os listeners de clique dos botões de controle
 */
document.getElementById('btnUp').addEventListener('click', () => movePlayer(0, -1));
document.getElementById('btnDown').addEventListener('click', () => movePlayer(0, 1));
document.getElementById('btnLeft').addEventListener('click', () => movePlayer(-1, 0));
document.getElementById('btnRight').addEventListener('click', () => movePlayer(1, 0));
document.getElementById('btnSubmit').addEventListener('click', checkAnswer);
document.getElementById('btnGiveUp').addEventListener('click', giveUpQuestion);
document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('hintButton').addEventListener('click', showHint);

/**
 * Inicializa o menu de ajuda que é exibido ao clicar no botão de ajuda.
 */
document.getElementById('tutorialButton').addEventListener('click', () => {
    alert(
        `Instruções do Jogo:\n\n` +
        "1. Use as setas do teclado ou os botões na tela para mover seu personagem.\n" +
        "2. Navegue pelo labirinto até encontrar a saída (bloco verde).\n" +
        "3. Você encontrará caixas de perguntas (blocos amarelos) durante o caminho.\n" +
        "4. Responda as perguntas corretamente para continuar e recuperar vida.\n" +
        "5. Se você responder errado alguma pergunta, perderá 1 vida\n" +
        "6. Você pode desistir de uma pergunta, mas perderá 1 vida.\n" +
        "7. Quando sua vida chegar em 0, você perderá automaticamente.\n" +
        "8. Observação: a margem de erro é de 1 unidade.\n" +
        `9. Boa sorte, ${player.name}!`
    );
});

/**
 * Inicializa o botão sde reset que reinicia o labirinto e o jogo.
 */
document.getElementById('resetButton').addEventListener('click', () => {
    if (confirm('Tem certeza que deseja reiniciar o jogo? Todo progresso não salvo será perdido!')) {
        sessionStorage.clear(); // Limpa a sessão
        location.reload();  // Recarrega a página para reiniciar o jogo
    }
});

// Exibe a dica automaticamente quando a pergunta é exibida
document.getElementById('questionBox').addEventListener('show', showHint);