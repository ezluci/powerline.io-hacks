let mouseX = 0, mouseY = 0;
let mouseToWorldX = 0, mouseToWorldY = 0;

window.addEventListener('mousemove', (event) => {
   mouseX = event.clientX;
   mouseY = event.clientY;
});

setInterval(() => {
   mouseToWorldX = KT.camera.x + (mouseX - window.innerWidth / 2) / (KT.camera.zoom * 2);
   mouseToWorldX = Math.max(Math.min(mouseToWorldX, KT.arenaWidth / 2), -KT.arenaWidth / 2);

   mouseToWorldY = KT.camera.y + (mouseY - window.innerHeight / 2) / (KT.camera.zoom * 2);
   mouseToWorldY = Math.max(Math.min(mouseToWorldY, KT.arenaHeight / 2), -KT.arenaHeight / 2);
}, 50);