import os
from dotenv import load_dotenv
from hindsight_client import Hindsight

load_dotenv()

client = Hindsight(
    base_url=os.getenv("HINDSIGHT_URL"),
    api_key=os.getenv("HINDSIGHT_API_KEY")
)

BANK_ID = os.getenv("HINDSIGHT_BANK_ID")


def store_meeting(meeting_text):
    return client.retain(
        bank_id=BANK_ID,
        content=meeting_text
    )


def recall_memory(question):
    return client.recall(
        bank_id=BANK_ID,
        query=question,
        max_tokens=2000
    )


def prepare_for_meeting(question):
    return client.reflect(
        bank_id=BANK_ID,
        query=question,
        budget="low",
        max_tokens=1500
    )