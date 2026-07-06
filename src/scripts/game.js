// game.js - a logica do jogo da cobrinha (p5.js)
// feito de um jeito bem simples e direto

// comeca o jogo do zero
function reiniciarJogo() {
    cobra = [];

    //Onde o corpo começa
    cobra.push({ x: 9, y: 10 });
    cobra.push({ x: 8, y: 10 });
    cobra.push({ x: 7, y: 10 });

    //Direção inicial que começa 
    direcao = { x: 1, y: 0 };
    
    //Direção que será usada no próximo passo
    proximaDirecao = { x: 1, y: 0 };

    pontos = 0;
    definirTexto('score', pontos);
    sortearComida();
}

// escolhe onde a comida vai (num lugar que nao tenha cobra)
function sortearComida() {
    var achou = false;
    while (achou === false) {
        var x = floor(random(GRADE));
        var y = floor(random(GRADE));

        var ocupado = false;

        //Var para percorrer a cobra 
        for (var i = 0; i < cobra.length; i++) {
            if (cobra[i].x === x && cobra[i].y === y) {
                ocupado = true;
            }
        }

        if (ocupado === false) {
            comida = { x: x, y: y };
            achou = true;
        }
    }
}

// velocidade do jogo: sobe com os pontos, para no 30
function velocidadeAtual() {
    var base = velocidadeNormal;
    if (dificuldade === 'Fácil') base = velocidadeFacil;
    if (dificuldade === 'Difícil') base = velocidadeDificil;

    
    var extra = floor(pontos / 50);
    var v = base + extra;

    //Bara em 60 fps
    if (v > 60){
        v = 60;
    } 
    return v;
}

// anda a cobra um passo
function passo() {
    direcao = proximaDirecao;

    var cabecaX = cobra[0].x + direcao.x;
    var cabecaY = cobra[0].y + direcao.y;

    
    // sai pela esquerda -> aparece na direita
    if (cabecaX < 0) cabecaX = GRADE - 1;

    // sai pela direita -> aparece na esquerda (da direita pra esquerda)
    if (cabecaX >= GRADE) cabecaX = 0;

    // sai por cima -> aparece embaixo (de cima pra baixo)
    if (cabecaY < 0) cabecaY = GRADE - 1;
    
    // sai por baixo -> aparece em cima
    if (cabecaY >= GRADE) cabecaY = 0;

    var cabeca = { x: cabecaX, y: cabecaY };

    // Valida colisão
    for (var i = 0; i < cobra.length - 1; i++) {
        if (cabeca.x === cobra[i].x && cabeca.y === cobra[i].y) {
            fimDeJogo();
            return;
        }
    }

    cobra.unshift(cabeca);

    if (cabeca.x === comida.x && cabeca.y === comida.y) {
        pontos = pontos + PONTOS;
        definirTexto('score', pontos);
        somComer();
        sortearComida();
        frameRate(velocidadeAtual());
    } else {
        cobra.pop();
    }
}

// desenha tudo na tela
function desenharJogo() {
    background(11, 31, 23);

    // comida
    noStroke();
    fill(255, 107, 107);
    circle(comida.x * CELULA + CELULA / 2, comida.y * CELULA + CELULA / 2, CELULA - 4);

    // cobra (cabeca e corpo)
    for (var i = 0; i < cobra.length; i++) {
        var s = cobra[i];
        if (i === 0) {
            fill(255, 214, 0);
            rect(s.x * CELULA + 1, s.y * CELULA + 1, CELULA - 2, CELULA - 2, 4);
            // olhinhos da cabeca
            fill(0);
            var ex = s.x * CELULA + CELULA / 2;
            var ey = s.y * CELULA + CELULA / 2;
            circle(ex - 4, ey - 2, 3);
            circle(ex + 4, ey - 2, 3);
        } else {
            fill(56, 239, 125);
            rect(s.x * CELULA + 1, s.y * CELULA + 1, CELULA - 2, CELULA - 2, 4);
        }
    }

    passo();
}

// botoes que comecam o jogo
function iniciarJogo() {
    reiniciarJogo();
    mostrarTela('game');
    tela = 'playing';
    frameRate(velocidadeAtual());
    tocarMusica();
    anunciar('Jogo iniciado. Dificuldade ' + dificuldade + '. Use as setas, WASD ou deslize para mover.');
}

// quando perde
function fimDeJogo() {
    tela = 'over';
    pararMusica();
    somFimJogo();

    if (pontos > recorde) {
        recorde = pontos;
        localStorage.setItem(chaveRecorde, recorde);
        definirTexto('best', recorde);
    }

    definirTexto('finalScore', pontos);
    anunciar('Fim de jogo. Sua pontuação foi ' + pontos + '.');
    mostrarTela('over');
}

