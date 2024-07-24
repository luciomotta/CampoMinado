let game; //Instanciar o jogo
let borderSize = 10; //variaveis "Globais"
let cells = [];


function setup() { //Função de configuração 
    createCanvas(windowWidth , windowHeight);
    game = new CampoMinado();

    /*for (let y = 0; y < borderSize; y++)//Criar as celulas
    {
        let line = [];
        cells.push(line);
        for (let x = 0; x < borderSize; x++)
        {
            let cell = {}
            line.push(cell);
        }
    
        (10) [Array(10), Array(10), Array(10), Array(10), Array(10), Array(10), Array(10), Array(10), Array(10), Array(10)]

        cells: 
        0: (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}] <--- Linhas
        1: (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
        2: (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
        3: (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
        4: (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
        5: (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
        6: (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
        7: (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
        8: (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
        9: (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
        length: 10 linhas por 10 colunas
        
    }
    */
    //console.log(cells);
}

function draw() { //Prepara e Inicalizada o Jogo em LOOOP
    game.update();
    game.render();


    /*background(0);
    strokeWeight(10);
    stroke(255, 0, 0);
    noFill();
    rect(0,0, width, height);*/
}

function mousePressed(){ //Função de clique do mouse

    game.click(mouseX, mouseY);
};
