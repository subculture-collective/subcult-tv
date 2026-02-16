import SEOHead from '@/components/SEOHead';
import NewsletterSignup from '@/components/NewsletterSignup';
import TerminalPanel from '@/components/effects/TerminalPanel';
import Card from '@/components/ui/Card';

const WHAT_YOU_GET = [
  {
    icon: '📡',
    label: 'Monthly Infrastructure Memo',
    detail: 'What shipped, what broke, what we learned. Unfiltered build logs.',
  },
  {
    icon: '🚀',
    label: 'Early Access Alerts',
    detail: 'Be first to know when new tools or projects drop.',
  },
  {
    icon: '📼',
    label: 'Behind-the-Scenes',
    detail: 'Process notes, experiments, and prototypes before they go public.',
  },
  {
    icon: '🔮',
    label: 'Roadmap Previews',
    detail: "See what's coming next. Sometimes vote on priorities.",
  },
];

export default function Memo() {
  return (
    <>
      <SEOHead
        title="Memo — Newsletter"
        description="Subscribe to the Subcult Infrastructure Memo. Monthly updates on what shipped, what's coming, and lessons from the workshop."
        path="/memo"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-mono text-xs text-dust mb-3">&gt; BROADCAST.subscribe()</p>
          <h1 className="mb-6">Subcult Infrastructure Memo</h1>
          <p className="text-bone max-w-2xl mx-auto text-lg leading-relaxed">
            A monthly transmission from the workshop. What shipped, what broke, what we learned. No
            marketing fluff. No growth hacks. Just signal.
          </p>
        </div>

        {/* Newsletter Signup - Hero CTA */}
        <div className="max-w-xl mx-auto mb-16">
          <NewsletterSignup />
        </div>

        {/* What You'll Receive */}
        <div className="mb-16">
          <h2 className="text-center mb-8">
            <span className="text-dust font-mono text-sm mr-3">//</span>
            What You'll Receive
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {WHAT_YOU_GET.map((item) => (
              <Card key={item.label} className="p-4">
                <span className="text-2xl mb-2 block">{item.icon}</span>
                <h4 className="font-mono text-sm text-glow mb-1">{item.label}</h4>
                <p className="text-xs text-bone">{item.detail}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Cadence Info */}
        <div className="mb-16">
          <TerminalPanel title="memo.config" className="max-w-2xl mx-auto">
            <div>
              <span className="text-chalk">frequency: </span>
              <span className="text-static">monthly</span>
              <br />
              <span className="text-chalk">format: </span>
              <span className="text-flicker">plaintext + links</span>
              <br />
              <span className="text-chalk">tracking: </span>
              <span className="text-signal">none</span>
              <br />
              <span className="text-chalk">unsubscribe: </span>
              <span className="text-cyan">one-click, always</span>
              <br />
              <br />
              <span className="text-dust"># we respect your inbox.</span>
              <br />
              <span className="text-dust"># no spam. no sell. no surveillance.</span>
            </div>
          </TerminalPanel>
        </div>

        {/* Secondary CTA */}
        <div className="text-center py-12 border-t border-fog">
          <h2 className="mb-4">Ready to Tune In?</h2>
          <p className="text-bone max-w-xl mx-auto mb-8">
            Join the frequency. Get the memo. Stay ahead of the noise.
          </p>
          <div className="max-w-md mx-auto">
            <NewsletterSignup />
          </div>
        </div>
      </div>
    </>
  );
}
