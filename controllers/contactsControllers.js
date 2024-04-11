import { addContact, getContactById, listContacts, removeContact, updContact, updFavorite } from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
    const getContacts = await listContacts();
    res.send(getContacts);
};

export const getOneContact = async (req, res) => {
    const getContact = await getContactById(req.params.id);
    if (!getContact) {return res.status(404).json({message: "Contact is not found"})}
    res.status(200).send(getContact)
};

export const deleteContact = async (req, res) => {
    const delContact = await removeContact(req.params.id);
    if (!delContact) {return res.status(404).json({message: "Contact is not found"})}
    res.status(200).send(delContact)
};

export const createContact = async (req, res) => {
    const { name, email, phone, favorite } = req.body;
    const newContact = await addContact(name, email, phone, favorite);
    if (!newContact) {return res.status(404).json({message: "Contact is already exist"})};
    res.status(201).send(newContact)
};

export const updateContact = async (req, res) => {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {return res.status(400).json({ message: "Body must have at least one field"})};
    const upContact = await updContact(req.params.id, name, email, phone);
    res.status(200).send(upContact)
};

export const updateFavorite = async (req, res) => {
    const updatedFavorite = await updFavorite(req.params.id, req.body.favorite);
    res.status(200).send(updatedFavorite)
}