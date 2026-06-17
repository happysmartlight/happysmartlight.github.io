import { Head } from "vite-react-ssg";

interface SeoProps {
  title: string;
  description: string;
  path: string;
}

const SITE = "https://happysmartlight.com";

/**
 * Per-page SEO head. Overrides the default title/description/canonical and
 * the social tags from index.html for each route (deduped by unhead).
 */
export default function Seo({ title, description, path }: SeoProps) {
  const url = `${SITE}${path}`;
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Head>
  );
}
