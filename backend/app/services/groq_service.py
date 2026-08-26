import json
import re

from langchain_core.messages import HumanMessage, SystemMessage
from langchain_groq import ChatGroq

from app.config.settings import settings
from app.utils.logger import logger


def get_llm(temperature: float = 0.4) -> ChatGroq:
    return ChatGroq(
        api_key=settings.GROQ_API_KEY,
        model=settings.GROQ_MODEL,
        temperature=temperature,
    )


def _extract_json(text: str) -> dict:
    text = text.strip()
    if text.startswith("```"):
        text = re.sub(r"^```(?:json)?\s*", "", text)
        text = re.sub(r"\s*```$", "", text)
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        match = re.search(r"\{.*\}", text, re.DOTALL)
        if match:
            return json.loads(match.group(0))
        raise


def run_ai(system_prompt: str, user_prompt: str, temperature: float = 0.4) -> dict:
    """Call the Groq model via LangChain and return the parsed JSON response."""
    llm = get_llm(temperature)
    messages = [SystemMessage(content=system_prompt), HumanMessage(content=user_prompt)]
    response = llm.invoke(messages)
    try:
        return _extract_json(response.content)
    except Exception:
        logger.exception("Failed to parse AI response as JSON")
        return {"raw": response.content}
