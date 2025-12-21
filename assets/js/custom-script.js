// Use an absolute path so Liquid is not required to resolve the base URL.
const IMAGE_BASE = "/data-story/Images/";

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

// document.addEventListener("DOMContentLoaded", function () {
//     const bdContainer = document.getElementById("monet-bd-story");
//     if (!bdContainer) return;

//     // The HTML structure for the story
//     const bdHTML = `
//         <div class="bd-wrapper">
//             <h2 class="bd-title">The Reddit Avalanche of 1869</h2>
//             <div class="bd-grid">
//                 <div class="bd-panel">
//                     <div class="bd-illustration panel-1"></div>
//                     <div class="bd-caption"><strong>1. The Post:</strong> Monet shares his "Magpie". In Reddit terms, he is the <em>Source</em> node.</div>
//                 </div>
//                 <div class="bd-panel">
//                     <div class="bd-illustration panel-2"></div>
//                     <div class="bd-caption"><strong>2. The Upvote:</strong> Peers share it forward. This is a <strong>Positive Sentiment</strong> cascade.</div>
//                 </div>
//                 <div class="bd-panel negative-highlight">
//                     <div class="bd-illustration panel-3"></div>
//                     <div class="bd-caption"><strong>3. The Attack:</strong> A critic throws a <em>negative</em> snowball. Conflict accelerates the snowball effect.</div>
//                 </div>
//                 <div class="bd-panel">
//                     <div class="bd-illustration panel-4"></div>
//                     <div class="bd-caption"><strong>4. The Avalanche:</strong> Total network amplification. One flake became a massive cluster.</div>
//                 </div>
//             </div>
//         </div>
//     `;

//     bdContainer.innerHTML = bdHTML;
// });

document.addEventListener("DOMContentLoaded", function () {
  const bdContainer = document.getElementById("monet-bd-story");
  if (!bdContainer) return;

  const bdHTML = `
        <style>
            /* This section removes the yellowish background */
            .bd-wrapper {
                background-color: transparent !important; /* Forces transparency */
                padding: 20px 0;
            }

            .bd-grid {
                background-color: transparent !important;
                display: flex;
                gap: 15px; /* Adjusts space between panels */
                justify-content: center;
            }

            /* Optional: Ensures the panels themselves stay clean */
            .bd-panel {
                background-color: white; 
                border: 2px solid black;
            }
        </style>

        <div class="bd-wrapper">
            <div class="bd-grid">
                <div class="bd-panel">
                    <div class="bd-illustration" style="background-image: url('${IMAGE_BASE}bd-panel-1.png');">
                        <div class="speech-bubble">"I've Just finished The Magpie. I'll send a sketch of it to Picasso. I wonder what he thinks?"</div>
                    </div>
                </div>

                <div class="bd-panel">
                    <div class="bd-illustration" style="background-image: url('${IMAGE_BASE}bd-panel-2.png');">
                        <div class="speech-bubble">"Wow! This drawing is exceptional. I must show it to others!"</div>
                    </div>
                </div>

                <div class="bd-panel negative-highlight">
                    <div class="bd-illustration" style="background-image: url('${IMAGE_BASE}bd-panel-3.png');">
                        <div class="speech-bubble">"Exceptional? It's unfinished trash! Monet is a fraud, don't look at this disaster!"</div>
                    </div>
                </div>
            </div>
        </div>
    `;

  bdContainer.innerHTML = bdHTML;
});

