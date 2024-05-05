import { v4 as uuidv4 } from 'uuid';
import { Contacts } from '../models/contactsModel.js';

async function listContacts(contactOwner) {
    return await Contacts.find({ owner: contactOwner}).catch(error => {
        console.error(error);
        return [];
    });
}

async function getContactById(contactId, contactOwner) {
    try {
      const contact = await Contacts.findOne({ _id: contactId }) || null;
      if (contact.owner !== contactOwner) return null
      return contact
    } catch (error) {
      return null;
    }
}

async function removeContact(contactId, contactOwner) {
    try {
        const contact = Contacts.findOne({ _id: contactId });
        if (contact.owner === contactOwner) return await Contacts.deleteOne({ _id: contactId });
        return null
    } catch (error) {
      return null;
    }
}
  
async function addContact(name, email, phone, favorite, owner) {
    try {
        const newContact = await Contacts.create({ id: uuidv4(), name, email, phone, favorite, owner });
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