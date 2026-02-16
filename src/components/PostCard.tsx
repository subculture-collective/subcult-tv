import { Link } from 'react-router-dom';
import type { Post } from '@/types';
import Tag from '@/components/ui/Tag';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link
      to={`/zine/${post.slug}`}
      className="group block bg-ash border border-fog hover:border-scan transition-all duration-200 p-5 no-underline"
    >
      <div className="flex items-start justify-between mb-2">
        <span className="font-mono text-xs text-dust">{post.date}</span>
        <span className="font-mono text-xs text-scan opacity-0 group-hover:opacity-100 transition-opacity">
          READ →
        </span>
      </div>

      <h3 className="font-display text-xl uppercase tracking-wider text-glow group-hover:text-scan transition-colors mb-2">
        {post.title}
      </h3>

      <p className="text-sm text-bone mb-3">{post.excerpt}</p>

      <div className="flex flex-wrap gap-1.5">
        {post.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </Link>
  );
}
