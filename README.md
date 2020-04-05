 # Gender defining slackbot
 
### About
 Slackbot app determines gender by uploaded image in chat, using opencv4nodejs and gender caffe model
 
  More about gender_net.caffemodel `https://talhassner.github.io/home/publication/2015_CVPR`
  
  More about slackbot module https://github.com/mishk0/slack-bot-api
 
## Short instruction

 Create bot https://my.slack.com/services/new/bot
 
 Add bot to the slack chanel
 
 Create a .env file from .env.example and change:
 
     SLACK_AUTH_TOKEN
     BOT_NAME
     CHANEL_NAME
 
 `npm install` (this will take some time, because the opencv-build module takes up 1.7 GB)
 
 `npm start`