import React, { Component } from "react";
import css from "./ContactList.module.css";
import PropTypes from 'prop-types';


export class ContactList extends Component {
  deleteId = Id => {
    this.props.del(Id);
  };
  render() {
    const { contacts } = this.props;
    return (
      <div>
        <ul>
          {contacts?.map((contact) => {
            return (
              <div className={css.container} key={contact.id}>
                <li>{contact.name}: {contact.number}</li>
                <button className={css.BtnToDelete}
                data-id={contact.id}
                onClick={() => this.deleteId(contact.id)}>X</button>
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ContactList;

ContactList.propTypes = {
  contacts: PropTypes.array,
  del: PropTypes.func,
};