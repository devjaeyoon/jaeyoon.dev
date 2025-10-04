const win = typeof window !== 'undefined' ? window : ({} as Window);

export const localStorage = win.localStorage || null;
export const sessionStorage = win.sessionStorage || null;
