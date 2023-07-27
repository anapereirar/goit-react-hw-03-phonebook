import React, { Component } from "react";
import PropTypes from 'prop-types';
import css from './Filter.module.css'

export class Filter extends Component {

  setFilterValue = event => {
    let value = event.currentTarget.value.toUpperCase();
    this.props.setFilterToState(value);
  };
  
  render() {
    return (
      <div className={css.filterContainer}>
        <label className={css.labelFilter}>Find contacts by name</label>
        <br/>
        <input className={css.filter}onChange={this.setFilterValue}></input>
      </div>
    );
  }
}

Filter.propTypes = {
  setFilterToState: PropTypes.func.isRequired,
};

export default Filter;
