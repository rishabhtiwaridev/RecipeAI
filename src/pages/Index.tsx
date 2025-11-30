import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChefHat, Sparkles, Clock, Heart, Zap } from "lucide-react";
import heroImage from "@/assets/hero-cooking.jpg";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ChefHat className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold">RecipeAI</span>
          </div>
          <Button variant="hero" onClick={() => navigate("/recipes")}>
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Powered by Gemini AI</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Your Personal
                <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  AI Chef
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                Transform any ingredient or craving into delicious recipes instantly. 
                Our AI understands your taste and creates personalized recipes just for you.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  variant="hero"
                  onClick={() => navigate("/recipes")}
                  className="text-lg px-8 py-6 shadow-[var(--card-shadow-hover)] hover:shadow-lg transition-all"
                >
                  Start Cooking
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => {
                    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-lg px-8 py-6"
                >
                  Learn More
                </Button>
              </div>
              
              <div className="flex items-center gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-primary">1M+</div>
                  <div className="text-sm text-muted-foreground">Recipes Generated</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">50K+</div>
                  <div className="text-sm text-muted-foreground">Happy Cooks</div>
                </div>
              </div>
            </div>
            
            <div className="relative animate-scale-in">
              <div className="relative rounded-2xl overflow-hidden shadow-[var(--card-shadow-hover)]">
                <img
                  src={heroImage}
                  alt="Fresh ingredients"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose RecipeAI?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of cooking with AI-powered recipe generation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-8 text-center shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] transition-all hover-scale">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Instant Generation</h3>
              <p className="text-muted-foreground leading-relaxed">
                Get detailed recipes in seconds. Just describe what you want to cook.
              </p>
            </Card>

            <Card className="p-8 text-center shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] transition-all hover-scale">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Personalized</h3>
              <p className="text-muted-foreground leading-relaxed">
                AI learns your preferences and suggests recipes you'll love.
              </p>
            </Card>

            <Card className="p-8 text-center shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] transition-all hover-scale">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Time-Saving</h3>
              <p className="text-muted-foreground leading-relaxed">
                No more endless scrolling. Get exactly what you need, fast.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold">
              Ready to Cook Something Amazing?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of home cooks using AI to discover their next favorite recipe.
            </p>
            <Button
              size="lg"
              variant="hero"
              onClick={() => navigate("/recipes")}
              className="text-lg px-12 py-6 shadow-[var(--card-shadow-hover)] hover:shadow-lg"
            >
              Start Generating Recipes
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 bg-muted/20">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 RecipeAI. Powered by Gemini AI.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;