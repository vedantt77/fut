import { Hash } from 'lucide-react';

interface HeaderProps {
  onShowSubmit: () => void;
}

export function Header({ onShowSubmit }: HeaderProps) {
  return (
    <header className="bg-[#feed01] shadow-md">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Hash className="text-black-900" size={32} />
            <h1 className="text-2xl font-bold text-black-900">Building In Public</h1>
          </div>
          <button
            onClick={onShowSubmit}
            className="bg-yellow-500 text-yellow-900 px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors"
          >
            Submit Article
          </button>
        </div>
      </div>
    </header>
  );
}