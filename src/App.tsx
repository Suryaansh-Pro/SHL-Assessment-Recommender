import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import QueryForm from './components/QueryForm';
import ResultsDisplay from './components/ResultsDisplay';
import EvaluationMetrics from './components/EvaluationMetrics';
import { RecommendedAssessment } from './types';
import { fetchRecommendations, fetchHealthStatus } from './api/endpoints';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<RecommendedAssessment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState<string>('');

  useEffect(() => {
    // Check API health on component mount
    const checkHealth = async () => {
      try {
        const response = await fetchHealthStatus();
        setApiStatus(response.status);
      } catch (error) {
        setApiStatus('error');
      }
    };
    
    checkHealth();
  }, []);

  const handleSubmit = async (submittedQuery: string) => {
    setQuery(submittedQuery);
    setIsLoading(true);
    
    try {
      const response = await fetchRecommendations(submittedQuery);
      setResults(response.recommended_assessments);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      // Handle error state
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <QueryForm onSubmit={handleSubmit} isLoading={isLoading} />
              <ResultsDisplay results={results} isLoading={isLoading} />
            </div>
            
            <div className="md:col-span-1">
              <EvaluationMetrics />
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">How It Works</h2>
                <div className="space-y-3 text-sm text-gray-600">
                  <p>
                    This system uses a hybrid recommendation approach combining semantic search, 
                    constraint parsing, and ranking algorithms to find the most suitable SHL assessments.
                  </p>
                  <p>
                    Simply describe the role, required skills, and any time constraints, and 
                    we'll recommend the most appropriate assessments from the SHL catalog.
                  </p>
                  <p>
                    Results are evaluated using industry-standard metrics:
                    <ul className="list-disc list-inside mt-2 ml-2">
                      <li>Mean Recall@3</li>
                      <li>Mean Average Precision (MAP@3)</li>
                    </ul>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-[#0B3954] text-white py-4 mt-12">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>SHL Assessment Recommendation System © 2025</p>
        </div>
      </footer>
    </div>
  );
}

export default App;