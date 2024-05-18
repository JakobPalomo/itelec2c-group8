// import { db } from "./firebase";
// import { collection, onSnapshot } from "firebase/firestore";
// import express from "express";
const express = require("express");
const multer = require("multer");

const app = express();
const dotenv = require("dotenv").config({ path: "./.env" });
const { GMAPS_API_KEY } = process.env;

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
const { admin } = require("./admin");
const { db } = require("./firebase");
const {
  collection,
  onSnapshot,
  doc,
  getDocs,
  addDoc,
  getDoc,
  setDoc,
  deleteDoc,
  updateDoc,
  query,
  where,
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

// Parse URL-encoded bodies (form data)
app.use(express.urlencoded({ extended: true }));
// Middleware to set CORS headers
app.use((req, res, next) => {
  // Allow requests from any origin
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Allow any headers in requests
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

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

// GET USER
app.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const userRef = doc(db, "user", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const user = { id: userSnap.id, ...userSnap.data() };
      res.status(200).json(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error getting documents:", error);
    res.status(500).send("Error getting documents");
  }
});

// GET USER'S PROFILE
app.get("/user-profile", async (req, res) => {
  try {
    const userId = req.query.userid;
    const userRef = doc(db, "user", userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return res.status(404).send("User not found");
    }

    const user = userSnap.data();
    let media = {};

    if (user.profile) {
      const mediaRef = doc(db, "media", user.profile);
      const mediaSnap = await getDoc(mediaRef);

      if (mediaSnap.exists()) {
        media = { id: mediaSnap.id, ...mediaSnap.data() };
      }
    }

    res.status(200).json(media);
  } catch (error) {
    console.error("Error getting documents:", error);
    res.status(500).send("Error getting documents");
  }
});

// GET USER ARRAYS
app.get("/user-arrays", async (req, res) => {
  try {
    const userId = req.query.userid;
    const collectionParam = req.query.collection;
    let collectionName = collectionParam;
    let userField = collectionName.concat("s");

    if (userField === "palengkes") {
      userField = "contributions";
    } else if (userField === "saves") {
      collectionName = "palengke";
    }

    const userRef = doc(db, "user", userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return res.status(404).send("User not found");
    }

    const user = userSnap.data();
    const documentIds = user[userField] || [];

    console.log(
      `User ${userId} ${userField} Ids:`,
      documentIds,
      collectionName
    );

    if (documentIds.length === 0) {
      return res.status(200).json([]);
    }

    // Split documentIds into chunks of 10 (Firestore's limit for 'in' queries)
    const chunkSize = 10;
    const chunks = [];
    for (let i = 0; i < documentIds.length; i += chunkSize) {
      chunks.push(documentIds.slice(i, i + chunkSize));
    }

    const data = [];
    for (const chunk of chunks) {
      const collectionRef = collection(db, collectionName);
      const q = query(collectionRef, where("__name__", "in", chunk));
      const querySnapshot = await getDocs(q);
      querySnapshot.docs.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
    }

    console.log(`Data for ${userField}:`, data, collectionName);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error getting documents:", error);
    res.status(500).send("Error getting documents");
  }
});

// CHANGE PASS (OTP)
app.post("/user/change-pass", upload.none(), async (req, res) => {
  const { email, new_password } = req.body;

  try {
    console.log("email", email);
    const userRecord = await admin.auth().getUserByEmail(email);

    // Update the user's password
    await admin.auth().updateUser(userRecord.uid, {
      password: new_password,
    });

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ error: "Failed to update password" });
  }
});

// DELETE USER
app.put("/user/delete/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    // Get the user document reference
    const userDocRef = admin.firestore().collection("user").doc(userId);
    console.log("Attempting to fetch userId:", userId);

    // Fetch the user document
    const userDocSnapshot = await userDocRef.get();

    // Check if the user document exists
    if (!userDocSnapshot.exists) {
      console.log(`User with ID ${userId} not found.`);
      return res.status(404).send("User not found");
    }

    // Get the user data
    const userData = userDocSnapshot.data();
    console.log("userData", userData);

    const mediaId = userData.profile;
    console.log("mediaId: ", mediaId);

    // If mediaId exists, delete the related media document
    if (mediaId) {
      const mediaDocRef = admin.firestore().collection("media").doc(mediaId);
      await mediaDocRef.delete();
    }

    // Update the user document
    await userDocRef.update({
      username: "Deleted User",
      email: "",
      district: "",
      city: "",
      region: "",
      profile: "",
    });

    // Delete the user from authentication
    await admin.auth().deleteUser(userId);

    res.status(200).send("User updated successfully");
  } catch (error) {
    console.log("Error during user deletion process:", error);
    res.status(500).send("Error updating user: " + error.message);
  }
});

