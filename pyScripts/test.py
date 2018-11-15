from pymongo import MongoClient
from bson.objectid import ObjectId
import sys

def distance(obj, user):
  dist = 0
  for x in range(6):
    diff = (obj['news'][x]['count'] - user['news'][x]['count'])**2
    dist += diff
  return dist**0.5

def sortSimilarity(val):
  return val['similarity']

client = MongoClient('mongodb://localhost:27017/')

db = client['minor-news-app']
col = db['users']

user = col.find_one({'_id': ObjectId('5be0242e4057e069601ee58d')})
users = list(col.find())

for x in users:
  d = distance(x, user)
  x['similarity'] = 1 / (1 + d)

users.sort(key=sortSimilarity, reverse=True)

print(users[0:5])
sys.stdout.flush()