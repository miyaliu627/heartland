# test_upload.py
import utility

# Open a file in binary mode
with open("/Users/mimiyaya/Documents/GitHub/heartland/backend/test.png", "rb") as file_stream:
    artifact_filename = "test_image.jpg"
    print(utility.upload(file_stream, artifact_filename))