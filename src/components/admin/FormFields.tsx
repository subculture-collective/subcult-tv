import { useId } from 'react';

const inputCls =
  'w-full bg-void border border-fog text-chalk font-mono text-sm px-3 py-2 focus:border-signal outline-none focus-visible:outline-2 focus-visible:outline-signal focus-visible:outline-offset-2 transition-colors duration-200';

export function Field({
  label,
  value,
  onChange,
  required,
  textarea,
  rows,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  textarea?: boolean;
  rows?: number;
  type?: string;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="block font-mono text-xs text-bone uppercase mb-1">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          rows={rows ?? 3}
          className={inputCls + ' resize-y'}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className={inputCls}
        />
      )}
    </div>
  );
}

export function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="block font-mono text-xs text-bone uppercase mb-1">
        {label}
      </label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className={inputCls}>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    active: 'text-static',
    incubating: 'text-flicker',
    archived: 'text-dust',
  };
  return (
    <span className={`font-mono text-xs ${colors[status] || 'text-dust'}`}>
      {status.toUpperCase()}
    </span>
  );
}
