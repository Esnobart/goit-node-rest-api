import { v4 as uuidv4 } from 'uuid';
import { Contacts } from '../models/contactsModel.js';

async function listContacts() {
    return await Contacts.find().catch(error => {
        console.error(error);
        return [];
    });
}

async function getContactById(contactId) {
    try {
      return await Contacts.findOne({ _id: contactId }) || null;
    } catch (error) {
      return null;
    }
}

async function removeContact(contactId) {
    try {
        return await Contacts.deleteOne({ _id: contactId });
    } catch (error) {
      return null;
    }
}
  
async function addContact(name, email, phone, favorite) {
    try {
        const newContact = await Contacts.create({ id: uuidv4(), name, email, phone, favorite });
        return newContact;
    } catch (error) {
      return null;
    }
}

async function updContact(id, name, email, phone) {
    try {
        const updatedContact = await Contacts.findOneAndUpdate({ _id: id }, {name, email, phone}, { new: true });
        return updatedContact
    } catch (error) {
        return null;
    }
}

async function updFavorite(id, favorite) {
    const updatedFavorite = await Contacts.findOneAndUpdate({ _id: id }, {favorite}, {new: true});
    return updatedFavorite
}

export { listContacts, getContactById, removeContact, addContact, updContact, updFavorite };