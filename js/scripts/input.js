const keys = {
  w: { pressed: false },
  a: { pressed: false },
  s: { pressed: false },
  d: { pressed: false },
  r: { pressed: false },
  p: { pressed: false },
};

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
    case " ":
    case "w":
      keys.w.pressed = true;
      break;
    case "ArrowLeft":
    case "a":
      keys.a.pressed = true;
      break;
    case "ArrowDown":
    case "s":
      keys.s.pressed = true;
      break;
    case "ArrowRight":
    case "d":
      keys.d.pressed = true;
      break;
    case "r":
      keys.r.pressed = true;
      break;
    case "p":
      keys.p.pressed = true;
      break;
  }
});
window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "ArrowUp":
    case " ":
    case "w":
      keys.w.pressed = false;
      break;
    case "ArrowLeft":
    case "a":
      keys.a.pressed = false;
      break;
    case "ArrowDown":
    case "s":
      keys.s.pressed = false;
      break;
    case "ArrowRight":
    case "d":
      keys.d.pressed = false;
      break;
    case "r":
      keys.r.pressed = false;
      break;
    case "p":
      keys.p.pressed = false;
      break;
  }
});
