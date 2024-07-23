class CampoMinado{
    constructor(){
        this.board = new Board(); 
        this.createCells();

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

/////////////////////////////////////////////////////

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
