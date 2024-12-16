import { ArrowBigUp } from 'lucide-react';

interface VoteButtonProps {
  votes: number;
  hasVoted: boolean;
  onVote: (e: React.MouseEvent) => void;
}

export function VoteButton({ votes, hasVoted, onVote }: VoteButtonProps) {
  return (
    <div className="flex flex-col items-center space-y-2">
      <button
        onClick={onVote}
        className={`p-1 rounded hover:bg-gray-100 transition-colors ${
          hasVoted ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
        }`}
      >
        <ArrowBigUp size={24} />
      </button>
      <span className="font-bold text-lg">{votes}</span>
    </div>
  );
}