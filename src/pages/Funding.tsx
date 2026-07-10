import SEOHead from '@/components/SEOHead';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const ROUTES = [
  ['Support', 'Patronage with listed benefits; no ownership, repayment, or governance.'],
  ['Grant', 'Named work and reporting under the rights written into the grant.'],
  ['Sponsorship', 'Disclosed support without hidden placement, data access, or editorial control.'],
  ['Partnership', 'Mutual deliverables inside a defined scope, term, and exit.'],
  [
    'Investment',
    'Negotiated financial and governance rights—nothing beyond the signed instrument.',
  ],
  ['Earned revenue', 'Products, services, licenses, or commissions with scoped terms.'],
];

const REVIEW_FIELDS = [
  'purpose and concrete output',
  'counterparty and incentives',
  'exchange, ownership, and control',
  'data access and retention',
  'licensing, approval, or exclusivity',
  'exit terms and surviving rights',
  'conflicts with SUBCULT principles',
  'public disclosure',
  'approval authority',
  'legal, tax, security, and financial review',
];

export default function Funding() {
  return (
    <>
      <SEOHead
        title="Funding Policy"
        description="How SUBCULT evaluates support, grants, sponsorships, partnerships, earned revenue, and aligned investment."
        path="/funding"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <header className="mb-16">
          <p className="font-mono text-xs text-dust mb-3">&gt; FUNDING_POLICY.read()</p>
          <h1 className="mb-6">Funding Without Hidden Control</h1>
          <div className="max-w-3xl space-y-4 text-bone text-lg leading-relaxed">
            <p>
              Money is infrastructure. It pays for time, hosting, tools, research, design,
              accessibility, documentation, and production.
            </p>
            <p>
              Money is also a control surface. We judge every relationship by its terms: what it
              funds, what it controls, what it can see, and whether it can be explained honestly.
            </p>
          </div>
        </header>

        <section className="mb-16" aria-labelledby="funding-routes">
          <h2 id="funding-routes" className="mb-6">
            <span className="text-dust font-mono text-sm mr-3">//</span>
            Routes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ROUTES.map(([title, detail]) => (
              <Card key={title} className="p-5 border-fog">
                <h3 className="font-mono text-sm text-glow mb-2">{title}</h3>
                <p className="text-sm text-bone">{detail}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div>
            <h2 className="mb-6">Review Gate</h2>
            <ol className="space-y-3">
              {REVIEW_FIELDS.map((field, index) => (
                <li key={field} className="flex items-start gap-3 text-sm text-bone">
                  <span className="font-mono text-cyan">{String(index + 1).padStart(2, '0')}</span>
                  <span>{field}</span>
                </li>
              ))}
            </ol>
          </div>

          <Card className="p-6 border-signal">
            <p className="font-mono text-xs text-signal mb-3">[NON-NEGOTIABLE]</p>
            <h2 className="text-xl mb-4">No Invisible Governance</h2>
            <p className="text-bone leading-relaxed mb-4">
              We reject arrangements built on undisclosed influence, sale of personal data,
              surveillance access, false community claims, unrelated intellectual-property grabs,
              indefinite exclusivity, or terms that cannot survive public explanation.
            </p>
            <p className="text-sm text-dust">
              Material institutional support should be disclosed with its purpose, restrictions,
              control rights, data access, duration, and status. Small individual patron payments
              may be aggregated to protect privacy.
            </p>
          </Card>
        </section>

        <section className="border-t border-fog pt-12 text-center">
          <h2 className="mb-4">Two Public Doors</h2>
          <p className="text-bone max-w-2xl mx-auto mb-8">
            Support sustains the workshop. Partner starts a scoped institutional conversation.
            Neither route receives hidden control by default.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button as="link" to="/support" size="lg">
              Support the Work
            </Button>
            <Button as="link" to="/partner" variant="secondary" size="lg">
              Partner with SUBCULT
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
