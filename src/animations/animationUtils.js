// Pseudo-random deterministic hash based on skill id and index so animation layout remains stable across renders
function pseudoRandom(seed, offset) {
  const str = String(seed || "skill");
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i) + offset;
    hash |= 0;
  }
  const x = Math.sin(hash) * 10000;
  return x - Math.floor(x);
}

export function generateFloatingParticles(skills, viewportWidth) {
  if (!skills || skills.length === 0) return [];

  // Filter skills that have animation enabled
  const animatedSkills = skills.filter((s) => s.animationEnabled !== false);
  if (animatedSkills.length === 0) return [];

  // Determine density based on screen width
  let targetCount = 16;
  if (viewportWidth < 640) {
    targetCount = 5; // Mobile (4-7)
  } else if (viewportWidth < 1024) {
    targetCount = 9; // Tablet (8-12)
  } else {
    targetCount = Math.min(18, Math.max(12, animatedSkills.length)); // Desktop (12-20)
  }

  // Pick or cycle skills
  const selectedSkills = [];
  for (let i = 0; i < targetCount; i++) {
    selectedSkills.push(animatedSkills[i % animatedSkills.length]);
  }

  // Grid distribution slots to avoid cluttering or covering text center
  const cols = viewportWidth < 640 ? 3 : viewportWidth < 1024 ? 4 : 6;
  const rows = viewportWidth < 640 ? 3 : 4;
  const totalSlots = cols * rows;

  return selectedSkills.map((skill, index) => {
    const slot = index % totalSlots;
    const col = slot % cols;
    const row = Math.floor(slot / cols);

    const key = skill._id || skill.id || skill.name;
    const r1 = pseudoRandom(key, index * 7);
    const r2 = pseudoRandom(key, index * 13 + 3);
    const r3 = pseudoRandom(key, index * 19 + 5);
    const r4 = pseudoRandom(key, index * 23 + 9);

    // Calculate grid cell bounds with jitter
    const cellWidth = 88 / cols;
    const cellHeight = 82 / rows;

    let x = 6 + col * cellWidth + r1 * (cellWidth * 0.7);
    let y = 8 + row * cellHeight + r2 * (cellHeight * 0.7);

    // Avoid dead center where hero typography sits (between x: 28-72, y: 28-65 on desktop)
    if (x > 32 && x < 68 && y > 30 && y < 65) {
      if (r1 > 0.5) {
        x = x > 50 ? 76 + r1 * 14 : 8 + r1 * 16;
      } else {
        y = y > 50 ? 74 + r2 * 14 : 10 + r2 * 14;
      }
    }

    const sizes = ["sm", "md", "md", "lg"];
    const size = sizes[Math.floor(r3 * sizes.length)];

    const floatTypes = ["orbit", "drift", "pulse", "sway"];
    const floatType = floatTypes[Math.floor(r4 * floatTypes.length)];

    return {
      id: `${key}-${index}`,
      skill,
      xPercent: Math.max(4, Math.min(92, x)),
      yPercent: Math.max(6, Math.min(88, y)),
      size,
      duration: 18 + Math.floor(r1 * 18), // 18s - 36s slow organic flow
      delay: Math.floor(r2 * 6), // 0s - 6s staggered start
      directionX: (r3 > 0.5 ? 1 : -1) * (10 + Math.floor(r1 * 20)),
      directionY: (r4 > 0.5 ? 1 : -1) * (12 + Math.floor(r2 * 22)),
      rotation: (r1 > 0.5 ? 1 : -1) * (4 + Math.floor(r3 * 10)),
      opacity: 0.45 + r4 * 0.35, // 0.45 to 0.8
      floatType,
      showLabel: size !== "sm" && (r3 > 0.35 || viewportWidth >= 1024),
    };
  });
}
