import { useState, useEffect } from 'react';
import SEOHead from '@/components/SEOHead';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import TerminalPanel from '@/components/effects/TerminalPanel';
import { Zap, Wrench, Film, Globe, Package } from 'lucide-react';
import { getPatreonCampaign } from '@/lib/api';
import type { APIPatreonTier } from '@/lib/api';

interface DisplayTier {
  name: string;
  price: string;
  color: string;
  highlight?: boolean;
  patronCount?: number;
  perks: string[];
}

const FALLBACK_TIERS: DisplayTier[] = [
  {
    name: 'Supporter',
    price: '$5/mo',
    color: 'border-fog',
    perks: ['Help sustain independent, open work. No expectations — just solidarity.'],
  },
  {
    name: 'Contributor',
    price: '$10/mo',
    color: 'border-signal',
    highlight: true,
    perks: ['Get closer to the process: early access, updates, and a voice in direction.'],
  },
  {
    name: 'Collaborator',
    price: '$15/mo',
    color: 'border-static',
    perks: [
      'Participate more directly through private channels, feedback, and collaboration opportunities.',
    ],
  },
  {
    name: 'Solidarity Backer',
    price: '$25/mo',
    color: 'border-cyan',
    perks: ['Material support for long-term sustainability and experimentation.'],
  },
];

const WHAT_SUPPORT_FUNDS = [
  {
    icon: Zap,
    label: 'Server costs & infrastructure',
    detail: 'Self-hosted everything. That costs money.',
  },
  { icon: Wrench, label: 'Development time', detail: 'Full-time code. No day job safety net.' },
  { icon: Film, label: 'Media production', detail: 'Hardware, software, hosting for audio/video.' },
  { icon: Globe, label: 'Domain & DNS', detail: "subcult.tv doesn't renew itself." },
  {
    icon: Package,
    label: 'Open source maintenance',
    detail: 'Bug fixes, reviews, docs — the unglamorous work.',
  },
];

// Strip HTML tags from Patreon descriptions.
function stripHTML(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}

// Map an API tier to the display format used by the cards.
function apiTierToDisplay(tier: APIPatreonTier, index: number): DisplayTier {
  const colors = ['border-fog', 'border-signal', 'border-static', 'border-cyan'];
  const dollars = (tier.amount_cents / 100).toFixed(0);
  const raw = tier.description ? stripHTML(tier.description) : '';
  const perks = raw
    ? raw.split(/\n+/).filter((l) => l.trim())
    : [`${tier.title} tier`];
  return {
    name: tier.title,
    price: `$${dollars}/mo`,
    color: colors[index % colors.length],
    highlight: index === 1,
    patronCount: tier.patron_count,
    perks,
  };
}

export default function Patreon() {
  const [tiers, setTiers] = useState(FALLBACK_TIERS);

  useEffect(() => {
    getPatreonCampaign()
      .then((data) => {
        if (data.tiers && data.tiers.length > 0) {
          setTiers(data.tiers.map(apiTierToDisplay));
        }
      })
      .catch(() => {
        // Silent fallback — keep FALLBACK_TIERS
      });
  }, []);

  return (
    <>
      <SEOHead
        title="Support"
        description="Fund the SUBCULT signal. Your support keeps the servers running and the code shipping."
        path="/support"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-mono text-xs text-dust mb-3">&gt; SIGNAL_BOOST.request()</p>
          <h1 className="mb-6">Fund the Signal</h1>
          <p className="text-bone max-w-2xl mx-auto text-lg leading-relaxed">
            SUBCULT is funded by the people who use what we build. No venture capital. No ads. No
            exit strategy. Just builders and the people who believe in what we're building.
          </p>
        </div>

        {/* Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={`p-6 ${tier.color} ${tier.highlight ? 'border-2 relative' : ''}`}
            >
              {tier.highlight && (
                <div className="absolute -top-3 left-4 bg-signal text-void font-mono text-xs px-2 py-0.5 uppercase">
                  Popular
                </div>
              )}
              <h3 className="font-display text-xl uppercase mb-1">{tier.name}</h3>
              <p className="font-mono text-2xl text-signal font-bold mb-4">{tier.price}</p>
              {tier.patronCount != null && tier.patronCount > 0 && (
                <p className="font-mono text-xs text-dust -mt-3 mb-4">
                  {tier.patronCount} patron{tier.patronCount !== 1 ? 's' : ''}
                </p>
              )}
              <ul className="space-y-2 mb-6">
                {tier.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2 text-sm text-bone">
                    <span className="text-static mt-0.5">›</span>
                    {perk}
                  </li>
                ))}
              </ul>
              <Button
                as="a"
                href="https://www.patreon.com/subcult"
                target="_blank"
                rel="noopener noreferrer"
                variant={tier.highlight ? 'primary' : 'secondary'}
                className="w-full"
              >
                Join Tier ↗
              </Button>
            </Card>
          ))}
        </div>

        {/* What support funds */}
        <div className="mb-16">
          <h2 className="text-center mb-8">
            <span className="text-dust font-mono text-sm mr-3">//</span>
            Where Your Money Goes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {WHAT_SUPPORT_FUNDS.map((item) => (
              <div key={item.label} className="bg-ash border border-fog p-4">
                <item.icon className="w-6 h-6 text-signal mb-2" aria-hidden="true" />
                <h4 className="font-mono text-sm text-glow mb-1">{item.label}</h4>
                <p className="text-xs text-bone">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping cadence */}
        <div className="mb-16">
          <TerminalPanel title="shipping.schedule" className="max-w-2xl mx-auto">
            <div>
              <span className="text-chalk">cadence: </span>
              <span className="text-static">continuous</span>
              <br />
              <span className="text-chalk">releases: </span>
              <span className="text-flicker">when ready, not when scheduled</span>
              <br />
              <span className="text-chalk">updates: </span>
              <span className="text-cyan">monthly patron reports</span>
              <br />
              <span className="text-chalk">transparency: </span>
              <span className="text-static">100% — public repos, public roadmap</span>
              <br />
              <br />
              <span className="text-dust"># we ship when the code is ready.</span>
              <br />
              <span className="text-dust"># not when the calendar says so.</span>
            </div>
          </TerminalPanel>
        </div>

        {/* Final CTA */}
        <div className="text-center py-12 border-t border-fog">
          <h2 className="mb-4">Ready to Boost the Signal?</h2>
          <p className="text-bone max-w-xl mx-auto mb-8">
            Every contribution keeps the infrastructure running and the code flowing. Join the
            collective.
          </p>
          <Button
            as="a"
            href="https://www.patreon.com/subcult"
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
          >
            Support on Patreon ↗
          </Button>
        </div>
      </div>
    </>
  );
}
