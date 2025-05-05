import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/json'
};

// Import assessment data
const shlAssessments = [
  {
    "url": "https://www.shl.com/solutions/products/product-catalog/view/administrative-professional-short-form/",
    "adaptive_support": "Yes",
    "description": "Evaluate administrative and clerical skills for professional roles",
    "duration": 30,
    "remote_support": "Yes",
    "test_type": ["Administrative", "Professional"],
    "name": "Administrative Professional"
  },
  // Additional assessments would be here
];

function getRecommendations(query: string) {
  // Simple implementation for demonstration
  // In production, this would use your full recommendation engine
  return shlAssessments.slice(0, 3).map(assessment => ({
    url: assessment.url,
    adaptive_support: assessment.adaptive_support,
    description: assessment.description,
    duration: assessment.duration,
    remote_support: assessment.remote_support,
    test_type: assessment.test_type,
    name: assessment.name
  }));
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { query } = await req.json();

    if (!query || typeof query !== 'string') {
      throw new Error('Query parameter is required and must be a string');
    }

    const recommendations = getRecommendations(query);

    return new Response(
      JSON.stringify({ recommended_assessments: recommendations }),
      { headers: corsHeaders }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: corsHeaders }
    );
  }
});