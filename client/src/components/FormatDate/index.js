// Function for displaying month as a word
export function monthToString(date) {
  const formatter = new Intl.DateTimeFormat('ru', {
    month: 'long'
  });

  const correct = formatter.format(date);

  return correct.slice(0, 1).toUpperCase() + correct.slice(1)
};

// Function for displaying day as a string of 2 letters
export function dayToString(date) {
  const formatter = new Intl.DateTimeFormat('ru', {
    weekday: 'short',
    day: 'numeric'
  });

  const correct = formatter.format(date);

  return correct.slice(0, 1).toUpperCase() + correct.slice(1)
};

// Function to correctly display the weekday number of sunday
export function correctDay(date) {
  if (date.getDay() === 0) return 7;

  return date.getDay()
};

// Function for inclining months
export function inclineMonth(date) {
  if (date.slice(-1) === 'ь') return date.slice(0,-1) + 'я';

  return date + 'а'
};

// Function for inclining words with numbers
export function inclineCount(data, word) {
  // Convert into string to enable using slice()
  const number = data.toString();

  if (data > 10 && data <= 20) return data + ' ' + word + 'ов';

  if (number.slice(-1) > 1 && number.slice(-1) < 5) return data + ' ' + word + 'а';

  if (number.slice(-1) === 1) return data + ' ' + word;

  return data + ' ' + word + 'ов';
};

export function fetchData(api, state, context) {
  fetch(api)
    .then(res => res.json())
    .then(data => context.setState({[state]: data}))
    .catch(err => console.log(err))
};
