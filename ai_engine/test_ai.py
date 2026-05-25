from resume_parser import extract_resume_text
from skill_extractor import extract_skills
from matcher import match_resume_to_jobs, explain_match

# 1️⃣ Extract resume
resume_text = extract_resume_text("sample_resume.pdf")
resume_skills = extract_skills(resume_text)

# 2️⃣ Example jobs
jobs = [
    {"id": 1, "description": "Looking for python sql django developer"},
    {"id": 2, "description": "Looking for java spring mysql developer"}
]

# 3️⃣ Match score
results = match_resume_to_jobs(resume_text, resume_skills, jobs)

# 4️⃣ Add explanation
for r in results:
    job_description = jobs[r["job_id"] - 1]["description"]
    job_skills = extract_skills(job_description)

    explanation = explain_match(resume_skills, job_skills)

    final_output = {
        "job_id": r["job_id"],
        "match": r["match_percentage"],
        "matched_skills": explanation["matched_skills"],
        "missing_skills": explanation["missing_skills"]
    }

    print(final_output)