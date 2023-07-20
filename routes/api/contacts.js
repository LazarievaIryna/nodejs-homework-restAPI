const express = require("express");

const ctrl = require("../../controlles/contacts");

const {validateBody, isValidId, authenticate} = require("../../middlewares");

const {schemas} = require("../../models/contacts");

const router = express.Router();

router.get("/", authenticate, ctrl.listContacts);

router.get("/:id", authenticate, isValidId, ctrl.getContactById);

router.post("/",authenticate, validateBody(schemas.addSchema), ctrl.addContact);

router.put("/:id", authenticate, isValidId, validateBody(schemas.addSchema), ctrl.updateContact);

router.patch("/:id/favorite", authenticate, isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateFavorite);

router.delete("/:id", authenticate, isValidId, ctrl.removeContact);

module.exports = router;