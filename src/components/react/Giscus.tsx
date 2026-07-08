import { useEffect, useRef } from "react";
import { GISCUS_CONFIG } from "@/constants";

export default function Giscus() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const isDark = document.documentElement.classList.contains("dark");
    const theme = isDark ? "dark_protanopia" : "light_high_contrast";

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", GISCUS_CONFIG.repo);
    script.setAttribute("data-repo-id", GISCUS_CONFIG.repoId);
    script.setAttribute("data-category", GISCUS_CONFIG.category);
    script.setAttribute("data-category-id", GISCUS_CONFIG.categoryId);
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", theme);
    script.setAttribute("data-lang", "ko");
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;

    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, []);

  useEffect(() => {
    const onThemeChange = (event: Event) => {
      const customEvent = event as CustomEvent<boolean>;
      const isDark = customEvent.detail;
      const theme = isDark ? "dark_protanopia" : "light_high_contrast";

      const iframe = document.querySelector<HTMLIFrameElement>("iframe.giscus-frame");
      if (!iframe?.contentWindow) {
        return;
      }

      iframe.contentWindow.postMessage({ giscus: { setConfig: { theme } } }, "https://giscus.app");
    };

    window.addEventListener("theme-change", onThemeChange);

    return () => window.removeEventListener("theme-change", onThemeChange);
  }, []);

  return <div ref={containerRef} className="mt-16" />;
}
