export type PostImageVariant = "card" | "cover" | "hero";

type PostImagePreset = {
  width: number;
  widths: number[];
  sizes: string;
};

export const POST_IMAGE_PRESETS = {
  card: {
    width: 720,
    widths: [360, 720, 1280],
    sizes: "(max-width: 639px) calc(100vw - 20px), (max-width: 767px) calc(50vw - 22px), 330px",
  },
  cover: {
    width: 768,
    widths: [384, 768, 1152, 1536],
    sizes: "(max-width: 768px) calc(100vw - 20px), 768px",
  },
  hero: {
    width: 1024,
    widths: [480, 768, 1024, 1536],
    sizes: "(max-width: 1024px) calc(100vw - 20px), 1024px",
  },
} satisfies Record<PostImageVariant, PostImagePreset>;

export const POST_IMAGE_FORMAT = "webp";
export const POST_IMAGE_QUALITY = 80;
