import * as dotenv from 'dotenv'
dotenv.config()
const app = require('./server')

app.listen(3001, () => {
    console.log('3001')
})