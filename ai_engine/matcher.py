from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from skill_extractor import extract_skills


def explain_match(resume_skills, job_skills):
    matched_skills = list(set(resume_skills) & set(job_skills))
    missing_skills = list(set(job_skills) - set(resume_skills))

    return {
        "matched_skills": matched_skills,
        "missing_skills": missing_skills
    }


def match_resume_to_jobs(resume_text, resume_skills, jobs):
    """
    jobs = [
      {"id": 1, "description": "..."},
      {"id": 2, "description": "..."}
    ]
    """

    # TF-IDF similarity
    corpus = [resume_text] + [job["description"] for job in jobs]

    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(corpus)

    similarities = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:])[0]

    results = []
    for i, score in enumerate(similarities):
        job_desc = jobs[i]["description"]
        job_skills = extract_skills(job_desc)

        skill_info = explain_match(resume_skills, job_skills)

        results.append({
            "job_id": jobs[i]["id"],
            "match_percentage": round(score * 100, 2),
            "matched_skills": skill_info["matched_skills"],
            "missing_skills": skill_info["missing_skills"]
        })

    return results