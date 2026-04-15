import SectionWrapper from "@/components/ui/SectionWrapper";

// ✏️ Fill in your bio and stats below
const BIO = "I'm a cs student obsessed with low-level systems and real-time graphics. I write C++ and Python, and I'm currently learning Vulkan to build things from scratch. I care about performance — not just making things work, but making them fast.";

const STATS: { key: string; value: string }[] = [
  { key: "based in",          value: "Noida, India" },
  { key: "background",        value: "CS Grad" },
  { key: "focus",             value: "Systems & Graphics" },
  { key: "currently building", value: "Perceptual LOD Selector (Vulkan)" },
  { key: "open to",           value: "Backend Engineering and related jobs" },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionWrapper>
          {/* Section label */}
          <p className="font-mono text-xs text-accent tracking-widest mb-12">
            // about
          </p>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Left — bio */}
            <p className="font-mono text-sm leading-8 text-muted">{BIO}</p>

            {/* Right — terminal stat cards */}
            <ul className="space-y-5">
              {STATS.map(({ key, value }) => (
                <li key={key} className="font-mono text-sm flex gap-2">
                  <span className="text-muted shrink-0">{key}</span>
                  <span className="text-border select-none">─</span>
                  <span className="text-fg">{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </SectionWrapper>
      </div>
    </section>
  );
}
