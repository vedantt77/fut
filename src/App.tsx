import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Article } from './types';
import { ArticleList } from './components/articles/ArticleList';
import { SubmitArticle } from './components/SubmitArticle';
import { Header } from './components/layout/Header';
import { SortingTabs } from './components/layout/SortingTabs';
import { useVotes } from './hooks/useVotes';
import { ArticlePage } from './pages/ArticlePage';
import { initialArticles } from './data/initialArticles';
import { useArticles } from './hooks/useArticles';

export function App() {
  const [showSubmit, setShowSubmit] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const { toggleVote, hasVoted } = useVotes();
  const {
    articles,
    currentSort,
    currentTimeRange,
    setCurrentSort,
    setCurrentTimeRange,
    handleVote,
    handleAddComment,
    handleVoteComment,
    handleSubmit
  } = useArticles(initialArticles);

  if (selectedArticle) {
    return (
      <ArticlePage
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onAddComment={handleAddComment}
        onVoteComment={handleVoteComment}
        onVote={handleVote}
        hasVoted={hasVoted(selectedArticle.id)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onShowSubmit={() => setShowSubmit(!showSubmit)} />
      
      <div className="bg-gray-100">
        <div className="max-w-4xl mx-auto">
          <SortingTabs
            currentSort={currentSort}
            currentTimeRange={currentTimeRange}
            onSortChange={setCurrentSort}
            onTimeRangeChange={setCurrentTimeRange}
          />
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <AnimatePresence>
          {showSubmit && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <SubmitArticle onSubmit={handleSubmit} />
            </motion.div>
          )}
        </AnimatePresence>

        <ArticleList
          articles={articles}
          onVote={handleVote}
          onOpenArticle={setSelectedArticle}
          hasVoted={hasVoted}
        />
      </main>
    </div>
  );
}