import { Article, Comment } from '../types';
import { CommentList } from '../components/CommentList';
import { CommentForm } from '../components/CommentForm';
import { getDomainFromUrl } from '../utils/url';
import { VoteButton } from '../components/articles/VoteButton';
import { formatDistanceToNow } from 'date-fns';
import { ArrowLeft } from 'lucide-react';

interface ArticlePageProps {
  article: Article;
  onClose: () => void;
  onAddComment: (articleId: string, comment: { author: string; content: string }) => void;
  onVoteComment: (articleId: string, commentId: string, direction: 'up' | 'down') => void;
  onVote: (id: string) => void;
  hasVoted: boolean;
}

export function ArticlePage({
  article,
  onClose,
  onAddComment,
  onVoteComment,
  onVote,
  hasVoted
}: ArticlePageProps) {
  const domain = getDomainFromUrl(article.url);

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft size={20} />
            Back to articles
          </button>
          <div className="flex items-start gap-6">
            <VoteButton
              votes={article.votes}
              hasVoted={hasVoted}
              onVote={() => onVote(article.id)}
            />
            <div>
              <h1 className="text-3xl font-bold mb-2">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors"
                >
                  {article.title}
                </a>
              </h1>
              <div className="text-sm text-gray-500 space-x-4">
                <span>Posted by {article.author}</span>
                <span>{formatDistanceToNow(article.timestamp)} ago</span>
                <span className="text-gray-400">({domain})</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <p className="text-lg text-gray-700">{article.description}</p>
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl font-bold">Comments</h2>
          {article.comments && article.comments.length > 0 ? (
            <CommentList
              comments={article.comments}
              onVoteComment={(commentId, direction) => onVoteComment(article.id, commentId, direction)}
            />
          ) : (
            <p className="text-gray-500 italic">No comments yet. Be the first to comment!</p>
          )}
          
          <div className="pt-8 border-t">
            <h3 className="text-xl font-semibold mb-4">Add a Comment</h3>
            <CommentForm onSubmit={(comment) => onAddComment(article.id, comment)} />
          </div>
        </div>
      </main>
    </div>
  );
}