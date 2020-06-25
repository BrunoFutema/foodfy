module.exports = {
  date(timestamp) {
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    const hour = date.getHours();
    const minutes = date.getMinutes();

    return {
      day,
      month,
      year,
      hour,
      minutes,
      iso: `${year}-${month}-${day}`,
      birthday: `${day}/${month}`,
      format: `${day}/${month}/${year}`,
    };
  },
  intl(timestamp) {
    const formatter = new Intl.DateTimeFormat('pt-BR');
    
    const day = `0${formatter.format(timestamp).split('-')[2]}`.slice(-2);
    const month = `0${formatter.format(timestamp).split('-')[1]}`.slice(-2);
    const year = formatter.format(timestamp).split('-')[0];

    return `${day}/${month}/${year}`;
  },
};
