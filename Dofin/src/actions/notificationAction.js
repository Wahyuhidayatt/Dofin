import { POST_NOTIFICATION, GET_NOTIFICATIONS } from './constants';
import axios from 'axios'
const host = 'http://dofin-backend-dev.us-west-2.elasticbeanstalk.com'

export const postNotif = data => ({
  type: ActionTypes.POST_NOTIFICATION,
  payload: data,
});

export const getNotif = data => ({
  type: ActionTypes.GET_NOTIFICATIONS,
  payload: data,
});

export const notifRequest = notification => {
  return dispatch =>
    axios.post(host+'/notification', {notification})
    .then(response => dispatch(postNotif(response.data)))
    .catch(err => console.log(err.message))
};

export const getNotifRequest = () => {
  return dispatch =>
    axios.get(host+'/notification/59158e804412792833f91138')
    .then(response => dispatch(getNotif(response.data)))
    .catch(err => console.log(err.message))
};
