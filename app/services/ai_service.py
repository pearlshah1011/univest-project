import os
from google import genai
from app.core.config import settings
import json

client = genai.Client(
    api_key=settings.GEMINI_API_KEY,
)

def get_summary_and_action_items(title: str, transcript: str) -> dict:
    with open("app/prompts/summary_prompt.txt", "r") as f:
        prompt_template = f.read()

    prompt = prompt_template.format(title=title, transcript=transcript)

    response_schema = {
        "type": "OBJECT",
        "properties": {
            "summary": {"type": "STRING"},
            "action_items": {
                "type": "ARRAY",
                "items": {
                    "type": "OBJECT",
                    "properties": {
                        "description": {"type": "STRING"},
                        "deadline": {"type": "STRING"},
                        "person": {"type": "ARRAY", "items": {"type": "STRING"}},
                    },
                },
            },
        },
    }

    response = client.models.generate_content(
        model=settings.GEMINI_MODEL_NAME,
        contents=prompt,
        config={
            'response_mime_type': 'application/json',
            'response_schema': response_schema
        }
    )

    return json.loads(response.text)
