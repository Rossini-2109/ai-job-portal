from pdfminer.high_level import extract_text
import re

def extract_resume_text(pdf_path):
    text = extract_text(pdf_path)
    
    # clean text
    text = text.lower()
    text = re.sub(r'[^a-zA-Z\s]', ' ', text)
    text = re.sub(r'\s+', ' ', text)

    return text.strip()

if __name__ == "__main__":
    resume_text = extract_resume_text(r"C:\Users\micr0\OneDrive\Desktop\project\ai-job-portal\ai_engine\sample_resume.pdf")

    print(resume_text[:500])
