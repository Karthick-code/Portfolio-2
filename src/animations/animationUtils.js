
// Deterministic pseudo-random number
function pseudoRandom(seed, offset = 0) {
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

  const animatedSkills = skills.filter(
    (s) => s.animationEnabled !== false
  );

  if (animatedSkills.length === 0) return [];

  // =========================================================
  // HOW MANY PARTICLES?
  // =========================================================

  let targetCount;

  if (viewportWidth < 640) {
    targetCount = Math.min(7, Math.max(4, animatedSkills.length));
  } else if (viewportWidth < 1024) {
    targetCount = Math.min(12, Math.max(8, animatedSkills.length));
  } else {
    targetCount = Math.min(20, Math.max(12, animatedSkills.length));
  }

  // =========================================================
  // SELECT / CYCLE SKILLS
  // =========================================================

  const selectedSkills = [];

  for (let i = 0; i < targetCount; i++) {
    selectedSkills.push(animatedSkills[i % animatedSkills.length]);
  }

  const count = selectedSkills.length;

  // =========================================================
  // RESPONSIVE SAFE AREA
  // =========================================================

  const isMobile = viewportWidth < 640;
  const isTablet = viewportWidth < 1024;

  /*
    Keep the extreme edges slightly empty.

    This gives us:

      5% ─────────────────────── 95%
       ↑                          ↑
       │       HERO AREA          │
       │                          │
      92% ─────────────────────── 92%
  */

  const minX = isMobile ? 5 : 4;
  const maxX = isMobile ? 95 : 96;

  const minY = isMobile ? 7 : 5;
  const maxY = isMobile ? 91 : 94;

  // =========================================================
  // CALCULATE A BALANCED GRID
  // =========================================================

  /*
    Instead of fixed rows/columns, calculate them
    from the NUMBER OF SKILLS.

    Examples:

      4 skills  → 2 × 2
      6 skills  → 3 × 2
      8 skills  → 4 × 2
      12 skills → 4 × 3
      16 skills → 4 × 4
      20 skills → 5 × 4
  */

  let cols;
  let rows;

  if (count <= 4) {
    cols = 2;
    rows = 2;
  } else if (count <= 6) {
    cols = 3;
    rows = 2;
  } else if (count <= 9) {
    cols = 3;
    rows = 3;
  } else if (count <= 12) {
    cols = 4;
    rows = 3;
  } else if (count <= 16) {
    cols = 4;
    rows = 4;
  } else {
    cols = 5;
    rows = 4;
  }

  // Mobile should stay less crowded
  if (isMobile) {
    cols = Math.min(cols, 3);
    rows = Math.ceil(count / cols);
  }

  if (isTablet) {
    cols = Math.min(cols, 4);
    rows = Math.ceil(count / cols);
  }

  // =========================================================
  // CREATE GRID POSITIONS
  // =========================================================

  const positions = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      positions.push({
        row,
        col,
      });
    }
  }

  /*
    Shuffle the grid positions deterministically.

    This is important.

    Without this:

      skill 1 → top-left
      skill 2 → top-middle
      skill 3 → top-right
      ...

    With deterministic shuffle, skills are distributed
    throughout the entire grid.
  */

  for (let i = positions.length - 1; i > 0; i--) {
    const r = pseudoRandom(
      selectedSkills[i % count]?._id ||
        selectedSkills[i % count]?.id ||
        selectedSkills[i % count]?.name ||
        "skill",
      i * 31
    );

    const j = Math.floor(r * (i + 1));

    [positions[i], positions[j]] = [
      positions[j],
      positions[i],
    ];
  }

  // =========================================================
  // GENERATE PARTICLES
  // =========================================================

  return selectedSkills.map((skill, index) => {
    const key =
      skill._id ||
      skill.id ||
      skill.name ||
      `skill-${index}`;

    const r1 = pseudoRandom(key, index * 7);
    const r2 = pseudoRandom(key, index * 13 + 3);
    const r3 = pseudoRandom(key, index * 19 + 5);
    const r4 = pseudoRandom(key, index * 23 + 9);

    const position = positions[index];

    // =======================================================
    // CELL SIZE
    // =======================================================

    const cellWidth = (maxX - minX) / cols;
    const cellHeight = (maxY - minY) / rows;

    // =======================================================
    // BASE POSITION
    // =======================================================

    let x =
      minX +
      position.col * cellWidth +
      cellWidth * (0.2 + r1 * 0.6);

    let y =
      minY +
      position.row * cellHeight +
      cellHeight * (0.2 + r2 * 0.6);

    // =======================================================
    // HERO CENTER AVOIDANCE
    // =======================================================

    /*
      Your hero content normally sits around the center.

      Don't completely forbid the center because doing so
      creates the exact top/side/bottom imbalance you're
      currently seeing.

      Instead, gently push only particles that are REALLY
      close to the center.
    */

    const centerX = 50;
    const centerY = 50;

    const distanceFromCenter = Math.sqrt(
      Math.pow(x - centerX, 2) +
        Math.pow(y - centerY, 2)
    );

    if (distanceFromCenter < 13) {
      // Push toward the nearest outer direction
      if (Math.abs(x - centerX) > Math.abs(y - centerY)) {
        x += x < centerX ? -10 : 10;
      } else {
        y += y < centerY ? -10 : 10;
      }
    }

    // =======================================================
    // CLAMP POSITION
    // =======================================================

    x = Math.max(minX, Math.min(maxX, x));
    y = Math.max(minY, Math.min(maxY, y));

    // =======================================================
    // SIZE
    // =======================================================

    const sizes = ["sm", "md", "md", "lg"];
    const size = sizes[Math.floor(r3 * sizes.length)];

    // =======================================================
    // FLOAT TYPE
    // =======================================================

    const floatTypes = [
      "orbit",
      "drift",
      "pulse",
      "sway",
    ];

    const floatType =
      floatTypes[Math.floor(r4 * floatTypes.length)];

    // =======================================================
    // RETURN
    // =======================================================

    return {
      id: `${key}-${index}`,
      skill,

      xPercent: x,
      yPercent: y,

      size,

      duration: 18 + Math.floor(r1 * 18),

      delay: Math.floor(r2 * 6),

      directionX:
        (r3 > 0.5 ? 1 : -1) *
        (10 + Math.floor(r1 * 20)),

      directionY:
        (r4 > 0.5 ? 1 : -1) *
        (12 + Math.floor(r2 * 22)),

      rotation:
        (r1 > 0.5 ? 1 : -1) *
        (4 + Math.floor(r3 * 10)),

      opacity: 0.45 + r4 * 0.35,

      floatType,

      showLabel:
        size !== "sm" &&
        (r3 > 0.35 || viewportWidth >= 1024),
    };
  });
}
