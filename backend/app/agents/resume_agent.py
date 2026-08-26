from __future__ import annotations
from app.prompts.resume_prompt import RESUME_SYSTEM_PROMPT, build_resume_user_prompt
from app.services.groq_service import run_ai
from app.vectorstore.chroma_db import query_knowledge


def analyze_resume(resume_text: str, target_role: str | None) -> dict:
    context = query_knowledge(f"resume review ATS best practices for {target_role or 'fresher'}")
    prompt = build_resume_user_prompt(resume_text, target_role, context)
    return run_ai(RESUME_SYSTEM_PROMPT, prompt)

