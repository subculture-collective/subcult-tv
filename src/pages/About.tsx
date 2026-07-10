import SEOHead from '@/components/SEOHead';
import TerminalPanel from '@/components/effects/TerminalPanel';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const PRINCIPLES = [
  {
    label: 'Reality over hype',
    detail: 'Describe what exists, what remains experimental, and what changed direction.',
  },
  {
    label: 'Agency over capture',
    detail: 'Increase what people can understand, control, preserve, export, or leave.',
  },
  {
    label: 'Symbolic outside, legible inside',
    detail: 'The surface may carry myth. The machinery must show its work.',
  },
  {
    label: 'Memory is infrastructure',
    detail: 'Documentation, provenance, and archives are part of the system—not aftercare.',
  },
  {
    label: 'Open structure where feasible',
    detail: 'Prefer inspectability, portability, and self-hosting without making false absolutes.',
  },
  {
    label: 'Experiment without theater',
    detail: 'Weird prototypes are welcome. Inflated promises are not.',
  },
];

const OUTPUTS = [
  ['Software', 'Self-hosted systems, utilities, alternative interfaces, and operational tools.'],
  [
    'Media infrastructure',
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

export default function About() {
  return (
    <>
      <SEOHead
        title="About"
        description="SUBCULT is an underground creative-technical collective building open, inspectable systems for culture, coordination, and strange futures."
        path="/about"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <header className="mb-16 max-w-4xl">
          <p className="font-mono text-xs text-dust mb-3">&gt; cat /about/README.md</p>
          <h1 className="mb-6">A Worldview With Outputs</h1>
          <p className="text-bone text-lg leading-relaxed">
            SUBCULT is an underground creative-technical collective building open, inspectable
            systems for culture, coordination, and strange futures.
          </p>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="mb-6">
              <span className="text-dust font-mono text-sm mr-3">//</span>
              Why This Shape
            </h2>
            <div className="space-y-4 text-bone leading-relaxed">
              <p>
                We work across software, media, research, and participatory formats because culture
                does not live in one medium. It lives in protocols and archives, interfaces and
                institutions, stages and private rooms.
              </p>
              <p>
                The common thread is a commitment to systems that increase agency instead of
                manufacturing dependence. We prefer inspectable mechanisms to black-box authority,
                durable memory to disposable feeds, and concrete experiments to future-facing
                theater.
              </p>
              <p>
                We use symbolic language because systems need identity and memory. We keep the
                inside legible because mystery is not governance.
              </p>
            </div>
          </div>

          <TerminalPanel title="subcult.identity" className="h-fit">
            <div>
              <span className="text-chalk">form: </span>
              <span className="text-static">creator-led collective</span>
              <br />
              <span className="text-chalk">field: </span>
              <span className="text-cyan">culture // code // critique</span>
              <br />
              <span className="text-chalk">method: </span>
              <span className="text-flicker">build // document // revise</span>
              <br />
              <span className="text-chalk">promise: </span>
              <span className="text-static">status stays visible</span>
              <br />
              <br />
              <span className="text-dust"># the aesthetic can be haunted.</span>
              <br />
              <span className="text-dust"># the engineering has to be real.</span>
            </div>
          </TerminalPanel>
        </section>

        <section className="mb-16" aria-labelledby="principles">
          <h2 id="principles" className="mb-6">
            <span className="text-dust font-mono text-sm mr-3">//</span>
            Operating Principles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PRINCIPLES.map((principle) => (
              <Card key={principle.label} className="p-5 border-l-2 border-l-signal">
                <h3 className="font-mono text-sm text-glow mb-2">{principle.label}</h3>
                <p className="text-sm text-bone">{principle.detail}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16" aria-labelledby="outputs">
          <h2 id="outputs" className="mb-6">
            <span className="text-dust font-mono text-sm mr-3">//</span>
            What We Make
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {OUTPUTS.map(([title, detail]) => (
              <div key={title} className="bg-ash border border-fog p-5">
                <h3 className="font-display text-xl uppercase mb-2">{title}</h3>
                <p className="text-sm text-bone">{detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card className="p-6">
            <p className="font-mono text-xs text-cyan mb-3">[PARTICIPATION]</p>
            <h2 className="text-xl mb-4">Creator-Led Today</h2>
            <p className="text-bone leading-relaxed">
              Projects have different lifecycles, licenses, audiences, and contribution paths. The
              umbrella supplies a shared worldview and a place to transmit the work; it does not
              make every participant an owner or every prototype active.
            </p>
          </Card>
          <Card className="p-6 border-signal">
            <p className="font-mono text-xs text-signal mb-3">[FUNDING]</p>
            <h2 className="text-xl mb-4">No Hidden Control</h2>
            <p className="text-bone leading-relaxed">
              SUBCULT may use patron support, earned revenue, grants, sponsorships, partnerships, or
              aligned investment. Each relationship is judged by its terms and disclosed in
              proportion to its effect.
            </p>
          </Card>
        </section>

        <section className="text-center py-12 border-t border-fog">
          <h2 className="mb-4">Inspect the Work</h2>
          <p className="text-bone max-w-xl mx-auto mb-8">
            Read the archive, verify project status, and choose the relationship that matches what
            you actually want to do.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button as="link" to="/projects" size="lg">
              View Projects
            </Button>
            <Button as="link" to="/funding" variant="secondary" size="lg">
              Read the Funding Policy
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
