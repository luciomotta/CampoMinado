class CampoMinado{
    constructor(){
        this.board = new Board(); 
        this.bombs = 10;
        this.createCells();
        this.loadBombs();
        this.loadPerto();

    }

/////////////////////////////////////////////////////////////////

    click(x, y) {

        if (x < this.board.margin || x > this.board.margin + this.board.clientWidth) return;
        if (y < this.board.margin || y > this.board.margin + this.board.clientHeight) return;
        let w = this.board.clientWidth / this.board.size; 
        let h = this.board.clientHeight / this.board.size;
        let cx = Math.trunc((x - this.board.margin) / w);
        let cy = Math.trunc((y - this.board.margin) / h);
        if (cx < 0 || cy < 0 || cx >= this.board.size || cy >= this.board.size) return;
        let c = this.cells[cy][cx];
        console.log({ cx, cy });
        console.log(c);
        this.openCell(c, true);
    };

    openCell(cell, explode) {
        if (cell.open) return;
        if (cell.bomb && !explode) return;
        cell.open = true;
        if (cell.bomb) return;
        if (cell.bombs === 0) {
            cell.perto.forEach(nc => {
                this.openCell(nc, false); // Corrigido para usar 'this.'
            });
        }
    }

/////////////////////////////////////////////////////////////////

    loadPerto() {
        this.cells.forEach((line) => {
            line.forEach((cell) => {
                cell.perto = [];
                cell.bombs = 0;
                for (let dx = -1 ; dx <= 1; dx++) {
                    for (let dy = -1; dy <= 1; dy++) {
                        if (dx != 0 || dy != 0) {
                            let x = cell.x + dx;
                            let y = cell.y + dy;
                            if (x >= 0 && x < this.board.size &&y >= 0 && y < this.board.size) {
                                let c = this.cells[x][y];
                                cell.perto.push(c);
                                cell.bombs += c.bomb;
                            }
                        }
                    }
                }
            })
        })
    }

/////////////////////////////////////////////////////////////////

    loadBombs(){
        let i = 0;
        while (i < this.bombs){
            let x = Math.floor(Math.random() * this.board.size);
            let y = Math.floor(Math.random() * this.board.size);
            if (this.cells[x][y].bomb == 0){ //Se não tiver bomba ele Acresenta se não ira continuar p\ o Próximo
                this.cells[x][y].bomb = 1;
                i++
            }
            console.log(x, y);
        }
    }

/////////////////////////////////////////////////////////////////

    createCells() {
        this.cells = [];
        for (let y = 0; y < this.board.size; y++) { //Criar as linhas
            let line = [];
            this.cells.push(line); //Adicionar as linhas

            for (let x = 0; x < this.board.size; x++) { //Criar as celulas
                let cell = new Cell(x, y, this.board); //Objeto chamando a classe Cell em Cell.js <-----
                line.push(cell); //Adicionar as celulas
            }
        }
        console.log(this.cells);
    }

/////////////////////////////////////////////////////////////////

    update(){ // Iniciar o jogo

    }

    render(){ // Desenhar o jogo
        this.board.render();

        this.cells.forEach(line => {
            line.forEach(cell => {
                cell.render();
            }) 
        })
    }

}
