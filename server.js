//postman used for testing/documentation for backend
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;
const admin = require("firebase-admin");
const serviceAccount = require("./gatormeet-17f79-firebase-adminsdk-ujwcq-28f30968eb.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

app.use(bodyParser.json()); // for parsing application/json

app.get("", (req, res) => {
  res.send("test");
});

app.get("/test/doAddition", (req, res) => {
  let k = 2 + 4;
  res.send(k.toString());
});

app.post("/test/bby", (req, res) => {
  const i = req.body.i;
  res.send("bby" + i);
});

app.post("/newMeeting", (req, res) => {
  const meetingName = req.body.meetingName;
  const meetingOwner = req.body.meetingOwner;
  db.collection("Meetings")
    .doc()
    .set({ Name: meetingName, Owner: meetingOwner })
    .then(() => {
      res.send("Meeting Created");
    })
    .catch(() => {
      res.send("Meeting Creation Failed");
    });
});

//returns an array of the meeting owner names
app.post("/getMeetings", (req, res) => {
  const meetingName = req.body.meetingName;
  db.collection("Meetings")
    .where("Name", "==", meetingName)
    .get()
    .then((data) => {
      let temp = []  
      data.forEach((meeting) => {
          temp.push(meeting.data().Owner)
      });
      res.send(temp)
    });
});

app.listen(port, () => {
    console.log("working")
});
