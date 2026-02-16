import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import Button from '@/components/ui/Button';
import ProjectCard from '@/components/ProjectCard';
import PostCard from '@/components/PostCard';
import TerminalPanel from '@/components/effects/TerminalPanel';
import GlitchFrame from '@/components/effects/GlitchFrame';
import NewsletterSignup from '@/components/NewsletterSignup';
import { useEffects } from '@/context/useEffects';
import { fetchGitHubRepos, mergeWithOverrides, FALLBACK_PROJECTS } from '@/lib/github';
import { getLatestPosts } from '@/lib/posts';
import type { Project } from '@/types';

export default function Home() {
  const [projects, setProjects] = useState<Project[]>(FALLBACK_PROJECTS);
  const { effectLevel } = useEffects();
  const latestPosts = getLatestPosts(3);

  useEffect(() => {
    fetchGitHubRepos().then((repos) => {
      if (repos.length > 0) {
        setProjects(mergeWithOverrides(repos));
      }
    });
  }, []);

  const featured = projects.filter((p) => p.featured).slice(0, 6);
  const displayProjects = featured.length > 0 ? featured : projects.slice(0, 6);

  return (
    <>
      <SEOHead title="Home" path="/" />

      {/* ═══════ HERO ═══════ */}
      <section className="relative overflow-hidden">
        <GlitchFrame enableTracking className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
            <div className="max-w-3xl">
              {/* Overline */}
              <p className="font-mono text-xs text-dust mb-4 animate-fade-in-up">
                &gt; SUBCULTURE COLLECTIVE // EST. 2026
              </p>

              {/* Title */}
              <h1
                className={`mb-6 animate-fade-in-up animation-delay-100 ${
                  effectLevel !== 'clean' ? 'chromatic' : ''
                }`}
              >
                SUBCULT
              </h1>

              {/* Tagline */}
              <p className="text-lg md:text-xl text-bone leading-relaxed mb-8 max-w-2xl animate-fade-in-up animation-delay-200">
                We build tools, media, and infrastructure for the counterculture. Open source. DIY.
                No masters.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 animate-fade-in-up animation-delay-300">
                <Button as="link" to="/projects" size="lg">
                  View Projects
                </Button>
                <Button
                  as="a"
                  href="https://www.patreon.com/cw/subcult"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="signal"
                  size="lg"
                >
                  Support on Patreon ↗
                </Button>
              </div>
            </div>
          </div>

          {/* Decorative grid lines */}
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none hidden lg:block">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="hero-grid"
                  x="0"
                  y="0"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#hero-grid)" />
            </svg>
          </div>
        </GlitchFrame>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-signal to-transparent" />
      </section>

      {/* ═══════ MANIFESTO BLOCK ═══════ */}
      <section className="bg-soot torn-edge-bottom">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6">What Is SUBCULT?</h2>
            <p className="text-bone leading-relaxed mb-4">
              We are not a company. We are a signal embedded in the noise of the attention economy —
              a collective of builders, breakers, and broadcasters who refuse to be optimized.
            </p>
            <p className="text-bone leading-relaxed mb-6">
              Every project starts with a question:{' '}
              <em className="text-signal">"Does this need to exist?"</em> If the answer is yes, we
              ship it.
            </p>
            <TerminalPanel title="subcult.status" className="text-left max-w-md mx-auto">
              <div>
                <span className="text-chalk">status: </span>
                <span className="text-static">BROADCASTING</span>
                <br />
                <span className="text-chalk">signal: </span>
                <span className="text-flicker">STRONG</span>
                <br />
                <span className="text-chalk">mission: </span>
                <span className="text-cyan">BUILD // SHIP // REPEAT</span>
              </div>
            </TerminalPanel>
          </div>
        </div>
      </section>

      {/* ═══════ FEATURED PROJECTS ═══════ */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2>
              <span className="text-dust font-mono text-sm mr-3">//</span>
              Projects
            </h2>
            <Link
              to="/projects"
              className="font-mono text-sm text-bone hover:text-signal transition-colors"
            >
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ LATEST POSTS ═══════ */}
      <section className="py-16 md:py-24 bg-soot border-t border-fog">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2>
              <span className="text-dust font-mono text-sm mr-3">//</span>
              Latest Transmissions
            </h2>
            <Link
              to="/zine"
              className="font-mono text-sm text-bone hover:text-signal transition-colors"
            >
              Read the zine →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ PATREON CTA ═══════ */}
      <section className="py-16 md:py-24 border-t border-fog">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-mono text-xs text-dust mb-4">&gt; SIGNAL BOOST REQUESTED</p>
          <h2 className="mb-6">Fund the Signal</h2>
          <p className="text-bone max-w-2xl mx-auto mb-8 leading-relaxed">
            SUBCULT is funded by the people who use what we build. No venture capital. No ads. No
            exit strategy. Your support keeps the servers running and the code shipping.
          </p>
          <Button
            as="a"
            href="https://www.patreon.com/cw/subcult"
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
          >
            Support on Patreon ↗
          </Button>

          <div className="mt-12 max-w-md mx-auto">
            <NewsletterSignup />
          </div>
        </div>
      </section>
    </>
  );
}
