import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { posts } from '@/lib/posts';

const numbered = posts.map((post, index) => ({
  ...post,
  number: index + 1,
}));

export default function Zine() {
  return (
    <>
      <SEOHead
        title="The Zine"
        description="Founding documents and dispatches from the Subculture Collective. Philosophy, process, and the refusal to be optimized."
        path="/zine"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-mono text-xs text-dust mb-3">&gt; cat /zine/index</p>
          <h1 className="mb-4">The Zine</h1>
          <p className="font-mono text-sm text-flicker mb-6">Season 0 — Foundations</p>
          <p className="text-bone max-w-2xl mx-auto text-lg leading-relaxed">
            Dispatches from the workshop. Philosophy, process, and the principles
            that guide what we build.
          </p>
        </div>

        {/* Start Here Box */}
        <div className="bg-ash border border-static p-6 mb-12 max-w-2xl mx-auto">
          <h2 className="font-mono text-sm text-static mb-3">// START HERE</h2>
          <p className="text-bone mb-4">
            <strong className="text-glow">Subculture Collective</strong> is a studio building tools,
            media, and infrastructure for the counterculture. We ship open-source software, publish
            technical content, and operate independently of venture capital.
          </p>
          <p className="text-bone">
            Read in order, or jump to what interests you. New entries drop every Tuesday.
          </p>
        </div>

        {/* Posts Index */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {numbered.map((post) => {
            const published = !!post.mdx;

            const content = (
              <Card hoverable={published} className={`p-6 ${!published ? 'opacity-40' : ''}`}>
                <div className="flex items-start gap-4">
                  <div className="font-mono text-2xl text-dust">
                    {String(post.number).padStart(2, '0')}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-xl text-glow mb-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-bone mb-3">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="font-mono text-dust">{post.date}</span>
                      {!published && (
                        <span className="font-mono text-xs text-dust">INCOMING</span>
                      )}
                    </div>
                  </div>
                  <div className="font-mono text-sm text-signal">
                    {published ? '→' : ''}
                  </div>
                </div>
              </Card>
            );

            if (!published) {
              return (
                <div key={post.slug} className="pointer-events-none select-none">
                  {content}
                </div>
              );
            }

            return (
              <Link key={post.slug} to={`/zine/${post.slug}`} className="block no-underline">
                {content}
              </Link>
            );
          })}
        </div>

        {/* Bottom */}
        <div className="text-center py-12 mt-12 border-t border-fog">
          <h2 className="mb-4">Stay Updated</h2>
          <p className="text-bone max-w-xl mx-auto mb-8">
            New entries drop every Tuesday. Subscribe to the memo to get notified.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button as="link" to="/memo" size="lg">
              Subscribe to Memo
            </Button>
            <Button as="link" to="/support" variant="secondary" size="lg">
              Support the Collective
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
