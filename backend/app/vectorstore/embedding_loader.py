"""Seeds the ChromaDB knowledge base with skill roadmaps, project metadata and
interview knowledge used for semantic retrieval before calling the Groq model."""
from app.config.constants import TECHNOLOGIES
from app.utils.logger import logger
from app.vectorstore.chroma_db import get_collection

KNOWLEDGE_DOCS = [
    (
        "roadmap-levels",
        "A complete learning roadmap moves through four levels: Beginner (language "
        "fundamentals, syntax, basic problem solving), Intermediate (core libraries, "
        "data handling, small applications), Advanced (frameworks, databases, APIs, "
        "testing, deployment), and Industry Ready (real-world projects, system design "
        "basics, portfolio, interview preparation).",
    ),
    (
        "project-guidance",
        "Project recommendations should match skill level. Beginners: CLI tools, "
        "calculators, to-do apps, simple games. Intermediate: CRUD web apps, REST APIs, "
        "data dashboards, automation scripts. Advanced: full-stack applications with "
        "authentication, AI-powered apps, real-time systems, deployed cloud projects.",
    ),
    (
        "interview-guidance",
        "Interview preparation should include technical fundamentals, hands-on coding "
        "challenges, HR/behavioral questions using the STAR method, and MCQs covering "
        "core concepts. Difficulty must scale with the candidate's current level.",
    ),
    (
        "resume-guidance",
        "Strong student resumes include: quantified project impact, relevant technical "
        "skills grouped by category, links to GitHub and deployed projects, "
        "certifications, and ATS-friendly formatting with standard section headings.",
    ),
    (
        "industry-importance",
        "Industry-critical skills for freshers: version control with Git, SQL and "
        "database fundamentals, data structures and algorithms, at least one backend or "
        "frontend framework, cloud basics, and the ability to build and explain "
        "end-to-end projects.",
    ),
]


def seed_knowledge_base():
    try:
        collection = get_collection()
        ids, docs = [], []
        for doc_id, text in KNOWLEDGE_DOCS:
            ids.append(doc_id)
            docs.append(text)
        for tech, topics in TECHNOLOGIES.items():
            ids.append(f"topics-{tech}")
            docs.append(
                f"The recommended full topic checklist for {tech}, in learning order: "
                + ", ".join(topics)
                + "."
            )
        existing = set(collection.get(ids=ids).get("ids", []))
        new_ids = [i for i in ids if i not in existing]
        if new_ids:
            new_docs = [docs[ids.index(i)] for i in new_ids]
            collection.add(ids=new_ids, documents=new_docs)
            logger.info("Seeded %d knowledge documents into ChromaDB", len(new_ids))
    except Exception:
        logger.exception("Failed to seed ChromaDB knowledge base")
