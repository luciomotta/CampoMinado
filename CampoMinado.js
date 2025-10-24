class CampoMinado {
    constructor() {
        this.board = new Board(); 
        this.bombs = Math.floor(this.board.size * this.board.size * 0.15); // 15% do tabuleiro
        this.clicksEnabled = true;
        this.gameState = 'playing'; // 'playing', 'won', 'lost'
        this.createCells();
        this.loadBombs();
        this.loadPerto();
    }

    click(x, y) {
        if (!this.clicksEnabled || this.gameState !== 'playing') return;
        
        // Verifica se o clique está dentro do tabuleiro
        if (x < this.board.margin || x > this.board.margin + this.board.clientWidth) return;
        if (y < this.board.margin || y > this.board.margin + this.board.clientHeight) return;
        
        let w = this.board.clientWidth / this.board.size; 
        let h = this.board.clientHeight / this.board.size;
        let cx = Math.floor((x - this.board.margin) / w);
        let cy = Math.floor((y - this.board.margin) / h);
        
        if (cx < 0 || cy < 0 || cx >= this.board.size || cy >= this.board.size) return;
        
        let cell = this.cells[cy][cx];
        this.openCell(cell, true);
        
        // Verifica condição de vitória
        this.checkWinCondition();
    }

    openCell(cell, explode) {
        if (cell.open) return;
        if (cell.bomb && !explode) return;
        
        cell.open = true;
        
        if (cell.bomb) {
            this.gameState = 'lost';
            this.handleExplosion();
            return;
        }
        
        if (cell.bombs === 0) {
            cell.perto.forEach(nc => {
                this.openCell(nc, false);
            });
        }
    }

    handleExplosion() {
        this.clicksEnabled = false;
        
        // Revela todas as bombas
        this.cells.forEach(line => {
            line.forEach(cell => {
                if (cell.bomb) {
                    cell.open = true;
                }
            });
        });
        
        // Configura o vídeo para ser exibido
        let video = document.getElementById('lampvideo');
        if (video) {
            // Configura o tamanho do vídeo
            video.style.width = this.board.clientWidth + 'px';
            video.style.height = this.board.clientHeight + 'px';
            
            // Mostra o vídeo com animação
            video.style.display = 'block';
            video.classList.add('playing');
            
            // Inicia a reprodução
            video.currentTime = 0; // Reinicia do início
            video.play();

            video.onended = () => {
                // Esconde o vídeo
                video.style.display = 'none';
                video.classList.remove('playing');
                
                setTimeout(() => {
                    this.restartGame();
                }, 1000);
            };

            // Fallback caso o vídeo não carregue
            video.onerror = () => {
                video.style.display = 'none';
                video.classList.remove('playing');
                
                setTimeout(() => {
                    this.restartGame();
                }, 2000);
            };
        } else {
            // Se não houver vídeo, reinicia após delay
            setTimeout(() => {
                this.restartGame();
            }, 2000);
        }
    }

    checkWinCondition() {
        let openedCells = 0;
        let totalSafeCells = this.board.size * this.board.size - this.bombs;
        
        this.cells.forEach(line => {
            line.forEach(cell => {
                if (cell.open && !cell.bomb) {
                    openedCells++;
                }
            });
        });
        
        if (openedCells === totalSafeCells) {
            this.gameState = 'won';
            this.handleVictory();
        }
    }

    handleVictory() {
        this.clicksEnabled = false;
        // Aqui você pode adicionar efeitos de vitória
        console.log('Parabéns! Você venceu!');
        
        setTimeout(() => {
            this.restartGame();
        }, 3000);
    }

    restartGame() {
        this.gameState = 'playing';
        this.clicksEnabled = true;
        
        this.cells.forEach(line => {
            line.forEach(cell => {
                cell.open = false;
                cell.bomb = 0;
                cell.bombs = 0;
                cell.perto = [];
            });
        });
        
        this.loadBombs();
        this.loadPerto();
    }

    loadPerto() {
        this.cells.forEach((line, x) => {
            line.forEach((cell, y) => {
                cell.perto = [];
                cell.bombs = 0;
                
                // Direções: acima, abaixo, esquerda, direita, e diagonais
                const directions = [
                    [0, -1], [0, 1], [-1, 0], [1, 0], // Ortogonais
                    [-1, -1], [-1, 1], [1, -1], [1, 1] // Diagonais
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

    loadBombs() {
        let bombsPlaced = 0;
        while (bombsPlaced < this.bombs) {
            let x = Math.floor(Math.random() * this.board.size);
            let y = Math.floor(Math.random() * this.board.size);
            if (this.cells[x][y].bomb == 0) {
                this.cells[x][y].bomb = 1;
                bombsPlaced++;
            }
        }
    }

    createCells() {
        this.cells = [];
        for (let y = 0; y < this.board.size; y++) {
            let line = [];
            this.cells.push(line);

            for (let x = 0; x < this.board.size; x++) {
                let cell = new Cell(x, y, this.board);
                line.push(cell);
            }
        }
    }

    update() {
        // Atualiza o tamanho do board se necessário
        if (this.board) {
            this.board.updateSize();
        }
    }

    render() {
        this.board.render();

        this.cells.forEach(line => {
            line.forEach(cell => {
                cell.render();
            });
        });
        
        // Renderiza informações do jogo
        this.renderGameInfo();
    }

    renderGameInfo() {
        // Contador de bombas restantes (opcional)
        let remainingBombs = this.bombs;
        this.cells.forEach(line => {
            line.forEach(cell => {
                if (cell.open && cell.bomb) {
                    remainingBombs--;
                }
            });
        });

        // Exibe informações no canto superior
        textAlign(LEFT, TOP);
        textSize(Math.max(width * 0.03, 14));
        fill(255, 255, 255, 200);
        text(`Bombas: ${remainingBombs}`, 10, 10);
        
        if (this.gameState === 'won') {
            textAlign(CENTER, CENTER);
            textSize(Math.max(width * 0.05, 20));
            fill(100, 255, 100);
            text('VITÓRIA!', width/2, height/2);
        } else if (this.gameState === 'lost') {
            textAlign(CENTER, CENTER);
            textSize(Math.max(width * 0.05, 20));
            fill(255, 100, 100);
            text('GAME OVER', width/2, height/2);
        }
        
        // Reset text alignment
        textAlign(LEFT, BASELINE);
    }
}
