const axios = require("axios");
const { google } = require("googleapis");

require("dotenv").config();

const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
  );

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

async function getUser(req, res) {
    try {
      const url = `https://gmail.googleapis.com/gmail/v1/users/${process.env.CLIENT_MAIL}/profile`;
      const { token } = await oAuth2Client.getAccessToken();
      
      const config = generateConfig(url, token);
      const response = await axios(config);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  async function readMail() {
    const textToSearch = 'Your verification code is: ';
    let verificationCode = '';
    let foundKey = false;
    try {
      const url = `https://gmail.googleapis.com//gmail/v1/users/${process.env.CLIENT_MAIL}/messages/`;
      const { token } = await oAuth2Client.getAccessToken();
      const config = generateConfig(url, token);
      const response = await axios(config);
      let data = await response.data;
      const messages = data.messages
      let lowerLoopValue = Math.min(data.resultSizeEstimate, messages.length, 5);

      let i = 0;
      do {
        let emailBody = await readMailById(messages[i].id);
        let snippet = emailBody.snippet;
        let messagePosition = snippet.indexOf(textToSearch);
        if (messagePosition != -1){
          let startPosition = messagePosition + textToSearch.length;
          let endPosition = messagePosition + textToSearch.length + 6;
          verificationCode = snippet.substring(startPosition, endPosition);
          foundKey = true;
        }
        i = i + 1;
      }
      while (i < lowerLoopValue && foundKey === false);
    } catch (error) {
      console.log(error);
    }
      return verificationCode;
  }

  async function readMailById(messageId) {
    try {
        const url = `https://gmail.googleapis.com//gmail/v1/users/${process.env.CLIENT_MAIL}/messages/${messageId}`;
        const { token } = await oAuth2Client.getAccessToken();
        const config = generateConfig(url, token);
        const response = await axios(config);
        let data = await response.data;
        return data;
    } catch (error) {
        console.log(error);
    }
  }

  const generateConfig = (url, accessToken) => {
    return {
      method: "get",
      url: url,
      headers: {
        Authorization: `Bearer ${accessToken} `,
        "Content-type": "application/json",
      },
    };
  };

  module.exports = { getUser, readMail };
