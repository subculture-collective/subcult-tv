import { useEffect, useState } from 'react';
import SEOHead from '@/components/SEOHead';
import Card from '@/components/ui/Card';
import TerminalPanel from '@/components/effects/TerminalPanel';
import { Target } from 'lucide-react';
import { getPatreonCampaign } from '@/lib/api';
import { getCuratedProjects } from '@/lib/github';
import { getPublishedPosts } from '@/lib/posts';

const VERIFIED_ON = '2026-07-10';

export default function Metrics() {
  const [patronCount, setPatronCount] = useState<number | null>(null);
  const projects = getCuratedProjects();
  const publishedPosts = getPublishedPosts();
  const activeLabels = projects.filter((project) => project.status === 'active').length;

  useEffect(() => {
    getPatreonCampaign()
      .then((data) => {
        if (data.campaign) setPatronCount(data.campaign.patron_count);
      })
      .catch(() => {
        // An unavailable API stays visibly unavailable rather than becoming a fabricated zero.
      });
  }, []);

  const stats = [
    { key: 'catalog', label: 'Cataloged Projects', value: projects.length },
    { key: 'active', label: 'Catalog-Labeled Active', value: activeLabels },
    { key: 'posts', label: 'Published Transmissions', value: publishedPosts.length },
    { key: 'supporters', label: 'Patreon Supporters', value: patronCount ?? '—' },
  ];

  return (
    <>
      <SEOHead
        title="Public Record"
        description="A dated SUBCULT snapshot generated from the public project catalog, zine registry, and available supporter API."
        path="/metrics"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <header className="text-center mb-12">
          <p className="font-mono text-xs text-dust mb-3">&gt; PUBLIC_RECORD.snapshot()</p>
          <h1 className="mb-6">Public Record</h1>
          <p className="text-bone max-w-2xl mx-auto text-lg leading-relaxed">
            A dated snapshot, not a real-time claim. Counts come from the site catalog and
            publication registry; unavailable external data stays unavailable.
          </p>
        </header>

        <p className="font-mono text-xs text-fog text-center mb-12">
          Snapshot verified: {VERIFIED_ON}
        </p>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map((stat) => (
            <Card key={stat.key} className="p-6 text-center">
              <p className="font-mono text-xs text-dust uppercase tracking-wider mb-2">
                {stat.label}
              </p>
              <p className="font-display text-4xl text-glow font-bold">{stat.value}</p>
            </Card>
          ))}
        </section>

        <section className="mb-16">
          <h2 className="mb-6">
            <span className="text-dust font-mono text-sm mr-3">//</span>
            Next Verification
          </h2>
          <Card className="p-6 border-signal max-w-2xl">
            <div className="flex items-start gap-4">
              <Target className="w-10 h-10 text-signal shrink-0" aria-hidden="true" />
              <div>
                <p className="font-mono text-sm text-cyan">PROJECT STATUS AUDIT</p>
                <p className="text-lg text-glow mt-1">
                  Verify each active label against its repository, deployment, owner, and next
                  milestone.
                </p>
              </div>
            </div>
          </Card>
        </section>

        <TerminalPanel title="transparency.policy" className="max-w-3xl mx-auto mb-16">
          <div>
            <span className="text-chalk">01. </span>
            <span className="text-bone">publish definitions with the number</span>
            <br />
            <span className="text-chalk">02. </span>
            <span className="text-bone">attach a verification date</span>
            <br />
            <span className="text-chalk">03. </span>
            <span className="text-bone">show unavailable data as unavailable</span>
            <br />
            <span className="text-chalk">04. </span>
            <span className="text-bone">do not confuse activity, readiness, reach, and value</span>
            <br />
            <br />
            <span className="text-dust"># measurement should create legibility, not theater.</span>
          </div>
        </TerminalPanel>

        <section className="text-center py-12 border-t border-fog">
          <h2 className="mb-4">What These Numbers Do Not Prove</h2>
          <p className="text-bone max-w-2xl mx-auto">
            A repository is not a maintained product. A catalog status is not a service guarantee. A
            subscriber is not a community member. A shipped artifact is not automatically useful.
          </p>
        </section>
      </div>
    </>
  );
}
