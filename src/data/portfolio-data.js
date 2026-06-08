const PORTFOLIO_DATA = {
  name: "YOUR_NAME",
  handle: "PLAYER_NAME.exe",
  title: "Game & Systems Developer",
  bio: "I build systems where performance is not optional. Real-time graphics pipelines, ML inference engines, and data-heavy backends — I work closest to the metal.",
  status: "OPEN TO OPPORTUNITIES",
  location: "LOCATION",

  about: {
    bio: "A systems developer at the intersection of graphics programming, machine learning, and high-performance computing. I'm drawn to problems where milliseconds matter and correctness isn't negotiable — from managing Vulkan swapchains to deploying ONNX inference services. Currently finishing my degree and actively seeking roles in systems, graphics, or applied ML engineering.",
    stats: [
      { label: "DEGREE",     value: "B.Sc. Computer Science" },
      { label: "UNIVERSITY", value: "UNIVERSITY_NAME" },
      { label: "CLASS OF",   value: "2026" },
      { label: "BUILDING",   value: "CURRENT_PROJECT" },
      { label: "PAPER",      value: "BugSage — IC3 2026 (Submitted)" }
    ]
  },

  skills: {
    LANG: {
      rune: "STR", label: "Languages",
      items: ["C++17", "Python 3", "GLSL", "SQL", "HTML/CSS"]
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
      tags: ["C++17", "GLSL", "Vulkan API", "GLFW", "GLM", "ImGui", "real-time 3D rendering", "swapchain management", "graphics pipelines", "CMake", "Nsight Graphics"],
      github: "#", visual: "lod", badge: null
    },
    {
      id: "pathify",
      name: "PATHIFY",
      description: "An indoor navigation system that processes LiDAR point cloud scans to construct geometric corridor graphs. Computes optimal pedestrian paths through complex multi-floor building layouts.",
      tags: ["Python 3", "NumPy", "Pandas", "Open3D", "PyVista", "HDF5", "feature engineering", "Docker", "Git"],
      github: "#", visual: "pathfinding", badge: null
    },
    {
      id: "bugsage",
      name: "BUGSAGE",
      description: "An MLP trained on commit-level code change features to predict bug severity before code review. Deployed as an ONNX Runtime inference service achieving sub-millisecond prediction latency.",
      tags: ["Python 3", "PyTorch", "ONNX", "ONNX Runtime", "scikit-learn", "MLP design", "model training & deployment", "NumPy", "Pandas", "feature engineering", "Weights & Biases"],
      github: "#", visual: "diff", badge: "IC3 2026 — Paper Submitted"
    }
  ],

  contact: {
    email: "name@domain.com",
    github: "https://github.com/username",
    linkedin: "https://linkedin.com/in/username"
  }
};

export default PORTFOLIO_DATA;
