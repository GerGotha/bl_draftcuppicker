import React, { useContext} from 'react';
import {PlayerContext} from "../player-contexxt";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Player, {contains} from "../classes/Player";
import {getClassIcon} from "./utils";


const CurrentPlayerData = () => {

    const {state, dispatch} = useContext(PlayerContext);



    if(state.selectedPlayer === null && state.playerList.length > 0 && state.availablePlayerlist.length === 0 && state.auctionPlayerlist.length === 0){
        return (
            <>
                <Container>
                    <br/>
                    <h1 className={'text-center'}>You picked all available players.</h1>
                </Container>
            </>
        )
    }
    if(state.selectedPlayer === null){
        return (
            <>
                <Container>
                    <br/>
                    <h1 className={'text-center'}>You have to select a player.</h1>
                </Container>
            </>
        )
    }


    const clickBtnPicked = (e) => {
        if(state.selectedPlayer === null){
            return;
        }
        state.selectedPlayer.setPicked(true);
        state.selectedPlayer.setInAuction(false);
        state.selectedPlayer.setAvailable(false);

        dispatch({
            type: 'UPDATE_LISTS',
            data: {
                availablePlayerlist: Player.availablePlayerList,
                pickedPlayerlist: Player.pickedPlayerList,
                auctionPlayerlist: Player.auctionPlayerList,
            },
        });

        const auctionList = document.getElementById('auctionplayerlist');
        if(Player.auctionPlayerList.length > 0){ //Prüfe auf Player.auctionPlayerList da die tatsächliche länge dort drinnen steht
            let playerName = Player.auctionPlayerList[0].getName;
            auctionList.value = playerName;
            dispatch({
                type: 'SET_SELECTEDPLAYER',
                data: Player.getPlayer(playerName),
            });
        }else{
            dispatch({
                type: 'SET_SELECTEDPLAYER',
                data: null,
            });
        }

    }
    const clickBtnAuction = (e) => {
        if(state.selectedPlayer === null){
            return;
        }
        state.selectedPlayer.setInAuction(true);
        state.selectedPlayer.setPicked(false);
        state.selectedPlayer.setAvailable(false);

        dispatch({
            type: 'UPDATE_LISTS',
            data: {
                availablePlayerlist: Player.availablePlayerList,
                pickedPlayerlist: Player.pickedPlayerList,
                auctionPlayerlist: Player.auctionPlayerList,
            },
        });
    }
    const clickBtnAvailable = (e) => {
        if(state.selectedPlayer === null){
            return;
        }
        state.selectedPlayer.setInAuction(false);
        state.selectedPlayer.setPicked(false);
        state.selectedPlayer.setAvailable(true);


        dispatch({
            type: 'UPDATE_LISTS',
            data: {
                availablePlayerlist: Player.availablePlayerList,
                pickedPlayerlist: Player.pickedPlayerList,
                auctionPlayerlist: Player.auctionPlayerList,
            },
        });

    }


    return (
        <>
            <Container>
                <br/>
                <h1 className={'text-center'}>{state.selectedPlayer.getName}</h1>
                <h2 className={'text-center'}>{getClassIcon(state.selectedPlayer)}</h2>
                <br/>
                <Row>
                    <Col>
                        <Button variant={'outline-warning'} onClick={clickBtnPicked} id={'btnSetPicked'} disabled={contains(Player.pickedPlayerList, state.selectedPlayer)}>Set picked</Button>
                    </Col>
                    <Col>
                        <Button variant={'outline-warning'} onClick={clickBtnAuction} id={'btnAddAuction'} disabled={contains(Player.auctionPlayerList, state.selectedPlayer)}>Add to auction</Button>
                    </Col>
                    <Col>
                        <Button variant={'outline-warning'} onClick={clickBtnAvailable} id={'btnSetAvailable'} disabled={contains(Player.availablePlayerList, state.selectedPlayer)}>Set available</Button>
                    </Col>
                </Row>
                <br/>
            </Container>
        </>
    );

};


export default CurrentPlayerData;