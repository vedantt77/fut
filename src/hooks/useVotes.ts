import { useState, useEffect } from 'react';

interface VoteState {
  [articleId: string]: boolean;
}

export function useVotes() {
  const [userVotes, setUserVotes] = useState<VoteState>(() => {
    const saved = localStorage.getItem('userVotes');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('userVotes', JSON.stringify(userVotes));
  }, [userVotes]);

  const toggleVote = (articleId: string) => {
    setUserVotes(prev => ({
      ...prev,
      [articleId]: !prev[articleId]
    }));
    return !userVotes[articleId];
  };

  const hasVoted = (articleId: string) => {
    return userVotes[articleId] || false;
  };

  return { toggleVote, hasVoted };
}