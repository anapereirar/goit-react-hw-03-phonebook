import { Component } from "react";
import { nanoid } from "nanoid";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import Filter from "./components/Filter/Filter";
import "./App.css";

class App extends Component {
  state = {
    contacts: [
      { id: nanoid(), name: "Rosie Simpson", number: "459-12-56" },
      { id: nanoid(), name: "Hermione Kline", number: "443-89-12" },
      { id: nanoid(), name: "Eden Clements", number: "645-17-79" },
      { id: nanoid(), name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
    // name: '',
    // number: ''
  };

  // Loading contacts from local storage
  componentDidMount() {
    const savedContacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(savedContacts);

    if (parsedContacts) {
      this.setState({
        contacts: parsedContacts,
      });
    }
  }

  // Saving contacts to local storage
  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;

    if (contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(contacts));
    }

    if (contacts.length === 0) {
      localStorage.removeItem("contacts");
    }
  }

  formSubmitHandler = (data) => {
    this.repeatControl(data);
  };

  repeatControl = (data) => {
    let nameArray = [];
    nameArray = this.state.contacts.map((cur) => cur.name);
    if (!nameArray.includes(data.name)) {
      let arrayCont = [];
      arrayCont = [
        ...this.state.contacts,
        { id: nanoid(), name: data.name, number: data.number },
      ];
      return this.setState({ ...this.state, contacts: arrayCont });
    } else {
      alert(`${data.name} is already in contacts`);
    }
  };

  elementDelete = (arr, idContact) => {
    let newArr = arr.filter((elem) => elem.id !== idContact);
    return newArr;
  };

  deleteContactFromContactList = (idContact) => {
    let newArrAfterDel = this.elementDelete(this.state.contacts, idContact);
    this.setState({
      ...this.state,
      contacts: [...newArrAfterDel],
    });
  };

  setFilterToState = (filterData) => {
    this.setState({ ...this.state, filter: `${filterData}` });
  };

  filterArr = (fArr) => {
    let newArr = fArr.filter((cur) =>
      cur.name.toUpperCase().includes(this.state.filter)
    );
    return newArr;
  };

  render() {
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmitData={this.formSubmitHandler} />
        <h2>Contacts</h2>
        <Filter setFilterToState={this.setFilterToState} />
        <ContactList
          contacts={this.filterArr(this.state.contacts)}
          del={this.deleteContactFromContactList}
        />
      </div>
    );
  }
}

export default App;