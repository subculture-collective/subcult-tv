import { useState, useEffect, type FormEvent } from 'react';
import { listPosts, createPost, updatePost, deletePost, type APIPost } from '@/lib/api';

type PostForm = Omit<APIPost, 'id' | 'created_at' | 'updated_at'>;

const emptyForm: PostForm = {
  slug: '',
  title: '',
  excerpt: '',
  content: '',
  tags: [],
  published: false,
  date: new Date().toISOString().slice(0, 10),
};

export default function AdminPosts() {
  const [posts, setPosts] = useState<APIPost[]>([]);
  const [editing, setEditing] = useState<APIPost | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<PostForm>(emptyForm);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const load = () => {
    listPosts({ all: true, perPage: 100 })
      .then((res) => setPosts(res.data))
      .catch((err) => setError(err.message));
  };

  useEffect(load, []);

  const openNew = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (p: APIPost) => {
    setEditing(p);
    setForm({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      content: p.content,
      tags: p.tags || [],
      author: p.author,
      published: p.published,
      date: p.date,
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      if (editing) {
        await updatePost(editing.id, form);
      } else {
        await createPost(form);
      }
      setShowForm(false);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this post?')) return;
    try {
      await deletePost(id);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'delete failed');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="font-mono text-xs text-dust mb-1">&gt; TRANSMISSION LOG</p>
          <h1 className="text-2xl">Posts</h1>
        </div>
        <button
          onClick={openNew}
          className="px-4 py-2 bg-signal text-void font-mono text-sm font-bold tracking-wider
                     hover:bg-signal-dim transition-colors duration-200 cursor-pointer"
        >
          + NEW POST
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-ash border border-signal font-mono text-xs text-signal">
          ERR: {error}
        </div>
      )}

      {/* ── Form ────────────────────────────────────────────── */}
      {showForm && (
        <div className="mb-6 bg-soot border border-fog p-6">
          <h2 className="text-lg mb-4">{editing ? 'Edit Post' : 'New Post'}</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label htmlFor="post-slug" className="block font-mono text-xs text-bone uppercase mb-1">Slug</label>
                <input
                  type="text"
                  id="post-slug"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  required
                  className="w-full bg-void border border-fog text-chalk font-mono text-sm px-3 py-2 focus:border-signal outline-none focus-visible:outline-2 focus-visible:outline-signal focus-visible:outline-offset-2"
                />
              </div>
              <div>
                <label htmlFor="post-title" className="block font-mono text-xs text-bone uppercase mb-1">Title</label>
                <input
                  type="text"
                  id="post-title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                  className="w-full bg-void border border-fog text-chalk font-mono text-sm px-3 py-2 focus:border-signal outline-none focus-visible:outline-2 focus-visible:outline-signal focus-visible:outline-offset-2"
                />
              </div>
            </div>
            <div>
              <label htmlFor="post-excerpt" className="block font-mono text-xs text-bone uppercase mb-1">Excerpt</label>
              <textarea
                id="post-excerpt"
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                rows={2}
                className="w-full bg-void border border-fog text-chalk font-mono text-sm px-3 py-2 focus:border-signal outline-none focus-visible:outline-2 focus-visible:outline-signal focus-visible:outline-offset-2 resize-y"
              />
            </div>
            <div>
              <label htmlFor="post-content" className="block font-mono text-xs text-bone uppercase mb-1">
                Content (MDX)
              </label>
              <textarea
                id="post-content"
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                rows={12}
                className="w-full bg-void border border-fog text-chalk font-mono text-sm px-3 py-2 focus:border-signal outline-none focus-visible:outline-2 focus-visible:outline-signal focus-visible:outline-offset-2 resize-y"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label htmlFor="post-date" className="block font-mono text-xs text-bone uppercase mb-1">Date</label>
                <input
                  type="date"
                  id="post-date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full bg-void border border-fog text-chalk font-mono text-sm px-3 py-2 focus:border-signal outline-none focus-visible:outline-2 focus-visible:outline-signal focus-visible:outline-offset-2"
                />
              </div>
              <div>
                <label htmlFor="post-tags" className="block font-mono text-xs text-bone uppercase mb-1">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  id="post-tags"
                  value={(form.tags || []).join(', ')}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      tags: e.target.value
                        .split(',')
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                  className="w-full bg-void border border-fog text-chalk font-mono text-sm px-3 py-2 focus:border-signal outline-none focus-visible:outline-2 focus-visible:outline-signal focus-visible:outline-offset-2"
                />
              </div>
              <div>
                <label htmlFor="post-author" className="block font-mono text-xs text-bone uppercase mb-1">Author</label>
                <input
                  type="text"
                  id="post-author"
                  value={form.author || ''}
                  onChange={(e) => setForm({ ...form, author: e.target.value || undefined })}
                  className="w-full bg-void border border-fog text-chalk font-mono text-sm px-3 py-2 focus:border-signal outline-none focus-visible:outline-2 focus-visible:outline-signal focus-visible:outline-offset-2"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="published"
                checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
                className="accent-signal"
              />
              <label htmlFor="published" className="font-mono text-sm text-chalk">
                Published
              </label>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 bg-signal text-void font-mono text-sm font-bold hover:bg-signal-dim transition-colors duration-200 cursor-pointer disabled:opacity-50"
              >
                {saving ? 'SAVING...' : 'SAVE'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-ash border border-fog text-chalk font-mono text-sm hover:border-dust transition-colors duration-200 cursor-pointer"
              >
                CANCEL
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── Table ───────────────────────────────────────────── */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-fog text-left font-mono text-xs text-dust uppercase">
              <th className="py-3 px-3">Title</th>
              <th className="py-3 px-3">Date</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3">Tags</th>
              <th className="py-3 px-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p.id} className="border-b border-fog/50 hover:bg-ash transition-colors duration-200">
                <td className="py-3 px-3">
                  <div className="text-chalk font-medium">{p.title}</div>
                  <div className="font-mono text-xs text-dust">{p.slug}</div>
                </td>
                <td className="py-3 px-3 font-mono text-xs text-bone">{p.date}</td>
                <td className="py-3 px-3">
                  <span
                    className={`font-mono text-xs ${p.published ? 'text-static' : 'text-dust'}`}
                  >
                    {p.published ? 'LIVE' : 'DRAFT'}
                  </span>
                </td>
                <td className="py-3 px-3">
                  <div className="flex flex-wrap gap-1">
                    {(p.tags || []).map((t) => (
                      <span key={t} className="px-1.5 py-0.5 bg-ash text-dust font-mono text-xs">
                        {t}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-3 px-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEdit(p)}
                      className="font-mono text-xs text-cyan hover:text-glow cursor-pointer"
                    >
                      EDIT
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="font-mono text-xs text-signal hover:text-glow cursor-pointer"
                    >
                      DEL
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center font-mono text-sm text-bone">
                  No posts found. Write your first transmission.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
