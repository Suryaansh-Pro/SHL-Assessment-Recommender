export interface Assessment {
  id: string;
  name: string;
  url: string;
  description: string;
  duration: number;
  adaptiveSupport: boolean;
  remoteSupport: boolean;
  testTypes: string[];
}

export interface RecommendationRequest {
  query: string;
}

export interface RecommendationResponse {
  recommended_assessments: RecommendedAssessment[];
}

export interface RecommendedAssessment {
  url: string;
  adaptive_support: string;
  description: string;
  duration: number;
  remote_support: string;
  test_type: string[];
  name: string;
  score?: number;
}

export interface TestCase {
  query: string;
  expectedAssessments: string[];
}

export interface EvaluationMetrics {
  meanRecallAt3: number;
  mapAt3: number;
}