const express = require('express')
const path = require('path')
const app = express()

// 相同路径，相同method，先配置先生效？

// 配置 /index.html, express.static默认get?
app.use(express.static(path.join(__dirname, 'template')))

// ============= Route methods =============
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/', (req, res, next) => {
  res.write('Got a POST request 111')
  next() // pass control to the next handler
})

app.post('/', (req, res) => {
  res.end('Got a POST request 222')
})

app.put('/', (req, res) => {
  res.send('Got a PUT request at /user')
})

app.delete('/', (req, res) => {
  res.send('Got a DELETE request at /user')
})

// app.all(), used to load middleware functions at a path for all HTTP request methods
app.all('/secret', (req, res) => {
  res.send('/secret')
})

// ============= Route paths =============
// Route paths can be strings, string patterns, or regular expressions
// The characters ?, +, *, and () are subsets of their regular expression counterparts
// ------------- string patterns -------------
// This route path will match acd and abcd.
app.get('/ab?cd', (req, res) => {
  res.send('ab?cd')
})

// This route path will match abcd, abbcd, abbbcd, and so on.
app.get('/ab+cd', (req, res) => {
  res.send('ab+cd')
})

// This route path will match abcd, abxcd, abRANDOMcd, ab123cd, and so on.
// 注意：* 与 js 正则中的 * 含义不同，下面匹配 aaab, aaaxb, aaaxxxxb 等
app.get('/ab*cd', (req, res) => {
  res.send('ab*cd')
})

// This route path will match /abe and /abcde.
app.get('/ab(cd)?e', (req, res) => {
  res.send('/ab(cd)?e')
})

// ------------- regular expressions -------------
// This route path will match anything with an “a” in it.
app.get(/a/, (req, res) => {
  res.send('/a/')
})

// This route path will match butterfly and dragonfly, but not butterflyman, dragonflyman, and so on.
app.get(/.*fly$/, (req, res) => {
  res.send('/.*fly$/')
})

// ------------- others -------------
// The hyphen (-) and the dot (.) are interpreted literally by string-based paths
app.get('/a.b-c', (req, res) => {
  res.send('/a.b-c')
})

// If you need to use the dollar character ($) in a path string, enclose it escaped within ([ and ])
app.get('/a([$])', (req, res) => {
  res.send('/a([$])')
})

// ============= Route parameters =============
// The name of route parameters must be made up of “word characters” ([A-Za-z0-9_]).
/**
 * Route path: /users/:userId/books/:bookId
 * Request URL: http://localhost:3000/users/34/books/8989
 * req.params: { "userId": "34", "bookId": "8989" }
 */
app.get('/users/:userId/books/:bookId', (req, res) => {
  res.send(req.params)
})
// Since the hyphen (-) and the dot (.) are interpreted literally, they can be used along with route parameters for useful purposes.
/**
 * Route path: /test/:from-:to
 * Request URL: http://localhost:3000/test/1-2
 * req.params: { "from": "1", "to": "2" }
 */
app.get('/test/:from-:to', (req, res) => {
  res.send(req.params)
})

/**
 * Route path: /test/:from.:to
 * Request URL: http://localhost:3000/test/1.2
 * req.params: { "from": "1", "to": "2" }
 */
app.get('/test/:from.:to', (req, res) => {
  res.send(req.params)
})

// To have more control over the exact string that can be matched by a route parameter, you can append a regular expression in parentheses (()):
/**
 * Route path: /test/:id(\d+)
 * Request URL: http://localhost:3000/test/12
 * req.params: { "id": "2" }
 * TODO: Don't work, why?
 */
app.get('/test/:id(\d+)', (req, res) => {
  res.send(req.params)
})

// ============= Route handlers =============


app.listen(3000, () => {
  console.log('Example app listening on port 3000')
})