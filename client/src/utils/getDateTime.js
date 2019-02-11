import moment from 'moment';

export default (date) => {
    return moment(date).format("dddd, Do MMM YYYY, h:mm A")
};