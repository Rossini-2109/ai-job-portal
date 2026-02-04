from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def match_resume_to_jobs(resume_text, jobs):
    """
    jobs = [
      {"id": 1, "description": "..."},
      {"id": 2, "description": "..."}
    ]
    """
    corpus = [resume_text] + [job["description"] for job in jobs]

    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(corpus)

    similarities = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:])[0]

    results = []
    for i, score in enumerate(similarities):
        results.append({
            "job_id": jobs[i]["id"],
            "match_percentage": round(score * 100, 2)
        })

    return results
