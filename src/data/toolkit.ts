export type ToolGroup = {
  name: string
  /** Which highlight color the group's label block uses (--hl-1..3). */
  tone: 1 | 2 | 3
  tools: string[]
}

// Source of truth is content/CONTENT.md. Tones start on 2 because the section's
// heading is tone 1, and the block right under it shouldn't match.
export const toolGroups: ToolGroup[] = [
  {
    name: 'Frontend',
    tone: 2,
    tools: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML/CSS'],
  },
  {
    name: 'Backend',
    tone: 3,
    tools: ['Python', 'FastAPI', 'PostgreSQL', 'Supabase', 'SQL', 'Java'],
  },
  {
    name: 'AI / ML',
    tone: 1,
    tools: ['Claude Code', 'scikit-learn', 'pandas', 'NumPy', 'YOLO / ONNX Runtime'],
  },
  {
    name: 'Tools',
    tone: 2,
    tools: ['Git', 'GitHub Actions', 'Docker', 'Railway', 'Vercel', 'Postman', 'Jira', 'Linux'],
  },
]
