// import { Component, useEffect, useState } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import { Contacts } from './Contacts/Contacts';
import { SearchFilter } from './SearchFilter/SearchFilter';
import { useState, useEffect } from 'react';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contacts = JSON.parse(localStorage.getItem('ContactsData'));
    if (contacts?.length) {
      setContacts(contacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ContactsData', JSON.stringify(contacts));
  }, [contacts]);

  const createContact = contact => {
    const newContact = {
      ...contact,
      id: nanoid(),
    };
    const isName = contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (!isName) {
      setContacts(prev => [...prev, newContact]);
    } else {
      alert(`${newContact.name} is already in contacts`);
    }
  };

  const handleDeleteContact = contactId => {
    setContacts(prev => prev.filter(contact => contact.id !== contactId));
  };

  const handleSetFilter = e => {
    setFilter(e.target.value);
  };

  const getFilteredContacts = () =>
    contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

  const filteredContacts = getFilteredContacts();
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'flex-start',
        fontSize: 40,
        color: '#010101',
        marginLeft: '100px',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm createContact={createContact} />
      <h2>Contacts</h2>
      <SearchFilter onChangeSearch={handleSetFilter} filter={filter} />
      <Contacts
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
};
