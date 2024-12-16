import { Newspaper, Sparkles } from 'lucide-react';

interface HeaderProps {
  onShowSubmit: () => void;
}

export function Header({ onShowSubmit }: HeaderProps) {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Newspaper className="text-blue-600" size={32} />
            <h1 className="text-2xl font-bold text-gray-900">FutureTech News</h1>
          </div>
          <button
            onClick={onShowSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Sparkles size={18} />
            Submit Article
          </button>
        </div>
      </div>
    </header>
  );
}