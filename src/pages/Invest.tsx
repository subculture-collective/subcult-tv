import SEOHead from '@/components/SEOHead';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import TerminalPanel from '@/components/effects/TerminalPanel';

const PROJECT_OVERVIEW = [
  'Building open source tools, media platforms, and infrastructure for independent creators',
  'Revenue-generating SaaS products + community-funded projects (Patreon)',
  'Active user base across developer tools, content platforms, and self-hosted services',
  'Bootstrapped, profitable, and scaling — no debt, no dependencies',
  'Portfolio of 10+ active projects with measurable traction and engagement',
  'Strategic positioning at intersection of privacy tech, creator economy, and open source',
];

const BUILDING_BLOCKS = [
  {
    title: 'What We\'re Building',
    items: [
      'Privacy-first creator tools and platforms',
      'Self-hostable alternatives to proprietary SaaS',
      'Open source developer infrastructure',
      'Media production and distribution tools',
    ],
  },
  {
    title: 'Why Now',
    items: [
      'Creators are abandoning surveillance platforms',
      'Demand for self-hosted, privacy-respecting tools is accelerating',
      'Open source funding models are maturing (GitHub Sponsors, Patreon, grants)',
      'We\'ve proven product-market fit with existing projects',
    ],
  },
  {
    title: 'What\'s Next',
    items: [
      'Scale flagship projects to 10K+ active users',
      'Launch premium hosted tiers for self-hosted products',
      'Expand team from 1 to 3-5 core contributors',
      'Build enterprise partnerships and licensing revenue streams',
    ],
  },
];

export default function Invest() {
  return (
    <>
      <SEOHead
        title="Invest"
        description="Investment opportunity with Subculture Collective — building the infrastructure for independent creators and privacy-first software."
        path="/invest"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Header */}
        <div className="mb-16">
          <p className="font-mono text-xs text-dust mb-3">&gt; ./pitch --mode=investor</p>
          <h1 className="mb-6">Invest in SUBCVLT</h1>
          <p className="text-bone max-w-3xl text-lg leading-relaxed">
            We're building the infrastructure for people who refuse to be products.
            Open source tools, creator platforms, and privacy-first software — funded by
            users, not surveillance.
          </p>
        </div>

        {/* Project Overview */}
        <div className="mb-16">
          <h2 className="mb-8">
            <span className="text-dust font-mono text-sm mr-3">//</span>
            Project Overview
          </h2>
          <Card className="p-8">
            <ul className="space-y-4">
              {PROJECT_OVERVIEW.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-bone leading-relaxed">
                  <span className="text-signal font-mono text-sm mt-1 flex-shrink-0">
                    [{index + 1}]
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* What / Why / What's Next */}
        <div className="mb-16">
          <h2 className="mb-8 text-center">
            <span className="text-dust font-mono text-sm mr-3">//</span>
            The Opportunity
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BUILDING_BLOCKS.map((block) => (
              <Card key={block.title} className="p-6">
                <h3 className="font-display text-xl uppercase mb-4 text-signal">
                  {block.title}
                </h3>
                <ul className="space-y-3">
                  {block.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-bone">
                      <span className="text-static mt-0.5">›</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>

        {/* Metrics snapshot */}
        <div className="mb-16">
          <TerminalPanel title="metrics.snapshot" className="max-w-3xl mx-auto">
            <div>
              <span className="text-dust"># current traction (as of Q1 2026)</span>
              <br /><br />
              <span className="text-chalk">active_projects: </span>
              <span className="text-static">10+</span>
              <br />
              <span className="text-chalk">monthly_active_users: </span>
              <span className="text-static">~5,000</span>
              <br />
              <span className="text-chalk">github_stars: </span>
              <span className="text-static">2,500+</span>
              <br />
              <span className="text-chalk">patreon_members: </span>
              <span className="text-static">growing</span>
              <br />
              <span className="text-chalk">revenue_model: </span>
              <span className="text-flicker">community + SaaS hybrid</span>
              <br />
              <span className="text-chalk">burn_rate: </span>
              <span className="text-signal">$0 — bootstrapped &amp; profitable</span>
              <br />
              <br />
              <span className="text-dust"># we ship code, not pitch decks.</span>
            </div>
          </TerminalPanel>
        </div>

        {/* Contact & Materials */}
        <div className="mb-16">
          <h2 className="mb-8 text-center">
            <span className="text-dust font-mono text-sm mr-3">//</span>
            Get in Touch
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Contact method */}
            <Card className="p-6">
              <h3 className="font-display text-lg uppercase mb-4">Contact</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-mono text-xs text-dust mb-2">Email</p>
                  <a
                    href="mailto:invest@subcult.tv"
                    className="text-signal hover:text-glow transition-colors"
                  >
                    invest@subcult.tv
                  </a>
                </div>
                <div>
                  <p className="font-mono text-xs text-dust mb-2">Schedule a Call</p>
                  <Button
                    as="a"
                    href="https://cal.com/subcult/investor-intro"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                    size="sm"
                  >
                    Book Time ↗
                  </Button>
                </div>
              </div>
            </Card>

            {/* Materials */}
            <Card className="p-6">
              <h3 className="font-display text-lg uppercase mb-4">Materials</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-fog">
                  <span className="font-mono text-sm text-bone">Pitch Deck</span>
                  <Button
                    as="a"
                    href="/files/subcult-deck.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="ghost"
                    size="sm"
                  >
                    PDF ↓
                  </Button>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-fog">
                  <span className="font-mono text-sm text-bone">One-Pager</span>
                  <Button
                    as="a"
                    href="/files/subcult-onepager.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="ghost"
                    size="sm"
                  >
                    PDF ↓
                  </Button>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="font-mono text-sm text-bone">Portfolio</span>
                  <Button
                    as="a"
                    href="/projects"
                    variant="ghost"
                    size="sm"
                  >
                    View →
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Final message */}
        <div className="text-center py-12 border-t border-fog max-w-2xl mx-auto">
          <blockquote className="text-lg text-bone italic mb-6">
            "We're not building a startup. We're building infrastructure
            that outlives us. If that aligns with your thesis, let's talk."
          </blockquote>
          <p className="font-mono text-xs text-dust mb-8">— Subculture Collective</p>
          <Button
            as="a"
            href="mailto:invest@subcult.tv"
            size="lg"
          >
            Start the Conversation →
          </Button>
        </div>
      </div>
    </>
  );
}
