from __future__ import annotations
from app.config.constants import TECHNOLOGIES
from app.prompts.skill_gap_prompt import SKILL_GAP_SYSTEM_PROMPT, build_skill_gap_user_prompt
from app.services.groq_service import run_ai
from app.vectorstore.chroma_db import query_knowledge


def analyze_skill_gap(technology: str, completed_topics: list[str], target_role: str | None) -> dict:
    all_topics = TECHNOLOGIES.get(technology, [])
    context = query_knowledge(f"{technology} learning roadmap topics industry importance")
    prompt = build_skill_gap_user_prompt(technology, completed_topics, all_topics, target_role, context)
    return run_ai(SKILL_GAP_SYSTEM_PROMPT, prompt)
