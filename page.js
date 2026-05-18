const navItems = [
  "Profile",
  "About",
  "Skills",
  "Projects",
  "PCB Designs",
  "Research",
  "Certificates",
  "Experience",
  "Contact"
];

const skills = [
  "Embedded C",
  "STM32",
  "ESP32",
  "Arduino",
  "KiCad",
  "Altium",
  "Signal Integrity",
  "IoT Protocols",
  "Python",
  "MATLAB",
  "Verilog",
  "Power Electronics"
];

const profileTags = ["Embedded Systems", "TinyML", "PCB Design", "Edge AI"];

const profileFacts = [
  ["College", "Parul University"],
  ["Location", "Vadodara, Gujarat"],
  ["Role", "Electronics & Communication Engineering Student"]
];

const projectPlaceholders = [
  {
    name: "Embedded Systems Projects",
    type: "Firmware + Hardware",
    text: "Reserved for verified microcontroller, sensor, communication, and control-system builds.",
    tags: ["MCU", "RTOS", "IoT"]
  },
  {
    name: "TinyML Work",
    type: "Edge Intelligence",
    text: "Reserved for on-device inference experiments, model optimization notes, and benchmarked demos.",
    tags: ["TinyML", "Signals", "Edge AI"]
  },
  {
    name: "Electronics Tools",
    type: "Lab Utilities",
    text: "Reserved for dashboards, measurement helpers, serial monitors, and engineering workflow tools.",
    tags: ["Telemetry", "Debug", "UI"]
  }
];

const pcbPlaceholders = [
  "PCB design slot prepared for schematic, layout screenshots, stackup notes, and fabrication status.",
  "Board bring-up slot prepared for test points, validation checklist, and oscilloscope captures.",
  "Manufacturing slot prepared for Gerbers, BOM status, enclosure fit, and revision history.",
  "Signal/power integrity slot prepared for routing constraints, copper strategy, and review notes."
];

const paperPlaceholders = [
  "Research or review paper slot prepared for title, abstract, keywords, and publication status.",
  "Literature review slot prepared for paper summaries, comparison matrix, and methodology notes.",
  "Technical writing slot prepared for diagrams, references, experiments, and revision state."
];

const certificatePlaceholders = [
  "PCB Design Certificate",
  "Embedded Systems Certificate",
  "TinyML Certificate",
  "Research / Technical Writing Certificate"
];

const experiencePlaceholders = [
  {
    role: "Experience Timeline",
    org: "Professional entry pending",
    time: "Coming Soon",
    detail: "Reserved for verified internships, roles, lab work, freelance work, or team contributions."
  },
  {
    role: "Project Leadership",
    org: "Verified contribution pending",
    time: "Coming Soon",
    detail: "Reserved for documented ownership, collaboration, mentoring, or competition experience."
  },
  {
    role: "Research / Lab Work",
    org: "Verified record pending",
    time: "Coming Soon",
    detail: "Reserved for supervised research, experiments, review papers, or academic technical work."
  }
];

const motionLib = window.Motion || window.framerMotion;
const m = motionLib?.motion;

