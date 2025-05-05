import React, { useState } from 'react';
import { RecommendedAssessment } from '../types';
import { Clock, Check, X, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

interface ResultsDisplayProps {
  results: RecommendedAssessment[];
  isLoading: boolean;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, isLoading }) => {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleExpand = (url: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [url]: !prev[url]
    }));
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0B3954]"></div>
          <span className="ml-3 text-gray-600">Finding the best assessments...</span>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-500 text-center py-8">
          No recommendations yet. Enter a query to get assessment recommendations.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Recommended Assessments</h2>
      <div className="space-y-4">
        {results.map((assessment, index) => (
          <div 
            key={assessment.url}
            className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md"
          >
            <div className="bg-gray-50 p-4 flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">{assessment.name}</h3>
                <div className="flex items-center mt-1 text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{assessment.duration} minutes</span>
                  
                  <span className="mx-2">•</span>
                  
                  <span className={`flex items-center ${assessment.remote_support === "Yes" ? "text-green-600" : "text-gray-400"}`}>
                    {assessment.remote_support === "Yes" ? (
                      <Check className="h-4 w-4 mr-1" />
                    ) : (
                      <X className="h-4 w-4 mr-1" />
                    )}
                    Remote
                  </span>
                  
                  <span className="mx-2">•</span>
                  
                  <span className={`flex items-center ${assessment.adaptive_support === "Yes" ? "text-green-600" : "text-gray-400"}`}>
                    {assessment.adaptive_support === "Yes" ? (
                      <Check className="h-4 w-4 mr-1" />
                    ) : (
                      <X className="h-4 w-4 mr-1" />
                    )}
                    Adaptive
                  </span>
                </div>
              </div>
              <button
                onClick={() => toggleExpand(assessment.url)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                {expandedItems[assessment.url] ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
            </div>
            
            <div 
              className={`overflow-hidden transition-all duration-300 ${
                expandedItems[assessment.url] ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <div className="p-4 border-t border-gray-200">
                <p className="text-gray-600 mb-3">{assessment.description}</p>
                
                <h4 className="text-sm font-medium text-gray-700 mb-2">Test Types:</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {assessment.test_type.map((type, i) => (
                    <span 
                      key={i}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {type}
                    </span>
                  ))}
                </div>
                
                <a 
                  href={assessment.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-[#FF6B35] hover:text-[#E55A2B] transition-colors"
                >
                  <span>View Assessment Details</span>
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsDisplay;