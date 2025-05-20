# Worthy.ai MVP

Worthy.ai is a minimal platform designed to provide quick, valuable insights to **job seekers** and **companies** evaluating job offers and candidates. This MVP focuses on delivering fast, high-level analysis using curated and public data sources.

---

## 🔍 Features

### For Job Seekers (Candidates)

**Inputs:**
- Company Name
- Offered Position
- Offered Salary (Optional)
- Experience Required
- Skills Asked

**Outputs:**
- **Estimated Salary Range**  
  Based on curated datasets for similar roles.
- **Work Culture Snippets**  
  Extracted from platforms like Glassdoor to show work-life balance and growth.
- **Review Link**  
  Directs to the company’s review page.
- **Worth It Analysis**  
  Compares offer vs market data + fit analysis → returns: `"Worth It"` or `"Not Worth It"`.

---

### For Companies (Employers)

**Inputs:**
- Resume Text (copy-paste or upload)
- GitHub Profile Link (optional)
- LinkedIn Profile Link (optional)

**Outputs:**
- **Skills & Technologies Summary**  
  Parsed from resume, GitHub, LinkedIn.
- **Salary Suggestion**  
  Estimated salary range based on candidate’s skill and experience.
- **Candidate Strength Analysis**  
  Based on online activity: `"Strong"`, `"Average"`, or `"Needs Review"`.

---

## 🧠 Technical Overview

### Frontend
- Job Seeker Interface: Form fields + outputs
- Company Interface: Resume & profile fields + outputs

### Backend
- Shared core with API endpoints and salary dataset
- **Job Seeker Logic**: Salary lookup, culture scraping, offer-worth analysis
- **Company Logic**: Resume parsing, skill mapping, strength scoring from GitHub/LinkedIn

---

## ⚙️ Scope and Constraints

- No advanced ML/NLP in MVP
- Uses only public or easily scrapable data
- Fast performance prioritized over deep analysis

---

## ✅ MVP Goals

- Help **job seekers** assess if an offer is fair and aligned with their profile.
- Enable **employers** to quickly assess a candidate’s fit.

---

## 📌 Project Status

> 💡 MVP focused on validating the concept. Further features and depth will follow in later versions.

