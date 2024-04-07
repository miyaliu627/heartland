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
    island_id = data['islandId']
    memory_name = data['memoryName']
    memory_date = data['memoryDate']
    entry_detail = data['entryDetail']
    
    # Check if user already has 10 memories for the island
    if not utility.checkMemoryCount(user_id, island_id):
        return json.dumps({"error": "Memory limit reached for this island."}), 400

    # Handling file upload
    artifact = request.files['artifact']
    
    if artifact:
        artifact_filename = artifact.filename  # Or generate a new filename to avoid conflicts
        # Ensure you have configured Azure connection string and container name in your upload utility
        artifact_url = utility.upload(artifact, artifact_filename)
        
        if artifact_url:
            out = utility.createMemory(user_id, island_id, memory_name, memory_date, entry_detail, artifact_url)
            return json.dumps(out, default=str)
        else:
            return json.dumps({"error": "Failed to upload artifact."}), 400
    
    #if there is no artifact
    out = utility.createMemory(user_id, island_id, memory_name, memory_date, entry_detail)
    return json.dumps(out, default=str)


@app.route('/getIsland', methods=['POST'])
def getIsland():
    # Extracting 'userId' and 'islandName' from the POST request body
    data = request.get_json()
    print(data)
    user_id = data['userId']
    island_id = data['islandId']
    
    # Query the database to get all memories for the given user ID and island name
    # The query structure will depend on your database schema
    query = """
    SELECT id as memory_id, memory_name, memory_date, artifact_url, entry_detail
        FROM memories
        WHERE user_id = '{}' AND island_id = {} AND archived = FALSE
    """.format(user_id, island_id)
    memories = db.getQueryDict(query)

    # Return the result as a JSON response
    return memories

@app.route('/archiveMemory', methods=['POST'])
def archive_memory():
    # Extracting 'memory_id' from the POST request body
    data = request.get_json()
   
    memory_id = data['memoryId']
    
    # Prepare the SQL query to update the 'archived' status
    query = """
        UPDATE memories
        SET archived = TRUE
        WHERE id = {};
    """.format(memory_id)
    
    out = db.executeQuery(query)
    return out

@app.route('/getArchived', methods=['POST'])
def getArchived():
    data = request.get_json()
    print(data)
    user_id = data['userId']
    
    # The query structure will depend on your database schema
    query = """
    SELECT id as memory_id, memory_name, memory_date, artifact_url, entry_detail
        FROM memories
        WHERE user_id = '{}' AND archived = TRUE
    """.format(user_id)
    memories = db.getQueryDict(query)

    # Return the result as a JSON response
    return memories

if __name__ == '__main__':
    app.run(debug=True)