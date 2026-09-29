import os
import asyncio
from dotenv import load_dotenv
from hindsight_client import Hindsight

load_dotenv()

async def main():
    h = Hindsight(
        base_url=os.getenv("HINDSIGHT_URL"),
        api_key=os.getenv("HINDSIGHT_API_KEY")
    )

    banks = await h.banks.list_banks()

    print("BANKS:")
    print(banks)

    await h.aclose()

asyncio.run(main())