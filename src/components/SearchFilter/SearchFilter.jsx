// import { Component } from 'react';
import s from './SearchFilter.module.css';

export const SearchFilter = ({ onChangeSearch, filter }) => {
  //   handleChange = e => {
  //     // console.log(e.target.value);
  //     // console.log(e.target.value);
  //     // console.log(this.props.contacts[0].name);
  //     const newContacts = this.props.contacts.filter(contact =>
  //       contact.name.toLowerCase().includes(e.target.value.toLowerCase())
  //     );
  //     console.log(newContacts);
  //   };

  return (
    <>
      <p className={s.text}>Find contacts by name</p>
      <input
        className={s.input}
        onChange={onChangeSearch}
        value={filter}
        name="search"
        type="text"
      />
    </>
  );
};
