import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Article, Comment } from './types';
import { ArticleList } from './components/articles/ArticleList';
import { SubmitArticle } from './components/SubmitArticle';
import { Header } from './components/layout/Header';
import { useVotes } from './hooks/useVotes';
import { ArticlePage } from './pages/ArticlePage';
import { initialArticles } from './data/initialArticles';

export function App() {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [showSubmit, setShowSubmit] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const { toggleVote, hasVoted } = useVotes();

  const handleVote = (id: string) => {
    const isVoting = toggleVote(id);
    setArticles(prev =>
      prev.map(article =>
        article.id === id
          ? { ...article, votes: article.votes + (isVoting ? 1 : -1) }
          : article
      )
    );
  };

  const handleSubmit = (articleData: { title: string; url: string; description: string }) => {
    const newArticle: Article = {
      id: Date.now().toString(),
      ...articleData,
      votes: 0,
      author: 'Anonymous',
      timestamp: new Date(),
      commentCount: 0,
      comments: []
    };
    setArticles(prev => [newArticle, ...prev]);
    setShowSubmit(false);
  };

  const handleAddComment = (articleId: string, commentData: { author: string; content: string }) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      articleId,
      ...commentData,
      timestamp: new Date(),
      votes: 0
    };

    setArticles(prev =>
      prev.map(article =>
        article.id === articleId
          ? {
              ...article,
              commentCount: article.commentCount + 1,
              comments: [...(article.comments || []), newComment]
            }
          : article
      )
    );
  };

  const handleVoteComment = (articleId: string, commentId: string, direction: 'up' | 'down') => {
    setArticles(prev =>
      prev.map(article =>
        article.id === articleId
          ? {
              ...article,
              comments: article.comments?.map(comment =>
                comment.id === commentId
                  ? { ...comment, votes: comment.votes + (direction === 'up' ? 1 : -1) }
                  : comment
              )
            }
          : article
      )
    );
  };

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