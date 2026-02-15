import SEOHead from '@/components/SEOHead';
import PostCard from '@/components/PostCard';
import { posts } from '@/lib/posts';

export default function Zine() {
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <>
      <SEOHead
        title="Zine"
        description="Dispatches from the Subculture Collective — manifestos, field notes, and build logs."
        path="/zine"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Header */}
        <div className="mb-12">
          <p className="font-mono text-xs text-dust mb-3">
            &gt; cat /zine/index
          </p>
          <h1 className="mb-4">The Zine</h1>
          <p className="text-bone max-w-2xl">
            Dispatches from the workshop. Manifestos, field notes, build logs,
            and transmissions from the static. Updated when we have something worth saying.
          </p>
        </div>

        {/* Decorative header */}
        <div className="border-t border-b border-fog py-3 mb-8 flex items-center justify-between">
          <span className="font-mono text-xs text-dust">
            SUBCVLT ZINE — ISSUE #{sortedPosts.length}
          </span>
          <span className="font-mono text-xs text-dust">
            {sortedPosts.length} TRANSMISSION{sortedPosts.length !== 1 ? 'S' : ''}
          </span>
        </div>

        {/* Posts list */}
        <div className="space-y-6">
          {sortedPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

        {/* Bottom flavor */}
        <div className="mt-12 pt-8 border-t border-fog text-center">
          <p className="font-mono text-xs text-dust">
            &gt; end of transmission log<br />
            &gt; new signals incoming...<br />
            &gt; check back. or don't. we're not tracking you.
          </p>
        </div>
      </div>
    </>
  );
}
