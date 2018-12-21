import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/* ------------------------------------------------------------------- */
/*                              Styles
/* ------------------------------------------------------------------- */

import './index.sass';

/* ------------------------------------------------------------------- */
/*                              Example data
/* ------------------------------------------------------------------- */



/* ------------------------------------------------------------------- */
/*                              Main component
/* ------------------------------------------------------------------- */

export default class Header extends Component {
  render() {
    const link = <Link to={this.props.link || `/`}></Link>

    return (
      <header className={this.props.addClass ? `Header ${this.props.addClass}` : `Header`}>
        <h1>Super film</h1>
        {this.props.link ? link : ''}
      </header>
    )
  };
};
