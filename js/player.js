// 🎵 PLAYER DE MÚSICA — Music Hub
// Controla play/pause, troca de músicas, barra de progresso e tempo

// ──────────────────────────────────────────
// 📋 PLAYLIST — adicione mais músicas aqui
// Cada entrada precisa de: title (nome exibido) e src (caminho do arquivo)
// ──────────────────────────────────────────
const songs = [
    { title: 'Little Waltz',              src: 'som/Little Waltz.mp3' },
    { title: 'Daughter of the Sun',        src: 'som/Daughter of the Sun.mp3' },
    { title: 'Without You (Interlude)',    src: 'som/Orion Sun - without you (interlude).mp3' }
];

let currentIndex = 0;  // 🔢 índice da música atual
let isPlaying    = false; // ▶️ estado: tocando ou pausado

// ──────────────────────────────────────────
// 🔗 REFERÊNCIAS AOS ELEMENTOS DO HTML
// ──────────────────────────────────────────
const audio             = document.getElementById('audio');
const playBtn           = document.getElementById('playBtn');
const playIcon          = document.getElementById('playIcon');
const prevBtn           = document.getElementById('prevBtn');
const nextBtn           = document.getElementById('nextBtn');
const songTitle         = document.getElementById('songTitle');
const songIndex         = document.getElementById('songIndex');
const progressContainer = document.getElementById('progressContainer');
const progressBar       = document.getElementById('progressBar');
const currentTimeEl     = document.getElementById('currentTime');
const durationEl        = document.getElementById('duration');
const menuToggle        = document.getElementById('menuToggle');
const nav               = document.getElementById('nav');

// ──────────────────────────────────────────
// 🕐 Formata segundos em "m:ss" (ex: 3:07)
// ──────────────────────────────────────────
function formatTime(secs) {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}

// ──────────────────────────────────────────
// 📂 Carrega uma música pelo índice
//    Atualiza título, contador e reseta barra
// ──────────────────────────────────────────
function loadSong(index) {
    const song = songs[index];
    audio.src = song.src;                                       // 🔊 define o arquivo de áudio
    songTitle.textContent = song.title;                        // 🏷️ exibe o nome da música
    songIndex.textContent = `${index + 1} / ${songs.length}`; // 🔢 ex: "1 / 2"
    progressBar.style.width = '0%';                            // ⬅️ reseta a barra
    currentTimeEl.textContent = '0:00';                        // ⏱️ reseta tempo atual
    durationEl.textContent    = '0:00';                        // ⏱️ reseta duração
}

// ──────────────────────────────────────────
// 🎛️ Atualiza o ícone de acordo com o estado
// ──────────────────────────────────────────
function setPlayState(playing) {
    isPlaying = playing;
    playIcon.className = playing ? 'bx bx-pause' : 'bx bx-play'; // ⏸️ ou ▶️
}

// ──────────────────────────────────────────
// ▶️⏸️ Alterna entre play e pause
// ──────────────────────────────────────────
function togglePlay() {
    if (audio.paused) {
        audio.play();
        setPlayState(true);
    } else {
        audio.pause();
        setPlayState(false);
    }
}

// ──────────────────────────────────────────
// ⏮️ Volta para a música anterior
//    Se estiver na primeira, vai para a última
// ──────────────────────────────────────────
function prevSong() {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    loadSong(currentIndex);
    audio.play();
    setPlayState(true);
}

// ──────────────────────────────────────────
// ⏭️ Avança para a próxima música
//    Se estiver na última, volta para a primeira
// ──────────────────────────────────────────
function nextSong() {
    currentIndex = (currentIndex + 1) % songs.length;
    loadSong(currentIndex);
    audio.play();
    setPlayState(true);
}

// ──────────────────────────────────────────
// 📊 Atualiza a barra de progresso em tempo real
// ──────────────────────────────────────────
audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    const pct = (audio.currentTime / audio.duration) * 100; // % concluído
    progressBar.style.width = `${pct}%`;
    currentTimeEl.textContent = formatTime(audio.currentTime);
});

// ──────────────────────────────────────────
// ⏱️ Exibe a duração total quando o áudio carrega
// ──────────────────────────────────────────
audio.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(audio.duration);
});

// ──────────────────────────────────────────
// 🔁 Quando a música termina, passa para a próxima
// ──────────────────────────────────────────
audio.addEventListener('ended', nextSong);

// ──────────────────────────────────────────
// 🖱️ Clique na barra de progresso para saltar no tempo
// ──────────────────────────────────────────
progressContainer.addEventListener('click', (e) => {
    if (!audio.duration) return;
    const rect  = progressContainer.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width; // posição clicada em %
    audio.currentTime = Math.max(0, Math.min(ratio, 1)) * audio.duration;
});

// ──────────────────────────────────────────
// 🎮 Botões de controle
// ──────────────────────────────────────────
playBtn.addEventListener('click', togglePlay);  // ▶️⏸️
prevBtn.addEventListener('click', prevSong);    // ⏮️
nextBtn.addEventListener('click', nextSong);    // ⏭️

// ──────────────────────────────────────────
// 🍔 Menu hambúrguer (mobile)
//    Abre/fecha o menu e troca o ícone
// ──────────────────────────────────────────
menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    const icon = menuToggle.querySelector('i');
    icon.className = nav.classList.contains('open') ? 'bx bx-x' : 'bx bx-menu'; // ✕ ou ☰
});

// Fecha o menu ao clicar em qualquer link
nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('open');
        menuToggle.querySelector('i').className = 'bx bx-menu';
    });
});

// ──────────────────────────────────────────
// ⏳ Loading screen
//
// Problema com window.load: espera os ficheiros MP3
// carregarem (6 MB+), o que pode nunca acontecer em
// ligações lentas → loader infinito.
//
// Solução: DOMContentLoaded (dispara assim que o HTML
// é lido) + tempo mínimo de 1.5s para o loader não
// piscar em ligações rápidas.
// ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    if (!loader) return;

    // Mostra o loader pelo menos 1.5 s, depois faz fade-out
    setTimeout(() => {
        loader.classList.add('fade-out');          // inicia transição de opacidade
        setTimeout(() => loader.remove(), 750);   // remove do DOM após o fade (0.7s)
    }, 2500);
});

// ──────────────────────────────────────────
// 🚀 Inicializa: carrega a primeira música
// ──────────────────────────────────────────
loadSong(currentIndex);
