class Cell {
    constructor(x, y, board) {
        this.x = x;
        this.y = y;
        this.board = board;
    }

    render() {
        stroke("blue")
        noFill();
        strokeWeight(1);

        let w = this.board.clientWidth / this.board.size;
        let h = this.board.clientHeight / this.board.size; 
        rect(this.x * w + this.board.margin/2, this.y * h + this.board.margin/2, w, h);      
    }
}