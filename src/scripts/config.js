// config.js - aqui a gente guarda as coisas do jogo
// (um estagiário escreveu assim, bem simples mesmo)

// tamanho do tabuleiro e das coisas
var GRADE = 25;        // quantas casinhas tem na largura e altura
var CELULA = 25;       // tamanho de cada casinha em pixels
var PONTOS = 10;       // pontos que ganha quando come

// velocidade do jogo dependendo da dificuldade
// Aumentamos ou diminuimos o Frame Rate
var velocidadeFacil = 8;
var velocidadeNormal = 11;
var velocidadeDificil = 16;

// musiquinha que toca no fundo 
var melodia = [262, 294, 330, 349, 392, 349, 330, 294];
var intervaloMelodia = 320;   // tempo entre uma nota e outra (ms)
var volumeMelodia = 0.08;

// sons curtos
var somComerFreq = 660;
var somComerDur = 0.12;
var somFimFreq = 160;
var somFimDur = 0.5;

// onde salvamos o recorde no navegador
var chaveRecorde = 'snakeBest';

// variaveis que mudam durante o jogo
var cobra = [];                         // lista das partes da cobra
var direcao = { x: 1, y: 0 };           // pra onde ela anda agora
var proximaDirecao = { x: 1, y: 0 };    // pra onde vai virar
var comida = null;                      // onde está a comida
var pontos = 0;                         // pontos da partida
var recorde = 0;                        // maior pontuação
var tela = 'menu';                      // 'menu' | 'playing' | 'over'
var pausado = false;                    // se está pausado
var dificuldade = 'Normal';             // Fácil, Normal ou Difícil
var somLigado = true;                   // som ligado ou não
var musicaLigada = true;                // musica ligada ou não
