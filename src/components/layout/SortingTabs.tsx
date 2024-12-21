import { useState } from 'react';
import { Flame, TrendingUp, MessageSquare } from 'lucide-react';

export type SortOption = 'new' | 'top' | 'controversial';
export type TimeRange = '24h' | 'week' | 'month';

interface SortingTabsProps {
  currentSort: SortOption;
  currentTimeRange: TimeRange;
  onSortChange: (sort: SortOption) => void;
  onTimeRangeChange: (range: TimeRange) => void;
}

export function SortingTabs({
  currentSort,
  currentTimeRange,
  onSortChange,
  onTimeRangeChange,
}: SortingTabsProps) {
  const [showTimeRangeDropdown, setShowTimeRangeDropdown] = useState(false);

  return (
    <nav className="border-b border-gray-200 px-4 py-2">
      <div className="flex items-center gap-6">
        <button
          onClick={() => onSortChange('new')}
          className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
            currentSort === 'new'
              ? 'border-yellow-500 text-yellow-900'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <Flame size={18} />
          New
        </button>

        <div className="relative">
          <button
            onClick={() => {
              onSortChange('top');
              setShowTimeRangeDropdown(!showTimeRangeDropdown);
            }}
            className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
              currentSort === 'top'
                ? 'border-yellow-500 text-yellow-900'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <TrendingUp size={18} />
            Top
            {currentSort === 'top' && (
              <span className="text-sm text-gray-500">
                ({currentTimeRange === '24h' ? '24h' : currentTimeRange})
              </span>
            )}
          </button>

          {currentSort === 'top' && showTimeRangeDropdown && (
            <div className="absolute top-full left-0 mt-1 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
              {(['24h', 'week', 'month'] as TimeRange[]).map((range) => (
                <button
                  key={range}
                  onClick={() => {
                    onTimeRangeChange(range);
                    setShowTimeRangeDropdown(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    currentTimeRange === range
                      ? 'bg-yellow-50 text-yellow-900'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {range === '24h' ? 'Last 24 hours' : `Last ${range}`}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => onSortChange('controversial')}
          className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
            currentSort === 'controversial'
              ? 'border-yellow-500 text-yellow-900'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <MessageSquare size={18} />
          Controversial
        </button>
      </div>
    </nav>
  );
}