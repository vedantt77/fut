import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Newspaper, Sparkles } from 'lucide-react';
import { Article, Comment } from './types';
import { ArticleCard } from './components/ArticleCard';
import { SubmitArticle } from './components/SubmitArticle';
import { ArticleModal } from './components/ArticleModal';

// Mock initial data
const initialArticles: Article[] = [
  {
    id: '1',
    title: 'The Future of Artificial Intelligence in 2024',
    url: 'https://example.com/ai-future',
    description: 'An in-depth look at how AI will shape our world in the coming years.',
    votes: 42,
    author: 'TechVisionary',
    timestamp: new Date('2024-03-10T10:00:00'),
    commentCount: 2,
    comments: [
      {
        id: '1',
        articleId: '1',
        author: 'AIEnthusiast',
        content: 'Great article! The potential applications in healthcare are particularly exciting.',
        timestamp: new Date('2024-03-10T12:00:00'),
        votes: 5
      },
      {
        id: '2',
        articleId: '1',
        author: 'FuturistDev',
        content: 'I wonder how this will affect software development in the next few years.',
        timestamp: new Date('2024-03-10T13:30:00'),
        votes: 3
      }
    ]
  },
  {
    id: '2',
    title: 'Breakthrough in Quantum Computing',
    url: 'https://example.com/quantum-breakthrough',
    description: 'Scientists achieve new milestone in quantum computing research.',
    votes: 38,
    author: 'QuantumPioneer',
    timestamp: new Date('2024-03-09T15:30:00'),
    commentCount: 1,
    comments: [
      {
        id: '3',
        articleId: '2',
        author: 'QuantumEnthusiast',
        content: 'This could revolutionize cryptography as we know it!',
        timestamp: new Date('2024-03-09T16:45:00'),
        votes: 7
      }
    ]
  }
];

function App() {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [showSubmit, setShowSubmit] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const handleVote = (id: string, direction: 'up' | 'down') => {
    setArticles(prev =>
      prev.map(article =>
        article.id === id
          ? { ...article, votes: article.votes + (direction === 'up' ? 1 : -1) }
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

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Newspaper className="text-blue-600" size={32} />
              <h1 className="text-2xl font-bold text-gray-900">FutureTech News</h1>
            </div>
            <button
              onClick={() => setShowSubmit(!showSubmit)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Sparkles size={18} />
              Submit Article
            </button>
          </div>
        </div>
      </header>

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

        <div className="space-y-6">
          {articles
            .sort((a, b) => b.votes - a.votes)
            .map(article => (
              <ArticleCard
                key={article.id}
                article={article}
                onVote={handleVote}
                onOpenArticle={setSelectedArticle}
              />
            ))}
        </div>
      </main>

      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          isOpen={!!selectedArticle}
          onClose={() => setSelectedArticle(null)}
          onAddComment={handleAddComment}
          onVoteComment={handleVoteComment}
        />
      )}
    </div>
  );
}

export default App;