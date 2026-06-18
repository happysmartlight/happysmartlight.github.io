import { useEffect, useRef } from "react";

interface TikTokEmbedProps {
  videoId: string;
  cite?: string;
  username?: string;
}

/**
 * Lazy-loads the TikTok embed.js script and renders a single TikTok video.
 * Automatically cleans up the injected script on unmount.
 */
export default function TikTokEmbed({ videoId, cite, username = "@denthongminhhappy" }: TikTokEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Inject the TikTok embed.js once globally
    const SCRIPT_ID = "tiktok-embed-js";
    if (!document.getElementById(SCRIPT_ID)) {
      const s = document.createElement("script");
      s.id = SCRIPT_ID;
      s.src = "https://www.tiktok.com/embed.js";
      s.async = true;
      document.body.appendChild(s);
    } else {
      // If script already loaded, re-trigger rendering for new embeds
      (window as any).tiktokEmbed?.lib?.render?.();
    }
  }, [videoId]);

  const citeUrl = cite || `https://www.tiktok.com/${username}/video/${videoId}`;

  return (
    <div ref={containerRef} className="flex justify-center my-6">
      <blockquote
        className="tiktok-embed"
        cite={citeUrl}
        data-video-id={videoId}
        style={{ maxWidth: 605, minWidth: 280 }}
      >
        <section>
          <a target="_blank" rel="noopener noreferrer" title={username} href={`https://www.tiktok.com/${username}?refer=embed`}>
            {username}
          </a>
        </section>
      </blockquote>
    </div>
  );
}
