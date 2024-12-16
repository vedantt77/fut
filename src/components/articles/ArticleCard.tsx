import { Article } from '../../types';
import { ArticleMetadata } from './ArticleMetadata';
import { VoteButton } from './VoteButton';
import { getDomainFromUrl } from '../../utils/url';

interface ArticleCardProps {
  article: Article;
  position: number;
  onVote: (id: string) => void;
  onOpenArticle: (article: Article) => void;
  hasVoted: boolean;
}

export function ArticleCard({ article, position, onVote, onOpenArticle, hasVoted }: ArticleCardProps) {
  const domain = getDomainFromUrl(article.url);

  return (
    <div 
      className="bg-transparent hover:bg-white transition-colors duration-200 p-6 rounded-lg cursor-pointer group"
      onClick={() => onOpenArticle(article)}
    >
      <div className="flex items-start gap-4">
        <div className="flex items-center gap-4">
          <span className="text-base font-medium text-gray-400 w-6 text-right">
            {position}
          </span>
          <VoteButton
            votes={article.votes}
            hasVoted={hasVoted}
            onVote={(e) => {
              e.stopPropagation();
              onVote(article.id);
            }}
          />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                {article.title}
                <span className="text-sm text-gray-400 font-normal">
                  ({domain})
                </span>
              </a>
            </h2>
          </div>
          
          <p className="text-gray-600 mb-3">{article.description}</p>
          <ArticleMetadata
            author={article.author}
            timestamp={article.timestamp}
            commentCount={article.commentCount}
          />
        </div>
      </div>
    </div>
  );
}