// ADD PALENGKE WITH MEDIA (10 files only)
app.post("/palengke/add", upload.array("media", 10), async (req, res) => {
  const { userId } = req.query;

  try {
    const mediaFilenames = JSON.parse(req.body.mediaFilenames);
    const mediaTypes = JSON.parse(req.body.mediaTypes);
    console.log("media filenames: ");
    console.log(mediaFilenames);
    console.log("media types: ");
    console.log(mediaTypes);
    const files = req.files;
    const documentIds = [];

    const promises = files.map(async (file, index) => {
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
      const addedDocRef = await addDoc(docRef, {
        type,
        filename,
        path,
        link,
      });
      documentIds.push(addedDocRef.id);
    });

    await Promise.all(promises);

    console.log(documentIds.toString());
    const media = documentIds;
    let { name, address, business_status, description } = req.body;
    business_status = parseInt(business_status);
    const location = JSON.parse(req.body.location);
    const other_names = JSON.parse(req.body.other_names);
    // const files = req.files;
    // const rating = 0;
    // const reviews_count = 0;
    const reviews = [];

    // Update user contributions array only if the palengke is successfully added
    const palengkeRef = await addDoc(collection(db, "palengke"), {
      name,
      address,
      location,
      business_status,
      description,
      other_names,
      // fileUrls: files.map((file) => file.path),
      media,
      // rating,
      // reviews_count,
      reviews,
    });

    // Get the ID of the added palengke document
    const contribution = palengkeRef.id;

    // Check if the user document exists before updating contributions
    const userRef = doc(db, "user", userId);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      return res.status(404).send("User not found");
    }

    // Update user contributions array
    const user = { id: userSnap.id, ...userSnap.data() };
    const contributions = [...user.contributions, contribution];
    await updateDoc(userRef, { contributions });

    console.log("Successfully added palengke");
    res.status(200).json("Successfully added palengke");
  } catch (error) {
    console.error("Error adding palengke:", error);
    res.status(500).send("Error adding palengke");
  }
});

// EDIT PALENGKE WITH MEDIA (10 files only)
app.post("/palengke/edit", upload.array("media", 10), async (req, res) => {
  try {
    const { userId, palengkeId } = req.query;
    console.log("userId", userId);
    console.log("palengkeId", palengkeId);
    if (!userId || !palengkeId) {
      return res.status(400).send("userId and palengkeId are required");
    }

    const mediaFilenames = JSON.parse(req.body.mediaFilenames);
    const mediaTypes = JSON.parse(req.body.mediaTypes);
    console.log("media filenames: ");
    console.log(mediaFilenames);
    console.log("media types: ");
    console.log(mediaTypes);
    const files = req.files;
    const documentIds = [];

    const promises = files.map(async (file, index) => {
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
      try {
        const addedDocRef = await addDoc(docRef, {
          type,
          filename,
          path,
          link,
        });
        documentIds.push(addedDocRef.id);
      } catch (error) {
        console.error("Error adding media document:", error);
        throw error; // Throw the error to exit Promise.all() if any error occurs
      }
    });

    await Promise.all(promises);

    console.log(documentIds.toString());
    const media = documentIds;
    let { name, address, business_status, description } = req.body;
    business_status = parseInt(business_status);
    const location = JSON.parse(req.body.location);
    const other_names = JSON.parse(req.body.other_names);

    // Update the palengke document
    console.log("to update palengke");
    const palengkeRef = doc(db, "palengke", palengkeId);
    console.log("found palengke", palengkeRef);
    await updateDoc(palengkeRef, {
      name,
      address,
      location,
      business_status,
      description,
      other_names,
      media,
    });

    console.error("Successfully edited palengke");
    res.status(200).json("Successfully edited palengke");
  } catch (error) {
    console.error("Error editing palengke:", error);
    res.status(500).send("Error editing palengke");
  }
});

// DELETE PALENGKE
app.delete("/palengke/delete", async (req, res) => {
  try {
    const { userId, palengkeId } = req.query;

    if (!userId || !palengkeId) {
      return res.status(400).send("userId and palengkeId are required");
    }

    // Delete the palengke document from the database
    const palengkeRef = doc(db, "palengke", palengkeId);
    await deleteDoc(palengkeRef);

    // Check if the user document exists before updating contributions
    const userRef = doc(db, "user", userId);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      return res.status(404).send("User not found");
    }

    // Update user contributions array
    const user = userSnap.data();
    const updatedContributions = (user.contributions || []).filter(
      (contri) => contri !== palengkeId
    );
    await updateDoc(userRef, { contributions: updatedContributions });

    res.status(200).json("Successfully deleted palengke");
  } catch (error) {
    console.error("Error deleting palengke:", error);
    res.status(500).send("Error deleting palengke");
  }
});

