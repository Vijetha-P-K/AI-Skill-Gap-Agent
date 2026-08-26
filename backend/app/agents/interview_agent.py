from __future__ import annotations
from app.prompts.interview_prompt import (
    INTERVIEW_SYSTEM_PROMPT,
    PROJECTS_SYSTEM_PROMPT,
    build_interview_user_prompt,
    build_projects_user_prompt,
)
from app.services.groq_service import run_ai
from app.vectorstore.chroma_db import query_knowledge


def generate_interview_prep(technology: str, level: str, target_role: str | None) -> dict:
    context = query_knowledge(f"{technology} interview preparation questions {level}")
    prompt = build_interview_user_prompt(technology, level, target_role, context)
    return run_ai(INTERVIEW_SYSTEM_PROMPT, prompt, temperature=0.6)


def recommend_projects(technology: str, level: str) -> dict:
    context = query_knowledge(f"{technology} project recommendations {level}")
    prompt = build_projects_user_prompt(technology, level, context)
    return run_ai(PROJECTS_SYSTEM_PROMPT, prompt, temperature=0.6)
