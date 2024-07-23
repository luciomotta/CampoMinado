class Board{
    constructor(){
        this.size = 10;
        this.margin = 6;

        let s = Math.min(width, height);
        this.width = s; 
        this.height = s;
        this.clientWidth = width - this.margin;  // Altura de dentro do Tabuleiro
        this.clientHeight = height - this.margin;

}
    render(){
        background(0);
        strokeWeight(this.margin);
        stroke(255, 0, 0);
        noFill();

        rect(this.margin/2,this.margin/2, this.clientHeight, this.clientWidth);
        }
}
