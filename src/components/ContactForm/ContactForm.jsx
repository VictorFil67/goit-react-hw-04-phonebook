import { Component } from 'react';
import s from './ContactForm.module.css';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
    // console.log([target.name]);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.createContact(this.state);
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;
    return (
      <div className="wrap">
        <form onSubmit={this.handleSubmit} className={s.form}>
          <label className={s.label} htmlFor="name">
            Name
          </label>
          <input
            className={s.input}
            onChange={this.handleChange}
            id="name"
            type="text"
            name="name"
            value={name}
            required
          />
          <label className={s.label} htmlFor="tel">
            Number
          </label>
          <input
            className={s.input}
            onChange={this.handleChange}
            id="tel"
            type="tel"
            name="number"
            value={number}
            required
          />

          <button className={s.button} type="submit">
            Add contact
          </button>
        </form>
      </div>
    );
  }
}
