# 🧠 MeetingMemory AI

An AI-powered meeting assistant that uses **persistent memory** to store, recall, and reason about information from previous meetings.

## 🚀 Overview

MeetingMemory AI helps teams remember important information discussed during meetings, including:

* Previous discussions
* Decisions
* Team assignments
* Pending tasks
* Project deadlines
* Meeting preparation information

Instead of treating every meeting as a new conversation, the system maintains persistent memory so information from previous meetings can be retrieved when needed.

## ✨ Key Features

### 1. Save Meeting Memory

Users can enter meeting discussions and store them as persistent memories.

### 2. Recall Memory

Users can ask questions about previous meetings, and the system retrieves relevant information from stored memories.

### 3. Prepare for a Meeting

The system uses previously stored meeting information to generate useful preparation information before an upcoming meeting.

### 4. Persistent Memory

Meeting information remains available across different interactions instead of being lost after a single session.

## 🏗️ Architecture

```text
                    ┌─────────────────────┐
                    │   MeetingMemory UI  │
                    │    HTML / CSS / JS  │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │     FastAPI         │
                    │      Backend        │
                    └──────────┬──────────┘
                               │
                ┌──────────────┼──────────────┐
                ▼              ▼              ▼
          /meeting          /recall       /prepare
                │              │              │
                └──────────────┼──────────────┘
                               ▼
                    ┌─────────────────────┐
                    │   Hindsight API     │
                    │ Persistent Memory   │
                    └─────────────────────┘
```

## 🛠️ Technologies Used

* **Python**
* **FastAPI**
* **Hindsight**
* **Hindsight Python Client**
* **Pydantic**
* **HTML**
* **CSS**
* **JavaScript**
* **REST API**

## 📁 Project Structure

```text
MeetingMemory-AI/
│
├── backend/
│   ├── main.py
│   ├── memory_service.py
│   ├── test_hindsight.py
│   ├── requirements.txt
│   └── .env.example
│
├── meetingmemory_ai_ui.html
│
├── .gitignore
│
└── README.md
```

## 🔌 API Endpoints

### Save Meeting

```http
POST /meeting
```

Stores meeting information in persistent memory.

Example:

```json
{
  "text": "Rahul will prepare the frontend demo and Nandini will complete the backend integration."
}
```

### Recall Memory

```http
POST /recall
```

Retrieves relevant information from previous meetings.

Example:

```json
{
  "question": "Who is responsible for the frontend?"
}
```

### Prepare for Meeting

```http
POST /prepare
```

Uses stored memories to prepare information for an upcoming meeting.

Example:

```json
{
  "question": "Prepare me for the next project meeting."
}
```

## ⚙️ Setup

### 1. Create virtual environment

```bash
python -m venv .venv
```

### 2. Activate it

Windows:

```bash
.venv\Scripts\activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure environment variables

Create a `.env` file inside `backend/`:

```env
HINDSIGHT_URL=your_hindsight_url
HINDSIGHT_API_KEY=your_hindsight_api_key
HINDSIGHT_BANK_ID=MeetingMemory
```

**Never upload your real `.env` file or API key to GitHub.**

## ▶️ Run the Backend

From the `backend` directory:

```bash
uvicorn main:app --reload
```

The API will be available at:

```text
http://127.0.0.1:8000
```

Swagger API documentation:

```text
http://127.0.0.1:8000/docs
```

## 🧪 Testing Flow

The recommended demonstration flow is:

```text
1. Save a meeting
       ↓
2. Store information in Hindsight
       ↓
3. Ask a question about the meeting
       ↓
4. Recall stored information
       ↓
5. Prepare for the next meeting
```

### Example

Meeting 1:

> Rahul is responsible for the frontend and Nandini is responsible for the backend integration.

Later, ask:

> Who is responsible for the frontend?

The system can retrieve:

> Rahul is responsible for the frontend.

This demonstrates the persistent-memory capability of MeetingMemory AI.

## 🎯 Use Case

MeetingMemory AI can be useful for:

* Student project teams
* Software development teams
* Hackathon teams
* Organizations
* Project management
* Recurring team meetings

## 🔮 Future Improvements

Potential future features include:

* 🎤 Voice-based meeting input
* 📝 Automatic meeting transcription
* 📄 Automatic meeting summaries
* 📌 Automatic task extraction
* ⏰ Deadline reminders
* 👥 User authentication
* 📊 Meeting analytics
* 📥 Export meeting summaries
* 🔎 Advanced semantic search
* 🌐 Multi-language meeting support

## 👥 Team

**MeetingMemory AI Team**

The system is designed as a collaborative meeting assistant where team members can store and retrieve project discussions, responsibilities, decisions, and upcoming tasks.

## 📌 Project Status

**Prototype completed**

The current prototype demonstrates:

* Persistent meeting memory
* Memory storage
* Memory recall
* Meeting preparation
* FastAPI backend
* Hindsight integration
* Frontend interface
* End-to-end API testing

---

### 🔐 Security Notice

API credentials and environment variables are intentionally excluded from this repository.

Do not commit:

```text
.env
.venv/
```