// ADD REVIEW
app.post("/review/add", upload.none(), async (req, res) => {
  const { userId } = req.query;

  try {
    console.log("req.body");
    console.log(JSON.parse(JSON.stringify(req.body)));
    let { user_id, palengke_id, date, review, rating, upvote_count } =
      JSON.parse(JSON.stringify(req.body));
    const edited_date = "";

    const reviewRef = await addDoc(collection(db, "review"), {
      user_id,
      palengke_id,
      date,
      review,
      rating,
      upvote_count,
      edited_date,
    });

    const myreview = reviewRef.id;
    const userRef = doc(db, "user", userId);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      return res.status(404).send("User not found");
    }

    const userReviews = userSnap.data().reviews || [];
    const updatedReviews = [...userReviews, myreview];

    try {
      await updateDoc(userRef, { reviews: updatedReviews });
    } catch (error) {
      console.error("Error updating user: ", error);
      throw Error;
    }

    console.error("Successfully added review");
    res.status(200).json("Successfully added review");
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).send("Error adding review");
  }
});

// EDIT REVIEW
app.put("/review/edit/:reviewId", upload.none(), async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { review, rating, edited_date } = req.body; // Updated review data

    // Update the review document in the database
    await updateDoc(doc(db, "review", reviewId), {
      review,
      rating,
      edited_date,
    });

    res.status(200).json("Successfully updated review");
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).send("Error updating review");
  }
});

// DELETE REVIEW
app.delete("/review/delete/:reviewId", async (req, res) => {
  try {
    const { reviewId } = req.params;

    // Delete the review document from the database
    await deleteDoc(doc(db, "review", reviewId));

    res.status(200).json("Successfully deleted review");
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).send("Error deleting review");
  }
});

// REPORT PALENGKE
app.post("/palengke/report", upload.none(), async (req, res) => {
  const { userId } = req.query;

  try {
    console.log("req.body");
    console.log(JSON.parse(JSON.stringify(req.body)));
    let { user_id, palengke_id, date, reportReason, otherReason } = JSON.parse(
      JSON.stringify(req.body)
    );

    const reportRef = await addDoc(collection(db, "report_palengke"), {
      user_id,
      palengke_id,
      date,
      reportReason,
      otherReason,
    });

    const myreport = reportRef.id;
    const userRef = doc(db, "user", userId);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      return res.status(404).send("User not found");
    }

    const userReport = userSnap.data().report_palengkes || [];
    const updatedReport = [...userReport, myreport];

    try {
      await updateDoc(userRef, { report_palengkes: updatedReport });
    } catch (error) {
      console.error("Error updating user: ", error);
      throw Error;
    }

    console.error("Successfully reported");
    res.status(200).json("Successfully reported");
  } catch (error) {
    console.error("Error reporting:", error);
    res.status(500).send("Error reporting");
  }
});

// REPORT REVIEW
app.post("/review/report", upload.none(), async (req, res) => {
  const { userId } = req.query;

  try {
    console.log("req.body");
    console.log(JSON.parse(JSON.stringify(req.body)));
    let { user_id, review_id, date, reportReason, otherReason } = JSON.parse(
      JSON.stringify(req.body)
    );

    const reportRef = await addDoc(collection(db, "report_review"), {
      user_id,
      review_id,
      date,
      reportReason,
      otherReason,
    });

    const myreport = reportRef.id;
    const userRef = doc(db, "user", userId);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      return res.status(404).send("User not found");
    }

    const userReport = userSnap.data().report_reviews || [];
    const updatedReport = [...userReport, myreport];

    try {
      await updateDoc(userRef, { report_reviews: updatedReport });
    } catch (error) {
      console.error("Error updating user: ", error);
      throw Error;
    }

    console.error("Successfully reported");
    res.status(200).json("Successfully reported");
  } catch (error) {
    console.error("Error reporting:", error);
    res.status(500).send("Error reporting");
  }
});

// SAVE PALENGKE
app.post("/palengke/add_save", upload.none(), async (req, res) => {
  try {
    console.log("req.body", req.body);
    const { user_id, palengke_id } = req.body;

    const userRef = doc(db, "user", user_id);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      return res.status(404).send("User not found");
    }

    const userSaves = userSnap.data().saves || [];
    // Check for duplicates
    if (!userSaves.includes(palengke_id)) {
      const updatedSaves = [...userSaves, palengke_id];

      try {
        await updateDoc(userRef, { saves: updatedSaves });
        console.log("Successfully saved");
        res.status(200).json("Successfully saved");
      } catch (error) {
        console.error("Error updating user: ", error);
        throw new Error("Error updating user");
      }
    } else {
      console.log("Palengke is already saved");
      res.status(200).json("Palengke is already saved");
    }
  } catch (error) {
    console.error("Error saving:", error);
    res.status(500).send("Error saving");
  }
});

