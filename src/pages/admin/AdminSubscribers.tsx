import { useState, useEffect } from 'react';
import { listSubscribers, type APISubscriber, type PaginatedResponse } from '@/lib/api';

export default function AdminSubscribers() {
  const [data, setData] = useState<PaginatedResponse<APISubscriber> | null>(null);
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');

  const load = (p: number) => {
    listSubscribers({ page: p, perPage: 30 })
      .then(setData)
      .catch((err) => setError(err.message));
  };

  useEffect(() => {
    load(page);
  }, [page]);

  return (
    <div>
      <div className="mb-6">
        <p className="font-mono text-xs text-dust mb-1">&gt; SIGNAL ROSTER</p>
        <h1 className="text-2xl">Subscribers</h1>
        {data && (
          <p className="font-mono text-xs text-dust mt-1">
            {data.total} active subscribers · page {data.page}/{data.total_pages || 1}
          </p>
        )}
      </div>

      {error && (
        <div className="mb-4 p-3 bg-ash border border-signal font-mono text-xs text-signal">
          ERR: {error}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-fog text-left font-mono text-xs text-dust uppercase">
              <th className="py-3 px-3">Email</th>
              <th className="py-3 px-3">Confirmed</th>
              <th className="py-3 px-3">Subscribed</th>
            </tr>
          </thead>
          <tbody>
            {data?.data.map((s) => (
              <tr key={s.id} className="border-b border-fog/50 hover:bg-ash transition-colors duration-200">
                <td className="py-3 px-3 font-mono text-sm text-chalk">{s.email}</td>
                <td className="py-3 px-3">
                  <span
                    className={`font-mono text-xs ${s.confirmed ? 'text-static' : 'text-dust'}`}
                  >
                    {s.confirmed ? 'YES' : 'NO'}
                  </span>
                </td>
                <td className="py-3 px-3 font-mono text-xs text-bone">
                  {new Date(s.subscribed_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
            {data?.data.length === 0 && (
              <tr>
                <td colSpan={3} className="py-8 text-center font-mono text-sm text-bone">
                  No subscribers yet. Spread the signal.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {data && data.total_pages > 1 && (
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
            {page} / {data.total_pages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(data.total_pages, p + 1))}
            disabled={page >= data.total_pages}
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