// Simple confetti on clicking the celebration emoji
document.addEventListener("DOMContentLoaded", function () {
  const trigger = document.getElementById("confetti-emoji");
  if (!trigger) return;

  const container = document.createElement("div");
  container.id = "confetti-container";
  container.style.position = "fixed";
  container.style.top = "0";
  container.style.left = "0";
  container.style.width = "100%";
  container.style.height = "100%";
  container.style.pointerEvents = "none";
  container.style.overflow = "hidden";
  container.style.zIndex = "12000";
  document.body.appendChild(container);

  function ensureConfettiStyles() {
    if (document.getElementById("confetti-style")) return;
    const style = document.createElement("style");
    style.id = "confetti-style";
    style.textContent = `
      .confetti-piece {
        position: absolute;
        width: 8px;
        height: 14px;
        border-radius: 2px;
        opacity: 0.9;
      }
      @keyframes confetti-fall {
        0% { transform: translateY(-10vh) rotate(0deg); }
        100% { transform: translateY(110vh) rotate(720deg); }
      }
    `;
    document.head.appendChild(style);
  }

  function launchConfetti() {
    ensureConfettiStyles();
    const colors = ["#fbbf24", "#f472b6", "#60a5fa", "#34d399", "#f87171"];
    const count = 60;
    for (let i = 0; i < count; i++) {
      const piece = document.createElement("span");
      piece.className = "confetti-piece";
      piece.style.left = Math.random() * 100 + "%";
      piece.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      piece.style.animation = `confetti-fall ${6 + Math.random() * 2}s linear`;
      piece.style.animationDelay = `${Math.random() * -2}s`;
      piece.style.transform = `rotate(${Math.random() * 360}deg)`;
      container.appendChild(piece);
      setTimeout(() => piece.remove(), 8000);
    }
  }

  trigger.style.cursor = "pointer";
  trigger.title = "Celebrate";
  trigger.addEventListener("click", launchConfetti);
});

window.onscroll = function () {
  const nav = document.querySelector("nav");
  if (window.pageYOffset > 50) {
    nav.style.backgroundColor = "#acc8e5";
  } else {
    nav.style.backgroundColor = "transparent";
  }
};

