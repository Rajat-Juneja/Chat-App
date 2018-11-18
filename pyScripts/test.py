from pymongo import MongoClient
from bson.objectid import ObjectId
import sys
import json

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

srcPercent = {
  'bbc-sport': 0,
  'espn': 0,
  'fox-sports': 0,
  'espn-cric-info': 0,
  'cnbc': 0,
  'fortune': 0,
  'business-insider': 0,
  'reuters': 0,
  'the-verge': 0,
  'wired': 0,
  'crypto-coins-news': 0,
  'techcrunch': 0,
  'medical-news-today': 0,
  'buzzfeed': 0,
  'ign': 0,
  'mtv-news': 0,
  'mashable': 0,
  'national-geographic': 0,
  'new-scientist': 0,
  'next-big-future': 0
}

user = col.find_one({'_id': ObjectId('5beebabd09e02b394485053d')})
users = list(col.find())

for x in users:
  d = distance(x, user)
  x['similarity'] = 1 / (1 + d)

users.sort(key=sortSimilarity, reverse=True)

for i in range(1,6):
  curr = users[i]
  for j in range(0,6):
    size = len(curr['news'][j]['sources'])
    for k in range(0, size):
      src = curr['news'][j]['sources'][k]['source']
      srcPercent[src] += curr['news'][j]['sources'][k]['count'] * curr['similarity']

print(json.dumps(srcPercent))
sys.stdout.flush()