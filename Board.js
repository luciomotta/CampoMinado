class Board{
    constructor(){
        this.size = 10; // Tamanho do tabuleiro
        this.margin = 6;

        let s = Math.min(width, height);
        this.width = s; 
        this.height = s;
        this.clientWidth = this.width - this.margin * 2;  // Altura de dentro do Tabuleiro
        this.clientHeight = this.height - this.margin * 2;

}
    render(){
        background(0);
        strokeWeight(this.margin);
        stroke(255, 0, 0);
        noFill();

        rect(this.margin/2,this.margin/2,  this.width - this.margin, this.height - this.margin);
        }
}