document.querySelector(".hero-button").addEventListener("click", function (e) {
  e.preventDefault();
  const targetId = this.getAttribute("href");
  const targetElement = document.querySelector(targetId);

  if (targetElement) {
    const targetPosition =
      targetElement.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    // Change this number to make it slower (e.g., 5000 for 5 seconds)
    const duration = 2000;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    // Easing function to make it start and end smoothly
    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const bdContainer = document.getElementById("monet-bd-story2");
  if (!bdContainer) return;

  const bdHTML = `
        <style>
            /* Reset container to be transparent and clear floats */
            #monet-bd-story2, .bd-wrapper-shock {
                background-color: transparent !important;
                background: none !important;
                display: block; 
                width: 100%;
                overflow: hidden; 
            }

            .bd-panel-shock {
                float: right; 
                width: 300px; 
                height: 300px;
                margin-left: 40px; 
                margin-bottom: 10px;
                margin-top: 5px; 
                border: 3px solid black; 
                background-color: white; 
                position: relative;
                box-sizing: border-box;
            }

            .bd-illustration-shock {
                width: 100%;
                height: 100%;
                background-image: url('${IMAGE_BASE}Monet_Sentiment_shock.png');
                background-size: cover;
                background-position: center;
            }

            .speech-bubble-shock {
                position: absolute;
                top: 15px;
                left: 10px;
                right: 30px; /* Increased to make room for the tail */
                background: white;
                border: 2px solid black;
                border-radius: 12px;
                padding: 10px;
                font-family: sans-serif;
                font-size: 13px;
                font-weight: bold;
                text-align: center;
                z-index: 10;
            }

            .speech-bubble-shock::after {
                content: '';
                position: absolute;
                bottom: -15px; 
                right: 37px;    /* Changed from left to right */
                width: 0;
                height: 0;
                border-top: 15px solid black;
                border-left: 10px solid transparent;
                border-right: 10px solid transparent;
                z-index: -1;
            }

            /* The white inside of the downward tail */
            .speech-bubble-shock::before {
                content: '';
                position: absolute;
                bottom: -11px; 
                right: 38px;    /* Adjusted to align with the outline */
                width: 0;
                height: 0;
                border-top: 13px solid white;
                border-left: 9px solid transparent;
                border-right: 9px solid transparent;
                z-index: 11;
            }

            .bd-text-content-shock {
                font-family: inherit;
                line-height: 1.6;
                display: block;
            }
            
            .bd-text-content-shock p {
                margin-top: 0;
            }
        </style>

        <div class="bd-wrapper-shock">
            <div class="bd-panel-shock">
                <div class="bd-illustration-shock">
                    <div class="speech-bubble-shock">
                        "Monet, the sketch isn't good at all!"
                    </div>
                </div>
            </div>

            <div class="bd-text-content-shock">
                <p>
                    Like most social media platforms, Reddit can be a hostile place, and strongly polarized 
                    interactions between communities are far from rare. Most of the time, these interactions 
                    fade into the background noise of daily activity and have little lasting impact. 
                    But occasionally, a link stands out, not just for its negativity, but sometimes for 
                    being unusually positive praise, compared to what a subreddit typically receives. 
                    This naturally raises the question of what comes next.
                    We just introduced sentiment shocks: most links hover near neutral, but occasionally 
                    a subreddit gets an incoming link that is unusually negative or unusually positive 
                    compared with what it normally receives. Those rare outliers are the disruptions we 
                    track and we call them shock events.
                </p>
                <p>
                    So what does such an event actually look like in practice? To answer that, let’s zoom 
                    in on the subreddit of one of the most famous game clash of clans.
                </p>
            </div>
        </div>
    `;

  bdContainer.innerHTML = bdHTML;
});

document.addEventListener("DOMContentLoaded", function () {
  const bdContainer = document.getElementById("monet-stats");
  if (!bdContainer) return;

  const bdHTML = `
        <style>
            /* Reset container to be transparent and clear floats */
            #monet-stats, .bd-wrapper-stats {
                background-color: transparent !important;
                background: none !important;
                display: flex;
                align-items: center;
                gap: 20px;
                flex-wrap: wrap;
                width: 100%;
                overflow: hidden;
            }

            .bd-panel-stats {
                flex: 0 0 240px;
                height: 240px;
                border: 3px solid black;
                background-color: white;
                position: relative;
                box-sizing: border-box;
            }

            .bd-illustration-stats {
                width: 100%;
                height: 100%;
                background-image: url('${IMAGE_BASE}monet_stats.png');
                background-size: cover;
                background-position: center;
            }

            .speech-bubble-stats {
                position: absolute;
                top: 15px;
                left: 10px;
                right: 30px; /* Increased to make room for the tail */
                background: white;
                border: 2px solid black;
                border-radius: 12px;
                padding: 10px;
                font-family: sans-serif;
                font-size: 13px;
                font-weight: bold;
                text-align: center;
                z-index: 10;
            }

            .speech-bubble-stats::after {
                content: '';
                position: absolute;
                bottom: -15px; 
                right: 37px;    /* Changed from left to right */
                width: 0;
                height: 0;
                border-top: 15px solid black;
                border-left: 10px solid transparent;
                border-right: 10px solid transparent;
                z-index: -1;
            }

            /* The white inside of the downward tail */
            .speech-bubble-stats::before {
                content: '';
                position: absolute;
                bottom: -11px; 
                right: 38px;    /* Adjusted to align with the outline */
                width: 0;
                height: 0;
                border-top: 13px solid white;
                border-left: 9px solid transparent;
                border-right: 9px solid transparent;
                z-index: 11;
            }

            .bd-text-content-stats {
                font-family: inherit;
                line-height: 1.6;
                display: block;
                flex: 1 1 320px;
            }

            .bd-text-content-stats p {
                margin-top: 0;
            }

            @media (max-width: 700px) {
                #monet-stats, .bd-wrapper-stats {
                    flex-direction: column;
                    align-items: center;
                }

                .bd-panel-stats {
                    width: 100%;
                    max-width: 260px;
                    height: 260px;
                }

                .bd-text-content-stats {
                    text-align: center;
                }
            }
        </style>

        <div class="bd-wrapper-stats">
            <div class="bd-panel-stats">
                <div class="bd-illustration-stats">
                    <div class="speech-bubble-stats">
                        "I hate statistics"
                    </div>
                </div>
            </div>

            <div class="bd-text-content-stats">
                <p>
                    Sorry Monet, we know statistics can be hard sometimes, but they're the only way we have the right to make a causal claim.
                </p>
            </div>
        </div>
    `;

  bdContainer.innerHTML = bdHTML;
});
document.addEventListener("DOMContentLoaded", function () {
    const bdContainer = document.getElementById("monet-bd-story3");
    if (!bdContainer) return;

    const bdHTML = `
        <style>
            /* Reset container */
            #monet-bd-story3, .bd-wrapper3 {
                background-color: transparent !important;
                background: none !important;
                display: block; 
                width: 100%;
                overflow: hidden; 
            }

            .bd-panel3 {
                float: right; 
                width: 300px; 
                height: 300px;
                margin-left: 40px; 
                margin-bottom: 10px;
                margin-top: 5px; 
                border: 3px solid black; 
                background-color: white; 
                position: relative;
                box-sizing: border-box;
            }

            .bd-illustration3 {
                width: 100%;
                height: 100%;
                background-image: url('Images/Monet_repetative shock.png');
                background-size: cover;
                background-position: center;
            }

            /* Updated styles for smaller, elongated bubbles */
            .bubble-base {
                position: absolute;
                background: white;
                border: 2px solid black;
                border-radius: 20px; /* More rounded for an elongated look */
                padding: 5px 15px;   /* Less vertical padding, more horizontal */
                font-family: sans-serif;
                font-size: 11px;     /* Slightly smaller font */
                font-weight: bold;
                text-align: center;
                z-index: 10;
                box-sizing: border-box;
                width: auto;         /* Allow width to fit text */
                min-width: 140px;
                max-width: 220px;
            }

            /* Positioning Bubbles stacked at the top */
            .bubble-top {
                top: 15px;
                left: 40px;
            }

            .bubble-second {
                top: 65px; /* Positioned right after the first one */
                right: 30px;
            }

            /* Common Tail Logic */
            .bubble-base::after, .bubble-base::before {
                content: '';
                position: absolute;
                width: 0;
                height: 0;
                border-left: 8px solid transparent;
                border-right: 8px solid transparent;
            }

            /* Tail for Top Bubble (Left-ish) */
            .bubble-top::after {
                bottom: -12px; 
                left: 30px;   
                border-top: 12px solid black;
                z-index: -1;
            }
            .bubble-top::before {
                bottom: -9px; 
                left: 31px;  
                border-top: 10px solid white;
                z-index: 11;
            }

            /* Tail for Second Bubble (Right-ish) */
            .bubble-second::after {
                bottom: -12px; 
                right: 40px;   
                border-top: 12px solid black;
                z-index: -1;
            }
            .bubble-second::before {
                bottom: -9px; 
                right: 41px;  
                border-top: 10px solid white;
                z-index: 11;
            }

            .bd-text-content3 {
                font-family: inherit;
                line-height: 1.6;
                display: block;
            }
            
            .bd-text-content3 p {
                margin-top: 0;
            }
        </style>

        <div class="bd-wrapper3">
            <div class="bd-panel3">
                <div class="bd-illustration3">
                    <div class="bubble-base bubble-top">
                        “Look at Monet’s painting!”
                    </div>

                    <div class="bubble-base bubble-second">
                        "Oh! look at that painting!"
                    </div>
                </div>
            </div>

            <div class="bd-text-content3">
                <p>
                    If you've made it this far, you've seen that even strongly
                    polarized incoming links don't budge a subreddit's outgoing
                    sentiment or how often it links out. Now let's see whether
                    a snowball shows up with repetitive shock events. We define
                    those as  sudden bursts of links
                    hitting a subreddit in a short window that is different from
                    the usual. Do these spikes amplify certain narratives, like 
                    a shift on the usual sentiment of the subreddit sentiment or
                    can we also see an impact on the frequency of the outgoing links?
                </p>
            </div>
        </div>
    `;

    bdContainer.innerHTML = bdHTML;
});

