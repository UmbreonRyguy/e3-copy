const portrait = document.querySelector<HTMLDivElement>("#portrait")!;
const spin = document.querySelector<HTMLButtonElement>("#spin")!;

// The prototype grew inline. Keep it this way until the refactoring checkpoint.
const face = document.createElementNS("http://www.w3.org/2000/svg", "svg");
face.setAttribute("viewBox", "0 0 200 200");
face.setAttribute("role", "img");
face.setAttribute("aria-label", "A neutral face");

const head = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
head.setAttribute("cx", "100");
head.setAttribute("cy", "100");
head.setAttribute("rx", "78");
head.setAttribute("ry", "86");
head.setAttribute("fill", "#f3cf87");
head.setAttribute("stroke", "#302c29");
head.setAttribute("stroke-width", "4");
face.append(head);

const leftEye = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "ellipse",
);
leftEye.setAttribute("cx", "72");
leftEye.setAttribute("cy", "82");
leftEye.setAttribute("rx", "6");
leftEye.setAttribute("ry", "9");
leftEye.setAttribute("fill", "#302c29");
face.append(leftEye);

const rightEye = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "ellipse",
);
rightEye.setAttribute("cx", "128");
rightEye.setAttribute("cy", "82");
rightEye.setAttribute("rx", "6");
rightEye.setAttribute("ry", "9");
rightEye.setAttribute("fill", "#302c29");
face.append(rightEye);

const nose = document.createElementNS("http://www.w3.org/2000/svg", "line");
nose.setAttribute("x1", "100");
nose.setAttribute("y1", "96");
nose.setAttribute("x2", "96");
nose.setAttribute("y2", "112");
nose.setAttribute("stroke", "#302c29");
nose.setAttribute("stroke-width", "4");
nose.setAttribute("stroke-linecap", "round");
face.append(nose);

const mouth = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
mouth.setAttribute("cx", "100");
mouth.setAttribute("cy", "142");
mouth.setAttribute("rx", "12");
mouth.setAttribute("ry", "16");
mouth.setAttribute("fill", "#302c29");
face.append(mouth);

const browL = document.createElementNS("http://www.w3.org/2000/svg", "line");
browL.setAttribute("x1", "60");
browL.setAttribute("y1", "55");
browL.setAttribute("x2", "90");
browL.setAttribute("y2", "40");
browL.setAttribute("stroke", "#302c29");
browL.setAttribute("stroke-width", "4");
browL.setAttribute("stroke-linecap", "round");
face.append(browL);

const browR = document.createElementNS("http://www.w3.org/2000/svg", "line");
browR.setAttribute("x1", "110");
browR.setAttribute("y1", "40");
browR.setAttribute("x2", "142");
browR.setAttribute("y2", "55");
browR.setAttribute("stroke", "#302c29");
browR.setAttribute("stroke-width", "4");
browR.setAttribute("stroke-linecap", "round");
face.append(browR);

//function to create a dot on the face
function dot(cx: number, cy: number, r: number, fill: string, opacity = 1) {
  const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  c.setAttribute("cx", cx.toFixed(1));
  c.setAttribute("cy", cy.toFixed(1));
  c.setAttribute("r", r.toFixed(1));
  c.setAttribute("fill", fill);
  c.setAttribute("opacity", opacity.toFixed(2));
  face.append(c);
}

//Add freckles to each side of the face
for (const side of [-1, 1]) {
  for (let i = 0; i < 55; i++) {
    const angle = i * 2.39996;
    const dist = 2.4 * Math.sqrt(i + 1);
    dot(
      100 + side * 45 + dist * Math.cos(angle),
      118 + dist * Math.sin(angle),
      1.2 + 0.5 * (i % 3),
      "#b5651d",
      0.8,
    );
  }
}

portrait.append(face);

spin.addEventListener("click", () => {
  // Restart rather than accumulate simultaneous animations on repeated clicks.
  for (const animation of face.getAnimations()) animation.cancel();
  face.animate(
    [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
    { duration: 800, easing: "ease-in-out" },
  );
});
