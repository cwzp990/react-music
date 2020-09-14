const express = require('express')
const match = require('@nondanee/unblockneteasemusic')
const app = express()

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://www.cwzp990.top'); //当允许携带cookies此处的白名单不能写’*’
  res.header('Access-Control-Allow-Headers', 'content-type,Content-Length, Authorization,Origin,Accept,X-Requested-With'); //允许的请求头
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT'); //允许的请求方法
  res.header('Access-Control-Allow-Credentials', true);  //允许携带cookies
  next();
});

app.get('/netease/getUrl', (req, res) => {
  const id = req.query.id
  if (!id) {
    res.status(200).send({
      code: '00',
      msg: "请传入歌曲对应id～"
    })
    return
  }
  match(id, ['qq', 'kuwo', 'migu']).then(resp => {
    res.status(200).send({
      code: 200,
      url: resp.url
    })
  })
});

const server = app.listen(3030, () => {
  console.log("app listening on port 3030")
})
