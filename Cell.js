class Cell {
    constructor(x, y, board) {
        this.x = x;            // Posição da célula
        this.y = y;           // Posição da célula
        this.board = board;  // Referência para o tabuleiro
        this.bomb = 0;      // 0 = sem bomba, 1 = com bomba
        this.open = false; // false = fechado, true = aberto
        this.flagged = false; // Para implementar bandeiras futuramente
        this.hovered = false; // Estado de hover
    }

    render() {
        let w = this.board.clientWidth / this.board.size;
        let h = this.board.clientHeight / this.board.size; 
        let px = this.x * w + this.board.margin; 
        let py = this.y * h + this.board.margin;

        // Verifica se o mouse está sobre a célula (efeito hover)
        this.checkHover(px, py, w, h);

        if (this.open) {
            this.renderOpenCell(px, py, w, h);
        } else {
            this.renderClosedCell(px, py, w, h);
        }
    }

    checkHover(px, py, w, h) {
        this.hovered = (mouseX >= px && mouseX <= px + w && 
                       mouseY >= py && mouseY <= py + h);
    }

    renderClosedCell(px, py, w, h) {
        // Célula fechada com efeito 3D
        
        // Sombra
        fill(20, 20, 30, 100);
        noStroke();
        rect(px + 2, py + 2, w - 2, h - 2, 4);
        
        // Base da célula
        if (this.hovered) {
            fill(100, 120, 160); // Cor mais clara quando hover
        } else {
            fill(80, 100, 140);
        }
        stroke(60, 80, 120);
        strokeWeight(1);
        rect(px, py, w - 1, h - 1, 4);
        
        // Efeito de profundidade
        stroke(120, 140, 180);
        strokeWeight(1);
        line(px + 1, py + 1, px + w - 2, py + 1); // Linha superior clara
        line(px + 1, py + 1, px + 1, py + h - 2); // Linha esquerda clara
        
        stroke(40, 60, 100);
        line(px + w - 1, py + 1, px + w - 1, py + h - 1); // Linha direita escura
        line(px + 1, py + h - 1, px + w - 1, py + h - 1); // Linha inferior escura
        
        // Padrão sutil no centro
        if (w > 20) { // Só mostra o padrão se a célula for grande o suficiente
            fill(90, 110, 150, 60);
            noStroke();
            circle(px + w/2, py + h/2, w/4);
        }
    }

    renderOpenCell(px, py, w, h) {
        // Célula aberta (afundada)
        
        // Base afundada
        fill(25, 25, 35);
        stroke(45, 45, 55);
        strokeWeight(1);
        rect(px, py, w - 1, h - 1, 2);
        
        // Efeito afundado (invertido)
        stroke(15, 15, 25);
        line(px + 1, py + 1, px + w - 2, py + 1); // Linha superior escura
        line(px + 1, py + 1, px + 1, py + h - 2); // Linha esquerda escura
        
        stroke(55, 55, 65);
        line(px + w - 1, py + 1, px + w - 1, py + h - 1); // Linha direita clara
        line(px + 1, py + h - 1, px + w - 1, py + h - 1); // Linha inferior clara

        if (this.bomb == 1) {
            this.renderBomb(px, py, w, h);
        } else if (this.bombs > 0) {
            this.renderNumber(px, py, w, h);
        }
    }

    renderBomb(px, py, w, h) {
        // Bomba com design moderno
        let centerX = px + w/2;
        let centerY = py + h/2;
        let bombRadius = Math.min(w, h) * 0.3;
        
        // Sombra da bomba
        fill(0, 0, 0, 100);
        noStroke();
        circle(centerX + 2, centerY + 2, bombRadius * 2);
        
        // Corpo da bomba
        fill(40, 40, 40);
        stroke(20, 20, 20);
        strokeWeight(1);
        circle(centerX, centerY, bombRadius * 2);
        
        // Brilho na bomba
        fill(80, 80, 80);
        noStroke();
        circle(centerX - bombRadius/3, centerY - bombRadius/3, bombRadius/2);
        
        // Pavio
        stroke(200, 150, 50);
        strokeWeight(Math.max(1, w/20));
        line(centerX + bombRadius/2, centerY - bombRadius/2, 
             centerX + bombRadius, centerY - bombRadius);
        
        // Faísca no pavio
        fill(255, 200, 100);
        noStroke();
        circle(centerX + bombRadius, centerY - bombRadius, w/15);
    }

    renderNumber(px, py, w, h) {
        // Números com cores modernas e responsivas
        let colors = [
            [100, 100, 100],    // 0 (não usado)
            [100, 150, 255],    // 1 - Azul
            [100, 255, 100],    // 2 - Verde
            [255, 100, 100],    // 3 - Vermelho
            [255, 100, 255],    // 4 - Magenta
            [255, 200, 100],    // 5 - Laranja
            [100, 255, 255],    // 6 - Ciano
            [200, 100, 255],    // 7 - Roxo
            [255, 255, 100]     // 8 - Amarelo
        ];

        let color = colors[this.bombs] || [255, 255, 255];
        
        // Tamanho do texto responsivo
        let fontSize = Math.max(w * 0.6, 12);
        textSize(fontSize);
        textAlign(CENTER, CENTER);
        
        // Sombra do texto
        fill(0, 0, 0, 150);
        noStroke();
        text(this.bombs, px + w/2 + 1, py + h/2 + 1);
        
        // Texto principal
        fill(color[0], color[1], color[2]);
        textStyle(BOLD);
        text(this.bombs, px + w/2, py + h/2);
        
        // Reset do estilo
        textStyle(NORMAL);
        textAlign(LEFT, BASELINE);
    }
}