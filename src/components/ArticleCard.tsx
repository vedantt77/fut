import { motion } from 'framer-motion';
import { ArrowBigUp, MessageSquare, ExternalLink } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  onVote: (id: string) => void;
  onOpenArticle: (article: Article) => void;
  hasVoted: boolean;
}

export function ArticleCard({ article, onVote, onOpenArticle, hasVoted }: ArticleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onOpenArticle(article)}
    >
      <div className="flex items-start gap-4">
        <div className="flex flex-col items-center space-y-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onVote(article.id);
            }}
            className={`p-1 rounded hover:bg-gray-100 transition-colors ${
              hasVoted ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <ArrowBigUp size={24} />
          </button>
          <span className="font-bold text-lg">{article.votes}</span>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-xl font-semibold hover:text-blue-600 transition-colors">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                {article.title}
                <ExternalLink size={16} className="inline" />
              </a>
            </h2>
          </div>
          
          <p className="text-gray-600 mb-3">{article.description}</p>
          
          <div className="flex items-center text-sm text-gray-500 gap-4">
            <span>Posted by {article.author}</span>
            <span>{formatDistanceToNow(article.timestamp)} ago</span>
            <div className="flex items-center gap-1">
              <MessageSquare size={16} />
              <span>{article.commentCount} comments</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}