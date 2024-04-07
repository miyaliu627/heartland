import psycopg2

conn = psycopg2.connect(host="localhost", dbname="heartland", user="postgres", password="yuan", port=5432)
conn.autocommit = True

cur = conn.cursor()

def getQuery(q):
    cur.execute(q)
    return cur.fetchall()

def getQueryDict(q):
    cur.execute(q)
    return [dict((cur.description[i][0], value) for i, value in enumerate(row)) for row in cur.fetchall()]

def executeQuery(q):
    cur.execute(q)
    conn.commit()
    return "executed"