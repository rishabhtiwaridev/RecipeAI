import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { foodInput } = await req.json();
    console.log('Recipe Generation Request:', foodInput);

    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY')!;

    if (!foodInput || foodInput.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'Please provide some food description or ingredients' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Build AI prompt
    const systemPrompt = `You are a creative culinary AI assistant specialized in recipe generation. When users describe any food, ingredients, or cooking idea, provide detailed, practical recipes.

CRITICAL: You MUST respond with ONLY valid JSON. Do not include any text before or after the JSON.

Return recipes in this EXACT JSON format:
{
  "recipes": [
    {
      "title": "Recipe Name",
      "description": "Brief 1-2 sentence description",
      "prep_time": "15 minutes",
      "cook_time": "30 minutes",
      "servings": 4,
      "difficulty": "Easy|Medium|Hard",
      "ingredients": [
        "2 cups flour",
        "1 tsp salt"
      ],
      "instructions": [
        "Step 1: Detailed first step",
        "Step 2: Detailed second step"
      ],
      "tips": [
        "Optional cooking tip 1",
        "Optional cooking tip 2"
      ],
      "nutrition": {
        "calories": "350 per serving",
        "protein": "12g",
        "carbs": "45g",
        "fat": "8g"
      }
    }
  ]
}

Provide 1-3 recipes based on their input. Make them practical and delicious.
IMPORTANT: Return ONLY the JSON object, no other text.`;

    const userPrompt = `User's food idea: "${foodInput}"

Please generate detailed, practical recipes based on this input.`;

    // Call Lovable AI with Gemini
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI API error:', aiResponse.status, errorText);
      
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI service temporarily unavailable. Please try again.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`AI API error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const aiContent = aiData.choices[0].message.content;
    console.log('AI Response received');

    // Parse JSON from AI response
    let recipes;
    try {
      // Try to extract JSON from response
      const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        recipes = JSON.parse(jsonMatch[0]);
      } else {
        recipes = JSON.parse(aiContent);
      }
      
      // Validate response structure
      if (!recipes.recipes || !Array.isArray(recipes.recipes)) {
        console.error('Invalid response structure:', recipes);
        throw new Error('AI response missing recipes array');
      }
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      console.error('Raw AI content:', aiContent);
      
      // Return error message
      return new Response(
        JSON.stringify({ 
          recipes: [],
          message: 'Unable to generate recipes at this time. Please try again with different input.'
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify(recipes),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in recipe-generator function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});