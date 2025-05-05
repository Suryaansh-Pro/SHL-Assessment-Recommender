import { TestCase } from '../types';
import { getRecommendations } from './recommendationEngine';

// Calculate recall@k for a single query
export function calculateRecallAtK(testCase: TestCase, k: number): number {
  const recommendations = getRecommendations(testCase.query, k);
  const recommendedUrls = recommendations.map(rec => rec.url);
  
  // Count how many expected assessments are in the recommendations
  const relevantFound = testCase.expectedAssessments.filter(url => 
    recommendedUrls.includes(url)
  ).length;
  
  return relevantFound / testCase.expectedAssessments.length;
}

// Calculate precision@k for a single query
export function calculatePrecisionAtK(testCase: TestCase, k: number): number {
  const recommendations = getRecommendations(testCase.query, k);
  const recommendedUrls = recommendations.map(rec => rec.url);
  
  // Count how many recommendations are in the expected list
  const relevantFound = recommendedUrls.filter(url => 
    testCase.expectedAssessments.includes(url)
  ).length;
  
  return recommendedUrls.length > 0 ? relevantFound / recommendedUrls.length : 0;
}

// Calculate average precision for a single query
export function calculateAveragePrecision(testCase: TestCase, k: number): number {
  const recommendations = getRecommendations(testCase.query, k);
  const recommendedUrls = recommendations.map(rec => rec.url);
  
  let relevantCount = 0;
  let sum = 0;
  
  for (let i = 0; i < recommendedUrls.length; i++) {
    const isRelevant = testCase.expectedAssessments.includes(recommendedUrls[i]);
    if (isRelevant) {
      relevantCount++;
      sum += relevantCount / (i + 1); // Precision at current position
    }
  }
  
  return testCase.expectedAssessments.length > 0 
    ? sum / testCase.expectedAssessments.length 
    : 0;
}

// Calculate Mean Recall@k across all test cases
export function calculateMeanRecallAtK(testCases: TestCase[], k: number): number {
  if (testCases.length === 0) return 0;
  
  const recalls = testCases.map(testCase => calculateRecallAtK(testCase, k));
  return recalls.reduce((sum, recall) => sum + recall, 0) / testCases.length;
}

// Calculate Mean Average Precision (MAP@k) across all test cases
export function calculateMAPAtK(testCases: TestCase[], k: number): number {
  if (testCases.length === 0) return 0;
  
  const aps = testCases.map(testCase => calculateAveragePrecision(testCase, k));
  return aps.reduce((sum, ap) => sum + ap, 0) / testCases.length;
}

export function evaluateSystem(testCases: TestCase[]): { meanRecallAt3: number, mapAt3: number } {
  return {
    meanRecallAt3: calculateMeanRecallAtK(testCases, 3),
    mapAt3: calculateMAPAtK(testCases, 3)
  };
}