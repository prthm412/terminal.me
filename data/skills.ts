export interface SkillCategory {
  label: string;
  skills: string[];
}

// ✏️ Edit the skills arrays below with your actual skills.
// Just add/remove strings — the UI will handle the rest.
const skills: SkillCategory[] = [
  {
    label: "languages",
    skills: [
      "C / C++",
      "Python",
      "SQL",
      "HTML",
      "CSS",
    ],
  },
  {
    label: "tools & environments",
    skills: [
      "Git",
      "GitHub",
      "Docker",
      "Visual Studio",
      "Linux / Windows",
      "PyTorch",
      "ONNX",
    ],
  },
  {
    label: "currently learning",
    skills: [
      "Vulkan",
      "CMake",
      "Graphics Programming",
    ],
  },
];

export default skills;
