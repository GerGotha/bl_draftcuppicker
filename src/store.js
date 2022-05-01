import { createStore } from 'redux'
import Player from "./classes/Player";

function todos(state = [], action) {
    switch (action.type) {
        case 'SET_AVAILABLE_PLAYERLIST':
            return {availablePlayers: action.data,...state};
        case 'SET_PICKED_PLAYERLIST':
            return {availablePlayers: action.data,...state};
        case 'SET_PLAYERLIST':
            return {availablePlayers: action.data,...state};
        default:
            return state;
    }
}

const initialState = {
    playerList: Player.playerList,
    availablePlayers: Player.availablePlayerList,
    pickedPlayers: Player.pickedPlayerList
};

const store = createStore(todos, initialState)

store.dispatch({
    type: 'ADD_TODO',
    text: 'Read the docs'
});

export default store;