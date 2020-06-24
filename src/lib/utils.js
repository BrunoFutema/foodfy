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
  formatPrice(value) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value/100).replace('.', ',');
  },
  formatCpfCnpj(value) {
    value = value.replace(/\D/g, '');

    if (value.length > 14) value = value.slice(0, -1);

    if (value.length > 11) {
      value = value.replace(/(\d{2})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1/$2');
      value = value.replace(/(\d{4})(\d)/, '$1-$2');
    } else {
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1-$2');
    }

    return value;
  },
  formatCep(value) {
    value = value.replace(/\D/g, '');

    if (value.length > 8) value = value.slice(0, -1);

    value = value.replace(/(\d{5})(\d)/, '$1-$2');

    return value;
  },
  intl(timestamp) {
    const formatter = new Intl.DateTimeFormat('pt-BR');
    
    const day = `0${formatter.format(timestamp).split('-')[2]}`.slice(-2);
    const month = `0${formatter.format(timestamp).split('-')[1]}`.slice(-2);
    const year = formatter.format(timestamp).split('-')[0];

    return `${day}/${month}/${year}`;
  },
};
