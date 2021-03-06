var express = require("express");
const Users = require("../models/User");
var router = express.Router();
const uploader = require("../config/cloudinary");
const { update } = require("../models/User");
const Bands = require("../models/Band");
/*Get users listing */

router.get("/", (req, res) => {
  Users.find()
    .then((dbRes) => {
      res.status(200).json(dbRes);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.post("/", uploader.single("profilePicture"), (req, res, next) => {

  const newUser = req.body;

  
  if (req.file) {
    newUser.profilePicture = req.file.path;
  }

  Users.create(newUser)
    .then((usersDocument) => {
      res.status(201).json(usersDocument);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.patch("/:id", uploader.single("profilePicture"), (req, res, next) => {
  const updateValues = req.body;

  if (req.file) {
    updateValues.profilePicture = req.file.path;
  }
  Users.findByIdAndUpdate(req.params.id, updateValues, { new: true })
    .then((usersDocument) => {
     
      res.status(200).json(usersDocument);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.delete("/:id", (req, res, next) => {
  Users.findByIdAndRemove(req.params.id)
    .then((data) => {
      Bands.deleteMany({bandBoss_id: req.params.id}).then().catch((err) =>{
        console.log(err)
      })
      res.sendStatus(204);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.get("/:id", (req, res) => {
  Users.findById(req.params.id)
    .then((dbRes) => {
      res.status(200).json(dbRes);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

///// ROUTES FOR THE USERS BANDS

router.get("/me/bands", (req, res, next) => {
  const currentUserId = req.session.currentUser; // We retrieve the users id from the session.
  console.log(currentUserId);

  // And then get all the items matching the id_user field that matches the logged in users id.
  Bands.find({ bandBoss_id: currentUserId })
    .then((bandDetails) => {
      res.status(200).json(bandDetails);
    })
    .catch(next);
});

module.exports = router;
