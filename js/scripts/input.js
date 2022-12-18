const input_keys = {
  w: { pressed: false },
  a: { pressed: false },
  s: { pressed: false },
  d: { pressed: false },
  r: { pressed: false },
  p: { pressed: false },
  enter: { pressed: false },
};

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
    case " ":
    case "w":
      input_keys.w.pressed = true;
      break;
    case "ArrowLeft":
    case "a":
      input_keys.a.pressed = true;
      break;
    case "ArrowDown":
    case "s":
      input_keys.s.pressed = true;
      break;
    case "ArrowRight":
    case "d":
      input_keys.d.pressed = true;
      break;
    case "r":
      input_keys.r.pressed = true;
      break;
    case "p":
      input_keys.p.pressed = true;
      break;
    case "Enter":
      input_keys.enter.pressed = true;
      break;
  }
});
window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "ArrowUp":
    case " ":
    case "w":
      input_keys.w.pressed = false;
      break;
    case "ArrowLeft":
    case "a":
      input_keys.a.pressed = false;
      break;
    case "ArrowDown":
    case "s":
      input_keys.s.pressed = false;
      break;
    case "ArrowRight":
    case "d":
      input_keys.d.pressed = false;
      break;
    case "r":
      input_keys.r.pressed = false;
      break;
    case "p":
      input_keys.p.pressed = false;
      break;
    case "Enter":
      input_keys.enter.pressed = false;
      break;
  }
});
