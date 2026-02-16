import SEOHead from '@/components/SEOHead';
import TerminalPanel from '@/components/effects/TerminalPanel';

export default function About() {
  return (
    <>
      <SEOHead
        title="About"
        description="Subculture Collective — our mission, values, process, and the tools we use to build."
        path="/about"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Header */}
        <div className="mb-16">
          <p className="font-mono text-xs text-dust mb-3">&gt; cat /about/README.md</p>
          <h1 className="mb-6">About // Studio</h1>
          <p className="text-bone max-w-3xl text-lg leading-relaxed">
            Subculture Collective (SUBCULT) is an independent studio building open source tools,
            media projects, and infrastructure for people who refuse to be products.
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
                We exist because the tools we needed didn't exist, and the ones that did were locked
                behind paywalls, surveillance stacks, and terms of service written by people who've
                never touched a terminal.
              </p>
              <p>
                Our mission is simple:{' '}
                <span className="text-signal font-bold">
                  build what's needed, ship it open source, and fund it through the people who use
                  it.
                </span>
              </p>
              <p>
                No venture capital. No growth hacking. No engagement metrics. Just code that works
                and documentation that doesn't lie.
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
                { label: 'Privacy by default', detail: "If it phones home, we don't ship it." },
                {
                  label: 'Open source as baseline',
                  detail: 'Not a marketing strategy. A principle.',
                },
                { label: 'Ship over polish', detail: 'v0.1 beats a pitch deck. Always.' },
                {
                  label: 'Self-hosting as independence',
                  detail: 'Your data lives on your hardware.',
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
              <li>→ Open source developer tools</li>
              <li>→ Self-hostable infrastructure</li>
              <li>→ Creative media tools and platforms</li>
              <li>→ Documentation and educational resources</li>
              <li>→ Terminal-first applications</li>
            </ul>
          </div>

          <div className="bg-ash border border-fog p-6">
            <h3 className="text-signal mb-4">
              <span className="font-mono text-sm mr-2">✗</span>
              What We Won't Build
            </h3>
            <ul className="space-y-2 text-sm text-bone">
              <li>→ Surveillance tools disguised as analytics</li>
              <li>→ Engagement traps masquerading as features</li>
              <li>→ Software that requires data surrender</li>
              <li>→ Anything that phones home without consent</li>
              <li>→ Closed-source dependencies we can't audit</li>
              <li>→ Products that optimize for addiction</li>
            </ul>
          </div>
        </div>

        {/* Toolchain */}
        <div className="mt-16">
          <h2 className="mb-6">
            <span className="text-dust font-mono text-sm mr-3">//</span>
            DIY Operations
          </h2>

          <TerminalPanel title="subcult.toolchain" className="max-w-2xl">
            <div>
              <span className="text-dust"># the stack is a stance, not a choice</span>
              <br />
              <br />
              <span className="text-chalk">os: </span>
              <span className="text-static">Linux</span>
              <br />
              <span className="text-chalk">editor: </span>
              <span className="text-static">Neovim</span>
              <br />
              <span className="text-chalk">terminal: </span>
              <span className="text-static">WezTerm</span>
              <br />
              <span className="text-chalk">shell: </span>
              <span className="text-static">zsh + starship</span>
              <br />
              <span className="text-chalk">vcs: </span>
              <span className="text-static">git (self-hosted + GitHub)</span>
              <br />
              <span className="text-chalk">ci: </span>
              <span className="text-static">GitHub Actions + custom scripts</span>
              <br />
              <span className="text-chalk">deploy: </span>
              <span className="text-static">git push && make deploy</span>
              <br />
              <span className="text-chalk">monitoring: </span>
              <span className="text-static">Grafana + Prometheus</span>
              <br />
              <span className="text-chalk">networking: </span>
              <span className="text-static">Tailscale + WireGuard</span>
              <br />
              <br />
              <span className="text-dust"># no kubernetes. no terraform.</span>
              <br />
              <span className="text-dust"># just ssh and a dream.</span>
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
