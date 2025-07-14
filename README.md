# 🛡️ RevGuard — Fake Review Detection Backend | Walmart Sparkathon 2025

This is the backend for **RevGuard**, a fake review detection system built using a fine-tuned **RoBERTa transformer model**, submitted as part of **Walmart Sparkathon 2025** under the theme: *Retail Cybersecurity / Customer Trust*.

RevGuard classifies input reviews as **FAKE** or **GENUINE**, and returns a confidence **percentage**, helping users identify potentially deceptive reviews on e-commerce platforms.

---

## 🧠 Model Details

* **Base Model**: `roberta-base` from HuggingFace
* **Architecture**: Binary classifier with `num_labels=2`
* **Output**:

  * `prediction`: FAKE or GENUINE
  * `confidence`: Percentage confidence in prediction
* **Method**:

  * Review → Tokenizer → RoBERTa → Logits → Softmax → Prediction + % confidence

Example:

```json
{
  "prediction": "FAKE",
  "confidence": 92.73
}
```

---

## 📁 Folder Structure

```
backend/
├── app/                      # Backend logic (API script goes here)
│   └── __pycache__/          # Python cache files
├── models/
│   └── roberta_saved_model/  # Fine-tuned RoBERTa model files
fontend/                      # React frontend (typo retained intentionally)
```

---

## 🚀 Running the Project

### 🔧 1. Backend Setup

#### Install dependencies

```bash
pip install -r requirements.txt
```

#### Start the backend server

```bash
python backend/app.py
```


### ⚛️ 2. Frontend Setup (React)

#### Navigate to frontend directory

```bash
cd fontend
```

#### Install packages and start React app

```bash
npm install
npm run dev
```

---

## ⚙️ Tech Stack

* Python
* HuggingFace Transformers (`roberta-base`)
* FastAPI (or Flask if preferred)
* PyTorch
* React (Vite-based)

---

## ☁️ Future Extensions

* Deploy model to Hugging Face / AWS Lambda
* Add multilingual support
* Expand dataset with adversarial/fake samples
* Integrate source/metadata-based validation

---

## 🤝 Done by

**Team Mission Impossible**

---

## 🏆 Submitted to

**Walmart Sparkathon 2025**
Theme: *Customer Trust / Cybersecurity*
Track: *AI for Online Review Reliability*
