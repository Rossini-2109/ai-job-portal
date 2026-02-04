import spacy

nlp = spacy.load("en_core_web_sm")

SKILLS_DB = [
    "python", "java", "sql", "machine learning", "deep learning",
    "flask", "django", "data analysis", "nlp", "react", "nodejs"
]

def extract_skills(resume_text):
    doc = nlp(resume_text)
    found_skills = set()

    for token in doc:
        if token.text in SKILLS_DB:
            found_skills.add(token.text)

    return list(found_skills)

if __name__ == "__main__":
    text = "I have experience in python, sql and machine learning"
    print(extract_skills(text))
