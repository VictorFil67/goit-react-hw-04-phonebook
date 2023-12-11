import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import { Contacts } from './Contacts/Contacts';
import { SearchFilter } from './SearchFilter/SearchFilter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('ContactsData'));
    if (contacts?.length) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem('ContactsData', JSON.stringify(this.state.contacts));
    }
  }

  createContact = contact => {
    const newContact = {
      ...contact,
      id: nanoid(),
    };
    const isName = this.state.contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (!isName) {
      this.setState(prev => ({
        contacts: [...prev.contacts, newContact],
      }));
    } else {
      alert(`${newContact.name} is already in contacts`);
    }
  };

  handleDeleteContact = contactId => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(({ id }) => id !== contactId),
    }));
    // console.log(id);
  };

  handleSetFilter = e => {
    console.log(e);
    this.setState({ filter: e.target.value });
    // console.log(this.setState.filter);
  };

  getFilteredContacts = () =>
    this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );

  render() {
    const filteredContacts = this.getFilteredContacts();
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
        <ContactForm createContact={this.createContact} />
        <h2>Contacts</h2>
        <SearchFilter
          // contacts={this.state.contacts}
          onChangeSearch={this.handleSetFilter}
          filter={this.state.filter}
        />
        <Contacts
          contacts={filteredContacts}
          onDeleteContact={this.handleDeleteContact}
        />
      </div>
    );
  }
}
