import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { posts } from '@/lib/posts';

// Papers are a curated subset of posts - for now, we use all posts
// Later this can be filtered by tag or moved to a separate content directory
const papers = posts.map((post, index) => ({
  ...post,
  number: index + 1,
}));

export default function Papers() {
  return (
    <>
      <SEOHead
        title="The Subcult Papers — Season 0"
        description="Founding documents of the Subculture Collective. Technical philosophy, operational principles, and the refusal to be optimized."
        path="/papers"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-mono text-xs text-dust mb-3">&gt; ARCHIVE.papers(season=0)</p>
          <h1 className="mb-4">The Subcult Papers</h1>
          <p className="font-mono text-sm text-flicker mb-6">Season 0</p>
          <p className="text-bone max-w-2xl mx-auto text-lg leading-relaxed">
            Founding documents of the Subculture Collective. Philosophy, process, and the principles
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
            These papers document our philosophy, process, and the technical decisions behind what
            we build. Read them in order, or jump to what interests you.
          </p>
        </div>

        {/* Papers List */}
        <div className="mb-16">
          <h2 className="mb-6">
            <span className="text-dust font-mono text-sm mr-3">//</span>
            Papers Index
          </h2>

          <div className="space-y-4 max-w-3xl">
            {papers.map((paper) => (
              <Link key={paper.slug} to={`/zine/${paper.slug}`} className="block no-underline">
                <Card hoverable className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="font-mono text-2xl text-dust">
                      {String(paper.number).padStart(2, '0')}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-xl text-glow mb-2 group-hover:text-signal">
                        {paper.title}
                      </h3>
                      <p className="text-sm text-bone mb-3">{paper.excerpt}</p>
                      <div className="flex items-center gap-4 text-xs">
                        <span className="font-mono text-dust">{paper.date}</span>
                        <div className="flex gap-2">
                          {paper.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="font-mono text-xs text-fog bg-soot px-2 py-0.5"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="font-mono text-sm text-signal">→</div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center py-12 border-t border-fog">
          <h2 className="mb-4">Stay Updated</h2>
          <p className="text-bone max-w-xl mx-auto mb-8">
            New papers drop monthly. Subscribe to the memo to get notified when Season 1 begins.
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
