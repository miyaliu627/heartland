import pytest
from app import app 

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_create_memory(client):
    data = {
        'userId': (None, '1'),
        'islandName': (None, 'Test Island'),
        'memoryName': (None, 'Test Memory'),
        'memoryDate': (None, '2023-01-01'),
        'entryDetail': (None, 'This is a test memory detail.'),
        'artifact': open('/Users/mimiyaya/Documents/GitHub/heartland/backend/test.jpg', 'rb')
    }
    response = client.post('/createMemory', data=data)
    assert response.status_code == 200
