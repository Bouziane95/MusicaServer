var express = require("express");
const Bands = require("../models/Band");
var router = express.Router();
const uploader = require("../config/cloudinary");

/* GET bands listing. */
router.get("/", function (req, res, next) {
    Bands.find()
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
        newBand.image = req.file.path;
    }
  
    Bands.create(newBand)
      .then((carsDocument) => {
        res.status(201).json(carsDocument);
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