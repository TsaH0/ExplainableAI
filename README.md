# Explainable AI - Neural Reasoning Engine

An interactive web application that visualizes the reasoning process of Large Language Models (LLMs) using 3D force-directed graphs. This project provides transparency into how AI models arrive at their conclusions by exposing the logical steps, assumptions, and dependencies in their decision-making process.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/python-3.8+-blue.svg)
![React](https://img.shields.io/badge/react-19.2.0-61dafb.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-latest-009688.svg)

## 🌟 Features

- **3D Interactive Visualization**: Explore AI reasoning paths through an immersive 3D force-directed graph
- **Real-time Reasoning Analysis**: Submit queries and watch the AI's thought process unfold
- **Node Type Classification**: Understand different reasoning steps (assumptions, inferences, calculations, decisions, conclusions)
- **Relationship Mapping**: Visualize dependencies between logical steps with directed edges
- **Confidence Tracking**: View assumptions and confidence notes for each response
- **Modern UI**: Sleek, dark-themed interface with smooth animations and responsive design

## 🏗️ Architecture

### Backend (FastAPI + Google Gemini AI)
- **FastAPI** server handling API requests
- **Google Gemini 2.5 Flash** for AI reasoning generation
- Structured JSON responses with reasoning graphs
- CORS-enabled for cross-origin requests

### Frontend (React + Vite)
- **React 19** with modern hooks and state management
- **Zustand** for lightweight state management
- **React Force Graph 3D** for graph visualization
- **Three.js** for 3D rendering
- **TailwindCSS** for styling
- **Axios** for API communication

## 📋 Prerequisites

- **Python** 3.8 or higher
- **Node.js** 16 or higher
- **npm** or **yarn**
- **Google Gemini API Key** ([Get it here](https://ai.google.dev/))

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ExplainableAI
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Linux/Mac:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file and add your Google Gemini API key
echo "GOOGLE_API_KEY=your_api_key_here" > .env
```

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install
```

### 4. Running the Application

#### Start the Backend Server

```bash
cd backend
source venv/bin/activate  # If not already activated
uvicorn main:app --reload --port 8000
```

The backend API will be available at `http://localhost:8000`

#### Start the Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173` (or another port if 5173 is occupied)

## 🎯 Usage

1. Open your browser and navigate to the frontend URL (typically `http://localhost:5173`)
2. Enter a question or problem in the chat input at the bottom of the screen
3. Press Enter or click Submit
4. Watch as the AI generates a reasoning graph showing its thought process
5. Click on nodes to view detailed information about each reasoning step
6. Explore the 3D graph by:
   - **Dragging**: Rotate the camera view
   - **Scrolling**: Zoom in/out
   - **Clicking nodes**: View detailed information

## 📊 Response Structure

The AI returns structured responses with the following format:

```json
{
  "final_answer": "The conclusion or answer to your query",
  "reasoning_graph": {
    "nodes": [
      {
        "id": "S1",
        "title": "Step title",
        "description": "Detailed description",
        "type": "assumption | inference | calculation | decision | conclusion"
      }
    ],
    "edges": [
      {
        "from": "S1",
        "to": "S2",
        "relation": "depends_on | leads_to | supports | verifies"
      }
    ],
    "adjacency_matrix": {
      "node_order": ["S1", "S2", "S3"],
      "matrix": [[0, 1, 0], [0, 0, 1], [0, 0, 0]]
    }
  },
  "assumptions": ["List of assumptions made"],
  "confidence_notes": "Notes about confidence levels"
}
```

## 🎨 Node Types

The visualization uses different colors to represent different types of reasoning steps:

- 🔴 **Assumption** - Initial premises or given information
- 🔵 **Inference** - Logical deductions from other steps
- 🟡 **Calculation** - Mathematical or computational operations
- 🟣 **Decision** - Choice points in the reasoning process
- 🟢 **Conclusion** - Final results or answers

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern, fast web framework for building APIs
- **Google Gemini AI** - Advanced language model for reasoning
- **Python-dotenv** - Environment variable management
- **Pydantic** - Data validation using Python type annotations

### Frontend
- **React 19** - UI library
- **Vite** - Next-generation frontend tooling
- **TailwindCSS 4** - Utility-first CSS framework
- **Zustand** - State management
- **React Force Graph 3D** - 3D graph visualization
- **Three.js** - 3D graphics library
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications

## 📁 Project Structure

```
ExplainableAI/
├── backend/
│   ├── Models/
│   │   ├── GeminiRequest.py    # Request data models
│   │   └── GeminiResponse.py   # Response data models
│   ├── Routers/
│   │   └── ai.py               # API endpoints
│   ├── Services/
│   │   ├── GeminiService.py    # AI service logic
│   │   └── GeminiProvider.py   # Dependency injection
│   ├── main.py                 # FastAPI application entry point
│   └── requirements.txt        # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── Components/         # React components
│   │   ├── store/              # Zustand state management
│   │   ├── App.jsx             # Main app component
│   │   └── main.jsx            # Entry point
│   ├── package.json            # Node dependencies
│   └── vite.config.js          # Vite configuration
└── README.md
```

## 🔧 Configuration

### Backend Configuration

Create a `.env` file in the `backend` directory:

```env
GOOGLE_API_KEY=your_google_gemini_api_key
```

### Frontend Configuration

The frontend is configured to connect to the backend at `http://localhost:8000`. To change this, update the API base URL in your frontend code.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Google Gemini AI for providing the reasoning capabilities
- The React Force Graph community for the amazing visualization library
- FastAPI for the excellent web framework

## 📧 Contact

For questions or feedback, please open an issue on the GitHub repository.

---

**Note**: This project requires a Google Gemini API key to function. Make sure to obtain one from [Google AI Studio](https://ai.google.dev/) and add it to your `.env` file before running the application.