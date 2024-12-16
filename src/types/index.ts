export interface Article {
  id: string;
  title: string;
  url: string;
  description: string;
  votes: number;
  author: string;
  timestamp: Date;
  commentCount: number;
  comments?: Comment[];
}

export interface Comment {
  id: string;
  articleId: string;
  author: string;
  content: string;
  timestamp: Date;
  votes: number;
}

export interface ArticleModalProps {
  article: Article;
  isOpen: boolean;
  onClose: () => void;
  onAddComment: (articleId: string, comment: Omit<Comment, 'id' | 'articleId' | 'timestamp' | 'votes'>) => void;
  onVoteComment: (articleId: string, commentId: string, direction: 'up' | 'down') => void;
}