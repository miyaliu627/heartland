from flask import Flask,request, make_response
from flask_cors import CORS
import json
import utility
import db

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return 'Hello, Flask!'

@app.route('/createMemory', methods=['POST'])
def createMemory():
    data = request.form
    user_id = data['userId']
    island_name = data['islandName']
    memory_name = data['memoryName']
    memory_date = data['memoryDate']
    entry_detail = data['entryDetail']
    

    # Handling file upload
    artifact = request.files['artifact']
    
    if artifact:
        artifact_filename = artifact.filename  # Or generate a new filename to avoid conflicts
        # Ensure you have configured Azure connection string and container name in your upload utility
        artifact_url = utility.upload(artifact, artifact_filename)
        
        if artifact_url:
            out = utility.createMemory(user_id, island_name, memory_name, memory_date, entry_detail, artifact_url)
            return json.dumps(out, default=str)
        else:
            return json.dumps({"error": "Failed to upload artifact."}), 400
    
    #if there is no artifact
    out = utility.createMemory(user_id, island_name, memory_name, memory_date, entry_detail)
    return json.dumps(out, default=str)


@app.route('/getIsland', methods=['POST'])
def getIsland():
    # Extracting 'userId' and 'islandName' from the POST request body
    data = request.get_json()
    print(data)
    user_id = data['userId']
    island_name = data['islandName']
    
    # Query the database to get all memories for the given user ID and island name
    # The query structure will depend on your database schema
    query = """
    SELECT id as memory_id, memory_name, memory_date, artifact_url, entry_detail
        FROM memories
        WHERE user_id = '{}' AND island_name = '{}' AND archived = FALSE
    """.format(user_id, island_name)
    memories = db.getQueryDict(query)

    # Return the result as a JSON response
    return memories


if __name__ == '__main__':
    app.run(debug=True)