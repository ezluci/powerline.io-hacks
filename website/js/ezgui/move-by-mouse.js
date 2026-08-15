function moveByMouse(TIME = 100) {

   let dir = KT.input.direction, timeEnd = 0;

   function generateNextDir() {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const angle = Math.atan2(mouseY - centerY, mouseX - centerX);
      const a = TIME * Math.cos(angle);
      const b = TIME * Math.sin(angle);

      const now = +Date.now();
      if (dir === KT.DIRECTION_DOWN || dir === KT.DIRECTION_UP) {
         if (a >= 0) {
            dir = KT.DIRECTION_RIGHT;
         } else {
            dir = KT.DIRECTION_LEFT;
         }
         timeEnd = now + Math.abs(a);
      } else if (dir === KT.DIRECTION_LEFT || dir === KT.DIRECTION_RIGHT) {
         if (b >= 0) {
            dir = KT.DIRECTION_DOWN;
         } else {
            dir = KT.DIRECTION_UP;
         }
         timeEnd = now + Math.abs(b);
      }
   }

   const intv = setInterval(() => {
      if (!KT.isInGame) {
         return;
      }

      const now = +Date.now();
      if (now >= timeEnd) {
         generateNextDir();
         if (timeEnd - now <= 10) {
            return;
         }
         if (KT.input.direction !== dir) {
            KT.input.direction = dir;
            KT.input.turn(dir);
         }
      }
   }, 20);

   return intv;
}