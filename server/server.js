// import { db } from "./firebase";
// import { collection, onSnapshot } from "firebase/firestore";
// import express from "express";
const express = require("express");
const multer = require("multer");

const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination folder for uploaded files
    cb(null, "../public/uploads");
  },
  filename: function (req, file, cb) {
    // Set the filename for uploaded files
    const originalName = file.originalname.replace(/ /g, "-");
    const uniqueFilename =
      Date.now() + "-" + generateRandomString(8) + "-" + originalName;
    cb(null, Date.now() + uniqueFilename);
  },
});
const upload = multer({ storage: storage });

const { db } = require("./firebase");
const {
  collection,
  onSnapshot,
  doc,
  getDocs,
  addDoc,
  getDoc,
  setDoc,
} = require("firebase/firestore");

function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// GET PALENGKE
app.get("/palengke/:id", async (req, res) => {
  const documentId = "QjvkxDlZy0tP1t78OFub";
  getDoc(doc(collection(db, "palengke"), documentId))
    .then((docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        console.log("Document data:", data);
      } else {
        console.log("Error getting document");
      }
    })
    .catch((error) => {
      console.error("Error getting document:", error);
    });
  //   res.json({ users: ["userOne", "userTwo", "userThree"] });
});

// GET COLLECTION (palengke, review, upvote, media, user)
app.get("/list/:collection", async (req, res) => {
  try {
    const collectionName = req.params.collection;

    const list = [];
    const querySnapshot = await getDocs(collection(db, collectionName));

    querySnapshot.forEach((doc) => {
      // For each document, push its data into the array
      list.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    res.status(200).json(list);
  } catch (error) {
    console.error("Error getting documents:", error);
    res.status(500).send("Error getting documents");
  }
});

// ADD PALENGKE
app.post("/palengke/add", upload.array("media", 10), async (req, res) => {
  try {
    let { name, address, business_status, description } = req.body;
    business_status = parseInt(business_status);
    const location = JSON.parse(req.body.location);
    const other_names = JSON.parse(req.body.other_names);
    const media = JSON.parse(req.body.media);
    // const files = req.files;
    const rating = -1;
    const reviews_count = 0;
    const reviews = [];

    await setDoc(doc(collection(db, "palengke")), {
      name,
      address,
      location,
      business_status,
      description,
      other_names,
      // fileUrls: files.map((file) => file.path),
      media,
      rating,
      reviews_count,
      reviews,
    });

    // Send a success response
    res.status(200).send("Document added successfully");
  } catch (error) {
    // Handle errors
    console.error("Error setting document:", error);
    res.status(500).send("Error setting document");
  }
});

// ADD MEDIA (10 files only)
app.post("/media/add", upload.array("media", 10), async (req, res) => {
  try {
    const mediaFilenames = JSON.parse(req.body.mediaFilenames);
    const mediaTypes = JSON.parse(req.body.mediaTypes);
    console.log("media filenames: ");
    console.log(mediaFilenames);
    console.log("media types: ");
    console.log(mediaTypes);
    const files = req.files;
    const documentIds = [];

    for (const [index, file] of files.entries()) {
      const type =
        mediaTypes[index] && mediaTypes[index].startsWith("image/")
          ? 0
          : mediaTypes[index].startsWith("video/")
          ? 1
          : 2;
      const filename = mediaFilenames[index] || "";
      const tempPath = file.path || "";
      const path = tempPath.replace(/^.*?public/, "").replaceAll("\\", "/");
      const link = "";

      const docRef = collection(db, "media");
      await addDoc(docRef, {
        type,
        filename,
        path,
        link,
      })
        .then((docRef) => {
          documentIds.push(docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document:", error);
          res.status(500).send("Error adding document");
        });
      console.log(documentIds.toString());
    }

    res.status(200).json({ documentIds });
  } catch (error) {
    console.error("Error adding document:", error);
    res.status(500).send("Error adding document");
  }
});

app.get("/sample", (req, res) => {
  res.json({ users: ["userOne", "userTwo", "userThree"] });
});

app.get("/upload-media", (req, res) => {
  //   const id = req.params.id;
  res.json({ users: ["userOne", "userTwo", "userThree"] });
});

app.listen(5000, () => {
  console.log("SERVER STARTED ON PORT 5000");
});
