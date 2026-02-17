import { useState, type FormEvent } from 'react';
import SEOHead from '@/components/SEOHead';
import Button from '@/components/ui/Button';
import TerminalPanel from '@/components/effects/TerminalPanel';
import { submitContact } from '@/lib/api';

const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    url: 'https://github.com/subculture-collective',
    handle: '@subculture-collective',
  },
  {
    name: 'Patreon',
    url: 'https://www.patreon.com/cw/subcult',
    handle: 'subcult',
  },
  // Placeholders — fill in Content Checklist
  {
    name: 'Twitter',
    url: 'https://twitter.com/subcult_tv',
    handle: '@subcult_tv',
  },
  {
    name: 'Email',
    url: 'mailto:info@subcult.tv',
    handle: 'info@subcult.tv',
  }
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await submitContact({
        name: formData.name,
        email: formData.email,
        subject: formData.subject || undefined,
        message: formData.message,
      });
      setSubmitted(true);
    } catch (err) {
      // Fallback to mailto if API is unavailable
      const mailtoUrl = `mailto:hello@subcult.tv?subject=${encodeURIComponent(
        formData.subject || 'Contact from subcult.tv',
      )}&body=${encodeURIComponent(
        `From: ${formData.name} (${formData.email})\n\n${formData.message}`,
      )}`;
      window.open(mailtoUrl, '_blank');
      setError(
        err instanceof Error ? err.message : 'API unavailable — opened email client instead',
      );
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Contact"
        description="Get in touch with the Subculture Collective. Collaborations, questions, bug reports welcome."
        path="/contact"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="mb-12">
          <p className="font-mono text-xs text-dust mb-3">&gt; ping subcult.tv</p>
          <h1 className="mb-4">Contact</h1>
          <p className="text-bone max-w-2xl">
            Have a question, a collaboration idea, or a bug to report? Open a channel. We respond to
            genuine signals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="mb-6">
              <span className="text-dust font-mono text-sm mr-3">//</span>
              Send a Signal
            </h2>

            {submitted ? (
              <TerminalPanel title="message.sent">
                <div>
                  <span className="text-static">✓ Signal received.</span>
                  <br />
                  <span className="text-chalk">
                    Your message has been transmitted successfully.
                  </span>
                  {error && (
                    <>
                      <br />
                      <span className="text-signal">⚠ {error}</span>
                    </>
                  )}
                  <br />
                  <span className="text-dust"># we'll respond when we can.</span>
                  <br />
                  <span className="text-dust"># no auto-responders. just humans.</span>
                </div>
              </TerminalPanel>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block font-mono text-xs text-dust uppercase mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-soot border border-fog text-chalk font-mono text-sm px-4 py-2.5 focus:border-signal focus:outline-none transition-colors"
                    placeholder="your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block font-mono text-xs text-dust uppercase mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-soot border border-fog text-chalk font-mono text-sm px-4 py-2.5 focus:border-signal focus:outline-none transition-colors"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block font-mono text-xs text-dust uppercase mb-1"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-soot border border-fog text-chalk font-mono text-sm px-4 py-2.5 focus:border-signal focus:outline-none transition-colors"
                    placeholder="what's this about?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block font-mono text-xs text-dust uppercase mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-soot border border-fog text-chalk font-mono text-sm px-4 py-2.5 focus:border-signal focus:outline-none transition-colors resize-y"
                    placeholder="your message..."
                  />
                </div>

                {error && !submitted && (
                  <div role="alert" className="p-3 bg-signal/10 border border-signal text-signal font-mono text-xs">
                    ⚠ {error}
                  </div>
                )}

                <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                  {submitting ? 'Transmitting...' : 'Transmit Message'}
                </Button>

                <p className="font-mono text-xs text-fog text-center mt-2">
                  Your message is sent directly to the collective. We read everything.
                </p>
              </form>
            )}
          </div>

          {/* Social / Direct */}
          <div>
            <h2 className="mb-6">
              <span className="text-dust font-mono text-sm mr-3">//</span>
              Direct Channels
            </h2>

            <div className="space-y-4 mb-8">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target={link.url.startsWith('mailto:') ? undefined : '_blank'}
                  rel={link.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  className="flex items-center justify-between p-4 bg-ash border border-fog hover:border-signal transition-colors no-underline group"
                >
                  <div>
                    <span className="font-mono text-sm text-glow group-hover:text-signal transition-colors">
                      {link.name}
                    </span>
                    <span className="block font-mono text-xs text-dust mt-0.5">{link.handle}</span>
                  </div>
                  <span className="text-dust group-hover:text-signal transition-colors">↗</span>
                </a>
              ))}
            </div>

            <TerminalPanel title="contact.policy">
              <div>
                <span className="text-dust"># how we handle contact:</span>
                <br />
                <span className="text-chalk">response_time: </span>
                <span className="text-flicker">1-5 business days</span>
                <br />
                <span className="text-chalk">auto_reply: </span>
                <span className="text-signal">none</span>
                <br />
                <span className="text-chalk">data_stored: </span>
                <span className="text-static">message only</span>
                <br />
                <span className="text-chalk">tracking: </span>
                <span className="text-static">zero</span>
                <br />
                <br />
                <span className="text-dust"># genuine signals only.</span>
                <br />
                <span className="text-dust"># spam gets /dev/null'd.</span>
              </div>
            </TerminalPanel>
          </div>
        </div>
      </div>
    </>
  );
}