function Reveal({ children, className = "", delay = 0, as = "div" }) {
  if (!m) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = m[as] || m.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 14, filter: "blur(3px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.48, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}

function ThreeElectronField() {
  const mountRef = React.useRef(null);

  React.useEffect(() => {
    if (!window.THREE || !mountRef.current) return undefined;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return undefined;

    const mount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "low-power" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
    mount.appendChild(renderer.domElement);

    const particleCount = window.innerWidth < 700 ? 42 : 84;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const colorA = new THREE.Color("#2ef2ff");
    const colorB = new THREE.Color("#b8ff2c");

    for (let i = 0; i < particleCount; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 38;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 14;
      const color = i % 3 === 0 ? colorB : colorA;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.07,
      vertexColors: true,
      transparent: true,
      opacity: 0.42,
      blending: THREE.NormalBlending,
      depthWrite: false
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const resize = () => {
      const { width, height } = mount.getBoundingClientRect();
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
    };

    let frame = 0;
    let tick = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      tick += 1;
      const elapsed = performance.now() * 0.00012;
      points.rotation.y = elapsed;
      points.rotation.x = Math.sin(elapsed * 1.4) * 0.07;

      if (tick % 3 === 0) {
        const attribute = geometry.getAttribute("position");
        for (let i = 0; i < particleCount; i += 1) {
          const yIndex = i * 3 + 1;
          attribute.array[yIndex] += Math.sin(elapsed * 7 + i) * 0.0009;
        }
        attribute.needsUpdate = true;
      }
      renderer.render(scene, camera);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="electron-field" aria-hidden="true" />;
}

function CircuitBackdrop() {
  const traces = [
    ["top-[12%] left-[2%] w-[46%]", "0s"],
    ["top-[26%] right-[0%] w-[42%]", "1.2s"],
    ["top-[48%] left-[12%] w-[62%]", "2.1s"],
    ["bottom-[20%] left-[18%] w-[52%]", "0.7s"],
    ["bottom-[38%] right-[12%] w-[36%]", "1.8s"],
    ["top-[70%] left-[0%] w-[28%]", "2.8s"]
  ];
  const verticals = [
    ["top-[10%] left-[29%]", "0.4s"],
    ["top-[28%] right-[24%]", "1.6s"],
    ["bottom-[8%] left-[68%]", "2.2s"],
    ["top-[45%] left-[52%]", "0.9s"],
    ["top-[4%] right-[10%]", "3s"]
  ];
  const nodes = [
    "top-[11%] left-[24%]",
    "top-[25%] right-[34%]",
    "top-[47%] left-[51%]",
    "bottom-[19%] left-[64%]",
    "bottom-[37%] right-[17%]",
    "top-[69%] left-[27%]"
  ];

  return (
    <div className="circuit-board" aria-hidden="true">
      <div className="pcb-grid" />
      {traces.map(([classes, delay]) => (
        <span key={classes} className={`trace ${classes}`} style={{ animationDelay: delay }} />
      ))}
      {verticals.map(([classes, delay]) => (
        <span key={classes} className={`trace vertical ${classes}`} style={{ animationDelay: delay }} />
      ))}
      {nodes.map((classes, index) => (
        <span key={classes} className={`node spark ${classes}`} style={{ animationDelay: `${index * 0.35}s` }} />
      ))}
      <span className="voltage-ripple top-[18%] left-[42%]" />
      <span className="voltage-ripple bottom-[26%] right-[28%]" style={{ animationDelay: "1.4s" }} />
      <span className="voltage-ripple top-[58%] left-[16%]" style={{ animationDelay: "2.2s" }} />
    </div>
  );
}

function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-cyan-300/10 bg-void/72 backdrop-blur-xl">
      <nav className="mx-auto flex w-[min(1180px,calc(100%-32px))] items-center justify-between py-4">
        <a href="#hero" className="brand-mark font-display text-base font-extrabold text-white sm:text-lg">
          Cheegte Lohith Rao
        </a>
        <div className="hidden items-center gap-5 text-sm font-semibold text-slate-300 lg:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
              className="transition hover:text-neon"
            >
              {item}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="power-switch min-h-10 px-4 text-xs"
        >
          <span className="switch-led" />
          Connect
        </a>
      </nav>
    </header>
  );
}

function HeroVisual() {
  return (
    <Reveal className="floating-dashboard glass dashboard-shell relative min-h-[455px] overflow-hidden rounded-lg p-5 md:p-6" delay={0.2}>
      <div className="boot-overlay">
        <p>BOOTING STM32 LAB OS</p>
        <p>CHECKING GPIO MAP ... OK</p>
        <p>LOCKING PLL @ 168MHz ... OK</p>
        <p>ARMING SIGNAL MONITOR ... READY</p>
      </div>
      <div className="mb-4 flex items-center justify-between border-b border-cyan-200/10 pb-4">
        <div>
          <p className="font-display text-sm text-neon neon-type">OSC-2048</p>
          <p className="text-xs text-slate-400">embedded signal analyzer</p>
        </div>
        <div className="flex gap-2">
          <span className="h-3 w-3 rounded-full bg-acid shadow-[0_0_8px_rgba(184,255,44,0.55)]" />
          <span className="h-3 w-3 rounded-full bg-copper shadow-[0_0_8px_rgba(245,158,11,0.55)]" />
          <span className="h-3 w-3 rounded-full bg-magenta shadow-[0_0_8px_rgba(255,61,242,0.55)]" />
        </div>
      </div>
      <div className="signal-lane mb-4">
        <span />
        <span />
        <span />
      </div>
      <svg viewBox="0 0 520 210" className="scope-screen h-44 w-full rounded border border-cyan-300/10 bg-void/50 md:h-48">
        <path
          className="waveform"
          d="M0 105 H45 L58 52 L75 158 L90 105 H132 L148 82 L162 126 L178 105 H225 L242 38 L258 170 L274 105 H334 L350 68 L366 142 L382 105 H440 L455 92 L470 118 L486 105 H520"
          fill="none"
          stroke="#2ef2ff"
          strokeWidth="4"
        />
        <path
          className="ripple-wave"
          d="M0 164 C64 130 104 184 170 142 S282 114 340 138 S432 176 520 126"
          fill="none"
          stroke="#ff3df2"
          strokeWidth="2"
          opacity="0.65"
        />
        <path
          className="ripple-wave ripple-alt"
          d="M0 74 C60 94 112 46 170 72 S274 116 334 76 S434 36 520 86"
          fill="none"
          stroke="#b8ff2c"
          strokeWidth="1.5"
          opacity="0.55"
        />
      </svg>
      <div className="grid grid-cols-4 gap-3">
        {[42, 76, 58, 92].map((height, index) => (
          <div key={height} className="rounded border border-cyan-200/10 bg-white/[0.03] p-3">
            <div className="mb-3 flex h-16 items-end gap-1">
              {[35, height, 52, 78].map((bar, barIndex) => (
                <span
                  key={`${bar}-${barIndex}`}
                  className="signal-bar block w-full bg-gradient-to-t from-neon to-acid"
                  style={{ height: `${bar}%` }}
                />
              ))}
            </div>
            <p className="text-[11px] font-bold text-slate-400">CH-{index + 1}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3 text-xs">
        {["VCORE 3.30V", "TEMP 41C", "CLK 168MHz"].map((item) => (
          <div key={item} className="rounded border border-cyan-200/10 bg-neon/5 px-3 py-2 text-slate-300">
            {item}
          </div>
        ))}
      </div>
    </Reveal>
  );
}

function Hero() {
  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden pt-24">
      <ThreeElectronField />
      <CircuitBackdrop />
      <div className="section-shell grid items-center gap-10 lg:grid-cols-[1.04fr_0.96fr]">
        <Reveal className="relative z-10">
          <p className="section-kicker hero-kicker mb-5">Embedded systems engineering portfolio</p>
          <h1 className="hero-title font-display text-[clamp(2.45rem,5.7vw,5.35rem)] font-extrabold leading-[1.02] text-white">
            Embedded Systems &amp; PCB Design
          </h1>
          <p className="hero-subheading mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            I&apos;m Cheegte Lohith Rao, an Electronics &amp; Communication Engineering student focused on
            firmware, PCB design, TinyML, and intelligent edge hardware for practical low-power systems.
          </p>
          <div className="hero-meta mt-7 flex flex-wrap gap-3">
            {["ECE Student", "Parul University", "Vadodara, Gujarat", "TinyML + Edge Hardware"].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#projects" className="power-switch">
              <span className="switch-led" />
              View Projects
            </a>
            <a href="#pcb-designs" className="power-switch power-switch-secondary">
              <span className="switch-led" />
              PCB Portfolio
            </a>
          </div>
        </Reveal>
        <HeroVisual />
      </div>
    </section>
  );
}

function ProfileIdentity() {
  return (
    <section id="profile" className="section-shell">
      <div className="profile-console glass grid gap-10 rounded-lg p-6 md:p-8 lg:grid-cols-[0.92fr_1.08fr]">
        <Reveal className="profile-frame-wrap">
          <div className="profile-frame">
            <div className="profile-rings" />
            <div className="profile-chip-outline" />
            <div className="profile-image-placeholder">
              <span>CLR</span>
              <small>ECE / Embedded</small>
            </div>
            <span className="profile-pulse-dot top-[18%] left-[12%]" />
            <span className="profile-pulse-dot bottom-[20%] right-[13%]" style={{ animationDelay: "0.8s" }} />
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {["GH", "IN", "X"].map((icon) => (
              <a key={icon} href="#" className="social-port" aria-label={`${icon} profile placeholder`}>
                {icon}
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal className="profile-data-panel" delay={0.12}>
          <div className="module-status mb-5">
            <span className="switch-led" />
            ENGINEERING PROFILE
          </div>
          <p className="section-kicker mb-3">profile / identity</p>
          <h2 className="terminal-text neon-heading font-display text-[clamp(2.1rem,5vw,4.8rem)] font-extrabold leading-none text-white">
            Cheegte Lohith Rao
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Electronics and Communication Engineering student at Parul University, Vadodara, building toward
            embedded AI systems, PCB and firmware engineering, TinyML hardware, and low-power fault detection.
          </p>

          <div className="profile-divider my-7" />

          <div className="grid gap-3 md:grid-cols-3">
            {profileFacts.map(([label, value]) => (
              <div key={label} className="identity-stat">
                <p>{label}</p>
                <strong>{value}</strong>
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            {profileTags.map((tag, index) => (
              <span key={tag} className="profile-tag" style={{ animationDelay: `${index * 0.18}s` }}>
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="status-strip">
              <span />
              LOW-POWER FOCUS
            </div>
            <div className="status-strip status-strip-alt">
              <span />
              EDGE AI DIRECTION
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#" className="power-switch power-switch-secondary">
              <span className="switch-led" />
              Resume
            </a>
            <a href="#contact" className="power-switch">
              <span className="switch-led" />
              Contact
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SectionIntro({ kicker, title, text }) {
  return (
    <Reveal className="mb-10 max-w-3xl">
      <p className="section-kicker mb-3">{kicker}</p>
      <h2 className="section-title text-white">{title}</h2>
      {text && <p className="mt-4 text-base leading-7 text-slate-300">{text}</p>}
    </Reveal>
  );
}

function About() {
  return (
    <section id="about" className="section-shell">
      <SectionIntro
        kicker="about"
        title="Hardware intuition with measured engineering discipline"
        text="My work sits between electronics engineering, firmware, and data-rich interfaces. I enjoy turning raw signals into decisions: from board bring-up and probing to telemetry, control loops, and clear technical documentation."
      />
      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["Circuit-first thinking", "Schematic hygiene, test points, grounding strategy, and readable board architecture."],
          ["Firmware discipline", "Timing-aware embedded code, serial protocols, edge filtering, and hardware abstraction."],
          ["Bench to interface", "Oscilloscope traces, UART logs, and sensor streams converted into useful diagnostics."]
        ].map(([title, text]) => (
          <Reveal key={title} as="article" className="pcb-module glass p-6" delay={0.05}>
            <h3 className="font-display text-xl text-white">{title}</h3>
            <p className="mt-3 leading-7 text-slate-300">{text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section-shell">
      <SectionIntro kicker="skills" title="Embedded, PCB, and edge AI toolchain" />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((skill, index) => (
          <Reveal key={skill} className="flow-pill rounded border border-cyan-300/15 bg-white/[0.035] px-4 py-4" delay={(index % 4) * 0.04}>
            <p className="text-xs font-bold text-neon">0x{(index + 18).toString(16).toUpperCase()}</p>
            <p className="mt-1 font-semibold text-white">{skill}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="section-shell">
      <SectionIntro
        kicker="projects"
        title="Project bays prepared for verified engineering work"
        text="Clean placeholders for future embedded systems, TinyML, and electronics tools. No project is listed until it has real documentation, code, or validation evidence."
      />
      <div className="grid gap-5 lg:grid-cols-3">
        {projectPlaceholders.map((project) => (
          <Reveal key={project.name} as="article" className="pcb-module placeholder-module glass p-6">
            <div className="module-status mb-5">
              <span className="switch-led" />
              Coming Soon
            </div>
            <p className="text-sm font-bold text-copper">{project.type}</p>
            <h3 className="mt-3 font-display text-2xl text-white">{project.name}</h3>
            <p className="mt-4 leading-7 text-slate-300">{project.text}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((stat) => (
                <span key={stat} className="rounded border border-neon/25 px-3 py-1 text-xs font-bold text-neon">
                  {stat}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function PCBDesigns() {
  return (
    <section id="pcb-designs" className="section-shell">
      <SectionIntro
        kicker="pcb showcase"
        title="Professional PCB design dashboard"
        text="A structured showcase area for future PCB designs, board revisions, fabrication notes, and bring-up evidence."
      />
      <div className="pcb-dashboard glass relative overflow-hidden rounded-lg p-6 md:p-8">
        <div className="absolute inset-0 opacity-20">
          <CircuitBackdrop />
        </div>
        <div className="relative mb-6 grid gap-3 md:grid-cols-4">
          {["Design Slots", "Fab Status", "BOM Review", "Bring-up Log"].map((metric, index) => (
            <div key={metric} className="dashboard-metric">
              <p>{metric}</p>
              <strong>{index === 0 ? "04" : "--"}</strong>
            </div>
          ))}
        </div>
        <div className="relative grid gap-4 md:grid-cols-2">
          {pcbPlaceholders.map((design, index) => (
            <div key={design} className="pcb-slot rounded border border-cyan-300/15 bg-void/55 p-5">
              <div className="pcb-preview mb-4 h-24 rounded" />
              <div className="mb-3 flex items-center justify-between text-xs font-bold uppercase tracking-[0.18em]">
                <span className="text-neon">Board Slot 0{index + 1}</span>
                <span className="text-copper">Coming Soon</span>
              </div>
              <p className="leading-7 text-slate-200">{design}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Research() {
  return (
    <section id="research" className="section-shell">
      <SectionIntro
        kicker="research papers"
        title="IEEE-style research terminal"
        text="Reserved for future research and review papers with abstracts, keywords, references, and publication status."
      />
      <div className="research-terminal space-y-4">
        {paperPlaceholders.map((paper, index) => (
          <article key={paper} className="research-row glass flex flex-col justify-between gap-4 rounded-lg p-5 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-bold text-magenta">IEEE/REVIEW SLOT 0{index + 1}</p>
              <h3 className="mt-2 text-xl font-bold text-white">Coming Soon</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{paper}</p>
            </div>
            <span className="rounded border border-magenta/35 px-4 py-2 text-sm font-bold text-magenta">
              Awaiting Entry
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}

function Certificates() {
  return (
    <section id="certificates" className="section-shell">
      <SectionIntro
        kicker="certificates"
        title="Certificate slots for verified credentials"
        text="A clean credential area ready for real certificates, issuing organizations, credential IDs, and completion dates."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {certificatePlaceholders.map((certificate) => (
          <article key={certificate} className="pcb-module placeholder-module glass p-5">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded border border-acid/30 bg-acid/10 font-display text-acid">
              --
            </div>
            <h3 className="font-bold text-white">{certificate}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-400">Coming soon. Reserved for verified credential details only.</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="section-shell">
      <SectionIntro
        kicker="experience"
        title="Experience timeline prepared for verified work"
        text="Professional timeline placeholders for future roles, internships, lab work, research activity, or documented project leadership."
      />
      <div className="relative space-y-5 before:absolute before:left-3 before:top-2 before:h-full before:w-px before:bg-neon/25">
        {experiencePlaceholders.map((item) => (
          <article key={item.role} className="experience-slot relative ml-9 rounded-lg border border-cyan-300/15 bg-white/[0.035] p-5">
            <span className="absolute -left-[34px] top-6 h-3 w-3 rounded-full bg-neon shadow-[0_0_18px_rgba(46,242,255,0.9)]" />
            <div className="flex flex-col justify-between gap-2 md:flex-row">
              <div>
                <h3 className="font-display text-xl text-white">{item.role}</h3>
                <p className="mt-1 font-semibold text-copper">{item.org}</p>
              </div>
              <p className="text-sm font-bold text-slate-400">{item.time}</p>
            </div>
            <p className="mt-4 leading-7 text-slate-300">{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section-shell pb-16">
      <div className="glass grid gap-8 rounded-lg p-6 md:grid-cols-[0.9fr_1.1fr] md:p-8">
        <div>
          <p className="section-kicker mb-3">contact</p>
          <h2 className="section-title text-white">Let&apos;s build reliable edge hardware</h2>
          <p className="mt-4 leading-7 text-slate-300">
            Open to PCB collaborations, embedded systems projects, TinyML experiments, and research-driven hardware prototypes.
          </p>
        </div>
        <form className="grid gap-4">
          <input className="rounded border border-cyan-300/15 bg-void/70 px-4 py-3 text-white outline-none ring-neon/40 focus:ring-2" placeholder="Name" />
          <input className="rounded border border-cyan-300/15 bg-void/70 px-4 py-3 text-white outline-none ring-neon/40 focus:ring-2" placeholder="Email" />
          <textarea className="min-h-32 rounded border border-cyan-300/15 bg-void/70 px-4 py-3 text-white outline-none ring-neon/40 focus:ring-2" placeholder="Project details..." />
          <button type="button" className="power-switch">
            <span className="switch-led" />
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProfileIdentity />
        <About />
        <Skills />
        <Projects />
        <PCBDesigns />
        <Research />
        <Certificates />
        <Experience />
        <Contact />
      </main>
      <footer className="border-t border-cyan-300/10 py-8 text-center text-sm text-slate-500">
        Cheegte Lohith Rao - Embedded Systems, PCB Design, TinyML, and Intelligent Edge Hardware.
      </footer>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
