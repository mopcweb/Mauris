import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

/* ------------------------------------------------------------------- */
/*                              Styles
/* ------------------------------------------------------------------- */

import './index.sass';

/* ------------------------------------------------------------------- */
/*                              Data
/* ------------------------------------------------------------------- */

import promo from './promo.png';

/* ------------------------------------------------------------------- */
/*                              My Components
/* ------------------------------------------------------------------- */

import Header from '../../components/Header';
import {monthToString, correctDay} from '../../components/FormatDate';

/* ------------------------------------------------------------------- */
/*                              Main component
/* ------------------------------------------------------------------- */


export default class Main extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Promo />
        <Calendar />
      </Fragment>
    )
  };
};

class Promo extends Component {
  render() {
    return (
      <div className='Promo'>
        <img src={promo} alt='promo' />
        <h3>Для получения списка сериалов, пожалуйста, выберите необходимый месяц и день.</h3>
      </div>
    )
  };
};

class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date()
    };

    this.handleClick = this.handleClick.bind(this);
  };

  handleClick(e) {
    if (e.target.closest('.Calendar-Btn_prev')) {

      this.setState(state => ({
        date: new Date(state.date.getFullYear(),state.date.getMonth() - 1)
      }))
    };

    if (e.target.closest('.Calendar-Btn_next')) {

      this.setState(state => ({
        date: new Date(state.date.getFullYear(),state.date.getMonth() + 1)
      }))
    };
  };

  render() {
    return (
      <div className='Calendar' onClick={this.handleClick} >
        <Months date={this.state.date}  />
        <Month date={this.state.date} />
      </div>
    )
  };
};

class Months extends Component {
  render() {
    return (
      <div className='Calendar-Months'>
        <button className='Calendar-Btn Calendar-Btn_prev'></button>
        <span>{monthToString(this.props.date)}</span>
        <button className='Calendar-Btn Calendar-Btn_next'></button>
      </div>
    )
  };
};

class Month extends Component {
  render() {
    data.dayNumber = 1;
    data.maxDays = 7;

    // This month & year
    const year = this.props.date.getFullYear();
    const month = this.props.date.getMonth();

    // First & last date of this month + first (correct) weekday number
    const firstDay = correctDay(new Date(year, month));
    // const firstDate = new Date(year, month).getDate();
    const lastDate = new Date(year, month + 1, 0).getDate();

    // Check how much rows do we need
    const countRows = () => {
      return (lastDate === 31 && firstDay > 5) ? 6 : (lastDate === 28 && firstDay === 1) ? 4 : 5
    };

    // Save max rows into variable
    const maxRows = countRows();

    // Rows array
    const weeks = [];
    for (let i = 1; i <= maxRows; i++) {
      weeks.push(<Weeks key={i} last={lastDate} weekday={firstDay} year={year} month={month} />)
    };

    return (
      <table className='Calendar-Month' cellSpacing='0'>
        <tbody>
          {weeks}
        </tbody>
      </table>
    )
  };
};

// Data for each month. It will be restored on btns next/prev click
const data = {
  dayNumber: 1,
  maxDays: 7
};

class Weeks extends Component {
  render() {
    // New array for days. It will be restored for each row
    let days = [];

    // Variables for some days from previuos month & some days from the next
    let prevDays = this.props.weekday - 2;
    let futureDays = 1;

    // Pushing days into array.
    // Conditions: starting each row from dayNumber, ending on maxDays (which are multiple to 7)
    for (let i = data.dayNumber; i <= data.maxDays; i++) {

      // Check for the first weekday of the month. Before it - no value.
      // Also add prevDays form previous month to fulfil first row
      if (i < this.props.weekday && data.maxDays <= 7) {
        days.push(
        <Day
          value={new Date(this.props.year, this.props.month, -prevDays--).getDate()}
          key={i}
        />)
      }

      // Starting to pass days on first weekday. Also add class and tabIndex
      else if (data.dayNumber <= this.props.last) days.push(
        <Day
          value={data.dayNumber++}
          key={i}
          addClass='Calendar-Day_active'
          year={this.props.year}
          month={this.props.month}
          link={true}
        />)

      // For days more than lastDay of the month - empty value
      // Also add some days from next month to fulfil last row
      else days.push(
        <Day
          value={new Date(this.props.year, this.props.month + 1, futureDays++).getDate()}
          key={i}
        />)
    };

    // Increment maxDays on Math.min of 7 or current dayNubmer
    data.maxDays += Math.min(data.dayNumber - 1, 7);

    return (
      <tr className='Calendar-Row'>
        {days}
      </tr>
    )
  };
};

class Day extends Component {
  constructor(props) {
    super(props);

    this.state ={
      height: '',
    };

    this.handleResize = this.handleResize.bind(this);
  };

  handleResize(e) {
    // Define height of each cell to make them square
    const td = document.querySelector('.Calendar-Day');
    const width = td.clientWidth;

    // Update cell height state
    this.setState({height: width});
  };

  componentDidMount() {

    this.handleResize()

    window.addEventListener('resize', this.handleResize())
  };

  componentWillUnmoutn() {
    window.removeEventListener('resize', this.handleResize())
  }

  render() {
    let link = `/${this.props.value}.${this.props.month + 1 < 10 ? `0${this.props.month + 1}` : this.props.month + 1}.${this.props.year}`;

    if (!this.props.link) link = '/';

    return (
      <td
        className={this.props.addClass ? `Calendar-Day Calendar-Day_active` : `Calendar-Day`}
        style={{'height': this.state.height}}
      >
        <Link to={link}>
          {this.props.value}
        </Link>
      </td>
    )
  };
};

//
