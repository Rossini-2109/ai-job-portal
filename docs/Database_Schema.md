## Database Schema

### users
- id (PK)
- name
- email
- password
- role (job_seeker/recruiter)

### recruiters
- id (PK)
- user_id (FK)
- company_name

### jobs
- id (PK)
- recruiter_id (FK)
- title
- description
- skills

### resumes
- id (PK)
- user_id (FK)
- resume_text

### applications
- id (PK)
- job_id (FK)
- user_id (FK)
- match_score
