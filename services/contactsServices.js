import { v4 as uuidv4 } from 'uuid';
import { Contacts } from '../models/contactsModel.js';

async function listContacts(contactOwner) {
    const contact = await Contacts.find({ owner: contactOwner})
    return contact
}

async function getContactById(contactId, contactOwner) {
    const contact = await Contacts.findOne({ _id: contactId, owner: contactOwner})
    return contact
}

async function removeContact(contactId, contactOwner) {
    const contact = await Contacts.deleteOne({ _id: contactId, owner: contactOwner});
    return contact
}
  
async function addContact(name, email, phone, favorite, owner) {
    const newContact = await Contacts.create({ id: uuidv4(), name, email, phone, favorite, owner });
    return newContact;
}

async function updContact(id, name, email, phone, owner) {
    const updatedContact = await Contacts.findOneAndUpdate({ _id: id, owner: owner }, {name, email, phone}, { new: true });
    return updatedContact
}

async function updFavorite(id, favorite, owner) {
    const updatedFavorite = await Contacts.findOneAndUpdate({ _id: id, owner: owner }, {favorite}, {new: true});
    return updatedFavorite
}

export { listContacts, getContactById, removeContact, addContact, updContact, updFavorite };