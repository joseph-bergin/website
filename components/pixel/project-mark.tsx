import type { Project } from "@/lib/projects";
import { PixelSheet } from "./pixel-sheet";
import { sheets } from "./sheets";
import { Sprite } from "./sprite";
import { projectSprites } from "./sprites";

/**
 * A project's icon, from whichever source it has.
 *
 * Hand-drawn Aseprite sheets take precedence; anything not yet redrawn falls
 * back to its inline-SVG character grid. Both are rendered at the same box size
 * so cards line up regardless of which a project is using.
 */
export function ProjectMark({ project, size }: { project: Project; size: number }) {
  if (project.sheet) {
    const sheet = sheets[project.sheet];
    // Scale the sheet to the requested box rather than its configured default.
    return <PixelSheet {...sheet} scale={size / sheet.frameWidth} />;
  }

  return <Sprite sprite={projectSprites[project.sprite]} size={size} />;
}
