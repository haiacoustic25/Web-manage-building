import formatDatePrefix from './formatDatePrefix.js';
import toGMT7 from './toGMT7.js';

export const FORMATS = {
  'dd Tháng m, yyyy': 'dd Tháng m, yyyy',
};

const formatDate = (value: any, format = 'dd/MM/yyyy HH:mm') => {
  if (!value) return '';
  try {
    var objDate = toGMT7(value);
    var date = formatDatePrefix(objDate.getDate());
    var month = formatDatePrefix(objDate.getMonth() + 1);
    var year = objDate.getFullYear();
    var hours = formatDatePrefix(objDate.getHours());
    var minutes = formatDatePrefix(objDate.getMinutes());
    var seconds = formatDatePrefix(objDate.getSeconds());
    switch (format) {
      case 'dd/MM':
        return `${date}/${month}`;
      case 'MM/dd':
        return `${month}/${date}`;
      case 'MM/dd/YYYY':
        return `${month}/${date}/${year}`;
      case 'HH:mm':
        return `${hours}:${minutes}`;
      case 'dd-MM-yyyy':
        return `${date}-${month}-${year}`;
      case 'yyyy-mm-dd':
        return `${year}-${month}-${date}`;
      case 'dd/MM/yyyy':
        return `${date}/${month}/${year}`;
      case 'HH:mm dd/MM/yyyy':
        return ` ${hours}:${minutes} ${date}/${month}/${year}`;
      case 'yyyy-mm-ddTHH:mm:ssZ':
        return `${year}-${month}-${date}T${hours}:${minutes}:${seconds}Z`;
      case 'dd-MM-yyyy HH:mm:ss':
        return `${date}-${month}-${year} ${hours}:${minutes}:${seconds}`;
      case 'MM-dd-yyyy HH:mm:ss':
        return `${month}-${date}-${year} ${hours}:${minutes}:${seconds}`;
      case FORMATS['dd Tháng m, yyyy']:
        return `${date} Tháng ${month}, ${year}`;
      case 'yyyy-MM-dd HH:mm:ss':
        return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
      case 'dd/MM/yyyy HH:mm':
      default:
        return `${date}/${month}/${year} ${hours}:${minutes}`;
    }
  } catch (e) {
    console.error(e);
    return '';
  }
};

export const convertValidDate = (value: any) => {
  let date = value.slice(0, 2);
  let month = value.slice(3, 5);
  let year = value.slice(6, 10);
  let hours = value.slice(11, 13);
  let minutes = value.slice(14, 16);

  return {
    showDate: `${date}-${month}-${year} ${hours}:${minutes}:00`,
    value: `${month}-${date}-${year} ${hours}:${minutes}:00`,
  };
};

export default formatDate;
