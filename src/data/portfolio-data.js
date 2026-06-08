const PORTFOLIO_DATA = {
  name: "PRATHMESH MATHUR",
  handle: "grue.exe",
  title: "C++ & Systems Developer",
  bio: "I build systems where performance is not optional. Real-time graphics pipelines, ML inference engines, and data-heavy backends, working closest to the metal.",
  status: "OPEN TO OPPORTUNITIES",
  location: "INDORE (open to relocate)",

  about: {
    bio: "A systems developer at the intersection of graphics programming, machine learning, and high-performance computing. I'm drawn to problems where milliseconds matter and correctness isn't negotiable. Currently finishing my degree and actively seeking roles in systems, graphics, or applied ML engineering.",
    stats: [
      { label: "DEGREE",     value: "M.Tech Computer Science" },
      { label: "UNIVERSITY", value: "Jaypee Institute of Information Technology" },
      { label: "CLASS OF",   value: "2026" },
      { label: "PREV DEGREE", value: "B.Tech Computer Science" },
      { label: "PREV UNIV",   value: "Shri Vaishnav Vidhyapeeth Vishwavidhyalaya" },
      { label: "BUILDING",   value: "Acuity - LOD System" },
      { label: "PAPER",      value: "BugSage - IC3 2026 (Submitted)" }
    ]
  },

  skills: {
    LANG: {
      rune: "STR", label: "Languages",
      items: ["C++17", "Python 3", "GO", "GLSL", "SQL", "HTML/CSS"]
    },
    GFX: {
      rune: "INT", label: "Graphics & Rendering",
      items: ["Vulkan API", "GLFW", "GLM", "ImGui", "real-time 3D rendering", "swapchain management", "graphics pipelines"]
    },
    ML: {
      rune: "WIS", label: "Machine Learning",
      items: ["PyTorch", "ONNX", "ONNX Runtime", "scikit-learn", "MLP design", "model training & deployment"]
    },
    DATA: {
      rune: "DEX", label: "Data & Scientific Computing",
      items: ["NumPy", "Pandas", "Open3D", "PyVista", "HDF5", "feature engineering"]
    },
    TOOLS: {
      rune: "CON", label: "Tools",
      items: ["Git", "Docker", "Android Studio", "CMake", "Visual Studio", "Weights & Biases", "Nsight Graphics"]
    }
  },

  projects: [
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
    },
    {
      id: "bugsage",
      name: "BUGSAGE",
      description: "An MLP trained on commit-level code change features to predict bug severity before code review. Deployed as an ONNX Runtime inference service achieving sub-millisecond prediction latency.",
      tags: ["Python 3", "XAI", "PyTorch", "ONNX", "ONNX Runtime", "scikit-learn", "MLP design", "model training & deployment", "Pandas", "feature engineering"],
      github: "https://github.com/prthm412/bug-severity", visual: "diff", badge: "IC3 2026 — Paper Submitted"
    }
  ],

  contact: {
    email: "pmworks412@gmail.com",
    github: "https://github.com/prthm412",
    linkedin: "https://linkedin.com/in/prthmmthr"
  }
};

export default PORTFOLIO_DATA;
