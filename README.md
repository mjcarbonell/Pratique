# Pratique Frontend
A modern, immersive 3D web application built with **React**, **Three.js**, and **React Three Fiber**. This frontend provides a real-time conversational interface with an AI-driven agent in a physics-enabled 3D environment.

Credit to: WaWa Sensei for the boilerplate of a React 3D Fiber world. 

## Features
- **3D Interactive Experience:** Fully rendered 3D world using Three.js and React Three Fiber (R3F).
- **Physics-Enabled Interactions:** Real-time collision detection and character movement using **react-three-rapier**.
- **Conversational UI:** Integrated chatbox for interacting with our GPT-driven backend.
- **Dynamic State Management:** Centralized state for game progression, dialogue, and UI alerts using **Zustand**.
- **Responsive 3D Canvas:** Automatically adjusts to different screen sizes and orientations.
## Tech Stack
- **Framework:** [React](https://reactjs.org/) (Vite)
- **3D Graphics:** [Three.js](https://threejs.org/) / [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
- **3D Helpers:** [Drei](https://github.com/pmndrs/drei)
- **Physics Engine:** [Rapier](https://rapier.rs/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **API Communication:** [Axios](https://axios-http.com/)
- **UI Styling:** Vanilla CSS / React Components
## Setup
1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Configuration:**
    Ensure your backend is running at `http://localhost:3000`. You can configure the API endpoint patterns within the application’s state store (`src/store.js`).
## Running the Application
- **Development Mode:**
  ```bash
  npm run dev
  ```
  The application will be available at [http://localhost:5173](http://localhost:5173).
- **Production Build:**
  ```bash
  npm run build
  ```
## Key Components
- **`App.jsx`:** The main entry point, handling the 3D Canvas, KeyboardControls, and global UI layout.
- **`Experience.jsx`:** Orchestrates the 3D scene, lighting, and environmental assets.
- **`Model.jsx`:** Manages the 3D character assets and animations.
- **`store.js`:** The brain of the application, managing global game states, backend communication, and UI updates.
## Deployment
This project is Vite-based and can be deployed easily to platforms like **Vercel**, **Netlify**, or as part of a **Railway** deployment.

