# app.py
from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
from PIL import Image
import io

app = Flask(__name__)

# Load your trained model
model = tf.keras.models.load_model('skin_disease_model.h5')
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get image from request
        image_file = request.files['image']
        image = Image.open(io.BytesIO(image_file.read()))
        
        # Preprocess image
        image = image.resize((224, 224))
        image_array = np.array(image) / 255.0
        image_array = np.expand_dims(image_array, axis=0)
        
        # Make prediction
        predictions = model.predict(image_array)
        
        # Process results
        predicted_class = np.argmax(predictions[0])
        confidence = float(predictions[0][predicted_class])
        
        return jsonify({
            'predicted_class': DISEASE_CLASSES[predicted_class],
            'confidence': confidence,
            'all_predictions': predictions[0].tolist()
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)