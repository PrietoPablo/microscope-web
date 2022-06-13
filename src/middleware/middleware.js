import axios from 'axios';
import { SEND_LOGIN } from "../actions/loginActions";

export const debugMiddleware = (store) => (next) => (action) => {
    console.log('debbug middleware');
    console.log(action, store, next);
    console.log(`L'action ${action.type} est appelée`);
    next(action);

};

export const authMiddleware = (store) => (next) => (action) => {
    console.log(store, next, action);
    switch(action.type) {
        case SEND_LOGIN: {
            //récupération depuis le state les valeurs de l'input puis appel api
            const state = store.getState();
            const { email, password } = state;

            axios.post('http://localhost:3001/login', {
             email: email,
             password: password,
            })
            .then((res) => {
              console.log('les infos ici ->', res.data);
            })
            .catch(error => {
              console.error(error);
            });
            break;
        }
        default:
            next(action);
    }
};

//console.log(`L'action ${action.type} est appelée`);
