class CampoMinado{
    constructor(){
        this.board = new Board(); 
        this.bombs = 20;
        this.createCells();
        this.loadBombs();
        this.loadPerto();
                                    
    }

/////////////////////////////////////////////////////////////////
    // Adicionar propriedade para controlar cliques
    clicksEnabled = true;

    click(x, y) {

        if (!this.clicksEnabled) return;
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
        if (cell.bomb) {
            // Aqui você pode adicionar sua lógica de animação de explosão
            this.clicksEnabled = false;
            // Configura o vídeo para ser exibido
            let video = document.getElementById('lampvideo');
            video.src = 'src/Explosion.mp4'; // Caminho para o vídeo de explosão
            video.style.width = this.board.clientWidth + 'px'; // Ajusta a largura do vídeo para cobrir o canvas
            video.style.height = this.board.clientHeight + 'px'; // Ajusta a altura do vídeo para cobrir o canvas
            video.style.zIndex = '100'; // Garante que o vídeo fique sobre o canvas
            video.play(); // Inicia a reprodução do vídeo

            // Aguarda o fim do vídeo ou um tempo específico antes de reiniciar o jogo
            video.onended = () => {
                this.clicksEnabled = true;
                video.style.zIndex = '-1'; // Esconde o vídeo
                this.restartGame(); // Chama a função para reiniciar o jogo
    
            };
                
                return;
        }
        if (cell.bombs === 0) {
            cell.perto.forEach(nc => {
                this.openCell(nc, false);
            });
        }
    }

    restartGame() {
        this.cells.forEach(line => {
            line.forEach(cell => {
                cell.open = false;
            });
        });
        this.loadBombs();
        this.loadPerto();

    }
/////////////////////////////////////////////////////////////////

    loadPerto() {
        this.cells.forEach((line, x) => {
            line.forEach((cell, y) => {
                cell.perto = [];
                cell.bombs = 0;
                // Direções: acima, abaixo, esquerda, direita, e diagonais
                const directions = [
                    [0, -1], [0, 1], [-1, 0], [1, 0], // Direções ortogonais
                    [-1, -1], [-1, 1], [1, -1], [1, 1] // Direções diagonais
                ];
                directions.forEach(([dx, dy]) => {
                    let nx = x + dx;
                    let ny = y + dy;
                    if (nx >= 0 && nx < this.board.size && ny >= 0 && ny < this.board.size) {
                        let adjacentCell = this.cells[nx][ny];
                        cell.perto.push(adjacentCell);
                        cell.bombs += adjacentCell.bomb ? 1 : 0;
                    }
                });
            });
        });
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
