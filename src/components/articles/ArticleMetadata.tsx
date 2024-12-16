import { MessageSquare } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ArticleMetadataProps {
  author: string;
  timestamp: Date;
  commentCount: number;
}

export function ArticleMetadata({ author, timestamp, commentCount }: ArticleMetadataProps) {
  return (
    <div className="flex items-center text-sm text-gray-500 gap-4">
      <span>Posted by {author}</span>
      <span>{formatDistanceToNow(timestamp)} ago</span>
      <div className="flex items-center gap-1">
        <MessageSquare size={16} />
        <span>{commentCount} comments</span>
      </div>
    </div>
  );
}