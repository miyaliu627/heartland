from flask import Flask,request, make_response
from flask_cors import CORS
import json
import utility

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return 'Hello, Flask!'

@app.route('/createMemory', methods=['POST'])
def createMemory():
    # This assumes you're sending the file along with the other data in a multipart/form-data request
    user_id = request.form['userId']
    island_name = request.form['islandName']
    memory_name = request.form['memoryName']
    memory_date = request.form['memoryDate']
    entry_detail = request.form['entryDetail']
    
    # Handling file upload
    artifact = request.files['artifact']
    artifact_filename = artifact.filename  # Or generate a new filename to avoid conflicts
    # Ensure you have configured Azure connection string and container name in your upload utility
    artifact_url = utility.upload(artifact, artifact_filename)
    
    if artifact_url:
        out = utility.createMemory(user_id, island_name, memory_name, memory_date, artifact_url, entry_detail)
        return json.dumps(out, default=str)
    else:
        return json.dumps({"error": "Failed to upload artifact."}), 400

if __name__ == '__main__':
    app.run(debug=True)