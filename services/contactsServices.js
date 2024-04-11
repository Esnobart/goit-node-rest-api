import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const contactsPath = path.join('db', 'contacts.json');

async function listContacts() {
    try {
      const data = await fs.promises.readFile(contactsPath);
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
}

async function getContactById(contactId) {
    try {
      const data = await fs.promises.readFile(contactsPath);
      const contacts = JSON.parse(data);
      return contacts.find(contact => contact.id === contactId) || null;
    } catch (error) {
      return null;
    }
}

async function removeContact(contactId) {
    try {
        const data = await fs.promises.readFile(contactsPath);
        const contacts = JSON.parse(data);
        const removedContact = contacts.find(contact => contact.id === contactId);
        if (!removedContact) return null;
        const updatedContacts = contacts.filter(contact => contact.id !== contactId);
        await fs.promises.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
        return removedContact;
    } catch (error) {
      return null;
    }
}
  
async function addContact(name, email, phone) {
    try {
        const data = await fs.promises.readFile(contactsPath);
        const contacts = JSON.parse(data);
        if (!nameExist && !emailExist && !phoneExist) {
            const newContact = { id: uuidv4(), name, email, phone };
            contacts.push(newContact);
            await fs.promises.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
            return newContact;
        }
        return null;
    } catch (error) {
      return null;
    }
}

async function updContact(id, name, email, phone) {
    try {
        const data = await fs.promises.readFile(contactsPath);
        const contacts = JSON.parse(data);
        const neededContact = contacts.find(contact => contact.id === id);
        if (!neededContact) return null;
        if (name || email || phone) {
            if (name) neededContact.name = name;
            if (email) neededContact.email = email;
            if (phone) neededContact.phone = phone;
            await fs.promises.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        }
        return (neededContact)
    } catch (error) {
        return null;
    }
}

export { listContacts, getContactById, removeContact, addContact, updContact };