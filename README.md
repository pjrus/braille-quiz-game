# 🔤 Braille Character Quiz Game

An interactive web-based game for learning and practicing Braille characters. Test your knowledge of Braille letters, numbers, and special symbols through an engaging quiz format.

![Braille Quiz Game](https://img.shields.io/badge/React-18+-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue.svg)
![RxJS](https://img.shields.io/badge/RxJS-7+-purple.svg)
![Vite](https://img.shields.io/badge/Vite-5+-green.svg)

## ✨ Features

### 🎯 Interactive Learning
- **Lowercase Letters**: Practice basic Braille alphabet (a-z)
- **Capital Letters**: Learn capital letter notation with capital sign (⠠)
- **Numbers**: Master numeric Braille with number sign (⠼)
- **Visual Braille Display**: Interactive dot patterns that clearly show active/inactive dots

### 🎮 Game Mechanics
- **Timed Challenges**: 60-second quiz sessions
- **Multiple Choice**: Four options per question
- **Real-time Feedback**: Instant correct/incorrect responses
- **Scoring System**: 10 points per correct answer
- **Streak Tracking**: Monitor consecutive correct answers
- **Statistics**: Track your progress with detailed stats

### 🎨 User Experience
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern UI**: Clean, accessible interface with smooth animations
- **Visual Feedback**: Color-coded responses and progress indicators
- **Educational Context**: Questions clearly indicate letter type (lowercase/capital/number)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/pjrus/braille-quiz-game.git
   cd braille-quiz-game
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## 🌐 Deployment

### Deploy to GitHub Pages (FREE! 🎉)

This project is configured for automatic deployment to GitHub Pages.

#### Option 1: Automatic Deployment (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click `Settings` → `Pages`
   - Under "Source", select `GitHub Actions`
   - The workflow will automatically deploy your app

3. **Access your live app**
   - Your app will be available at: `https://pjrus.github.io/braille-quiz-game`
   - Wait a few minutes for the first deployment to complete

#### Option 2: Manual Deployment

```bash
# Build and deploy manually
npm run deploy
```

### Live Demo
🔗 **[Play the Braille Quiz Game](https://pjrus.github.io/braille-quiz-game)**

### Free Hosting Benefits
✅ **No cost** - GitHub Pages is completely free  
✅ **Custom domain** - Add your own domain if desired  
✅ **SSL/HTTPS** - Secure by default  
✅ **CDN** - Fast global delivery  
✅ **Automatic deploys** - Push to deploy

## 🎲 How to Play

1. **Start the Game**: Click "Start Game" to begin a 60-second session
2. **Read the Pattern**: Observe the Braille dot pattern displayed
3. **Identify the Character**: 
   - Single patterns = lowercase letters
   - Capital sign (⠠) + pattern = capital letters
   - Number sign (⠼) + pattern = numbers
4. **Select Answer**: Choose from four multiple-choice options
5. **Build Streaks**: Get consecutive answers right for higher scores
6. **Track Progress**: Monitor your statistics over multiple games

## 🏗️ Technical Architecture

### Built With
- **React 18+** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **RxJS** - Reactive programming for game state management
- **Vite** - Fast build tool and dev server
- **CSS3** - Custom styling with responsive design

### Key Components

```
src/
├── components/
│   ├── BraillePattern.tsx      # Individual Braille dot display
│   ├── BrailleSequence.tsx     # Multiple pattern display
│   └── GameScreen.tsx          # Main game interface
├── services/
│   └── BrailleGameService.ts   # Game logic with RxJS
├── data/
│   └── brailleData.ts         # Braille character definitions
└── types/
    └── braille.ts             # TypeScript interfaces
```

### State Management
- **RxJS Observables** for reactive state updates
- **BehaviorSubjects** for game state, stats, and timer
- **Local Storage** for persistent statistics

## 🎯 Educational Value

This game teaches authentic Braille notation:

- **Grade 1 Braille**: Basic letter and number patterns
- **Special Signs**: Proper use of capital (⠠) and number (⠼) indicators
- **Pattern Recognition**: Visual-spatial learning of dot arrangements
- **Muscle Memory**: Repeated practice builds familiarity

## 🤝 Contributing

Contributions are welcome! Here are some ways to help:

1. **Report Bugs**: Open an issue with bug details
2. **Feature Requests**: Suggest new educational features
3. **Code Contributions**: Fork, develop, and submit pull requests
4. **Documentation**: Help improve setup and usage docs

### Development Setup

```bash
# Fork and clone your fork
git clone https://github.com/YOUR_USERNAME/braille-quiz-game.git
cd braille-quiz-game

# Install dependencies
npm install

# Create a feature branch
git checkout -b feature/your-feature-name

# Make changes and test
npm run dev

# Run linting
npm run lint

# Build to ensure no errors
npm run build

# Commit and push
git add .
git commit -m "Add your feature"
git push origin feature/your-feature-name
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Braille Standards**: Based on Unified English Braille (UEB) conventions
- **Accessibility Community**: Inspired by the need for Braille education tools
- **React Community**: Built with modern React patterns and best practices

## 📞 Contact

- **GitHub**: [@pjrus](https://github.com/pjrus)
- **Issues**: [Project Issues](https://github.com/pjrus/braille-quiz-game/issues)

---

Made with ❤️ for accessibility education and Braille literacy