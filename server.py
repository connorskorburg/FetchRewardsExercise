from flask import Flask, request, jsonify, make_response
import requests

# initialize flask app
app = Flask(__name__)


@app.route('/')
def getData():
  # fetch data from url given
  r = requests.get('https://fetch-hiring.s3.amazonaws.com/hiring.json')
  # return data in json format
  r = r.json()
  response = make_response(jsonify(r))
  # CORS Access-control-allow-origin is blocked by default, so allow allow browsers to fetch the data
  response.headers['Access-Control-Allow-Origin'] = '*'
  return response


# server running on port 5000 (python server.py)
if __name__ == "__main__":
  app.run(debug=True)