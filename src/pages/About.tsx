import SEOHead from '@/components/SEOHead';
import TerminalPanel from '@/components/effects/TerminalPanel';

export default function About() {
  return (
    <>
      <SEOHead
        title="About"
        description="SUBCULT is an independent studio building open-source tools for underground scenes, mutual aid, archives, and independent media."
        path="/about"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Header */}
        <div className="mb-16">
          <p className="font-mono text-xs text-dust mb-3">&gt; cat /about/README.md</p>
          <h1 className="mb-6">About // Studio</h1>
          <p className="text-bone max-w-3xl text-lg leading-relaxed">
            SUBCULT is an independent software studio building open-source tools for underground
            scenes, mutual aid, archives, and independent media.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Mission */}
          <div>
            <h2 className="mb-6">
              <span className="text-dust font-mono text-sm mr-3">//</span>
              Mission
            </h2>
            <div className="space-y-4 text-bone leading-relaxed">
              <p>
                We work where commercial platforms are a poor fit: small communities, local scenes,
                shared memory, and cooperation that should not depend on surveillance or algorithmic
                reach.
              </p>
              <p>
                The software is developed in public whenever practical. Repositories, documentation,
                and project status are available so people can inspect the work and judge it on the
                evidence.
              </p>
              <p>
                Our mission is simple:{' '}
                <span className="text-signal font-bold">
                  give independent culture tools it can understand, host, adapt, and keep.
                </span>
              </p>
              <p>
                That means making smaller claims, documenting limitations, and treating maintenance
                as part of the work rather than an afterthought.
              </p>
            </div>
          </div>

          {/* Values */}
          <div>
            <h2 className="mb-6">
              <span className="text-dust font-mono text-sm mr-3">//</span>
              Values
            </h2>
            <ul className="space-y-4">
              {[
                {
                  label: 'Privacy by default',
                  detail: 'Collect less, explain what remains, and make consent meaningful.',
                },
                {
                  label: 'Open source as baseline',
                  detail: 'Not a marketing strategy. A principle.',
                },
                {
                  label: 'Evidence over hype',
                  detail: 'Status, limitations, and outcomes stay clear.',
                },
                {
                  label: 'Self-hosting as independence',
                  detail: 'People should be able to run and understand the tools they depend on.',
                },
                {
                  label: 'Documentation is a feature',
                  detail: "If it's not documented, it doesn't exist.",
                },
                { label: 'Ugly-beautiful design', detail: 'Communicates first. Decorates second.' },
              ].map((v) => (
                <li key={v.label} className="border-l-2 border-signal pl-4">
                  <span className="font-mono text-sm text-glow block">{v.label}</span>
                  <span className="text-sm text-bone">{v.detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* What we build / won't build */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          <div className="bg-ash border border-fog p-6">
            <h3 className="text-static mb-4">
              <span className="font-mono text-sm mr-2">✓</span>
              What We Build
            </h3>
            <ul className="space-y-2 text-sm text-bone">
              <li>→ Privacy-respecting software</li>
              <li>→ Tools for local and underground scenes</li>
              <li>→ Mutual-aid and community infrastructure</li>
              <li>→ Archives, discovery, and cultural memory</li>
              <li>→ Independent media tools</li>
              <li>→ Small utilities that support that work</li>
            </ul>
          </div>

          <div className="bg-ash border border-fog p-6">
            <h3 className="text-signal mb-4">
              <span className="font-mono text-sm mr-2">✗</span>
              What We Won't Build
            </h3>
            <ul className="space-y-2 text-sm text-bone">
              <li>→ Surveillance disguised as analytics</li>
              <li>→ Engagement traps masquerading as features</li>
              <li>→ Software that requires data surrender</li>
              <li>→ Anything that phones home without consent</li>
              <li>→ Hidden data collection or unclear consent</li>
              <li>→ Products that optimize for addiction</li>
            </ul>
          </div>
        </div>

        {/* Process */}
        <div className="mt-16">
          <h2 className="mb-6">
            <span className="text-dust font-mono text-sm mr-3">//</span>
            How We Work
          </h2>

          <TerminalPanel title="subcult.practice" className="max-w-2xl">
            <div>
              <span className="text-dust"># principles before platforms</span>
              <br />
              <br />
              <span className="text-chalk">start: </span>
              <span className="text-static">NAME THE COMMUNITY NEED</span>
              <br />
              <span className="text-chalk">build: </span>
              <span className="text-static">USE BORING, INSPECTABLE PARTS</span>
              <br />
              <span className="text-chalk">verify: </span>
              <span className="text-static">TEST THE CLAIMS WE PUBLISH</span>
              <br />
              <span className="text-chalk">share: </span>
              <span className="text-static">DOCUMENT THE PATH IN AND OUT</span>
              <br />
              <span className="text-dust"># status and limitations included.</span>
            </div>
          </TerminalPanel>
        </div>

        {/* Philosophy */}
        <div className="mt-16 py-12 border-t border-fog text-center">
          <blockquote className="text-lg text-bone italic max-w-2xl mx-auto">
            "The best software is software that lets you forget it exists. It does its job, respects
            your time, and gets out of the way."
          </blockquote>
          <p className="font-mono text-xs text-dust mt-4">— Subculture Collective</p>
        </div>
      </div>
    </>
  );
}
