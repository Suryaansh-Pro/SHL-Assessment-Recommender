import { TestCase } from '../types';

// Sample queries from PDF Appendix 1
export const testCases: TestCase[] = [
  {
    query: "I am hiring for Java developers who can also collaborate effectively with my business teams. Looking for an assessment(s) that can be completed in 40 minutes.",
    expectedAssessments: [
      "https://www.shl.com/solutions/products/product-catalog/coding/java",
      "https://www.shl.com/solutions/products/product-catalog/collaboration"
    ]
  },
  {
    query: "Looking to hire mid-level professionals who are proficient in Python, SQL and Java Script. Need an assessment package that can test all skills with max duration of 60 minutes.",
    expectedAssessments: [
      "https://www.shl.com/solutions/products/product-catalog/multi-language",
      "https://www.shl.com/solutions/products/product-catalog/coding/python",
      "https://www.shl.com/solutions/products/product-catalog/coding/javascript",
      "https://www.shl.com/solutions/products/product-catalog/coding/sql"
    ]
  },
  {
    query: "I am hiring for an analyst and wants applications to screen using Cognitive and personality tests, what options are available within 45 mins.",
    expectedAssessments: [
      "https://www.shl.com/solutions/products/product-catalog/cognitive",
      "https://www.shl.com/solutions/products/product-catalog/personality",
      "https://www.shl.com/solutions/products/product-catalog/analytical-thinking"
    ]
  },
  {
    query: "Need comprehensive technical assessments for full-stack developers with both technical skills and problem-solving abilities.",
    expectedAssessments: [
      "https://www.shl.com/solutions/products/product-catalog/coding/fullstack",
      "https://www.shl.com/solutions/products/product-catalog/comprehensive-developer",
      "https://www.shl.com/solutions/products/product-catalog/technical-bundle"
    ]
  }
];

// Sample queries for UI dropdown
export const sampleQueries = [
  "I am hiring for Java developers who can also collaborate effectively with my business teams. Looking for an assessment(s) that can be completed in 40 minutes.",
  "Looking to hire mid-level professionals who are proficient in Python, SQL and Java Script. Need an assessment package that can test all skills with max duration of 60 minutes.",
  "I am hiring for an analyst and wants applications to screen using Cognitive and personality tests, what options are available within 45 mins.",
  "Need comprehensive technical assessments for full-stack developers with both technical skills and problem-solving abilities."
];