import { Search, SlidersHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onShowAdvancedSearch: () => void;
}

export default function Header({ onShowAdvancedSearch }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-xl border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            <Link to="/">CineDB</Link>
          </h1>
          <div className="flex gap-3">
            <button className="px-6 py-2.5 text-sm font-medium text-white bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors duration-200">
              Sign In
            </button>
            <button className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 shadow-lg shadow-blue-500/30">
              Sign Up
            </button>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for movies..."
              className="w-full pl-12 pr-4 py-3.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          <button
            onClick={onShowAdvancedSearch}
            className="px-5 py-3.5 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span className="font-medium">Filters</span>
          </button>
        </div>
      </div>
    </header>
  );
}