const PORTFOLIO_DATA = {
  name: "PRATHMESH MATHUR",
  handle: "grue.exe",
  title: "Backend Engineer, Systems & APIs",
  bio: "I build backend systems that stay correct under concurrency and scale. Real-time APIs, data-heavy pipelines, and ML systems, with performance-critical logic in C++ where it matters.",
  status: "OPEN TO OPPORTUNITIES",
  location: "INDORE (open to relocate)",

  about: {
    bio: "A backend engineer at the intersection of API design, data systems, and applied ML. I'm drawn to problems where correctness under concurrency and trust in the output both matter, not just raw speed. Currently finishing my degree and actively seeking roles in backend, systems, or applied ML engineering.",
    stats: [
      { label: "DEGREE",     value: "M.Tech Computer Science" },
      { label: "UNIVERSITY", value: "Jaypee Institute of Information Technology" },
      { label: "CLASS OF",   value: "2026" },
      { label: "PREV DEGREE", value: "B.Tech Computer Science" },
      { label: "PREV UNIV",   value: "Shri Vaishnav Vidhyapeeth Vishwavidhyalaya" },
      { label: "BUILDING",   value: "Mediq : Real-Time Scheduling System" },
      { label: "PAPER",      value: "BugSage" }
    ]
  },

  skills: {
    BACKEND: {
      rune: "STR", label: "Backend & APIs",
      items: ["C++", "Python", "FastAPI", "REST APIs", "WebSockets", "pybind11 (C++/Python interop)", "OOP design"]
    },
    DATA: {
      rune: "DEX", label: "Data & Caching",
      items: ["PostgreSQL", "SQLAlchemy", "Redis", "pgvector", "semantic search", "NumPy", "Pandas"]
    },
    ML: {
      rune: "WIS", label: "Machine Learning & AI",
      items: ["PyTorch", "ONNX Runtime", "scikit-learn", "SHAP", "LIME", "Claude Code", "Cursor"]
    },
    CLOUD: {
      rune: "CON", label: "Cloud & DevOps",
      items: ["AWS (EC2, RDS)", "Docker", "GitHub Actions (CI/CD)", "Git", "pytest"]
    },
    GFX: {
      rune: "INT", label: "Graphics & Systems",
      items: ["C++17", "Vulkan API", "GLSL", "Open3D", "real-time 3D rendering", "graphics pipelines"]
    }
  },

  projects: [
    {
      id: "tickforge",
      name: "TICKFORGE",
      description: "Low-latency trading system simulator built from scratch in C++20. Replays market data over UDP, rebuilds an order book, runs a market-making strategy, and sends orders to a simulated exchange. Every step is timed in nanoseconds.",
      tags: ["C++20", "CMake", "Linux", "UDP sockets", "lock-free atomics", "GoogleTest", "Google Benchmark", "ASan/UBSan/TSan", "Python", "SQLite", "DuckDB"],
      github: "#",
      visual: "tickforge",
      badge: null,
      metrics: [
        { label: "PIPELINE", value: "3 threads" },
        { label: "QUEUES",   value: "4 lock-free" },
        { label: "TIMING",   value: "rdtsc / ns" }
      ],
      highlights: [
        { pre: "Order book: ", bracket: "[measured]", post: " M msgs/s, p99 add ~[Y] ns" },
        { pre: "Lock-free SPSC: ", bracket: "[N]", post: "x lower p99 vs mutex queue" },
        { pre: "Tick-to-trade: p50/p99/p99.9 = ", bracket: "[A]/[B]/[C]", post: " ns" }
      ]
    },
    {
      id: "mediq",
      name: "MEDIQ",
      description: "Real-time multi-source scheduling and queue system. FastAPI backend with a custom C++ optimization engine (pybind11) in the request path. Redis pub/sub keeps every connected WebSocket client consistent under high write contention. Normalized PostgreSQL schema prevents double-booking at the data layer. Role-scoped JWT/OAuth2 with full audit logging.",
      tags: ["Python", "FastAPI", "PostgreSQL", "Redis", "WebSockets", "pybind11", "C++", "React", "TypeScript"],
      github: "https://github.com/prthm412/medi-q",
      visual: "mediq",
      badge: "FULL-STACK"
    },
    {
      id: "bugsage",
      name: "BUGSAGE",
      description: "An entropy-based bug severity classifier built with scikit-learn, trained on features extracted from code-change history. SHAP and LIME are integrated directly into the pipeline so every prediction ships with an explanation, not a black-box score. Model iteration was validated by tracking F1, RMSE, and R2 to confirm entropy-based signals reliably predict severity across codebases.",
      tags: ["Python", "PyTorch", "scikit-learn", "SHAP", "LIME", "feature engineering"],
      github: "https://github.com/prthm412/bug-severity", visual: "diff", badge: "Research Paper"
    },
    {
      id: "acuity",
      name: "ACUITY",
      description: "A real-time mesh LOD system built on the Vulkan API. Dynamically reduces polygon count based on camera distance via weighted edge collapse, maintaining visual fidelity across three discrete LOD tiers.",
      tags: ["C++17", "GLSL", "Open3D", "Vulkan API", "GLFW", "GLM", "ImGui", "real-time 3D rendering", "swapchain management", "graphics pipelines", "CMake", "Nsight Graphics"],
      github: "https://github.com/prthm412/acuity", visual: "lod", badge: "research-based"
    },
    {
      id: "pathify",
      name: "PATHIFY",
      description: "An indoor navigation system that processes LiDAR point cloud scans to construct geometric corridor graphs. Computes optimal pedestrian paths through complex multi-floor building layouts.",
      tags: ["Python", "Android Studio", "Kotlin", "XML", "NumPy", "Pandas", "JSON", "Git"],
      github: "https://github.com/prthm412/pathify", visual: "pathfinding", badge: null
    }
  ],

  contact: {
    email: "pmworks412@gmail.com",
    github: "https://github.com/prthm412",
    linkedin: "https://linkedin.com/in/prthmmthr"
  }
};

export default PORTFOLIO_DATA;