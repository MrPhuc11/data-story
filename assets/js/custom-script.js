(function () {
  const canvas = document.getElementById("graph-hero-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  let width, height;
  let nodes = [];
  const NUM_NODES = 60; // number of points
  const MAX_LINK_DISTANCE = 130; // max distance for drawing edges
  const CENTER_PULL = 0.0005; // how strongly nodes are attracted to center

  let mouse = { x: null, y: null, active: false };

  function resize() {
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function createNodes() {
    nodes = [];
    const cx = width / 2;
    const cy = height / 2;

    for (let i = 0; i < NUM_NODES; i++) {
      const baseRadius = 2 + Math.random() * 3;

      nodes.push({
        x: cx + (Math.random() - 0.5) * width * 0.8,
        y: cy + (Math.random() - 0.5) * height * 0.8,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: baseRadius,
        baseRadius: baseRadius,
      });
    }
  }

  function update() {
    const cx = width / 2;
    const cy = height / 2;

    for (const n of nodes) {
      // Light attraction toward the center (snowball / clustering effect)
      const dxCenter = cx - n.x;
      const dyCenter = cy - n.y;
      n.vx += dxCenter * CENTER_PULL;
      n.vy += dyCenter * CENTER_PULL;

      // Move node
      n.x += n.vx;
      n.y += n.vy;

      // Soft bounce at bounds
      if (n.x < 0 || n.x > width) n.vx *= -0.9;
      if (n.y < 0 || n.y > height) n.vy *= -0.9;

      // Mouse interaction: nodes near the mouse get a bit bigger
      if (mouse.active) {
        const dx = n.x - mouse.x;
        const dy = n.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          n.r = n.baseRadius + (120 - dist) * 0.03;
        } else {
          n.r += (n.baseRadius - n.r) * 0.1;
        }
      } else {
        n.r += (n.baseRadius - n.r) * 0.1;
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // Draw edges between nearby nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MAX_LINK_DISTANCE) {
          const alpha = 1 - dist / MAX_LINK_DISTANCE;
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.4})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    for (const n of nodes) {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      ctx.fill();
    }
  }

  function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
  }

  // Mouse interaction
  canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
  });

  canvas.addEventListener("mouseleave", () => {
    mouse.active = false;
  });

  // Initialize
  resize();
  createNodes();
  window.addEventListener("resize", () => {
    resize();
    createNodes();
  });
  loop();
})();
