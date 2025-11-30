# RecipeAI - Your Personal AI Chef 🧑‍🍳

Transform any ingredient or craving into delicious recipes instantly with AI. Get personalized recipes, nutrition info, and cooking tips powered by Gemini AI.

![RecipeAI](https://img.shields.io/badge/AI-Gemini%202.5%20Flash-orange)
![React](https://img.shields.io/badge/React-18.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.x-38bdf8)

## ✨ Features

- **🤖 AI-Powered Generation**: Generate detailed recipes from any food description using Gemini AI
- **📱 Beautiful UI**: Modern SaaS-style design with smooth animations and responsive layout
- **🎯 Smart Recommendations**: "More Like This" feature discovers similar recipes based on your preferences
- **📝 Complete Recipe Details**: 
  - Full ingredient lists
  - Step-by-step instructions
  - Nutrition information
  - Cooking tips and tricks
  - Prep/cook times and difficulty levels
- **🎨 Card-Based Layout**: Clean, organized recipe cards for easy browsing
- **⚡ Instant Results**: Get recipes in seconds, no endless scrolling

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- [Lovable Cloud](https://lovable.dev) account (for backend services)

### Installation

1. Clone the repository:
```bash
git clone <YOUR_GIT_URL>
cd recipeai
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:8080`

## 🛠️ Tech Stack

### Frontend
- **React 18.3** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **React Router** - Navigation
- **Shadcn UI** - Component library

### Backend
- **Lovable Cloud** - Serverless backend platform
- **Edge Functions** - Serverless API endpoints
- **Gemini AI** - Recipe generation (google/gemini-2.5-flash)

## 📁 Project Structure

```
recipeai/
├── src/
│   ├── assets/          # Images and static files
│   ├── components/
│   │   └── ui/          # Reusable UI components (Shadcn)
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   ├── pages/
│   │   ├── Index.tsx    # Landing page
│   │   ├── Recipes.tsx  # Recipe generation & listing
│   │   └── RecipeDetail.tsx  # Individual recipe view
│   └── integrations/
│       └── supabase/    # Backend client configuration
├── supabase/
│   └── functions/
│       └── recipe-generator/  # Edge function for AI recipe generation
└── public/              # Static assets
```

## 🎨 Key Pages

### Landing Page (`/`)
- Hero section with compelling CTA
- Feature showcase
- Modern SaaS design with animations

### Recipes Page (`/recipes`)
- AI-powered recipe search
- Card grid layout
- "More Like This" recommendations
- Difficulty badges and timing info

### Recipe Detail Page (`/recipe/:id`)
- Complete ingredient list
- Step-by-step instructions
- Nutrition facts
- Cooking tips
- Responsive layout with sticky sidebar

## 🤖 AI Integration

The app uses **Gemini 2.5 Flash** through Lovable AI Gateway for:
- Recipe generation from natural language
- Intelligent ingredient parsing
- Nutrition estimation
- Cooking tips generation

### Example Prompts
- "Italian pasta with garlic and tomatoes"
- "Healthy chicken dinner under 500 calories"
- "Quick vegetarian breakfast"
- "Spicy Asian noodles"

## 🎯 How It Works

1. **User Input**: Describe any food, ingredients, or cooking idea
2. **AI Processing**: Gemini AI analyzes the input and generates detailed recipes
3. **Display**: Recipes are shown in beautiful card layouts
4. **Explore More**: Use "More Like This" to discover similar recipes

## 🔧 Configuration

### Environment Variables
All backend configuration is handled automatically by Lovable Cloud:
- `LOVABLE_API_KEY` - Auto-configured for Gemini AI access
- `SUPABASE_URL` - Backend API endpoint
- `SUPABASE_PUBLISHABLE_KEY` - Public API key

### Customization

**Design System** (`src/index.css`):
```css
--primary: 24 95% 53%;        /* Orange */
--secondary: 142 76% 36%;     /* Green */
--accent: 35 100% 50%;        /* Amber */
```

**Animations** (`tailwind.config.ts`):
- Fade-in effects
- Scale animations
- Hover transitions

## 📦 Deployment

### Deploy with Lovable

1. Click the **Publish** button in the Lovable editor
2. Your app will be live at: `https://your-app.lovableproject.com`

### Custom Domain

1. Go to Project Settings → Domains
2. Click "Connect Domain"
3. Follow the DNS configuration steps

[Learn more about custom domains](https://docs.lovable.dev/features/custom-domain)

## 🎨 Design Features

- **Modern SaaS Aesthetic**: Clean, professional design
- **Smooth Animations**: Fade-in, scale, and hover effects
- **Responsive Design**: Mobile-first, works on all devices
- **Card Shadows**: Depth and visual hierarchy
- **Gradient Backgrounds**: Subtle color transitions
- **Typography**: Bold headings with proper hierarchy

## 🔐 API Rate Limits

Lovable AI has usage-based pricing:
- Free tier includes limited AI requests
- Rate limit: 429 error if exceeded
- Top up credits in Settings → Workspace → Usage

## 📚 Resources

- [Lovable Documentation](https://docs.lovable.dev/)
- [Lovable Cloud Features](https://docs.lovable.dev/features/cloud)
- [Lovable AI Features](https://docs.lovable.dev/features/ai)
- [Gemini AI Models](https://ai.google.dev/)

## 🤝 Contributing

This is a personal project. Feel free to fork and customize for your needs!

## 📄 License

MIT License - feel free to use this project as you wish.

## 🙏 Acknowledgments

- Built with [Lovable](https://lovable.dev)
- Powered by [Gemini AI](https://ai.google.dev/)
- UI components from [Shadcn UI](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)

---

**Built with ❤️ using Lovable and Gemini AI**