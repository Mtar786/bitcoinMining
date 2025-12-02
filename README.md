GenesisMiner - Bitcoin Mining Simulator


A React-based educational game that simulates a Bitcoin mining operation.

🚀 Quick Start

1. Prerequisites

Node.js (Version 16 or higher) installed on your computer.

2. Setup

Open your terminal/command prompt and run the following commands to create the project structure using Vite (a fast frontend build tool).

# Create a new project
npm create vite@latest bitcoin-miner -- --template react

# Navigate into the folder
cd bitcoin-miner

# Install dependencies (Tailwind CSS and Lucide Icons)
npm install -D tailwindcss postcss autoprefixer
npm install lucide-react
npx tailwindcss init -p


3. Configure Tailwind

Open the tailwind.config.js file in your project and replace its contents with the code provided in the tailwind.config.js file below.

Add the Tailwind directives to your src/index.css file:

@tailwind base;
@tailwind components;
@tailwind utilities;


4. Add the Game Code

Rename the file mining_simulator.jsx (which I provided earlier) to App.jsx.

Move this App.jsx file into the src/ folder, replacing the existing one.

Important: Ensure the import in src/main.jsx matches. It usually looks like import App from './App.jsx'.

5. Run the App

npm run dev


Open your browser to the URL shown (usually http://localhost:5173).

🎮 How to Play

Mine: Click the big button to earn initial BTC.

Sell: Convert BTC to cash in the Wallet section.

Upgrade: Buy improved hardware from the market to automate mining.

Watch: Observe the simulated hash visualizer and console logs.

🛠️ Built With

React - UI Library

Tailwind CSS - Styling

Lucide React - Icons
