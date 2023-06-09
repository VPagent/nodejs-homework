const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const pathToContacts = path.resolve("models/contacts.json");

const listContacts = async (_, res) => {
  try {
    const file = await fs.readFile(pathToContacts, "utf8");
    const parsedFile = JSON.parse(file);

    res.status(200).json(parsedFile);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const getContactById = async (req, res) => {
  const id = req.params.contactId;
  try {
    const file = await fs.readFile(pathToContacts, "utf8");
    const parsedFile = JSON.parse(file);

    const currentContact = parsedFile.find((contact) => contact.id === id);
    if (!currentContact) {
      res.status(404).json({ message: "Contact not found" });
      return;
    }

    res.json(currentContact).status(200);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const removeContact = async (req, res) => {
  const id = req.params.contactId;
  try {
    const file = await fs.readFile(pathToContacts, "utf8");
    const parsedFile = JSON.parse(file);
    const currentContact = parsedFile.find((contact) => contact.id === id);

    if (!currentContact) {
      res.status(404).json({ message: "Not found" });
      return;
    }

    const contactsWithoutCurrent = parsedFile.filter(
      (contact) => contact.id !== id
    );

    const nextContacts = JSON.stringify(contactsWithoutCurrent);

    await fs.writeFile(pathToContacts, nextContacts);

    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    res.status(400);
    res.json(error.message);
  }
};

const addContact = async (req, res) => {
  const data = req.body;

  const newContact = {
    id: nanoid(),
    ...data,
  };
  console.log("req in addController", req);
  try {
    const file = await fs.readFile(pathToContacts, "utf8");
    const parsedFile = JSON.parse(file);
    const nextContacts = [...parsedFile, newContact];

    await fs.writeFile(pathToContacts, JSON.stringify(nextContacts));

    res.status(201).json(newContact);
  } catch (error) {
    console.log("error in addController", error);
    res.status(400).json({ massage: error.message });
  }
};

const updateContact = async (req, res) => {
  const {
    body,
    params: { contactId },
  } = req;

  try {
    const file = await fs.readFile(pathToContacts, "utf8");
    const parsedFile = JSON.parse(file);
    const currentContact = parsedFile.find(
      (contact) => contact.id === contactId
    );

    const contactsWithoutCurrent = parsedFile.filter(
      (contact) => contact.id !== contactId
    );

    const newContact = {
      ...currentContact,
      ...body,
    };

    const nextContacts = [...contactsWithoutCurrent, newContact];

    await fs.writeFile(pathToContacts, JSON.stringify(nextContacts));

    res.status(200).json(newContact);
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
