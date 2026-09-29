import os
from dotenv import load_dotenv
from hindsight_client import Hindsight

load_dotenv()

client = Hindsight(
    base_url=os.getenv("HINDSIGHT_URL"),
    api_key=os.getenv("HINDSIGHT_API_KEY")
)

bank = os.getenv("HINDSIGHT_BANK_ID")

print("================================")
print("MEETINGMEMORY AI")
print("================================")

# 1. Store meeting memory
print("\n1. Storing meeting memory...")

meeting = """
Project meeting on September 28, 2026.

Team discussed the MeetingMemory AI project.
The team decided to build a meeting assistant that remembers
previous discussions, decisions and pending tasks.

Nandini will complete the backend integration.
Rahul will prepare the frontend demo.
The team will demonstrate the project tomorrow.

Important decision:
The system should use persistent memory so that information
from previous meetings can be recalled later.
"""

result = client.retain(
    bank_id=bank,
    content=meeting,
    context="Meeting discussion"
)

print("Memory stored!")
print(result)

# 2. Recall memory
print("\n2. Recalling meeting memory...")

answer = client.recall(
    bank_id=bank,
    query="What did the team decide about the MeetingMemory AI project?"
)

print("\nRECALL RESULT:")
print(answer)

client.close()