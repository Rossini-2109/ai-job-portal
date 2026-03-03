import spacy

nlp = spacy.load("en_core_web_sm")

SKILLS_DB = [
    "python", "java", "sql", "machine learning",
    "deep learning", "flask", "django",
    "data analysis", "nlp", "react", "nodejs"
]

def extract_skills(text):
    text = text.lower()
    found_skills = []

    for skill in SKILLS_DB:
        if skill in text:
            found_skills.append(skill)

    return found_skills