declare module 'smooth-scroll/dist/smooth-scroll.min' {
  interface SmoothScrollOptions {
    speed?: number;
    speedAsDuration?: boolean;
    easing?: string;
    offset?: number;
    header?: string;
    topOnEmptyHash?: boolean;
    updateURL?: boolean;
    popstate?: boolean;
  }

  export default class SmoothScroll {
    constructor(selector: string, options?: SmoothScrollOptions);
    animateScroll(
      anchor: number | Element,
      toggle?: Element,
      options?: SmoothScrollOptions,
    ): void;
    destroy(): void;
  }
}

declare module 'smoothscroll-polyfill' {
  export function polyfill(): void;
}
