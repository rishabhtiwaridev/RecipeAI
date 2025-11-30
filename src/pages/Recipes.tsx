import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, ChefHat, Clock, Users, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Recipe {
  id: string;
  title: string;
  description: string;
  prep_time: string;
  cook_time: string;
  servings: number;
  difficulty: string;
  ingredients: string[];
  instructions: string[];
  tips?: string[];
  nutrition?: {
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
  };
}

const Recipes = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [foodInput, setFoodInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [lastQuery, setLastQuery] = useState("");

  const generateRecipes = async (input: string, isMoreLikeThis = false) => {
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please describe the food you want",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("recipe-generator", {
        body: { foodInput: input },
      });

      if (error) throw error;

      if (data.message) {
        toast({
          title: "Error",
          description: data.message,
          variant: "destructive",
        });
        return;
      }

      const newRecipes = (data.recipes || []).map((recipe: Recipe, index: number) => ({
        ...recipe,
        id: `${Date.now()}-${index}`,
      }));

      if (isMoreLikeThis) {
        setRecipes((prev) => [...prev, ...newRecipes]);
        toast({
          title: "More recipes added!",
          description: `Found ${newRecipes.length} more recipes for you`,
        });
      } else {
        setRecipes(newRecipes);
        setLastQuery(input);
      }

      if (newRecipes.length === 0) {
        toast({
          title: "No recipes found",
          description: "Try describing your food idea differently",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Error generating recipes:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to generate recipes",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleMoreLikeThis = () => {
    const prompt = `More recipes similar to: ${lastQuery}. Give me different variations and ideas based on similar flavors and ingredients.`;
    generateRecipes(prompt, true);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-secondary text-secondary-foreground";
      case "medium":
        return "bg-accent text-accent-foreground";
      case "hard":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Home
            </Button>
            <div className="flex items-center gap-2">
              <ChefHat className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold">RecipeAI</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Section */}
      <section className="border-b bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              What Would You Like to Cook?
            </h1>
            <p className="text-xl text-muted-foreground">
              Describe ingredients, cuisines, or any food idea
            </p>
          </div>

          <Card className="p-6 shadow-[var(--card-shadow)] animate-scale-in">
            <Textarea
              placeholder="Examples:&#10;• 'Italian pasta with garlic and tomatoes'&#10;• 'Healthy chicken dinner under 500 calories'&#10;• 'Quick vegetarian breakfast'&#10;• 'Spicy Asian noodles'"
              value={foodInput}
              onChange={(e) => setFoodInput(e.target.value)}
              className="min-h-[100px] text-lg resize-none mb-4"
              disabled={loading}
            />
            <Button
              onClick={() => generateRecipes(foodInput)}
              disabled={loading}
              size="lg"
              variant="hero"
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating Recipes...
                </>
              ) : (
                <>
                  <ChefHat className="mr-2 h-5 w-5" />
                  Generate Recipes
                </>
              )}
            </Button>
          </Card>
        </div>
      </section>

      {/* Recipes Grid */}
      {recipes.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Your Recipes</h2>
              {lastQuery && (
                <Button
                  variant="outline"
                  onClick={handleMoreLikeThis}
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  More Like This
                </Button>
              )}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe, index) => (
                <Card
                  key={recipe.id}
                  onClick={() => navigate(`/recipe/${encodeURIComponent(recipe.id)}`, { state: { recipe } })}
                  className="overflow-hidden shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] transition-all cursor-pointer hover-scale animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <ChefHat className="w-16 h-16 text-primary/50" />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold flex-1">{recipe.title}</h3>
                      <Badge className={getDifficultyColor(recipe.difficulty)}>
                        {recipe.difficulty}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {recipe.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{recipe.prep_time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{recipe.servings} servings</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button
                variant="outline"
                onClick={() => {
                  setRecipes([]);
                  setFoodInput("");
                  setLastQuery("");
                }}
              >
                Start New Search
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Recipes;