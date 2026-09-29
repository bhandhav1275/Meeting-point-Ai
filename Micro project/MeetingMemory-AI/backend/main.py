from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from memory_service import (
    store_meeting,
    recall_memory,
    prepare_for_meeting
)

# --------------------------------------------------
# FastAPI App
# --------------------------------------------------

app = FastAPI(
    title="MeetingMemory AI",
    description="AI-powered meeting memory assistant",
    version="1.0.0"
)

# --------------------------------------------------
# CORS
# --------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# --------------------------------------------------
# Request Models
# --------------------------------------------------

class MeetingRequest(BaseModel):
    text: str


class QuestionRequest(BaseModel):
    question: str


# --------------------------------------------------
# HOME
# --------------------------------------------------

@app.get("/")
def home():
    return {
        "message": "MeetingMemory AI is running",
        "status": "connected",
        "endpoints": [
            "/meeting",
            "/recall",
            "/prepare"
        ]
    }


# --------------------------------------------------
# SAVE MEETING
# --------------------------------------------------

@app.post("/meeting")
def save_meeting(request: MeetingRequest):

    result = store_meeting(request.text)

    return {
        "success": result.success,
        "message": "Meeting memory stored successfully"
    }


# --------------------------------------------------
# RECALL MEMORY
# --------------------------------------------------

@app.post("/recall")
def recall(request: QuestionRequest):

    result = recall_memory(request.question)

    return {
        "results": [
            {
                "type": item.type,
                "text": item.text
            }
            for item in result.results
        ]
    }


# --------------------------------------------------
# PREPARE FOR MEETING
# --------------------------------------------------

@app.post("/prepare")
def prepare(request: QuestionRequest):

    result = prepare_for_meeting(request.question)

    return {
        "response": result.text
    }