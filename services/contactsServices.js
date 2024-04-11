import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Contacts } from '../models/contactsModel.js';

const contactsPath = path.join('db', 'contacts.json');

async function listContacts() {
    return Contacts.find().catch(error => {
        console.error(error);
        return [];
    });
}

async function getContactById(contactId) {
    try {
      return Contacts.findOne({ _id: contactId }) || null;
    } catch (error) {
      return null;
    }
}

async function removeContact(contactId) {
    try {
        return Contacts.deleteOne({ _id: contactId });
    } catch (error) {
      return null;
    }
}
  
async function addContact(name, email, phone, favorite) {
    try {
        const nameExist = await Contacts.findOne({ name });
        const emailExist = await Contacts.findOne({ email });
        const phoneExist = await Contacts.findOne({ phone });
        if (!nameExist && !emailExist && !phoneExist) {
            const newContact = await Contacts.create({ id: uuidv4(), name, email, phone, favorite });
            return newContact;
        }
        return null;
    } catch (error) {
      return null;
    }
}

async function updContact(id, name, email, phone) {
    try {
        const updatedContact = Contacts.findOneAndUpdate({ _id: id }, {name, email, phone}, { new: true });
        return updatedContact
    } catch (error) {
        return null;
    }
}

async function updFavorite(id, favorite) {
    const updatedFavorite = Contacts.findOneAndUpdate({ _id: id }, {favorite}, {new: true});
    return updatedFavorite
}

export { listContacts, getContactById, removeContact, addContact, updContact, updFavorite };