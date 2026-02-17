import { useState, useEffect, useMemo, Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import Tag from '@/components/ui/Tag';
import Button from '@/components/ui/Button';
import { getPostBySlug, getPostMDX, getNextInSeries } from '@/lib/posts';
import type { Post } from '@/types';

export default function PostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = useMemo<Post | null>(() => {
    if (!slug) return null;
    return getPostBySlug(slug) || null;
  }, [slug]);

  const nextPost = useMemo(() => (slug ? getNextInSeries(slug) : undefined), [slug]);

  const [MDXContent, setMDXContent] = useState<React.ComponentType | null>(null);
  const [mdxStatus, setMdxStatus] = useState<'idle' | 'loaded'>('idle');

  useEffect(() => {
    if (!slug || !post) return;

    let cancelled = false;
    const loader = getPostMDX(slug);
    if (loader) {
      loader()
        .then((mod) => {
          if (!cancelled) {
            setMDXContent(() => mod.default);
            setMdxStatus('loaded');
          }
        })
        .catch(() => {
          if (!cancelled) {
            setMDXContent(null);
            setMdxStatus('loaded');
          }
        });
    }
    return () => {
      cancelled = true;
    };
  }, [slug, post]);

  if (!slug || !post) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SEOHead title="Post Not Found" path={`/zine/${slug ?? ''}`} />
        <p className="font-mono text-signal mb-4">&gt; ERROR 404: transmission not found</p>
        <p className="text-bone mb-6">
          This signal was lost in the static. The post you're looking for doesn't exist.
        </p>
        <Button as="link" to="/zine" variant="secondary">
          ← Back to the Zine
        </Button>
      </div>
    );
  }

  if (mdxStatus === 'idle') {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <p className="font-mono text-dust">
          &gt; loading transmission...
          <span className="cursor-blink" />
        </p>
      </div>
    );
  }

  if (!MDXContent) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SEOHead title="Post Not Found" path={`/zine/${slug}`} />
        <p className="font-mono text-signal mb-4">&gt; ERROR 404: transmission not found</p>
        <p className="text-bone mb-6">
          This signal was lost in the static. The post you're looking for doesn't exist.
        </p>
        <Button as="link" to="/zine" variant="secondary">
          ← Back to the Zine
        </Button>
      </div>
    );
  }

  return (
    <>
      <SEOHead title={post.title} description={post.excerpt} path={`/zine/${post.slug}`} />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Breadcrumb */}
        <nav className="font-mono text-xs text-dust mb-8" aria-label="Breadcrumb">
          <Link to="/zine" className="hover:text-bone transition-colors">
            zine
          </Link>
          <span className="mx-2">/</span>
          <span className="text-bone">{post.slug}</span>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-xs text-dust">{post.date}</span>
            {post.author && <span className="font-mono text-xs text-dust">by {post.author}</span>}
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </header>

        {/* MDX Content */}
        <div className="mdx-content">
          <Suspense fallback={<p className="font-mono text-dust">&gt; rendering content...</p>}>
            <MDXContent />
          </Suspense>
        </div>

        {/* End-of-Post */}
        <footer className="mt-16 pt-8 border-t border-fog">
          {post.series && (
            <p className="font-mono text-xs text-dust mb-6">
              {post.series.name} Series — Week {post.series.week} of {post.series.total}
            </p>
          )}

          {nextPost && (
            <div className="mb-8">
              <p className="font-mono text-sm text-bone mb-1">
                Next: <span className="text-glow">{nextPost.title}</span>
              </p>
              <p className="text-sm text-dust">{nextPost.excerpt}</p>
            </div>
          )}

          <a
            href="https://x.com/subcult_tv"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-bone hover:text-signal transition-colors"
          >
            Join the conversation →
          </a>
        </footer>
      </article>
    </>
  );
}
