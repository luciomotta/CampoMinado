class Board {
    constructor() {
        this.size = 12; // Tamanho do tabuleiro (reduzido para melhor jogabilidade móvel)
        this.updateSize();
    }

    updateSize() {
        // Calcula margem baseada no tamanho da tela
        let screenSize = Math.min(width, height);
        
        if (screenSize < 400) {
            this.margin = 8; // Celular pequeno
        } else if (screenSize < 600) {
            this.margin = 12; // Celular médio
        } else if (screenSize < 800) {
            this.margin = 16; // Tablet
        } else {
            this.margin = 20; // Desktop
        }

        // Usa o menor valor entre largura e altura para manter proporção quadrada
        let boardSize = Math.min(width, height);
        this.width = boardSize;
        this.height = boardSize;
        
        // Área interna do tabuleiro (descontando as margens)
        this.clientWidth = this.width - this.margin * 2;
        this.clientHeight = this.height - this.margin * 2;
    }

    render() {
        // Fundo principal com gradiente suave
        background(45, 45, 55);
        
        // Sombra do tabuleiro
        fill(0, 0, 0, 50);
        noStroke();
        rect(this.margin + 4, this.margin + 4, this.clientWidth, this.clientHeight, 8);
        
        // Borda principal do tabuleiro com gradiente
        for (let i = 0; i < this.margin; i++) {
            let alpha = map(i, 0, this.margin - 1, 100, 30);
            stroke(120, 180, 255, alpha);
            strokeWeight(1);
            noFill();
            rect(this.margin - i, this.margin - i, 
                 this.clientWidth + i * 2, this.clientHeight + i * 2, 8);
        }
        
        // Fundo interno do tabuleiro
        fill(35, 35, 45);
        noStroke();
        rect(this.margin, this.margin, this.clientWidth, this.clientHeight, 6);
        
        // Grade interna sutil
        stroke(60, 60, 70, 80);
        strokeWeight(0.5);
        
        let cellWidth = this.clientWidth / this.size;
        let cellHeight = this.clientHeight / this.size;
        
        // Linhas verticais
        for (let i = 1; i < this.size; i++) {
            let x = this.margin + i * cellWidth;
            line(x, this.margin, x, this.margin + this.clientHeight);
        }
        
        // Linhas horizontais
        for (let i = 1; i < this.size; i++) {
            let y = this.margin + i * cellHeight;
            line(this.margin, y, this.margin + this.clientWidth, y);
        }
    }
}