// pausa e volta
function alternarPausa() {
    if (tela !== 'playing') return;

    if (pausado === true) {
        pausado = false;
        tocarMusica();
        definirTexto('pause', 'Pausar');
        definirTexto('pauseStatus', 'Jogo continuado');
    } else {
        pausado = true;
        pararMusica();
        definirTexto('pause', 'Continuar');
        definirTexto('pauseStatus', 'Jogo pausado');
    }
}

// troca a dificuldade (Fácil -> Normal -> Difícil -> Fácil...)
function trocarDificuldade() {
    if (dificuldade === 'Fácil') dificuldade = 'Normal';
    else if (dificuldade === 'Normal') dificuldade = 'Difícil';
    else dificuldade = 'Fácil';

    atualizarRotulos();
}

// recebe o nome do botao 
function acoes(acao) {
    if (acao === 'play' || acao === 'retry') {
        iniciarJogo();
    } else if (acao === 'difficulty') {
        trocarDificuldade();
    } else if (acao === 'sound') {
        if (somLigado === true) somLigado = false;
        else somLigado = true;

        if (somLigado === false) pararMusica();
        else if (tela === 'playing' && pausado === false) tocarMusica();

        atualizarRotulos();
    } else if (acao === 'music') {
        if (musicaLigada === true) musicaLigada = false;
        else musicaLigada = true;

        if (musicaLigada === true && tela === 'playing' && pausado === false) tocarMusica();
        else pararMusica();

        atualizarRotulos();
    } else if (acao === 'pause') {
        alternarPausa();
    } else if (acao === 'back') {
        pararMusica();
        pausado = false;
        tela = 'menu';
        mostrarTela('menu');
    }
}

// clique nos botoes
document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-action]');
    if (btn !== null) {
        iniciarAudio();
        acoes(btn.dataset.action);
    }
});

// direcoes: x e y sao o deslocamento em celulas; y- sobe, y+ desce, x- esquerda, x+ direita
var CIMA = { x: 0, y: -1 };
var BAIXO = { x: 0, y: 1 };
var ESQUERDA = { x: -1, y: 0 };
var DIREITA = { x: 1, y: 0 };

// muda a direcao da cobra (impede virar 180 graus)
function virar(nova) {
    if (nova === null || nova === undefined) return;
    var opostaX = nova.x === -direcao.x;
    var opostaY = nova.y === -direcao.y;
    if (!(opostaX && opostaY)) {
        proximaDirecao = nova;
    }
}

// teclado: setas e WASD
function keyPressed() {
    var tecla = key.toLowerCase();
    var nova = null;

    if (tecla === 'arrowup' || tecla === 'w') nova = CIMA;
    else if (tecla === 'arrowdown' || tecla === 's') nova = BAIXO;
    else if (tecla === 'arrowleft' || tecla === 'a') nova = ESQUERDA;
    else if (tecla === 'arrowright' || tecla === 'd') nova = DIREITA;

    if (nova !== null) {
        virar(nova);
        return false; // pra nao rolar a pagina
    }

    if (keyCode === ESCAPE && tela === 'playing') {
        alternarPausa();
    }
}

// direcoes dos botoes de toque (D-pad)
document.addEventListener('click', function (e) {
    var dir = e.target.closest('[data-dir]');
    if (dir !== null && tela === 'playing') {
        var d = dir.dataset.dir;
        if (d === 'up') virar(CIMA);
        else if (d === 'down') virar(BAIXO);
        else if (d === 'left') virar(ESQUERDA);
        else if (d === 'right') virar(DIREITA);
    }
});

// deslizar o dedo sobre o canvas para mudar de direcao (responsividade)
(function () {
    var holder = document.getElementById('canvas-holder');
    if (holder === null) return;

    var inicioX = 0, inicioY = 0, tocando = false;

    holder.addEventListener('touchstart', function (e) {
        var t = e.changedTouches[0];
        inicioX = t.clientX; inicioY = t.clientY;
        tocando = true;
    }, { passive: true });

    holder.addEventListener('touchend', function (e) {
        if (!tocando || tela !== 'playing') return;
        tocando = false;
        var t = e.changedTouches[0];
        var dx = t.clientX - inicioX;
        var dy = t.clientY - inicioY;
        if (Math.abs(dx) < 24 && Math.abs(dy) < 24) return; // foi só um toque
        if (Math.abs(dx) > Math.abs(dy)) {
            virar(dx > 0 ? DIREITA : ESQUERDA);
        } else {
            virar(dy > 0 ? BAIXO : CIMA);
        }
    }, { passive: true });
})();

// comeca o p5
function setup() {
    var cnv = createCanvas(GRADE * CELULA, GRADE * CELULA);
    cnv.parent('canvas-holder');

    recorde = Number(localStorage.getItem(chaveRecorde) || 0);
    definirTexto('best', recorde);
    atualizarRotulos();
    mostrarTela('menu');
}

// loop do p5
function draw() {
    if (tela !== 'playing' || pausado === true) return;
    desenharJogo();
}
