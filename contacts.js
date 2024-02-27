import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("./db", "contacts.json");

async function readContacts() {
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
  return JSON.parse(data);
}

async function writeContacts(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
}

export async function listContacts() {
  const contacts = await readContacts();
  return contacts;
}

export async function getContactById(contactId) {
  const contacts = await readContacts();
  const contact = contacts.find((c) => c.id === contactId);
  return contact ? contact : null;
}

export async function removeContact(contactId) {
  const contacts = await readContacts();
  const contact = contacts.find((c) => c.id === contactId);
  if (!contact) {
    return null;
  }
  const filteredContacts = contacts.filter((c) => c.id !== contactId);
  await writeContacts(filteredContacts);
  return contact;
}

export async function addContact(name, email, phone) {
  const contacts = await readContacts();
  const contact = { name, email, phone, id: crypto.randomUUID() };
  contacts.push(contact);
  await writeContacts(contacts);
  return contact;
}
