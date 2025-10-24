let game; // Instância do jogo
let borderSize = 10; // Variáveis "Globais"
let cells = [];
let canvas; // Referência do canvas

function setup() { // Função de configuração 
    // Calcula o tamanho ideal do canvas baseado na tela
    let canvasSize = calculateCanvasSize();
    canvas = createCanvas(canvasSize.width, canvasSize.height);
    
    // Centraliza o canvas no container
    canvas.parent('game-container');
    canvas.class('game-board');
    
    // Inicializa o jogo
    game = new CampoMinado();
    
    // Adiciona listener para redimensionamento
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
}

function calculateCanvasSize() {
    // Obtém as dimensões da janela
    let windowW = window.innerWidth;
    let windowH = window.innerHeight;
    
    // Calcula o tamanho ideal mantendo proporção quadrada
    let maxSize = Math.min(windowW, windowH);
    
    // Aplica margem baseada no tamanho da tela
    let margin = 0;
    if (maxSize < 480) {
        margin = 20; // Celular pequeno
    } else if (maxSize < 768) {
        margin = 40; // Celular/tablet
    } else {
        margin = 60; // Desktop
    }
    
    let finalSize = maxSize - margin;
    
    // Garante tamanho mínimo
    finalSize = Math.max(finalSize, 300);
    
    return {
        width: finalSize,
        height: finalSize
    };
}

function handleResize() {
    // Aguarda um pouco para evitar múltiplas chamadas
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(() => {
        let newSize = calculateCanvasSize();
        resizeCanvas(newSize.width, newSize.height);
        
        // Recria o board com novo tamanho
        if (game && game.board) {
            game.board.updateSize();
        }
    }, 250);
}

function draw() { // Prepara e inicializa o jogo em LOOP
    // Limpa o canvas com cor de fundo suave
    background(45, 45, 55);
    
    // Atualiza e renderiza o jogo
    if (game) {
        game.update();
        game.render();
    }
}

function mousePressed() { // Função de clique do mouse
    if (game) {
        game.click(mouseX, mouseY);
    }
}

// Suporte para touch em dispositivos móveis
function touchStarted() {
    if (game) {
        game.click(touchX, touchY);
    }
    // Previne comportamento padrão do navegador
    return false;
}
