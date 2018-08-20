import moment from 'moment';

const capitaliseWord = word => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();

const formatDate = date => moment(date).format('DD/MM/YY - h:mm a');

export {
  capitaliseWord,
  formatDate
};
