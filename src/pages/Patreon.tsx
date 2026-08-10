import SEOHead from '@/components/SEOHead';
import Button from '@/components/ui/Button';
import TerminalPanel from '@/components/effects/TerminalPanel';

const SUPPORT_FUNDS = [
  {
    label: 'Public infrastructure',
    detail: 'Domains, storage, and hosting for software people can inspect and use.',
  },
  {
    label: 'Maintenance',
    detail: 'Testing, documentation, security updates, and the work after launch.',
  },
  {
    label: 'Research and prototypes',
    detail: 'Time to investigate community needs before turning them into products.',
  },
];

export default function Patreon() {
  return (
    <>
      <SEOHead
        title="Support"
        description="Support SUBCULT's open-source tools for independent culture. Contributions fund public infrastructure, maintenance, and research."
        path="/support"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-14">
          <p className="font-mono text-xs text-dust mb-3">&gt; KEEP_THE_WORK.independent()</p>
          <h1 className="mb-6">Support the Work</h1>
          <p className="text-bone max-w-2xl mx-auto text-lg leading-relaxed">
            SUBCULT publishes software and field notes without paywalling the useful parts. Monthly
            contributions help cover the time and infrastructure required to keep that work public.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
          {SUPPORT_FUNDS.map((item) => (
            <div key={item.label} className="bg-ash border border-fog p-6">
              <h2 className="font-mono text-base text-glow mb-3">{item.label}</h2>
              <p className="text-sm text-bone leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto mb-14">
          <TerminalPanel title="support.contract">
            <div>
              <span className="text-chalk">code: </span>
              <span className="text-static">OPEN WITH OR WITHOUT PAYMENT</span>
              <br />
              <span className="text-chalk">updates: </span>
              <span className="text-flicker">PUBLIC REPOSITORIES + FIELD NOTES</span>
              <br />
              <span className="text-chalk">promise: </span>
              <span className="text-cyan">NO ACCESS THEATER</span>
              <br />
              <br />
              <span className="text-dust"># contribute because the work matters to you.</span>
            </div>
          </TerminalPanel>
        </div>

        <div className="text-center">
          <Button
            as="a"
            href="https://www.patreon.com/subcult"
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
          >
            Support on Patreon ↗
          </Button>
          <p className="font-mono text-xs text-dust mt-4">
            You can also help by using the software, reporting problems, or contributing code.
          </p>
        </div>
      </div>
    </>
  );
}
