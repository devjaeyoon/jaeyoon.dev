interface EventManagerOptions {
  dismissCondition?: () => boolean;
  triggerCondition?: () => boolean;
}

export function toFit(
  cb: () => void,
  {
    dismissCondition = () => false,
    triggerCondition = () => true,
  }: EventManagerOptions = {},
): () => number | undefined {
  if (!cb) {
    throw Error('Invalid required arguments');
  }

  let tick = false;

  return function () {
    if (tick) {
      return;
    }

    tick = true;
    return requestAnimationFrame(() => {
      if (dismissCondition()) {
        tick = false;
        return;
      }

      if (triggerCondition()) {
        tick = false;
        return cb();
      }
    });
  };
}
