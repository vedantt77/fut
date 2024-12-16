import { Modal } from './Modal';
import { CommentList } from './CommentList';
import { CommentForm } from './CommentForm';
import { ArticleModalProps } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { ExternalLink } from 'lucide-react';

export function ArticleModal({ article, isOpen, onClose, onAddComment, onVoteComment }: ArticleModalProps) {
  const handleAddComment = (comment: { author: string; content: string }) => {
    onAddComment(article.id, comment);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors flex items-center gap-2"
            >
              {article.title}
              <ExternalLink size={20} />
            </a>
          </h2>
          <div className="text-sm text-gray-500 mb-4">
            <span>Posted by {article.author}</span>
            <span className="mx-2">•</span>
            <span>{formatDistanceToNow(article.timestamp)} ago</span>
          </div>
          <p className="text-gray-700">{article.description}</p>
        </div>

        <div className="border-t border-gray-200 pt-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Comments</h3>
          {article.comments && article.comments.length > 0 ? (
            <CommentList
              comments={article.comments}
              onVoteComment={(commentId, direction) => onVoteComment(article.id, commentId, direction)}
            />
          ) : (
            <p className="text-gray-500 italic">No comments yet. Be the first to comment!</p>
          )}
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold mb-4">Add a Comment</h3>
          <CommentForm onSubmit={handleAddComment} />
        </div>
      </div>
    </Modal>
  );
}