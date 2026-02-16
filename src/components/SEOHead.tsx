import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description?: string;
  path?: string;
  image?: string;
}

/**
 * Lightweight head manager — updates document title and meta tags.
 * No react-helmet needed for React 19.
 */
export default function SEOHead({
  title,
  description = 'SUBCULT — We build tools, media, and infrastructure for the counterculture.',
  path = '/',
  image = '/og-image.png',
}: SEOHeadProps) {
  const fullTitle = title === 'Home' ? 'SUBCULT — Subculture Collective' : `${title} — SUBCULT`;
  const url = `https://subcult.tv${path}`;

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (name: string, content: string) => {
      let el =
        document.querySelector(`meta[name="${name}"]`) ||
        document.querySelector(`meta[property="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        if (name.startsWith('og:') || name.startsWith('twitter:')) {
          el.setAttribute('property', name);
        } else {
          el.setAttribute('name', name);
        }
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('og:title', fullTitle);
    setMeta('og:description', description);
    setMeta('og:url', url);
    setMeta('og:image', image);
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', image);
  }, [fullTitle, description, url, image]);

  return null;
}
