/*
 * Manual backup: export everything to a JSON file, import it back.
 * The escape hatch against browser-storage eviction — months of review
 * history should never depend on a single browser profile.
 */

import { idb, STORES } from './db';

interface BackupFile {
  app: 'preflight';
  version: 1;
  exportedAt: string;
  cards: unknown[];
  log: unknown[];
  exams: unknown[];
  kv: Record<string, unknown>;
}

const KV_KEYS = ['settings', 'day', 'drills'];

export async function exportBackup(): Promise<void> {
  const [cards, log, exams] = await Promise.all([
    idb.getAll('cards'),
    idb.getAll('log'),
    idb.getAll('exams'),
  ]);
  const kv: Record<string, unknown> = {};
  for (const k of KV_KEYS) {
    const v = await idb.get('kv', k);
    if (v !== undefined) kv[k] = v;
  }
  const data: BackupFile = {
    app: 'preflight',
    version: 1,
    exportedAt: new Date().toISOString(),
    cards,
    log,
    exams,
    kv,
  };
  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
  const stamp = data.exportedAt.slice(0, 10).replace(/-/g, '');
  const file = new File([blob], `preflight-backup-${stamp}.json`, {
    type: 'application/json',
  });

  // Prefer the share sheet on mobile (lands in Files/Drive/etc.), fall back
  // to a download link.
  if (navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title: 'Preflight backup' });
      return;
    } catch (e) {
      if ((e as DOMException).name === 'AbortError') return; // user cancelled
    }
  }
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = file.name;
  a.click();
  URL.revokeObjectURL(url);
}

/** Replaces all local data with the backup's contents. Caller confirms. */
export async function importBackup(fileText: string): Promise<void> {
  let data: BackupFile;
  try {
    data = JSON.parse(fileText);
  } catch {
    throw new Error('That file is not valid JSON.');
  }
  if (data.app !== 'preflight' || data.version !== 1) {
    throw new Error('That file is not a Preflight backup.');
  }
  for (const s of STORES) await idb.clear(s);
  await idb.bulkPut('cards', data.cards ?? []);
  await idb.bulkPut('log', data.log ?? []);
  await idb.bulkPut('exams', data.exams ?? []);
  const kv = data.kv ?? {};
  const keys = Object.keys(kv);
  await idb.bulkPut('kv', keys.map((k) => kv[k]), keys);
  // Simplest correct way to rehydrate every module-level cache:
  window.location.reload();
}
