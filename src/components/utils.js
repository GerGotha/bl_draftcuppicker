




export const getClassIcon = (player) => {
    let mainClass = player.getMClass;
    let secondClass = player.getSClass;
    if(mainClass == null)
        return '?';

    let returnIcon = '';

    mainClass = mainClass.trim().toUpperCase();
    mainClass.normalize();

    if(mainClass === 'INFANTRY' || mainClass === 'INF'){
        returnIcon = '🗡';
    }
    else if(mainClass === 'ARCHER' || mainClass === 'ARC'){
        returnIcon = '🏹';
    }
    else if(mainClass === 'CAVALRY' || mainClass === 'CAV'){
        returnIcon = '🐴';
    }
    else{
        return '🗡🏹🐴';
    }

    if(secondClass === '' || secondClass === null) {
        return returnIcon;
    }
    secondClass = secondClass.trim().toUpperCase();
    secondClass.normalize();
    if(secondClass === 'INFANTRY' || secondClass === 'INF'){
        returnIcon += ' (🗡)';
    }
    else if(secondClass === 'ARCHER' || secondClass === 'ARC'){
        returnIcon += ' (🏹)';
    }
    else if(secondClass === 'CAVALRY' || secondClass === 'CAV'){
        returnIcon += ' (🐴)';
    }

    return returnIcon;
};