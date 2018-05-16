const express = require('express')
const webPush = require('web-push')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()

app.use(bodyParser.json())

const publicVapidKey = 'BFeMUcHVX9UfayJZrgsXcSO5SoownE061_ozvRo9BasiTGFQEVajs_ZOByGcbp4CoiTnupHunTWO8X8SSXiR_Tc';
const privateeVapidKey = 'p8r6mGkcexKOFT3rq1fdjqfS7Wyh5GvNsIezK6TV4-Q';

webPush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateeVapidKey)

// Subscribe Routes
app.post('/subscribe', (req, res) => {
  // Get pushSubscription object
  const subscription = req.body;

  // Send 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({
    title: 'Push Test'
  })

  // Pass object into sendNotification
  webPush.sendNotification(subscription, payload).catch(err => console.log(err));
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`))