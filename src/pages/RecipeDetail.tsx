import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Clock, Users, Flame, ChefHat } from "lucide-react";

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

const RecipeDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const recipe = location.state?.recipe as Recipe;

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Recipe not found</h1>
          <Button onClick={() => navigate("/recipes")}>
            Back to Recipes
          </Button>
        </div>
      </div>
    );
  }

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
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => navigate("/recipes")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Recipes
          </Button>
        </div>
      </nav>

      {/* Recipe Header */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 border-b">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="animate-fade-in">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{recipe.title}</h1>
                <p className="text-xl text-muted-foreground mb-6">{recipe.description}</p>
              </div>
              <Badge className={getDifficultyColor(recipe.difficulty) + " text-lg px-4 py-2"}>
                {recipe.difficulty}
              </Badge>
            </div>

            <div className="flex flex-wrap gap-6 text-lg">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Prep</div>
                  <div className="font-semibold">{recipe.prep_time}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <Flame className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Cook</div>
                  <div className="font-semibold">{recipe.cook_time}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Servings</div>
                  <div className="font-semibold">{recipe.servings}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recipe Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Ingredients Sidebar */}
            <div className="md:col-span-1">
              <Card className="p-6 shadow-[var(--card-shadow)] sticky top-24 animate-fade-in">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <ChefHat className="w-6 h-6 text-primary" />
                  Ingredients
                </h2>
                <ul className="space-y-3">
                  {recipe.ingredients.map((ingredient, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            {/* Instructions */}
            <div className="md:col-span-2 space-y-8 animate-fade-in">
              <Card className="p-8 shadow-[var(--card-shadow)]">
                <h2 className="text-2xl font-bold mb-6">Instructions</h2>
                <ol className="space-y-6">
                  {recipe.instructions.map((instruction, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                        {i + 1}
                      </span>
                      <p className="flex-1 pt-1">{instruction}</p>
                    </li>
                  ))}
                </ol>
              </Card>

              {/* Tips */}
              {recipe.tips && recipe.tips.length > 0 && (
                <Card className="p-8 shadow-[var(--card-shadow)]">
                  <h2 className="text-2xl font-bold mb-6">Cooking Tips</h2>
                  <div className="space-y-4">
                    {recipe.tips.map((tip, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 bg-muted/50 p-4 rounded-lg"
                      >
                        <span className="text-2xl">💡</span>
                        <p>{tip}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Nutrition */}
              {recipe.nutrition && (
                <Card className="p-8 shadow-[var(--card-shadow)]">
                  <h2 className="text-2xl font-bold mb-6">Nutrition (per serving)</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold text-primary mb-1">
                        {recipe.nutrition.calories.split(' ')[0]}
                      </div>
                      <div className="text-sm text-muted-foreground">Calories</div>
                    </div>
                    <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold text-secondary mb-1">
                        {recipe.nutrition.protein}
                      </div>
                      <div className="text-sm text-muted-foreground">Protein</div>
                    </div>
                    <div className="bg-gradient-to-br from-accent/10 to-accent/5 p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold text-accent mb-1">
                        {recipe.nutrition.carbs}
                      </div>
                      <div className="text-sm text-muted-foreground">Carbs</div>
                    </div>
                    <div className="bg-gradient-to-br from-muted/50 to-muted/20 p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold mb-1">
                        {recipe.nutrition.fat}
                      </div>
                      <div className="text-sm text-muted-foreground">Fat</div>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </div>

          <div className="text-center mt-12 space-x-4">
            <Button
              variant="hero"
              size="lg"
              onClick={() => navigate("/recipes")}
            >
              Find More Recipes
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RecipeDetail;