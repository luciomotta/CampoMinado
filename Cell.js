class Cell {
    constructor(x, y, board) {
        this.x = x;            // Posição da célula
        this.y = y;           // Posição da célula
        this.board = board;  // Referência para o tabuleiro
        this.bomb = 0;      // 0 = sem bomba, 1 = com bomba
        this.open = false; // 0 = fechado, 1 = aberto
    }

    render() {
        stroke("blue")
        fill(40);
        strokeWeight(1);

        let w = this.board.clientWidth / this.board.size;
        let h = this.board.clientHeight / this.board.size; 
        let px = this.x * w + this.board.margin; 
        let py = this.y * h + this.board.margin;
        rect(px , py, w, h);    

        
        if (this.open) {
            fill(80);
            rect(px , py, w, h);    
            if (this.bomb == 1) {
                noStroke();
                fill(255, 0, 0);
                circle(px + w/2, py + h/2, w/2);
    
            }else {

                textSize(w);
                strokeWeight(2);
                fill('blue');
                stroke('blue');
                text(this.bombs, px + (w / 4), py + h * 0.9);
                //text(this.bomb, px + (w / 4), py + h * 0.9);
            }

        }
    


    }
}