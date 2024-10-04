document.body.addEventListener("click", startSlider, !1);

const images = 5;
const firstImage = 2;
const duration = 1e4;
const content = document.getElementById("content");

const emojis = {
    'love': '&#x1F970;',
    'rir': '&#x1F602;'
};

function startSlider() {
    const start = document.getElementById("start");
    const audio = document.querySelector("audio");

    const text = document.getElementById('text-content');
    const words = text.innerHTML.split(' ');

    text.innerHTML = '';

    for (const w of words) {
        const div = document.createElement('div');

        div.className = 'word';

        const emoji = emojis[w];

        if (emoji) {
            div.classList.add('letter');

            div.innerHTML = emoji;
        } else for (const l of w.split('')) {
            const span = document.createElement('span');
    
            span.className = 'letter';
    
            span.innerHTML = l;
    
            div.appendChild(span);
        };

        text.appendChild(div);
    };

    const letters = document.querySelectorAll('#text-content .letter');

    const animation = anime.timeline({
        targets: letters,
        easing: 'easeInOutExpo'
    });

    animation.add({
        scale: 5,
        duration: 0,
        opacity: 0
    });

    animation.add({ scale: 1, duration: 1e3, delay: anime.stagger(50, { start: 2e3 }), opacity: 1 });

    setTimeout(() => audio.play(), 5e2);

    start.classList.add("hide");
    content.classList.add("animation");
    content.style.setProperty("--duration", duration);
    content.style.setProperty("--size", images);
    content.style.setProperty("--one", images - firstImage);

    for (let i = 1; i <= images; i++) {
        const div = document.createElement("div");

        div.classList.add("img");
        div.style.setProperty("--i", i);

        const img = document.createElement("img");

        img.src = `imgs/img-${i}.png`;
        img.alt = `Imagem ${i}`;

        div.appendChild(img);
        content.appendChild(div);
    };

    animate();

    document.body.removeEventListener("click", startSlider);
};

function animate() {
    setTimeout(() => content.classList.remove(`animation-${images}`), (duration * 1.5));

    for (let i = 0; i < images; i++) setTimeout(() => {
        if (i != 0) content.classList.remove(`animation-${i}`);
        content.classList.add(`animation-${i + 1}`);
    }, (duration * (i == 0 ? 1 : 1.5)) * (i + 1));

    setTimeout(animate, (duration * 1.5) * (images));
};