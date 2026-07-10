import SEOHead from '@/components/SEOHead';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import TerminalPanel from '@/components/effects/TerminalPanel';

const PARTNERSHIP_ROUTES = [
  {
    status: 'OPEN',
    title: 'Project collaboration',
    detail: 'Shared technical, editorial, research, or production work with a bounded output.',
  },
  {
    status: 'OPEN',
    title: 'Grants',
    detail: 'Support for named public-interest work with explicit reporting, rights, and limits.',
  },
  {
    status: 'REVIEW',
    title: 'Sponsorships',
    detail: 'Disclosed support for an artifact, event, release, or operating period.',
  },
  {
    status: 'OPEN',
    title: 'Services and licensing',
    detail: 'Scoped commissions, implementation work, or use of a specific capability.',
  },
  {
    status: 'CASE-BY-CASE',
    title: 'Aligned investment',
    detail: 'Capital considered under explicit ownership, control, data, and exit terms.',
  },
];

const INQUIRY_FIELDS = [
  'Who you are and who you represent',
  'The project or capability you want to support',
  'The proposed exchange, budget, and timeline',
  'Required ownership, licensing, approval, exclusivity, data, or reporting terms',
  'The public benefit or concrete output',
];

export default function Partner() {
  return (
    <>
      <SEOHead
        title="Partner"
        description="Grants, sponsorships, collaborations, services, licensing, and aligned investment for specific SUBCULT projects."
        path="/partner"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <header className="max-w-3xl mb-16">
          <p className="font-mono text-xs text-dust mb-3">&gt; PARTNERSHIP.inquiry()</p>
          <h1 className="mb-6">Build Something With Us</h1>
          <p className="text-bone text-lg leading-relaxed">
            SUBCULT accepts partnership inquiries when the relationship can produce a concrete
            artifact, capability, or public benefit without hiding who controls the work.
          </p>
        </header>

        <section className="mb-16" aria-labelledby="partnership-routes">
          <h2 id="partnership-routes" className="mb-6">
            <span className="text-dust font-mono text-sm mr-3">//</span>
            Partnership Routes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {PARTNERSHIP_ROUTES.map((route) => (
              <Card key={route.title} className="p-5 h-full flex flex-col">
                <p className="font-mono text-[10px] text-static mb-3">[{route.status}]</p>
                <h3 className="font-display text-xl uppercase mb-2">{route.title}</h3>
                <p className="text-sm text-bone flex-1">{route.detail}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card className="p-6 border-signal">
            <h2 className="text-xl mb-4">What We Protect</h2>
            <p className="text-bone leading-relaxed mb-4">
              We do not trade hidden editorial control, personal data, false community claims,
              surveillance access, or unrelated intellectual property for funding.
            </p>
            <p className="font-mono text-sm text-static">
              A partner receives only the rights written into the agreement.
            </p>
          </Card>

          <TerminalPanel title="inquiry.payload" prompt="$ ">
            <ol className="space-y-3">
              {INQUIRY_FIELDS.map((field, index) => (
                <li key={field} className="flex items-start gap-3 text-sm text-bone">
                  <span className="text-cyan font-mono">{String(index + 1).padStart(2, '0')}</span>
                  <span>{field}</span>
                </li>
              ))}
            </ol>
          </TerminalPanel>
        </section>

        <section className="text-center py-12 border-t border-fog">
          <p className="font-mono text-xs text-dust mb-3">&gt; TERMS BEFORE THEATER</p>
          <h2 className="mb-4">Start a Partnership Inquiry</h2>
          <p className="text-bone max-w-xl mx-auto mb-8">
            The contact form is the front door. Include the route, scope, proposed exchange, and the
            rights you need so the first conversation can be concrete.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button as="link" to="/contact" size="lg">
              Start an Inquiry
            </Button>
            <Button as="link" to="/funding" variant="secondary" size="lg">
              Read the Funding Policy
            </Button>
          </div>
          <p className="font-mono text-xs text-dust mt-8">
            Money is infrastructure. Terms are governance. We inspect both.
          </p>
        </section>
      </div>
    </>
  );
}
