import React, { useState } from 'react';
import { Search, RefreshCw } from 'lucide-react';
import { sampleQueries } from '../data/testQueries';

interface QueryFormProps {
  onSubmit: (query: string) => void;
  isLoading: boolean;
}

const QueryForm: React.FC<QueryFormProps> = ({ onSubmit, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSubmit(query);
    }
  };

  const handleSampleQuery = (sampleQuery: string) => {
    setQuery(sampleQuery);
    onSubmit(sampleQuery);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Find the Right Assessment</h2>
      
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="relative">
          <textarea
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px] text-gray-700"
            placeholder="Describe the role, skills required, and any time constraints..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="absolute bottom-3 right-3 bg-[#0B3954] text-white p-2 rounded-md hover:bg-[#204E6A] transition-colors flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isLoading || !query.trim()}
          >
            {isLoading ? (
              <RefreshCw className="h-5 w-5 animate-spin" />
            ) : (
              <Search className="h-5 w-5" />
            )}
          </button>
        </div>
      </form>
      
      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-2">Sample Queries:</h3>
        <div className="flex flex-wrap gap-2">
          {sampleQueries.map((sampleQuery, index) => (
            <button
              key={index}
              onClick={() => handleSampleQuery(sampleQuery)}
              className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1 rounded-full transition-colors"
            >
              Sample {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QueryForm;