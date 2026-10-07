import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Head } from "vite-react-ssg";

const SITE = "https://happysmartlight.com";

/**
 * Trang chuyển hướng cho URL cũ (vd /san-pham/v4pro → /san-pham/hsl2x-pro/).
 * GitHub Pages không có redirect 301 phía server, nên HTML tĩnh dùng meta refresh
 * (Google coi refresh 0s là chuyển hướng vĩnh viễn) + canonical trỏ URL mới;
 * khi JS chạy thì router chuyển luôn mà không tải lại trang.
 */
export default function LegacyRedirectRoute({ to }: { to: string }) {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(to, { replace: true });
  }, [navigate, to]);

  return (
    <Head>
      <meta httpEquiv="refresh" content={`0; url=${to}`} />
      <meta name="robots" content="noindex, follow" />
      <link rel="canonical" href={`${SITE}${to}`} />
    </Head>
  );
}
