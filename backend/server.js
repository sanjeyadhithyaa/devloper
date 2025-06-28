const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const twilio = require("twilio");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 🔒 Twilio credentials from environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE;

const client = twilio(accountSid, authToken);

// ✅ Endpoint to trigger phone call
app.post("/trigger-call", async (req, res) => {
  const to = req.body.phone;

  try {
    const call = await client.calls.create({
      to: to,
      from: twilioPhone,
      url: "http://demo.twilio.com/docs/voice.xml"
    });

    res.status(200).json({ success: true, sid: call.sid });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 🔊 Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`✅ Backend server is running on port ${port}`);
});
