import { motion, AnimatePresence } from 'framer-motion';
import { Article } from '../../types';
import { ArticleCard } from './ArticleCard';

interface ArticleListProps {
  articles: Article[];
  onVote: (id: string) => void;
  onOpenArticle: (article: Article) => void;
  hasVoted: (id: string) => boolean;
}

export function ArticleList({ articles, onVote, onOpenArticle, hasVoted }: ArticleListProps) {
  const sortedArticles = articles.sort((a, b) => b.votes - a.votes);

  return (
    <div className="space-y-1">
      <AnimatePresence>
        {sortedArticles.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ArticleCard
              article={article}
              position={index + 1}
              onVote={onVote}
              onOpenArticle={onOpenArticle}
              hasVoted={hasVoted(article.id)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}