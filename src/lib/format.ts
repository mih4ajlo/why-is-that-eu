export const STATUS_LABEL: Record<string, string> = {
  'in-force': 'In force',
  'proposed': 'Proposed',
  'repealed': 'Repealed',
  'withdrawn': 'Withdrawn',
};

export function llmLabel(model: string | undefined): string {
  if (!model) return '';
  if (model.startsWith('claude-opus-4-7')) return 'Claude Opus 4.7';
  if (model.startsWith('claude-opus-4-6')) return 'Claude Opus 4.6';
  if (model.startsWith('claude-opus')) return 'Claude Opus';
  if (model.startsWith('claude-sonnet')) return 'Claude Sonnet';
  if (model.startsWith('claude-haiku')) return 'Claude Haiku';
  if (model === 'deepseek-reasoner') return 'DeepSeek R1';
  if (model.startsWith('deepseek')) return 'DeepSeek';
  return model;
}

export function categorySlug(cat: string): string {
  return cat.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
