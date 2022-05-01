

export const contains = (list, player) => {
    for (let i = 0; i < list.length; i++) {
        if (list[i].getName === player.getName) {
            return true;
        }
    }
    return false;
}

class Player
{
    static pickedPlayerList = [];
    static playerList = [];
    static auctionPlayerList = [];
    static availablePlayerList = [];
    static refillAuctionList = true;

    constructor(name, mainClass, secondClass = null) {
        this.name = name;
        this.mainClass = mainClass;
        this.secondClass = secondClass;
        this.picked = false;
        this.inAuction = false;
        this.available = false;
        this.price = 0
        this.addToList(Player.playerList);
        this.setAvailable(true);
    }

    setPicked(val){
        this.picked = val;
        if(val === true){
            if(contains(Player.pickedPlayerList, this))
                return;
            this.addToList(Player.pickedPlayerList);
        }
        else{
            if(!contains(Player.pickedPlayerList, this))
                return;
            this.removeFromList(Player.pickedPlayerList);
        }
    }
    setAvailable(val){
        this.available = val;
        if(val === true){
            if(contains(Player.availablePlayerList, this))
                return;
            this.addToList(Player.availablePlayerList);
        }
        else{
            if(!contains(Player.availablePlayerList, this))
                return;
            this.removeFromList(Player.availablePlayerList);
        }
    }
    setInAuction(val){
        this.inAuction = val;
        if(val === true){
            if(contains(Player.auctionPlayerList, this))
                return;
            this.addToList(Player.auctionPlayerList);
        }
        else{
            if(!contains(Player.auctionPlayerList, this))
                return;
            this.removeFromList(Player.auctionPlayerList);

            while(Player.refillAuctionList && Player.auctionPlayerList.length < 3 && Player.availablePlayerList.length > 0){
                const playerId = Math.floor(Math.random() * Player.availablePlayerList.length);
                Player.availablePlayerList[playerId].setInAuction(true);
                Player.availablePlayerList[playerId].setPicked(false);
                Player.availablePlayerList[playerId].setAvailable(false); //Muss an letzter stelle stehen
            }

        }
    }

    addToList(list){
        list.push(this);
    }

    removeFromList(list) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].getName === this.getName) {
                list.splice(i,1);
                return;
            }
        }
    }



    get getName(){
        return this.name;
    }

    get getMClass(){
        return this.mainClass;
    }

    get getSClass(){
        return this.secondClass;
    }

    get getPrice(){
        return this.price;
    }
    get getPicked(){
        return this.picked;
    }

    static getPlayer(name){
        for(let i = 0; i < Player.playerList.length; i++){
            if(Player.playerList[i].getName === name) {
                return Player.playerList[i];
            }
        }
    }

}

export default Player;