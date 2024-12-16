import { motion } from 'framer-motion';
import { ArrowBigUp, ArrowBigDown } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Comment } from '../types';

interface CommentListProps {
  comments: Comment[];
  onVoteComment: (commentId: string, direction: 'up' | 'down') => void;
}

export function CommentList({ comments, onVoteComment }: CommentListProps) {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <motion.div
          key={comment.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-50 rounded-lg p-4"
        >
          <div className="flex gap-4">
            <div className="flex flex-col items-center space-y-1">
              <button
                onClick={() => onVoteComment(comment.id, 'up')}
                className="p-1 rounded hover:bg-gray-200 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ArrowBigUp size={20} />
              </button>
              <span className="text-sm font-semibold">{comment.votes}</span>
              <button
                onClick={() => onVoteComment(comment.id, 'down')}
                className="p-1 rounded hover:bg-gray-200 text-gray-600 hover:text-red-600 transition-colors"
              >
                <ArrowBigDown size={20} />
              </button>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <span className="font-medium text-gray-700">{comment.author}</span>
                <span>•</span>
                <span>{formatDistanceToNow(comment.timestamp)} ago</span>
              </div>
              <p className="text-gray-800">{comment.content}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}