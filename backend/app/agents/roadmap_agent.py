from __future__ import annotations
from app.config.constants import TECHNOLOGIES
from app.prompts.roadmap_prompt import ROADMAP_SYSTEM_PROMPT, build_roadmap_user_prompt
from app.services.groq_service import run_ai
from app.vectorstore.chroma_db import query_knowledge


def generate_roadmap(technology: str, completed_topics: list[str], target_role: str | None) -> dict:
    all_topics = TECHNOLOGIES.get(technology, [])
    context = query_knowledge(f"{technology} roadmap levels beginner intermediate advanced projects")
    prompt = build_roadmap_user_prompt(technology, completed_topics, all_topics, target_role, context)
    return run_ai(ROADMAP_SYSTEM_PROMPT, prompt)



