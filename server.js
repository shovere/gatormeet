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
// Create new entries into the database
function newMeeting()
{
  // include one of the three methods to trigger this function in the front end code
  // https://stackoverflow.com/questions/1947263/using-an-html-button-to-call-a-javascript-function
  // ^^ 3 ways to trigger function execution when button pressed


  // Add a new document in collection "meeting"
  // https://firebase.google.com/docs/firestore/manage-data/add-data
  const data = {
    // How to get values from drop down
    // https://stackoverflow.com/questions/4029281/get-drop-down-value
    MeetingName: document.getElementById("DROPDOWNMENU").value,
    OwnerEmail: document.getElementById("DROPDOWNMENU").value,
    FirstName: document.getElementById("DROPDOWNMENU").value,
    LastName: document.getElementById("DROPDOWNMENU").value,
    UniqueToken: document.getElementById("DROPDOWNMENU").value,
  }
  const res = await db.collection("Meetings").doc(TOKEN).set(data);
}
// my second time at a commit
function goToMeeting()
{
 // https://stackoverflow.com/questions/55777601/how-to-append-an-element-into-array-inside-a-firestore-document
 // How to append to an array
}
function pollResult()
{
    //https://firebase.google.com/docs/firestore/manage-data/add-data
  // ^^ How to increment data, ctrl+F increment article section

  const admin = require('firebase-admin');
  const meetingsRef = db.collection('Meetings').doc(TOKEN).set(data);
  if(document.getElementById("someButton").value == true)
  {
    const res = await meetingsRef.update(
    {yesResult : admin.firestore.FieldValue.increment(1)});
  }
  else
  {
    const res = await meetingsRef.update(
    {yesResult : admin.firestore.FieldValue.increment(1)});
  }
 
}

// Generate unique 8 digit ID with node.js - SHOULD use an already built function to ensure uniqueness
var crypto = require('crypto');
function generateUniqueToken()
{
  // https://firebase.google.com/docs/firestore/query-data/queries
  // ^^ guide to simple queries in js for google firestore
  var token = randomHexValue(8);
  const meetingsRef = db.collection('Meetings')
  const queryResult = await meetingsRef.where("UniqueToken", "==", token).get();
  while(!queryResult.empty)
  {
    token = randomHexValue(8);
    queryResult = await meetingsRef.where("UniqueToken", "==", token).get();
  }
  return token;
}

function randomHexValue(len)
{
  // https://stackoverflow.com/questions/34386914/generate-unique-random-string-with-javascript
  // convert to hex
  return crypto.randomBytes(Math.ceil(len/2)).toString('hex').slice(0,len).toUpperCase(); 
}



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
  let begone = false

  db.collection("Meetings").doc(ID).get().then((docRef) => {
      let ls = docRef.data().Total;
      ls.forEach((element) => {
        if(element == email){
          begone = true
        }
      })
  });

 if(!begone)
 {
    if (choice == 0) {
      db.collection("Meetings")
        .doc(ID)
        .update({ NOTA: FieldValue.arrayUnion(email) }).then(() => {
          res.send("Meeting Created");
        })
        .catch(() => {
          res.send("Meeting Creation Failed");
        });
    }
    if (choice == 1) {
      db.collection("Meetings")
        .doc(ID)
        .update({ Option1: FieldValue.arrayUnion(email) })
        .then(() => {
          res.send("Meeting Created");
        })
        .catch(() => {
          res.send("Meeting Creation Failed");
        });
    }
    if (choice == 2) {
      db.collection("Meetings")
        .doc(ID)
        .update({ Option2: FieldValue.arrayUnion(email) })
        .then(() => {
          res.send("Meeting Created");
        })
        .catch(() => {
          res.send("Meeting Creation Failed");
        });
    }

    db.collection("Meetings")
      .doc(ID)
      .update({ Total: FieldValue.arrayUnion(email) })
 }



  
})

app.get("/getdata", (req, res) => { 
  
  const ID = req.body.ID

  db.collection("Meetings")
    .doc(ID)
    .get()
    .then((docRef) => {

      let ls = docRef.data();
      res.send(ls)
    });

});



app.listen(port, () => {
    console.log("working")
});
