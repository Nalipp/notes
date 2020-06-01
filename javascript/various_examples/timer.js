convertTime(seconds) {
  let date = new Date(null);
  date.setSeconds(seconds);
  let baseConverstion = date.toISOString()
  let timeConverted;

  if (baseConverstion[12] === '0') {
    timeConverted = baseConverstion.substr(14, 5);
  } else {
    timeConverted = baseConverstion.substr(11, 8);
  }

  this.setState({timeConverted});
}
