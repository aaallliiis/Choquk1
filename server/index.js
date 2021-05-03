const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const auth = require('./modules/auth.js');

const app = express()
app.use(express.urlencoded({
  extended: true
}));
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.post('/api/login', auth.loginValidator, auth.login)
app.post('/api/signup', auth.signupValidator, auth.signup)

app.listen(3000, () => {
  console.log(`Server listening at http://localhost:3000`)
})