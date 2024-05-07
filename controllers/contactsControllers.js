import { HttpError } from "../helpers/HttpError.js";
import { addContact, getContactById, listContacts, removeContact, updContact, updFavorite } from "../services/contactsServices.js";

export const getAllContacts = async (req, res, next) => {
    try {
        const getContacts = await listContacts(req.user.id);
        res.send(getContacts);
    } catch (err) {
        next (err)
    }
};

export const getOneContact = async (req, res, next) => {
    try {
        const getContact = await getContactById(req.params.id, req.user.id);
        if (!getContact) {next (HttpError(404));}
        res.status(200).send(getContact)
    } catch (err) {
        next (err)
    }
};

export const deleteContact = async (req, res, next) => {
    try {
        const delContact = await removeContact(req.params.id, req.user.id);
        if (!delContact) {next (HttpError(404));}
        res.status(200).send(delContact)
    } catch (err) {
        next (err)
    }
};

export const createContact = async (req, res, next) => {
    try {
        const { name, email, phone, favorite } = req.body;
        const newContact = await addContact(name, email, phone, favorite, req.user.id);
        if (!newContact) {next (HttpError(404));};
        res.status(201).send(newContact)
    } catch (err) {
        next (err)
    }
};

export const updateContact = async (req, res, next) => {
    try {
        const { name, email, phone } = req.body;
        const upContact = await updContact(req.params.id, name, email, phone, req.user.id);
        res.status(200).send(upContact)
    } catch (err) {
        next (err)
    }
};

export const updateFavorite = async (req, res, next) => {
    try {
        const updatedFavorite = await updFavorite(req.params.id, req.body.favorite, req.user.id);
        res.status(200).send(updatedFavorite)
    } catch (err) {
        next (err)
    }
}