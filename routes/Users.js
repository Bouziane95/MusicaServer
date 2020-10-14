var express = require("express");
const Users = require("../models/User");
var router = express.Router();
const uploader = require("../config/cloudinary");

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

router.get("/:id", (req, res) => {
  Users.findById(req.params.id)
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

router.patch("/:id", (req, res, next) => {
  const updateValues = req.body;

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
    .then(() => {
      res.sendStatus(204);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

module.exports = router;
