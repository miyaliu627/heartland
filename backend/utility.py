import db
from azure.storage.blob import BlobServiceClient
import uuid
import os


AZURE_CONNECTION_STRING = "DefaultEndpointsProtocol=https;AccountName=heartlandwh24;AccountKey=RkoyI5PYSOXqJtjjs7mBhVKzRZGavYFEzgzzBZ7G3s1eBAN+wmWo2nXSakNcyNQUR6Gw3fHkmCkJ+AStVImgvw==;EndpointSuffix=core.windows.net"
CONTAINER_NAME = "artifacts"

# Create a blob service client
blob_service_client = BlobServiceClient.from_connection_string(conn_str=AZURE_CONNECTION_STRING)
        
# Get the container client
try:
    container_client = blob_service_client.get_container_client(container=CONTAINER_NAME)
    container_client.get_container_properties()
except Exception as e:
    container_client = blob_service_client.create_container(CONTAINER_NAME)

def upload(file_stream, artifact_filename):
    try:
        # Extract the file extension from the original filename
        file_extension = os.path.splitext(artifact_filename)[1]

        # Generate a new filename using UUID and the original file extension
        new_filename = f"{uuid.uuid4()}{file_extension}"
        blob_client = container_client.get_blob_client(new_filename)
        blob_client.upload_blob(file_stream)

        # Assuming public access is set for the container, construct the URL
        blob_url = blob_client.url
        print("uploaded" + new_filename)
        return blob_url
    except Exception as e:
        print(e)
        print("duplicate file?")
    
        
def checkMemoryCount(user_id, island_id):
    query = """
        SELECT COUNT(*) FROM memories
        WHERE user_id = '{}' AND island_id = {} AND archived = FALSE;
    """.format(user_id, island_id)

    result = db.getQuery(query)
    memory_count = result[0][0]  # fetch the count from the result
    return memory_count < 10

def createMemory(user_id, island_id, memory_name, memory_date, entry_detail, artifact_url=''):
    res=db.executeQuery("""insert into memories(user_id, island_id, memory_name, memory_date, artifact_url, entry_detail) 
                              values('{}', {},'{}','{}','{}','{}')""".format(user_id, island_id, memory_name, memory_date, artifact_url, entry_detail))
    return res


