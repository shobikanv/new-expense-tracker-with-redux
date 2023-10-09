import { toast } from "react-toastify";
import moment from 'moment';

export function toastMessage(message, type) {
  toast(message, { type, toastId: `${type}-1` });
}


export const formatDate = (dateString) => {
  const date = moment(dateString);

  const formattedDate = date.format('DD MMM');

  return formattedDate;
};

