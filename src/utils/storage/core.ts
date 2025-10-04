function isEmpty(storage: Storage | null): boolean {
  return !storage;
}

export function getValueFrom(storage: Storage | null, key: string): any {
  if (isEmpty(storage) || !storage) {
    return;
  }
  const rawData = storage.getItem(key);

  if (!rawData) {
    return;
  }

  return JSON.parse(rawData);
}

export function setValueTo(
  storage: Storage | null,
  key: string,
  data: any,
): void {
  if (isEmpty(storage) || !storage) {
    return;
  }

  storage.setItem(key, JSON.stringify(data));
}
