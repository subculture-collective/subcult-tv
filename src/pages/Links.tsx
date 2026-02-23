import SEOHead from '@/components/SEOHead';
import Button from '@/components/ui/Button';
import { Link } from 'react-router-dom';

const PRIMARY_LINKS = [
  {
    to: '/zine',
    label: 'The Zine',
    description: 'Season 0 — Read the founding documents',
    external: false,
  },
  {
    to: '/memo',
    label: 'Subscribe to Memo',
    description: 'Monthly infrastructure updates',
    external: false,
  },
  {
    to: '/support',
    label: 'Support the Signal',
    description: 'Become a patron',
    external: false,
  },
  {
    to: '/invest',
    label: 'Partner With Us',
    description: 'Investment inquiries',
    external: false,
  },
];

const SITE_LINKS = [
  { to: '/projects', label: 'Projects', external: false },
  { to: '/zine', label: 'Zine', external: false },
  { to: '/about', label: 'About', external: false },
  { to: '/contact', label: 'Contact', external: false },
  { to: '/metrics', label: 'Metrics', external: false },
];

const SOCIAL_LINKS = [
  { href: 'https://github.com/subculture-collective', label: 'GitHub' },
  { href: 'https://www.patreon.com/subcult', label: 'Patreon' },
];

export default function Links() {
  return (
    <>
      <SEOHead
        title="Links"
        description="All SUBCULT links in one place. Zine, newsletter, support, and social profiles."
        path="/links"
      />

      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <Link
            to="/"
            className="font-display text-3xl font-bold tracking-[0.2em] text-glow hover:text-signal transition-colors no-underline"
          >
            SUBCULT
          </Link>
          <p className="font-mono text-xs text-dust mt-2">&gt; link_hub.index()</p>
        </div>

        {/* Primary Links */}
        <div className="w-full max-w-sm space-y-3 mb-8">
          {PRIMARY_LINKS.map((link) =>
            link.external ? (
              <Button
                key={link.to}
                as="a"
                href={link.to}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                className="w-full justify-center py-4"
              >
                <div className="text-center">
                  <div className="font-bold">{link.label}</div>
                  <div className="text-xs opacity-75">{link.description}</div>
                </div>
              </Button>
            ) : (
              <Button
                key={link.to}
                as="link"
                to={link.to}
                variant="primary"
                className="w-full justify-center py-4"
              >
                <div className="text-center">
                  <div className="font-bold">{link.label}</div>
                  <div className="text-xs opacity-75">{link.description}</div>
                </div>
              </Button>
            ),
          )}
        </div>

        {/* Site Navigation */}
        <div className="w-full max-w-sm mb-8">
          <p className="font-mono text-xs text-dust text-center mb-3">// Site</p>
          <div className="grid grid-cols-3 gap-2">
            {SITE_LINKS.map((link) => (
              <Button
                key={link.to}
                as="link"
                to={link.to}
                variant="ghost"
                size="sm"
                className="justify-center"
              >
                {link.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div className="w-full max-w-sm">
          <p className="font-mono text-xs text-dust text-center mb-3">// Connect</p>
          <div className="flex justify-center gap-4">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-bone hover:text-signal transition-colors"
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="font-mono text-xs text-fog">
            © {new Date().getFullYear()} Subculture Collective
          </p>
        </div>
      </div>
    </>
  );
}
