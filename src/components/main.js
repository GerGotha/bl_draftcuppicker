import React, {useContext, useEffect} from 'react';
import {getClassIcon} from "./utils";
import Player, {contains} from "../classes/Player";
import {PlayerContext, PlayerProvider} from "../player-contexxt";
import CurrentPlayerData from "./CurrentPlayerData";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormFileInput from 'react-bootstrap/FormFileInput';
import Image from 'react-bootstrap/Image';


const Main = () => {

    return (
        <>
            <Container>
                <br/>
                <Image
                    src="https://forums.taleworlds.com/index.php?attachments/beast_avatar_2-1-png.161773/"
                    fluid/>
                <Image
                    src="https://forums.taleworlds.com/index.php?attachments/new_cover_3-1-png.161772/"
                    fluid/>
                <PlayerProvider>
                    <PlayerListComponent/>
                </PlayerProvider>
            </Container>
        </>
    );
}


const ImportFromFileBodyComponent = () => {

    const {state, dispatch} = useContext(PlayerContext);
    const handleFileRead = (e) => {
        const content = fileReader.result;
        const lines = content.split('\n')
        for (let i = 0; i < lines.length; i++) {
            const playerData = lines[i];
            const playerParams = playerData.split(';');

            const length = playerParams.length;
            if (length === 2) //Name / Class
            {
                new Player(playerParams[0], playerParams[1]);
            } else if (length === 3) //Name / Class / Second class
            {
                new Player(playerParams[0], playerParams[1], playerParams[2]);
            }
        }
        for (let i = 0; i < 3; i++) {
            const length = Player.availablePlayerList.length;
            if (length > 0) {
                const playerId = Math.floor(Math.random() * length);
                Player.availablePlayerList[playerId].setPicked(false);
                Player.availablePlayerList[playerId].setInAuction(true);
                Player.availablePlayerList[playerId].setAvailable(false);
            }
        }

        dispatch({
            type: 'SET_PLAYERLIST',
            data: Player.playerList,
        });

        dispatch({
            type: 'UPDATE_LISTS',
            data: {
                availablePlayerlist: Player.availablePlayerList,
                pickedPlayerlist: Player.pickedPlayerList,
                auctionPlayerlist: Player.auctionPlayerList,
            },
        });
        dispatch({
            type: 'SET_SELECTEDPLAYER',
            data:  Player.auctionPlayerList[0],
        });
        document.getElementById('auctionplayerlist').value = Player.auctionPlayerList[0].getName;

    };
    let fileReader;

    const handleFileChosen = (file) => {
        fileReader = new FileReader();
        fileReader.onloadend = handleFileRead;
        fileReader.readAsText(file);
        document.getElementById('upload-input').hidden = true;
    };

    return (
        <>
            <Container>
                <div id={'upload-input'}>
                    <FormFileInput
                        type='file'
                        id='file'
                        className='input-file'
                        accept='.csv'
                        onChange={e => handleFileChosen(e.target.files[0])}
                    />
                </div>
                <br/>
            </Container>
        </>
    );
};


const PlayerListComponent = () => {

    const {state, dispatch} = useContext(PlayerContext);



    return (
        <>
            <Container>
                <Col>
                    <CurrentPlayerData/>
                </Col>
                <Col>

                    <ImportFromFileBodyComponent/>
                </Col>
            </Container>
            <Container>
                <Row>
                    <Col>
                        <PlayerList label={'Picked players'} listId={'pickedplayerlist'} size={16}
                                    playerList={state.pickedPlayerlist}/>
                    </Col>
                    <Col>
                        <PlayerList label={'Current auctions'} listId={'auctionplayerlist'} size={3}
                                    playerList={state.auctionPlayerlist}/>
                    </Col>
                    <Col>
                        <PlayerList label={'Remaining players'} listId={'availableplayerlist'} size={16}
                                    playerList={state.availablePlayerlist}/>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

const PlayerList = ({label, listId, playerList, size}) => {

    const {state, dispatch} = useContext(PlayerContext);


    const playerListOptions = playerList.map((player) => {
            const dblClickName = (e) => {

            };

            const clickName = (e) => {
                const selectedPlayer = Player.getPlayer(e.target.value);
                if (selectedPlayer === undefined) {
                    return;
                }


                dispatch({
                    type: 'SET_SELECTEDPLAYER',
                    data: selectedPlayer,
                });

            };

            let selectedName = null;
            if (state.selectedPlayer !== null) {
                selectedName = state.selectedPlayer.getName;
            }

            return (
                <option key={player.getName} value={player.getName} onDoubleClick={dblClickName} onClick={clickName}
                        defaultChecked={selectedName === player.getName}>
                    {player.getName} {getClassIcon(player)}
                </option>
            );
        }
    );
    return (
        <>
            <h4 className={'text-center'} htmlFor="players">{label}</h4>
            <Form>
                <Form.Control as='select' id={listId} name="players" htmlSize={size} custom>
                    {playerListOptions}
                </Form.Control>
            </Form>
        </>
    );
};


export default Main;