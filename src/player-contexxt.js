import * as React from 'react'

const initialValue = {
    availablePlayerlist: [],
    playerList: [],
    pickedPlayerlist: [],
    auctionPlayerlist: [],
    selectedPlayer: null
};
const PlayerContext = React.createContext(initialValue);


const playerReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PLAYERLIST': {
            return {...state, playerList: action.data};
        }
        case 'SET_AVAILABLEPLAYERLIST': {
            return {...state, availablePlayerlist: action.data};
        }
        case 'SET_PICKEDPLAYERLIST': {
            return {...state, pickedPlayerlist: action.data};
        }
        case 'SET_AUCTIONPLAYERLIST': {
            return {...state, auctionPlayerlist: action.data};
        }
        case 'SET_SELECTEDPLAYER': {
            return {...state, selectedPlayer: action.data};
        }
        case 'UPDATE_LISTS': {
            return {...state, availablePlayerlist: action.data.availablePlayerlist, pickedPlayerlist: action.data.pickedPlayerlist, auctionPlayerlist: action.data.auctionPlayerlist};
        }
        default: {
            return state;
        }
    }

}


function PlayerProvider({children}) {
    const [state, dispatch] = React.useReducer(playerReducer, initialValue)
    const value = {state, dispatch}
    return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
}
export {PlayerProvider}


export {PlayerContext};

