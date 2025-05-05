import { RecommendationRequest, RecommendationResponse } from '../types';
import { getRecommendations } from '../utils/recommendationEngine';

// Health check endpoint
export function healthCheck(): { status: string } {
  return { status: "healthy" };
}

// Recommendation endpoint
export function getRecommendationsFromQuery(request: RecommendationRequest): RecommendationResponse {
  const { query } = request;
  
  if (!query || query.trim() === '') {
    throw new Error('Query cannot be empty');
  }
  
  const recommendedAssessments = getRecommendations(query);
  
  return {
    recommended_assessments: recommendedAssessments
  };
}

// Mock API call for frontend integration
export async function fetchRecommendations(query: string): Promise<RecommendationResponse> {
  // In a real implementation, this would be a fetch to the actual API endpoint
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      resolve(getRecommendationsFromQuery({ query }));
    }, 500);
  });
}

// Mock health check for frontend integration
export async function fetchHealthStatus(): Promise<{ status: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(healthCheck());
    }, 200);
  });
}