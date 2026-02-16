import SEOHead from '@/components/SEOHead';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import TerminalPanel from '@/components/effects/TerminalPanel';

const WHAT_WE_BUILD = [
  'Open-source developer tools and infrastructure',
  'Self-hosted productivity and creative software',
  'Media production pipelines (audio, video, publishing)',
  'Privacy-first alternatives to surveillance tech',
  'Educational content and technical documentation',
  'Community platforms for builders and creators',
];

const WHY_NOW = [
  {
    title: 'Market Timing',
    detail:
      'Growing demand for privacy-respecting, self-hosted solutions as trust in big tech erodes.',
  },
  {
    title: 'Technical Foundation',
    detail:
      'Core infrastructure already built. Shipping weekly. Public roadmap with demonstrated execution.',
  },
  {
    title: 'Community Traction',
    detail: 'Active open-source contributors and early supporters. Real users, not vanity metrics.',
  },
];

const WHATS_NEXT = [
  { milestone: 'Q1 2026', item: 'Public launch + Papers series release' },
  { milestone: 'Q2 2026', item: 'First commercial tool beta + paid tiers' },
  { milestone: 'Q3 2026', item: 'Media production suite v1 launch' },
  { milestone: 'Q4 2026', item: 'Platform expansion + partnership pilots' },
];

export default function Invest() {
  return (
    <>
      <SEOHead
        title="Invest"
        description="Partner with SUBCULT. We're building open-source tools and infrastructure for the counterculture. View our investor materials and get in touch."
        path="/invest"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-mono text-xs text-dust mb-3">&gt; PARTNERSHIP.inquiry()</p>
          <h1 className="mb-6">Partner with SUBCULT</h1>
          <p className="text-bone max-w-2xl mx-auto text-lg leading-relaxed">
            We're building tools and infrastructure for creators, developers, and anyone who refuses
            to be optimized. Here's what we're doing and how you can be part of it.
          </p>
        </div>

        {/* What We're Building */}
        <div className="mb-16">
          <h2 className="mb-6">
            <span className="text-dust font-mono text-sm mr-3">//</span>
            What We're Building
          </h2>

          <Card className="p-6">
            <ul className="space-y-3">
              {WHAT_WE_BUILD.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-bone">
                  <span className="text-static font-mono">›</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Why Now */}
        <div className="mb-16">
          <h2 className="mb-6">
            <span className="text-dust font-mono text-sm mr-3">//</span>
            Why Now
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {WHY_NOW.map((item) => (
              <Card key={item.title} className="p-5">
                <h4 className="font-mono text-sm text-glow mb-2">{item.title}</h4>
                <p className="text-sm text-bone">{item.detail}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* What's Next - Roadmap */}
        <div className="mb-16">
          <h2 className="mb-6">
            <span className="text-dust font-mono text-sm mr-3">//</span>
            What's Next
          </h2>

          <TerminalPanel title="roadmap.2026" className="max-w-2xl">
            <div className="space-y-2">
              {WHATS_NEXT.map((item, i) => (
                <div key={i}>
                  <span className="text-cyan">{item.milestone}</span>
                  <span className="text-dust"> → </span>
                  <span className="text-chalk">{item.item}</span>
                </div>
              ))}
            </div>
          </TerminalPanel>
        </div>

        {/* Materials */}
        <div className="mb-16">
          <h2 className="mb-6">
            <span className="text-dust font-mono text-sm mr-3">//</span>
            Investor Materials
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
            <Card className="p-5 border-signal">
              <h4 className="font-mono text-sm text-glow mb-2">Pitch Deck</h4>
              <p className="text-xs text-bone mb-4">
                Full overview: vision, market, product, team, financials.
              </p>
              <Button
                as="a"
                href="/press-kit/subcult-deck.pdf"
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="sm"
                className="w-full"
              >
                View Deck (PDF) ↗
              </Button>
            </Card>

            <Card className="p-5">
              <h4 className="font-mono text-sm text-glow mb-2">One-Pager</h4>
              <p className="text-xs text-bone mb-4">Executive summary. Quick read for sharing.</p>
              <Button
                as="a"
                href="/press-kit/subcult-onepager.pdf"
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="sm"
                className="w-full"
              >
                View One-Pager (PDF) ↗
              </Button>
            </Card>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center py-12 border-t border-fog">
          <h2 className="mb-4">Let's Talk</h2>
          <p className="text-bone max-w-xl mx-auto mb-8">
            Interested in partnering? Have questions? We'd love to hear from you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button as="a" href="mailto:invest@subcult.tv" size="lg">
              Email Us ↗
            </Button>
            <Button
              as="a"
              href="https://cal.com/subcult/intro"
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="lg"
            >
              Schedule a Call ↗
            </Button>
          </div>

          <p className="font-mono text-xs text-dust mt-6">
            invest@subcult.tv — We respond within 48 hours.
          </p>
        </div>
      </div>
    </>
  );
}
