# 🎵 Music Hub

Site de player de música com design moderno, responsivo e com controles completos.

---

## 📁 Estrutura de Pastas

```
Html-teste-15/
│
├── 📄 index.html          → Estrutura da página (HTML)
│
├── 📂 css/
│   └── 🎨 style.css       → Todos os estilos visuais
│
├── 📂 js/
│   └── ⚙️ player.js       → Lógica do player de música
│
├── 📂 img/
│   ├── fundo.png          → Imagem de fundo da página
│   ├── som.png            → Imagem do fone de ouvido
│   └── play-xxl.png       → Ícone antigo (não usado mais)
│
└── 📂 som/
    ├── musica.mp3         → Música 1
    └── Little Waltz.mp3   → Música 2
```

---

## 🛠️ O que foi feito

### 1. 📂 Organização em pastas
O projeto foi reorganizado para ficar mais limpo:
- Estilos movidos para `css/style.css`
- JavaScript movido para `js/player.js`
- Imagens em `img/` e músicas em `som/` (já existiam)

---

### 2. 🎵 Player de música completo

Antes o site tinha apenas um botão que tocava uma música. Agora tem um **card de player** com:

| Controle | O que faz |
|---|---|
| ⏮️ Botão Anterior | Volta para a música anterior. Se estiver na 1ª, vai para a última. |
| ▶️ Botão Play | Começa a tocar a música atual |
| ⏸️ Botão Pause | Pausa a música. O ícone troca automaticamente entre ▶️ e ⏸️ |
| ⏭️ Botão Próximo | Avança para a próxima música. Se estiver na última, volta para a 1ª. |
| 📊 Barra de progresso | Mostra quanto da música já tocou. **Clique em qualquer ponto** para saltar para aquele momento. |
| ⏱️ Tempo | Mostra o tempo atual e a duração total da música |
| 🔢 Contador | Mostra qual música está tocando (ex: "1 / 3") |
| 🔁 Avanço automático | Quando uma música termina, a próxima começa sozinha |

---

### 3. 💳 Design do card (Glassmorphism)

O card do player usa um efeito chamado **glassmorphism** (efeito de vidro):
- Fundo semitransparente
- Borda sutil com opacidade
- Sombra suave
- Blur atrás do card

---

### 4. 📱 Responsividade

O site se adapta a qualquer tamanho de tela:

| Tamanho | Comportamento |
|---|---|
| 💻 Desktop (> 860px) | Layout horizontal: texto | fone | player lado a lado |
| 📱 Tablet (≤ 860px) | Layout vertical: elementos empilhados um abaixo do outro |
| 📱 Mobile (≤ 768px) | Menu de navegação vira **hambúrguer** 🍔 que abre em tela cheia |
| 📱 Celular pequeno (≤ 420px) | Tudo fica menor para caber na tela |

---

### 5. 🍔 Menu Hambúrguer (mobile)

No celular, o menu de navegação fica escondido para economizar espaço.
- Clique no ícone **☰** para abrir o menu em tela cheia
- O ícone vira **✕** enquanto o menu está aberto
- Clicar em qualquer link do menu fecha o menu automaticamente

---

## ▶️ Como usar

1. Abra o arquivo `index.html` no navegador
2. Clique em **▶️** para tocar a música
3. Use **⏮️** e **⏭️** para trocar de música
4. Clique na **barra de progresso** para pular para um momento da música

---

## ➕ Como adicionar mais músicas

Abra o arquivo `js/player.js` e adicione na lista `songs`:

```js
const songs = [
    { title: 'Little Waltz',           src: 'som/Little Waltz.mp3' },
    { title: 'Daughter of the Sun',     src: 'som/Daughter of the Sun.mp3' },
    { title: 'Without You (Interlude)', src: 'som/Orion Sun - without you (interlude).mp3' },
    { title: 'Nova Música',             src: 'som/nova-musica.mp3' }  // ← adicione aqui
];
```

Coloque o arquivo `.mp3` dentro da pasta `som/` e pronto! 🎶

---

## 🎨 Cores usadas

| Cor | Uso |
|---|---|
| 🟠 `rgb(255, 113, 66)` | Destaque: logo, palavra "MUSIC", botão play, barra de progresso |
| ⚪ Branco | Textos, ícones, bordas |
| 🖤 Preto semitransparente | Overlay do fundo, menu mobile |
