const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
    dialogsData: [
        { id: 1, name: 'Roxolana Marusiak', online: true, messagesCount:2433,
        lastSeen: 'online', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT5g67tZkLuNcbMvMPfjAO08mstu5QTUr_y5g&usqp=CAU'},
        { id: 2, name: 'Andrew Smith', online: true, messagesCount:540,
        lastSeen: 'online', photo: 'https://html5css.ru/w3css/img_avatar3.png'},
        { id: 3, name: 'Jolyne Williams', online: true, messagesCount:545,
        lastSeen: 'online', photo: 'https://image.flaticon.com/icons/png/512/194/194938.png'},
        { id: 4, name: 'John Peters', online: false, messagesCount:5433,
        lastSeen: '15 minutes ago', photo: 'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png'},
      ],
      messagesData: [
        { id: 1, message: 'Hi, how are you? How is the project coming along?', 
        departureDate: '10:10 AM, Today', senderId: 1},

        { id: 2, message: 'Are we meeting today? Project has been already finished and I have results to show you.', 
        departureDate: '10:12 AM, Today', senderId: 2},
        
        { id: 3, message: 'Well I am not sure. The rest of the team is not here yet. Maybe in an hour or so? Have you faced any problems at the last phase of the project?', 
        departureDate: '10:14 AM, Today', senderId: 1},

        { id: 4, message: 'Actually everything was fine. I\'m very excited to show this to our team.',
         departureDate: '10:20 AM, Today', senderId: 2}
      ]
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE: {
            let stateCopy = {...state};
            stateCopy.messagesData = [...state.messagesData];
            stateCopy.messagesData.push({ id: 6, message: action.newMessageText, 
                departureDate: '10:21 AM, Today', senderId: 1});
            return stateCopy;
        }
        default:
            return state;
    }
};

export const sendMessage = (newMessageText) => {
    return {type:SEND_MESSAGE, newMessageText}
};

export default dialogsReducer;