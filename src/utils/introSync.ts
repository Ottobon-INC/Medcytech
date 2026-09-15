/**
 * introSync.ts
 * Shared one-shot event: Navbar fires markIntroComplete(),
 * KeyStats (and any other component) listens via waitForIntro().
 */

let _resolve: (() => void) | null = null;
let _isComplete = false;

const _promise = new Promise<void>((resolve) => {
  _resolve = resolve;
});

/** Call this when the navbar intro animation finishes. */
export const markIntroComplete = () => {
  if (_isComplete) return;
  _isComplete = true;
  _resolve?.();
};

/**
 * Returns a Promise that resolves when the intro is done.
 * If intro has already completed, resolves immediately.
 */
export const waitForIntro = (): Promise<void> => {
  if (_isComplete) return Promise.resolve();
  return _promise;
};

/** Whether the intro has already finished (for skipping on re-mounts). */
export const isIntroComplete = () => _isComplete;
