//postman used for testing/documentation for backend
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;
const admin = require("firebase-admin");
const serviceAccount = require("./gatormeet-17f79-firebase-adminsdk-ujwcq-28f30968eb.json");
const FieldValue = require("firebase-admin").firestore.FieldValue;

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
    .then((ref) => {
      let temp = []  
      ref.forEach((meeting) => {
          temp.push(meeting.data().Owner)
      });
      res.send(temp)
    });
});

app.post("/meetingLists", (req, res) => {
  const ownerName = req.body.ownerName;
  db.collection("Meetings")
  .where("Owner", "==", ownerName)
  .get()
  .then((data) => {
    let temp = []  
      data.forEach((meeting) => {
          temp.push(meeting.data().Name)
      });
    res.send(temp);
  })
  .catch(() =>
    {
res.send("Owner name not found");
    })
});



//meeting
//owneremail
//user defined question
//unique token # 8 digits
// use json object to transfer data
app.post("/create-poll", (req, res) => {

  let question = req.body.question
  let ownerEmail = req.body.ownerEmail
  let answerOne = req.body.answer1
  let answerTwo = req.body.answer2
  let ID = Math.random().toString(36).substr(2, 8)
 
   db.collection("Meetings")
    .doc(ID)
    .set({ Answer1Text: answerOne, Answer2Text: answerTwo, 
      OwnerEmail:ownerEmail, Question : question, UniqueID: ID, 
      Option1:[], Option2:[], NOTA:[], Total:[]})
    .then(() => {
      res.send("Meeting Created");
    })
    .catch(() => {
      res.send("Meeting Creation Failed");
    });
});

app.post("/postPollChoice", (req, res) => 
{
  const choice = req.body.choice 
  const email = req.body.email
  const ID = req.body.ID

  if (choice == 0) {

    db.collection("Meetings")
      .doc(ID)
      .update({ NOTA: FieldValue.arrayUnion(email) });
  }
  if(choice == 1)
  {
       db.collection("Meetings").doc(ID).get().then((docRef) => {
      let ls = docRef.data().Option1;
      ls.forEach((element) => {
        
      })
      });
      

      db.collection("Meetings")
        .doc(ID)
        .update({ Option1:FieldValue.arrayUnion(email) }).then(() => {
      res.send("Meeting Created");
    })
    .catch(() => {
      res.send("Meeting Creation Failed");
    });
  }
  if(choice == 2)
  {
      db.collection("Meetings").doc(ID).update({Option2 : FieldValue.arrayUnion(email)})
  }
  
   db.collection("Meetings").doc(ID).update({Total: FieldValue.arrayUnion(email)})
   
})


app.listen(port, () => {
    console.log("working")
});