// UNSAVE PALENGKE
app.put("/palengke/remove_save", upload.none(), async (req, res) => {
  try {
    console.log("req.body", req.body);
    const { user_id, palengke_id } = req.body;

    const userRef = doc(db, "user", user_id);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      return res.status(404).send("User not found");
    }

    const userSaves = userSnap.data().saves || [];
    const updatedSaves = userSaves.filter((save) => save !== palengke_id);

    try {
      await updateDoc(userRef, { saves: updatedSaves });
    } catch (error) {
      console.error("Error updating user: ", error);
      throw Error;
    }

    console.log("Successfully removed save");
    res.status(200).json("Successfully removed save");
  } catch (error) {
    console.error("Error removing save:", error);
    res.status(500).send("Error removing save");
  }
});

// SEARCH ADDRESSES (add/edit palengke)
app.get("/search-places", async (req, res) => {
  const { input, types } = req.query;
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&types=${types}&components=country:PH&key=${GMAPS_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("data");
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error("Error fetching addresses:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/placedetails", async (req, res) => {
  const { place_id } = req.query;

  try {
    // Fetch place details from Google Maps Places API
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${GMAPS_API_KEY}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching place details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/location-to-address", async (req, res) => {
  const { lat, lng } = req.query;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GMAPS_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "OK" && data.results.length > 0) {
      // Extract the formatted address from the first result
      const formattedAddress = data.results[0].formatted_address;
      res.json({ address: formattedAddress });
    } else {
      console.error("Reverse geocoding error:", data.status);
      res.status(404).json({ error: "No address found" });
    }
  } catch (error) {
    console.error("Error fetching place details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ADD USER WITH MEDIA (1 file only)
app.post("/user/add/:userId", upload.single("media"), async (req, res) => {
  try {
    const file = req.file; // Use req.file for single file upload
    let documentId = "";

    if (file) {
      // Check if a file is uploaded
      const mediaFilename = req.body.mediaFilename;
      const mediaType = req.body.mediaType;
      const type =
        mediaType && mediaType.startsWith("image/")
          ? 0
          : mediaType.startsWith("video/")
          ? 1
          : 2;
      const filename = mediaFilename || "";
      const tempPath = file.path || "";
      const path = tempPath.replace(/^.*?public/, "").replaceAll("\\", "/");
      const link = "";

      const docRef = collection(db, "media");
      try {
        const addedDocRef = await addDoc(docRef, {
          type,
          filename,
          path,
          link,
        });
        documentId = addedDocRef.id;
      } catch (error) {
        console.error("Error adding document:", error);
        throw error;
      }

      console.log(documentId.toString());
    }

    const profile = documentId; // Will be null if no file was uploaded
    const userId = req.params.userId;
    const { username, email, district, city, region } = req.body;
    const reviews = [];
    const contributions = [];
    const saves = [];
    const upvotes = [];
    const otp = 0;

    await setDoc(doc(db, "user", userId), {
      username,
      email,
      district,
      city,
      region,
      profile,
      reviews,
      contributions,
      saves,
      upvotes,
      otp,
    });
    console.log("Successfully added user document");
    res.status(200).json("Successfully added user");
  } catch (error) {
    console.error("Error adding document:", error);
    res.status(500).send("Error adding document");
  }
});

// EDIT USER WITH MEDIA (1 file only)
app.post(
  "/user/edit-profile/:userId",
  upload.single("media"),
  async (req, res) => {
    try {
      const userId = req.params.userId;
      const { username, district, city, region, mediaFilename, mediaType } =
        req.body;
      let profile = "";

      // Check if a file is provided
      if (req.file) {
        const file = req.file;
        const type = mediaType.startsWith("image/")
          ? 0
          : mediaType.startsWith("video/")
          ? 1
          : 2;
        const filename = mediaFilename;
        const tempPath = file.path;
        const path = tempPath.replace(/^.*?public/, "").replaceAll("\\", "/");
        const link = "";

        const docRef = collection(db, "media");
        try {
          const addedDocRef = await addDoc(docRef, {
            type,
            filename,
            path,
            link,
          });
          profile = addedDocRef.id;
        } catch (error) {
          console.error("Error adding document:", error);
          throw error;
        }
      }

      // Update the user document
      const updateData = { username, district, city, region };
      if (profile) {
        updateData.profile = profile;
      }

      await updateDoc(doc(db, "user", userId), updateData);

      console.log("Successfully updated user profile");
      res.status(200).json("Successfully updated user profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).send("Error updating profile");
    }
  }
);

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
