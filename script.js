const music = document.getElementById("background-music");
const soundButton = document.getElementById("enable-sound");
const volumeControl = document.getElementById("volume");
const musicStatus = document.getElementById("music-status");

// Configura o volume inicial com base no input range
music.volume = Number(volumeControl.value);

// Atualiza o texto do botão principal conforme o estado do áudio
function updatePlayer() {
    if (music.paused) {
        soundButton.textContent = "▶ INICIAR MISSÃO SONORA";
    } else {
        soundButton.textContent = "Ⅱ PAUSAR MÚSICA";
    }
}

// Tenta reproduzir o áudio lidando com as políticas de autoplay do navegador
async function playMusic() {
    try {
        await music.play();
    } catch (error) {
        musicStatus.textContent = "Toque em iniciar para ativar o áudio";
    }
    updatePlayer();
}

// Alterna entre play e pause pelo botão principal
soundButton.addEventListener("click", () => {
    if (music.paused) {
        playMusic();
    } else {
        music.pause();
    }
});

// Controle de volume em tempo real
volumeControl.addEventListener("input", () => {
    music.volume = Number(volumeControl.value);
});

// Sincroniza a interface com os eventos nativos do elemento audio
music.addEventListener("play", updatePlayer);
music.addEventListener("pause", updatePlayer);
music.addEventListener("ended", updatePlayer);

// Tratamento de erro caso o arquivo MP3 não seja encontrado
music.addEventListener("error", () => {
    musicStatus.textContent = "Erro: Verifique o arquivo Batista-de-Melo.mp3";
});

// Tenta inicializar ao carregar a página
window.addEventListener("load", () => {
    playMusic();
});