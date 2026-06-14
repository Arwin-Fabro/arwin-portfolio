function toggleMenu() {
    const navLinks = document.getElementById("navLinks");
    navLinks.classList.toggle("active");
}

// Closes mobile menu when a link is clicked
const links = document.querySelectorAll(".nav-links a");

links.forEach(link => {
    link.addEventListener("click", () => {
        document.getElementById("navLinks").classList.remove("active");
    });
});


// Interactive dot background
const canvas = document.getElementById("dotBackground");
const ctx = canvas.getContext("2d");

let dots = [];
const mouse = {
    x: null,
    y: null,
    radius: 105
};

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createDots();
}

function createDots() {
    dots = [];
    const spacing = 35;

    for (let x = 0; x < canvas.width + spacing; x += spacing) {
        for (let y = 0; y < canvas.height + spacing; y += spacing) {
            dots.push({
                x: x,
                y: y,
                baseX: x,
                baseY: y,
                size: 2
            });
        }
    }
}

function animateDots() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    dots.forEach(dot => {
        if (mouse.x !== null && mouse.y !== null) {
            const dx = mouse.x - dot.x;
            const dy = mouse.y - dot.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) {
                const force = (mouse.radius - distance) / mouse.radius;
                const angle = Math.atan2(dy, dx);

                dot.x -= Math.cos(angle) * force * 8;
                dot.y -= Math.sin(angle) * force * 8;
            }
        }

        dot.x += (dot.baseX - dot.x) * 0.08;
        dot.y += (dot.baseY - dot.y) * 0.08;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(205, 211, 215, 0.75)";
        ctx.fill();
    });

    requestAnimationFrame(animateDots);
}

window.addEventListener("mousemove", event => {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
});

window.addEventListener("resize", resizeCanvas);

resizeCanvas();
animateDots();
