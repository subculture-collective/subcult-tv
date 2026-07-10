import SEOHead from '@/components/SEOHead';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import GlitchFrame from '@/components/effects/GlitchFrame';
import TerminalPanel from '@/components/effects/TerminalPanel';

const OUTPUTS = [
  ['Software', 'Self-hosted systems, utilities, alternative interfaces, and operational tools.'],
  [
    'Media systems',
    'Discovery, archives, transcripts, production pipelines, and broadcast experiments.',
  ],
  [
    'Participatory formats',
    'Structured spaces for play, argument, performance, and collective attention.',
  ],
  [
    'Research and documentation',
    'System maps, public working notes, and memory that can outlive a feed.',
  ],
];

const VERIFIED_SIGNALS = [
  'A live public site with a project catalog, zine, memo, and support route',
  'Public repositories with visible commit and issue history',
  'Multiple project lifecycles represented: active, seed, paused, and archive',
  'A documented funding policy and public rights boundaries',
];

const PARTNER_ROUTES = [
  'Project collaboration',
  'Grant or public-interest funding',
  'Disclosed sponsorship',
  'Services, commissions, or licensing',
  'Aligned investment under explicit terms',
];

export default function PartnershipBrief() {
  return (
    <>
      <SEOHead
        title="Partnership Brief"
        description="A current, status-aware brief for grants, collaborations, sponsorships, services, licensing, and aligned investment with SUBCULT."
        path="/brief"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="onepager-content">
          <GlitchFrame
            enableScanlines
            enableNoise
            enableTracking
            className="mb-10 pb-8 border-b border-signal"
          >
            <div className="text-center">
              <div className="zine-margin inline-block mb-4">
                <span className="font-mono text-[10px] text-dust tracking-widest uppercase">
                  PARTNERSHIP BRIEF // PUBLIC
                </span>
              </div>
              <h1 className="mb-3 text-4xl chromatic glitch-text">SUBCULT</h1>
              <p className="text-lg text-bone max-w-2xl mx-auto">
                Open systems for culture, coordination, and strange futures.
              </p>
              <p className="font-mono text-xs text-dust mt-3">&gt; status verified 2026-07-10</p>
            </div>
          </GlitchFrame>

          <section className="mb-10">
            <h2 className="mb-4">A Worldview With Outputs</h2>
            <p className="text-bone leading-relaxed max-w-4xl">
              SUBCULT is an underground creative-technical collective building open, inspectable
              software, media systems, research tools, and participatory experiments. Projects have
              different lifecycles and contribution paths. The shared commitment is to agency,
              legibility, memory, and alternatives to extractive platform defaults.
            </p>
          </section>

          <section className="mb-10" aria-labelledby="brief-outputs">
            <h2 id="brief-outputs" className="mb-4">
              What We Build
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {OUTPUTS.map(([title, detail]) => (
                <Card key={title} className="p-5">
                  <h3 className="font-mono text-sm text-glow mb-2">{title}</h3>
                  <p className="text-sm text-bone">{detail}</p>
                </Card>
              ))}
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            <div>
              <h2 className="mb-4">Verified Signals</h2>
              <ul className="space-y-3">
                {VERIFIED_SIGNALS.map((signal) => (
                  <li key={signal} className="flex items-start gap-3 text-sm text-bone">
                    <span className="font-mono text-static">[+]</span>
                    <span>{signal}</span>
                  </li>
                ))}
              </ul>
              <p className="font-mono text-xs text-dust mt-5">
                Repository visibility is evidence that work exists—not a promise of readiness,
                maintenance, or availability.
              </p>
            </div>

            <TerminalPanel title="partner.routes" prompt="$ ">
              <ul className="space-y-3">
                {PARTNER_ROUTES.map((route) => (
                  <li key={route} className="flex items-start gap-3 text-sm text-bone">
                    <span className="text-cyan">›</span>
                    <span>{route}</span>
                  </li>
                ))}
              </ul>
            </TerminalPanel>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <Card className="p-6 border-signal">
              <p className="font-mono text-xs text-signal mb-3">[FUNDING]</p>
              <h2 className="text-xl mb-3">Terms Before Theater</h2>
              <p className="text-sm text-bone leading-relaxed">
                SUBCULT may use patron support, earned revenue, grants, sponsorships, partnerships,
                or aligned investment. Every arrangement is judged by what it funds, controls, can
                see, and leaves behind.
              </p>
            </Card>
            <Card className="p-6">
              <p className="font-mono text-xs text-cyan mb-3">[BOUNDARY]</p>
              <h2 className="text-xl mb-3">No Hidden Control</h2>
              <p className="text-sm text-bone leading-relaxed">
                Funding does not silently confer editorial control, user-data access, community
                representation, unrelated intellectual property, or governance beyond the written
                agreement.
              </p>
            </Card>
          </section>

          <section className="border-t border-fog pt-8 text-center">
            <h2 className="mb-3">Start With the Scope</h2>
            <p className="text-bone max-w-2xl mx-auto mb-6">
              A useful inquiry names the project, proposed exchange, budget, timeline, required
              rights, and concrete public or operational outcome.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button as="link" to="/partner" size="lg">
                Partnership Routes
              </Button>
              <Button as="link" to="/funding" variant="secondary" size="lg">
                Funding Policy
              </Button>
            </div>
            <p className="font-mono text-[10px] text-dust mt-6">
              &gt; subcult.tv // END TRANSMISSION
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
