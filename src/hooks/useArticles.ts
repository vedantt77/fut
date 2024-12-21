import { useState, useMemo } from 'react';
import { Article } from '../types';
import { SortOption, TimeRange } from '../components/layout/SortingTabs';

export function useArticles(initialState: Article[]) {
  const [articles, setArticles] = useState<Article[]>(initialState);
  const [currentSort, setCurrentSort] = useState<SortOption>('new');
  const [currentTimeRange, setCurrentTimeRange] = useState<TimeRange>('24h');

  const sortedArticles = useMemo(() => {
    const now = new Date();
    const timeRangeInMs = {
      '24h': 24 * 60 * 60 * 1000,
      'week': 7 * 24 * 60 * 60 * 1000,
      'month': 30 * 24 * 60 * 60 * 1000,
    };

    const filtered = articles.filter(article => {
      if (currentSort === 'new') return true;
      const timeDiff = now.getTime() - new Date(article.timestamp).getTime();
      return timeDiff <= timeRangeInMs[currentTimeRange];
    });

    return filtered.sort((a, b) => {
      switch (currentSort) {
        case 'new':
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        case 'top':
          return b.votes - a.votes;
        case 'controversial':
          return b.commentCount - a.commentCount;
        default:
          return 0;
      }
    });
  }, [articles, currentSort, currentTimeRange]);

  const handleVote = (id: string) => {
    setArticles(prev =>
      prev.map(article =>
        article.id === id
          ? { ...article, votes: article.votes + 1 }
          : article
      )
    );
  };

  const handleAddComment = (articleId: string, comment: { author: string; content: string }) => {
    const newComment = {
      id: Date.now().toString(),
      articleId,
      ...comment,
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
  };

  return {
    articles: sortedArticles,
    currentSort,
    currentTimeRange,
    setCurrentSort,
    setCurrentTimeRange,
    handleVote,
    handleAddComment,
    handleVoteComment,
    handleSubmit
  };
}