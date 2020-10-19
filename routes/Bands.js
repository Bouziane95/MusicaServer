var express = require("express");
const Bands = require("../models/Band");
const Users = require("../models/User");
var router = express.Router();
const uploader = require("../config/cloudinary");
// const { default: UserBands } = require("../../../client/src/pages/UserBands");

/* GET bands listing. */
router.get("/", function (req, res, next) {
  Bands.find()
    .populate("bandBoss_id", "-password")
    .then((dbResponse) => {
      res.status(200).json(dbResponse);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.get("/:id", function (req, res, next) {
  Bands.findById(req.params.id)
    .then((dbResponse) => {
      res.status(200).json(dbResponse);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.post("/", uploader.single("bandPicture"), (req, res, next) => {
  const newBand = req.body;

  if (req.file) {
    newBand.bandPicture = req.file.path;
  }
  newBand.bandBoss_id = req.session.currentUser;

  Bands.create(newBand)
    .then((bandsDocument) => {
      console.log(bandsDocument);
      Users.findByIdAndUpdate(req.session.currentUser, {
        $push: { bandsCreated: bandsDocument._id },
      })
        .then((apiRes) => {
          console.log(apiRes);
        })
        .catch((error) => {
          console.log(error);
        });
      res.status(201).json(bandsDocument);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.patch("/:id", (req, res, next) => {
  const updateValues = req.body;

  Bands.findByIdAndUpdate(req.params.id, updateValues, { new: true })
    .then((bandsDocument) => {
      res.status(200).json(bandsDocument);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.delete("/:id", (req, res, next) => {
  Bands.findByIdAndRemove(req.params.id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

module.exports = router;
