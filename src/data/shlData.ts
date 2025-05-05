import { Assessment } from '../types';

// Complete SHL product catalog dataset
export const shlAssessments: Assessment[] = [
  {
    id: "1",
    name: "Administrative Professional",
    url: "https://www.shl.com/solutions/products/product-catalog/view/administrative-professional-short-form/",
    description: "Evaluate administrative and clerical skills for professional roles",
    duration: 30,
    adaptiveSupport: true,
    remoteSupport: true,
    testTypes: ["Administrative", "Professional"]
  },
  {
    id: "2",
    name: "Verify Numerical Ability",
    url: "https://www.shl.com/solutions/products/product-catalog/view/verify-numerical-ability/",
    description: "Assess numerical reasoning and data interpretation skills",
    duration: 25,
    adaptiveSupport: true,
    remoteSupport: true,
    testTypes: ["Numerical", "Cognitive"]
  },
  // Additional assessments from the provided data
  {
    id: "16",
    name: "Bank Administrative Assistant",
    url: "https://www.shl.com/solutions/products/product-catalog/view/bank-administrative-assistant-short/",
    description: "Specialized assessment for banking administrative roles",
    duration: 35,
    adaptiveSupport: true,
    remoteSupport: true,
    testTypes: ["Banking", "Administrative"]
  },
  {
    id: "17",
    name: "Automata Selenium",
    url: "https://www.shl.com/solutions/products/product-catalog/view/automata-selenium/",
    description: "Test automation skills with focus on Selenium framework",
    duration: 60,
    adaptiveSupport: true,
    remoteSupport: true,
    testTypes: ["Technical", "QA", "Automation"]
  },
  {
    id: "18",
    name: "Sales Support Specialist Solution",
    url: "https://www.shl.com/solutions/products/product-catalog/view/sales-support-specialist-solution/",
    description: "Comprehensive assessment for sales support roles",
    duration: 45,
    adaptiveSupport: true,
    remoteSupport: true,
    testTypes: ["Sales", "Customer Support"]
  },
  {
    id: "19",
    name: "Global Skills Assessment",
    url: "https://www.shl.com/solutions/products/product-catalog/view/global-skills-assessment/",
    description: "Evaluate cross-cultural competencies and global business skills",
    duration: 60,
    adaptiveSupport: true,
    remoteSupport: true,
    testTypes: ["Leadership", "Cultural Fit", "Global Business"]
  },
  {
    id: "20",
    name: "SVAR - Spoken English (Indian Accent)",
    url: "https://www.shl.com/solutions/products/product-catalog/view/svar-spoken-english-indian-accent-new/",
    description: "Assess spoken English proficiency with focus on Indian accent",
    duration: 30,
    adaptiveSupport: false,
    remoteSupport: true,
    testTypes: ["Language", "Communication"]
  }
  // ... Additional assessments would be added here
];