const express = require("express");
const validationAddContact = require("../../schemas/contactSchema");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contactsControllers");

const router = express.Router();

router.get("/", listContacts);

router.get("/:contactId", getContactById);

router.post("/", validationAddContact, addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", validationAddContact, updateContact);

module.exports = router;
