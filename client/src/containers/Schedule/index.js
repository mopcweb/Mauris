import React, { Component } from 'react';

/* ------------------------------------------------------------------- */
/*                              Styles
/* ------------------------------------------------------------------- */

import './index.sass';

/* ------------------------------------------------------------------- */
/*                              My Components
/* ------------------------------------------------------------------- */

import Header from '../../components/Header';
import {monthToString, inclineMonth, inclineCount, fetchData} from '../../components/FormatDate';

/* ------------------------------------------------------------------- */
/*                              Schedule component
/* ------------------------------------------------------------------- */

// Global object for date properties
const date = {

};

export default class Schedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: '',
      prev: '',
      date: window.location.pathname.replace(/\//, '').split('.'),
    }
  };

  componentDidMount() {
    // Split into variables day, month, year. Assign as property of global date object
    date.day = this.state.date[0] >= 10 ? this.state.date[0] :  `0${this.state.date[0]}`;
    date.month = this.state.date[1];
    date.year = this.state.date[2];

    // Find out data for previous day. Assign as property of global date object
    date.prevDay = date.day <= 1 ?
      new Date(date.year, +date.month - 1, 0).getDate() :
      +date.day - 1 >= 10 ?
      +date.day - 1 :
      `0${+date.day - 1}`;

    date.prevMonth = +date.prevDay < +date.day ?
      date.month :
      +date.month - 1 >= 10 ?
      +date.month - 1 :
      `0${+date.month - 1}`;
    if (date.prevMonth === '00') date.prevMonth = 12;

    date.prevYear = +date.month === 1 && +date.day === 1 ? +date.year - 1 : +date.year;

    console.log(date.prevYear, date.prevMonth, date.prevDay);

    // Fetch data for current & previous days
    fetchData(
      `http://api.tvmaze.com/schedule?country=US&date=${date.year}-${date.month}-${date.day}`,
      'data',
      this
    );
    fetchData(
      `http://api.tvmaze.com/schedule?country=US&date=${date.prevYear}-${date.prevMonth}-${date.prevDay}`,
      'prev',
      this
    );
  };

  render() {
    // Use functions to convert month into word and incline it
    let month;
    let prevMonth;

    if (date.year && date.month) {
      month = inclineMonth(monthToString(new Date(date.year, +date.month - 1)).toLowerCase());
      prevMonth = inclineMonth(monthToString(new Date(date.prevYear, +date.prevMonth - 1)).toLowerCase());
    };

    return (
      <div className='Schedule'>
        <Header link='/' />
        <Day
          date={`${date.day} ${month} ${date.year}`}
          data={this.state.data}
        />
        <Day
          date={`${date.prevDay} ${prevMonth} ${date.prevYear}`}
          data={this.state.prev}
        />
      </div>
    )
  };
};

class Day extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      max: this.props.data.length,
      count: 3,
    };

    this.handleClick = this.handleClick.bind(this);
    this.renderItems = this.renderItems.bind(this);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) this.renderItems()
  };

  renderItems() {
    const items = [];
    if (this.props.data.length) {
      this.props.data.forEach((item, i) => {
        if (i > this.state.count - 1) return

        items.push(
          <Item
            img={item.show.image ? item.show.image.medium : ''}
            title={item.name ? item.name : ''}
            year={item.airdate ? item.airdate.split('-')[0] : ''}
            season={item.season ? item.season : ''}
            episode={item.number ? item.number : ''}
            key={i}
          />
        )
      })
    };

    this.setState({
      items: items,
    })
  };

  handleClick(e) {
    this.setState({count: this.props.data.length}, () => this.renderItems());
  };

  render() {
    const sorry = (
      <div className='Schedule-Sorry'>
        Sorry, no data yet
      </div>
    );

    return (
      <div className='Schedule-Day'>
        <div className='Schedule-Date'>
          {this.props.date}
        </div>

        {this.state.items.length ? this.state.items : sorry}

        <Btn
          value={`Еще ${inclineCount(this.props.data.length - this.state.count, 'сериал')}`}
          hide={this.props.data.length <= this.state.count ? true : false}
          onClick={this.handleClick}
        />
      </div>
    )
  };
};

class Item extends Component {
  render() {
    return (
      <div className='Schedule-Item'>
        <img src={this.props.img} alt={this.props.title} />

        <div>
          <div>
            <h4>{this.props.title}</h4>
            <span>{this.props.year}</span>
          </div>

          <table>
            <tbody>
              <tr>
                <td>Сезон: {this.props.season}</td>
                <td>Эпизод: {this.props.episode}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  };
};

class Btn extends Component {
  render() {
    return (
      <button
        className={this.props.hide ? `Schedule-Btn Schedule-Btn_hidden` : `Schedule-Btn`}
        onClick={this.props.onClick}
      >
        {this.props.value}
        <span tabIndex='-1'></span>
      </button>
    )
  };
};








//
