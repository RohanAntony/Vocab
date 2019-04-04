# VocabRefresher

Hosted on: [http://rantony.com/vocab](http://rantony.com/vocab/admin)

Application on helping one improve his vocabulary by referring to a list of commonly used words.

- Install NodeJS on server
- Install MongoDB on server
- Checkout this application to a directory
- Create a config.json file with the below fields
`{
  "PORT": 8000,
  "IP": "127.0.0.1",
  "MONGOOSE": {
    "CONNECT_STRING": "<connect string for mongodb like 'mongodb://localhost:27017/test'>"
  }
}`

- Data is stored in the collection 'WordDetail' under the defined DB
