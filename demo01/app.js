const express = require('express')
const path = require('path')
const app = express()

// 相同路径，相同method，先配置先生效？

// 配置 /index.html 默认get?
app.use(express.static(path.join(__dirname, 'template')))

// 配置 / get
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/', (req, res) => {
  res.send('Got a POST request')
})

app.put('/', (req, res) => {
  res.send('Got a PUT request at /user')
})

app.delete('/', (req, res) => {
  res.send('Got a DELETE request at /user')
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000')
})