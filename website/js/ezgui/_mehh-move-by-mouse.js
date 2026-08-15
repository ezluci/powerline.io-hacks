function moveByMouse(TIME = 100) {

   let dir1, dir2;
   let time1, time2, timeEnd = 0;
   // first we move for time1 milliseconds in direction dir1
   // then we move for time2 milliseconds in direction dir2
   // then we regenerate these numbers

   function generate() {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const angle = Math.atan2(mouseY - centerY, mouseX - centerX);
      const a = TIME * Math.cos(angle);
      const b = TIME * Math.sin(angle);
      
      const now = +Date.now();
      time1 = now;
      time2 = now + Math.abs(a);
      timeEnd = now + Math.abs(a) + Math.abs(b);

      if (a >= 0) {
         dir1 = KT.DIRECTION_RIGHT;
      } else {
         dir1 = KT.DIRECTION_LEFT;
      }

      if (b >= 0) {
         dir2 = KT.DIRECTION_DOWN;
      } else {
         dir2 = KT.DIRECTION_UP;
      }
   }

   const intv = setInterval(() => {
      if (!KT.isInGame) {
         return;
      }

      let now = +Date.now();
      if (now >= timeEnd) {
         generate();
         now = +Date.now();
      }

      if (now >= time2) {
         if (KT.input.direction !== dir2) {
            KT.input.direction = dir2;
            KT.input.turn(dir2);
         }
      } else {
         if (KT.input.direction !== dir1) {
            KT.input.direction = dir1;
            KT.input.turn(dir1);
         }
      }
   }, 20);

   return intv;
}