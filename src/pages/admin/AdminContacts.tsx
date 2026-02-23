import { useState, useEffect } from 'react';
import {
  listContacts,
  toggleContactRead,
  deleteContact,
  type APIContact,
  type PaginatedResponse,
} from '@/lib/api';

export default function AdminContacts() {
  const [contactsPage, setContactsPage] = useState<PaginatedResponse<APIContact> | null>(null);
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');

  const load = (p: number) => {
    listContacts({ page: p, perPage: 20 })
      .then(setContactsPage)
      .catch((err) => setError(err.message));
  };

  useEffect(() => {
    load(page);
  }, [page]);

  const handleToggleRead = async (id: string) => {
    try {
      await toggleContactRead(id);
      load(page);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'failed');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this message?')) return;
    try {
      await deleteContact(id);
      load(page);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'failed');
    }
  };

  return (
    <div>
      <div className="mb-6">
        <p className="font-mono text-xs text-dust mb-1">&gt; INCOMING SIGNALS</p>
        <h1 className="text-2xl">Contact Submissions</h1>
        {contactsPage && (
          <p className="font-mono text-xs text-dust mt-1">
            {contactsPage.total} total · page {contactsPage.page}/{contactsPage.total_pages}
          </p>
        )}
      </div>

      {error && (
        <div className="mb-4 p-3 bg-ash border border-signal font-mono text-xs text-signal">
          ERR: {error}
        </div>
      )}

      <div className="space-y-3">
        {contactsPage?.data.map((c) => (
          <div
            key={c.id}
            className={`bg-soot border p-4 transition-colors ${
              c.read ? 'border-fog/50' : 'border-signal'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  {!c.read && <span className="w-2 h-2 rounded-full bg-signal shrink-0" />}
                  <span className="font-mono text-sm text-chalk font-medium">{c.name}</span>
                  <span className="font-mono text-xs text-dust">{c.email}</span>
                </div>
                {c.subject && (
                  <div className="font-mono text-xs text-bone mb-2">RE: {c.subject}</div>
                )}
                <p className="text-sm text-chalk/80 whitespace-pre-wrap leading-relaxed">
                  {c.message}
                </p>
                <div className="mt-2 font-mono text-xs text-dust">
                  {new Date(c.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => handleToggleRead(c.id)}
                  className="font-mono text-xs text-cyan hover:text-glow cursor-pointer"
                >
                  {c.read ? 'UNREAD' : 'READ'}
                </button>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="font-mono text-xs text-signal hover:text-glow cursor-pointer"
                >
                  DEL
                </button>
              </div>
            </div>
          </div>
        ))}

        {contactsPage?.data.length === 0 && (
          <div className="py-12 text-center font-mono text-sm text-bone">
            No incoming signals. Inbox zero.
          </div>
        )}
      </div>

      {/* Pagination */}
      {contactsPage && contactsPage.total_pages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="px-3 py-1 bg-ash border border-fog font-mono text-xs text-chalk
                       hover:border-signal transition-colors duration-200 cursor-pointer disabled:opacity-30"
          >
            ← PREV
          </button>
          <span className="px-3 py-1 font-mono text-xs text-dust">
            {page} / {contactsPage.total_pages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(contactsPage.total_pages, p + 1))}
            disabled={page >= contactsPage.total_pages}
            className="px-3 py-1 bg-ash border border-fog font-mono text-xs text-chalk
                       hover:border-signal transition-colors duration-200 cursor-pointer disabled:opacity-30"
          >
            NEXT →
          </button>
        </div>
      )}
    </div>
  );
}
