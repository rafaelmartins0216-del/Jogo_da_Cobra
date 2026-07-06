// ui.js - cuida das telas e dos textos que aparecem na tela

// anuncia uma mensagem para leitores de tela (região aria-live)
function anunciar(msg) {
    var el = document.getElementById('announcer');
    if (el !== null) {
        el.textContent = '';
        // força o leitor a reanimar a região
        window.setTimeout(function () { el.textContent = msg; }, 30);
    }
}

// mostra a tela que a gente quer e esconde as outras
function mostrarTela(id) {
    var telas = document.querySelectorAll('.screen');
    for (var i = 0; i < telas.length; i++) {
        telas[i].classList.remove('active');
    }
    var el = document.getElementById(id);
    el.classList.add('active');

    // acessibilidade: muda o foco para a tela recém-exibida
    el.setAttribute('tabindex', '-1');
    el.focus();
}

// muda o texto de um elemento pelo id 
function definirTexto(id, texto) {
    var el = document.getElementById(id);
    if (el !== null) {
        el.textContent = texto;
    }
}

// atualiza os rotulos do menu com as configuracoes atuais
function atualizarRotulos() {
    definirTexto('diffLabel', dificuldade);

    if (somLigado === true) {
        definirTexto('soundLabel', 'Ligado');
    } else {
        definirTexto('soundLabel', 'Desligado');
    }

    if (musicaLigada === true) {
        definirTexto('musicLabel', 'Ligada');
    } else {
        definirTexto('musicLabel', 'Desligada');
    }
}
