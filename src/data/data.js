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
      items: ["Python 3", "FastAPI", "REST APIs", "WebSockets", "pybind11 (C++/Python interop)", "OOP design"]
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
      id: "mediq",
      name: "MEDIQ",
      description: "Real-time multi-source scheduling and queue system. FastAPI backend with a custom C++ optimization engine (pybind11) in the request path. Redis pub/sub keeps every connected WebSocket client consistent under high write contention. Normalized PostgreSQL schema prevents double-booking at the data layer. Role-scoped JWT/OAuth2 with full audit logging.",
      tags: ["Python", "FastAPI", "PostgreSQL", "Redis", "WebSockets", "pybind11", "C++", "React", "TypeScript"],
      github: "https://github.com/prthm412/mediq",
      visual: "mediq",
      badge: "FULL-STACK"
    },
    {
      id: "bugsage",
      name: "BUGSAGE",
      description: "An entropy-based bug severity classifier built around whether developers can trust the output, not just whether the model scores well. Entropy-based features extracted from commit-level code change history feed an MLP, deployed via ONNX Runtime for sub-millisecond inference. SHAP and LIME are integrated so every prediction ships with an explanation, and iteration was validated with F1, RMSE, and R2 tracking.",
      tags: ["Python 3", "PyTorch", "ONNX Runtime", "scikit-learn", "SHAP", "LIME", "feature engineering"],
      github: "https://github.com/prthm412/bug-severity", visual: "diff", badge: "IC3 2026 - Paper Submitted"
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
      tags: ["Python 3", "Android Studio", "Kotlin", "XML", "NumPy", "Pandas", "JSON", "Git"],
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