from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
from transformers import RobertaTokenizer, RobertaForSequenceClassification
import json
import os
from datetime import datetime
import uuid

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# === ML Model Setup ===
model_dir = "backend/models/roberta_saved_model"
tokenizer = RobertaTokenizer.from_pretrained(model_dir)
model = RobertaForSequenceClassification.from_pretrained(model_dir)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)
model.eval()

def predict_review(text):
    """Predict if a review is fake or real using the trained model"""
    inputs = tokenizer(
        text,
        return_tensors="pt",
        truncation=True,
        padding=True,
        max_length=512
    ).to(device)

    with torch.no_grad():
        logits = model(**inputs).logits
        probs = torch.nn.functional.softmax(logits, dim=-1).squeeze()

    fake, real = probs[0].item(), probs[1].item()
    label = "real" if real > fake else "fake"

    return {
        "prediction": label,
        "confidence": max(real, fake),
        "probabilities": {
            "fake": round(fake, 4),
            "real": round(real, 4)
        }
    }

# === Mock Database (In production, use PostgreSQL/MongoDB) ===
products_db = [
    {
        "id": 1,
        "title": "Electric City Bike",
        "brand": "VoltX",
        "color": "Black/Red",
        "material": "Aluminum",
        "newPrice": "349.89",
        "oldPrice": "1999.99",
        "image": "/assets/bike.jpg",
        "description": "A high-performance electric bike perfect for city commuting. 350W motor, 40-mile range, 21-speed Shimano gears, and disc brakes.",
        "category": "Electric Bikes",
        "sizeOptions": ["M", "L", "XL"],
        "reviews": []
    },
    {
        "id": 2,
        "title": "Comfortable Sofa",
        "brand": "SofaCo",
        "color": "Grey",
        "material": "Leather",
        "newPrice": "599.99",
        "oldPrice": "899.99",
        "image": "/assets/sofa.jpeg",
        "description": "A stylish and super comfortable sofa for your living room. Premium leather, ergonomic design, and easy to clean.",
        "category": "Living Room Furniture",
        "sizeOptions": ["2-seater", "3-seater"],
        "reviews": []
    }
]

reviews_db = []

# === API Endpoints ===

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "message": "API is running"})

@app.route('/api/products', methods=['GET'])
def get_products():
    """Get all products"""
    try:
        return jsonify({
            "success": True,
            "products": products_db,
            "total": len(products_db)
        })
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/api/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    """Get a specific product by ID"""
    try:
        product = next((p for p in products_db if p["id"] == product_id), None)
        if not product:
            return jsonify({"success": False, "error": "Product not found"}), 404
        
        # Get reviews for this product
        product_reviews = [r for r in reviews_db if r["product_id"] == product_id]
        product_with_reviews = {**product, "reviews": product_reviews}
        
        return jsonify({
            "success": True,
            "product": product_with_reviews
        })
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/api/products/<int:product_id>/reviews', methods=['GET'])
def get_product_reviews(product_id):
    """Get all reviews for a specific product"""
    try:
        product_reviews = [r for r in reviews_db if r["product_id"] == product_id]
        return jsonify({
            "success": True,
            "reviews": product_reviews,
            "total": len(product_reviews)
        })
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/api/reviews/predict', methods=['POST'])
def predict_review_endpoint():
    """Predict if a review text is fake or real"""
    try:
        data = request.get_json()
        if not data or 'text' not in data:
            return jsonify({"success": False, "error": "Review text is required"}), 400
        
        review_text = data['text'].strip()
        if not review_text:
            return jsonify({"success": False, "error": "Review text cannot be empty"}), 400
        
        # Make prediction
        prediction_result = predict_review(review_text)
        
        return jsonify({
            "success": True,
            "prediction": prediction_result,
            "text": review_text
        })
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/api/products/<int:product_id>/reviews', methods=['POST'])
def add_review(product_id):
    """Add a new review to a product with fake detection"""
    try:
        data = request.get_json()

        # Validate product exists
        product = next((p for p in products_db if p["id"] == product_id), None)
        if not product:
            return jsonify({"success": False, "error": "Product not found"}), 404

        # Validate required fields
        required_fields = ['author', 'title', 'text', 'rating']
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({"success": False, "error": f"{field} is required"}), 400

        # Validate rating
        try:
            rating = int(data['rating'])
            if rating < 1 or rating > 5:
                return jsonify({"success": False, "error": "Rating must be between 1 and 5"}), 400
        except ValueError:
            return jsonify({"success": False, "error": "Rating must be a number"}), 400

        # Predict if review is fake
        prediction_result = predict_review(data['text'])

        # Create review object
        review = {
            "id": str(uuid.uuid4()),
            "product_id": product_id,
            "author": data['author'],
            "title": data['title'],
            "text": data['text'],
            "rating": rating,
            "date": datetime.now().strftime("%Y-%m-%d"),
            "helpfulCount": 0,
            "notHelpfulCount": 0,
            "ml_prediction": prediction_result,
            "is_flagged": prediction_result["prediction"] == "fake" and prediction_result["confidence"] > 0.7
        }

        # Add to in-memory database
        reviews_db.append(review)

        return jsonify({
            "success": True,
            "review": review,
            "message": "Review added successfully"
        }), 201

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/api/reviews/flagged', methods=['GET'])
def get_flagged_reviews():
    """Get all reviews flagged as potentially fake"""
    try:
        flagged_reviews = [r for r in reviews_db if r.get("is_flagged", False)]
        return jsonify({
            "success": True,
            "flagged_reviews": flagged_reviews,
            "total": len(flagged_reviews)
        })
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/api/admin/reviews/moderate', methods=['POST'])
def moderate_review():
    """Admin endpoint to approve/reject flagged reviews"""
    try:
        data = request.get_json()
        review_id = data.get('review_id')
        action = data.get('action')  # 'approve' or 'reject'
        
        if not review_id or action not in ['approve', 'reject']:
            return jsonify({"success": False, "error": "Invalid parameters"}), 400
        
        # Find review
        review = next((r for r in reviews_db if r["id"] == review_id), None)
        if not review:
            return jsonify({"success": False, "error": "Review not found"}), 404
        
        if action == 'approve':
            review["is_flagged"] = False
            review["admin_approved"] = True
        else:
            # Remove from database
            reviews_db.remove(review)
            return jsonify({
                "success": True,
                "message": "Review rejected and removed"
            })
        
        return jsonify({
            "success": True,
            "review": review,
            "message": f"Review {action}d successfully"
        })
        
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

if __name__ == '__main__':
    print("🚀 Starting Walmart Backend API...")
    print("📊 ML Model loaded successfully")
    print("🌐 API will be available at http://localhost:5000")
    print("📚 Available endpoints:")
    print("  - GET  /api/health")
    print("  - GET  /api/products")
    print("  - GET  /api/products/<id>")
    print("  - GET  /api/products/<id>/reviews")
    print("  - POST /api/products/<id>/reviews")
    print("  - POST /api/reviews/predict")
    print("  - GET  /api/reviews/flagged")
    print("  - POST /api/reviews/<id>/helpful")
    print("  - POST /api/admin/reviews/moderate")
    
    app.run(debug=True, host='0.0.0.0', port=5000)