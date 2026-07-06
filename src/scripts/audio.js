// audio.js - som e musica feitos com Web Audio
// escrito de um jeito bem simples

var audioCtx = null;
var passoMelodia = 0;
var timerMusica = null;

// iniciar Audio
function iniciarAudio() {
    if (audioCtx === null) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

// Som
function tom(freq, dur, tipo, vol) {
    if (tipo === undefined) tipo = 'square';
    if (vol === undefined) vol = 0.15;

    if (somLigado === false) return;

    iniciarAudio();

    var osc = audioCtx.createOscillator();
    var ganho = audioCtx.createGain();
    osc.type = tipo;
    osc.frequency.value = freq;

    var agora = audioCtx.currentTime;
    ganho.gain.setValueAtTime(vol, agora);
    ganho.gain.exponentialRampToValueAtTime(0.001, agora + dur);

    osc.connect(ganho);
    ganho.connect(audioCtx.destination);

    osc.start(agora);
    osc.stop(agora + dur);
}

// toca a musica de fundo repetindo as notas
function tocarMusica() {
    if (musicaLigada === false) return;
    if (timerMusica !== null) return;

    iniciarAudio();
    tocarNotaMusica();
    timerMusica = setInterval(tocarNotaMusica, intervaloMelodia);
}

// toca so uma nota da musica
function tocarNotaMusica() {
    var nota = melodia[passoMelodia % melodia.length];
    passoMelodia = passoMelodia + 1;
    tom(nota, intervaloMelodia / 1000, 'triangle', volumeMelodia);
}

// para a musica
function pararMusica() {
    if (timerMusica !== null) {
        clearInterval(timerMusica);
        timerMusica = null;
    }
}

// sons prontos pra usar
function somComer() {
    tom(somComerFreq, somComerDur, 'square', 0.18);
}

function somFimJogo() {
    tom(somFimFreq, somFimDur, 'sawtooth', 0.2);
}
