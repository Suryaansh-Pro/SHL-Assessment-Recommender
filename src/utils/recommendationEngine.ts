import { Assessment, RecommendedAssessment } from '../types';
import { shlAssessments } from '../data/shlData';

// Simple semantic search implementation
export function getSimilarityScore(query: string, assessment: Assessment): number {
  const queryLower = query.toLowerCase();
  const descriptionLower = assessment.description.toLowerCase();
  const nameLower = assessment.name.toLowerCase();
  const testTypesLower = assessment.testTypes.map(t => t.toLowerCase()).join(' ');
  
  let score = 0;
  
  // Check for test type matches
  assessment.testTypes.forEach(type => {
    if (queryLower.includes(type.toLowerCase())) {
      score += 0.3;
    }
  });
  
  // Check for specific skill mentions
  const skills = ['java', 'python', 'javascript', 'sql', 'coding', 'cognitive', 'personality', 
                 'analytical', 'collaboration', 'leadership', 'full-stack', 'data science'];
  
  skills.forEach(skill => {
    if (queryLower.includes(skill) && 
        (nameLower.includes(skill) || descriptionLower.includes(skill) || testTypesLower.includes(skill))) {
      score += 0.4;
    }
  });
  
  // Check for role matches
  const roles = ['developer', 'analyst', 'engineer', 'professional', 'leader', 'manager'];
  roles.forEach(role => {
    if (queryLower.includes(role) && (descriptionLower.includes(role) || nameLower.includes(role))) {
      score += 0.2;
    }
  });
  
  // Parse duration constraints
  const durationMatch = queryLower.match(/(\d+)\s*min/);
  if (durationMatch) {
    const maxDuration = parseInt(durationMatch[1]);
    if (assessment.duration <= maxDuration) {
      score += 0.1;
    } else {
      score -= 0.2; // Penalize exceeding the duration
    }
  }
  
  // Add general text similarity
  if (descriptionLower.split(' ').some(word => queryLower.includes(word))) {
    score += 0.1;
  }
  
  return Math.min(Math.max(score, 0), 1); // Normalize between 0 and 1
}

export function getRecommendations(query: string, maxResults: number = 10): RecommendedAssessment[] {
  // Score all assessments based on the query
  const scoredAssessments = shlAssessments.map(assessment => {
    const score = getSimilarityScore(query, assessment);
    return { assessment, score };
  });
  
  // Parse duration constraint if present
  let maxDuration = Infinity;
  const durationMatch = query.match(/(\d+)\s*min/);
  if (durationMatch) {
    maxDuration = parseInt(durationMatch[1]);
  }
  
  // Filter by duration if specified
  const filteredAssessments = scoredAssessments.filter(({ assessment }) => 
    assessment.duration <= maxDuration
  );
  
  // Sort by score in descending order
  const sortedAssessments = filteredAssessments.sort((a, b) => b.score - a.score);
  
  // Format the top recommendations according to the required response format
  return sortedAssessments.slice(0, maxResults).map(({ assessment, score }) => ({
    url: assessment.url,
    adaptive_support: assessment.adaptiveSupport ? "Yes" : "No",
    description: assessment.description,
    duration: assessment.duration,
    remote_support: assessment.remoteSupport ? "Yes" : "No",
    test_type: assessment.testTypes,
    name: assessment.name,
    score: score
  }));
}