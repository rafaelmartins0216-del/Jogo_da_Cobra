# 🐍 Snake Game

Um jogo clássico da cobrinha feito com [p5.js](https://p5js.org/), com menu, dificuldades, sons, música e controles de toque.

## 🎮 Como jogar

- Use as **setas** do teclado ou **WASD** para mover a cobra.
- Coma a comida vermelha para crescer e ganhar pontos.
- A velocidade aumenta conforme você pontua.
- **ESC** pausa o jogo.
- Em telas de toque, use o D-pad ou deslize sobre o tabuleiro.

## ✨ Funcionalidades

- Menu com dificuldade (Fácil / Normal / Difícil) e controle de som e música.
- Recorde salvo no `localStorage`.
- Tabuleiro com bordas "infinitas" (a cobra aparece do outro lado).
- Acessibilidade: suporte a leitores de tela e navegação por teclado.
- Controles responsivos para dispositivos móveis.

## 🚀 Como executar

Como é um projeto estático, basta abrir o arquivo `index.html` no navegador.
Para evitar problemas de carregamento, recomenda-se usar um servidor local:

```bash
# Python
python -m http.server 8000

# ou Node
npx serve
```

Depois acesse `http://localhost:8000`.

## 📂 Estrutura

```
index.html              # Estrutura e telas do jogo
src/css/style.css       # Estilos
src/scripts/config.js   # Configurações (tamanho da grade, velocidades)
src/scripts/audio.js    # Efeitos sonoros e música
src/scripts/ui.js       # Telas, rótulos e anúncios
src/scripts/game.js     # Lógica principal do jogo
```

## 🛠️ Tecnologias

- HTML5, CSS3 e JavaScript
- [p5.js](https://cdn.jsdelivr.net/npm/p5@1.9.4/lib/p5.min.js)

## 📝 Licença

Projeto de uso livre para estudo e diversão.
