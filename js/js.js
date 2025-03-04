$(document).ready(function() {
    // Obtener los elementos
    const audio = $('#audio')[0]; // Obtener el elemento audio
    const playPauseBtn = $('#playPauseBtn');
    const progressBar = $('#progressBar');
    const currentTimeDisplay = $('#currentTime');
    const durationDisplay = $('#duration');

    // Función para actualizar la barra de progreso y el tiempo
    function updateProgress() {
        const currentTime = audio.currentTime;
        const duration = audio.duration;

        // Actualizar la barra de progreso
        const progress = (currentTime / duration) * 100;
        progressBar.val(progress);

        // Actualizar el tiempo transcurrido
        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime % 60);
        currentTimeDisplay.text(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);

        // Actualizar el tiempo total
        const totalMinutes = Math.floor(duration / 60);
        const totalSeconds = Math.floor(duration % 60);
        durationDisplay.text(`${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`);
    }

    // Función para cambiar el estado del botón y controlar la música
    playPauseBtn.on('click', function() {
        if (audio.paused) {
            audio.play();
            playPauseBtn.removeClass('bx-play').addClass('bx-pause');
        } else {
            audio.pause();
            playPauseBtn.removeClass('bx-pause').addClass('bx-play');
        }
    });

    // Función para sincronizar la barra de progreso cuando se hace clic
    progressBar.on('input', function() {
        const progress = progressBar.val();
        const duration = audio.duration;
        audio.currentTime = (progress / 100) * duration;
    });

    // Actualizar la barra de progreso y los tiempos cada segundo
    audio.addEventListener('timeupdate', updateProgress);

    // Inicializar el tiempo total de laq canción
    audio.addEventListener('loadedmetadata', updateProgress);
});


document.getElementById('muteButton').addEventListener('click', function() {
    var video = document.getElementById('videoFondo');
    video.muted = !video.muted;  // Alterna el estado de silencio

    // Cambia el icono dependiendo del estado de silencio
    if (video.muted) {
        this.classList.remove('bx-volume-full'); // Eliminar el ícono de volumen completo
        this.classList.add('bx-volume-mute');    // Añadir el ícono de volumen silenciado
    } else {
        this.classList.remove('bx-volume-mute'); // Eliminar el ícono de volumen silenciado
        this.classList.add('bx-volume-full');    // Añadir el ícono de volumen completo
    }
});

