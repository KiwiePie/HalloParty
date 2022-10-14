const fs = require('fs')
const CostumeManager = require('./costume-manager.js')
class PartyManager {
    //start a party  
    static start(serverID, userID){ 
        //user can't start a party if they are already in one
        if(partyExists(serverID, userID)) return false 
        
        //create a guild database to store all pparties
        if(!guildExists(serverID)){
            var data = getJsonData();
            var newGuild = {
                "serverID": serverID,
                "parties":[]
            }
            data.push(newGuild);
            updateJsonFile(data);
        }

        //create a party object that stores userID as the first player     
        var data = getJsonData()
        var parties = data.find(server => server.serverID == serverID).parties
        var newParty = {
            "players": [
                CostumeManager.fetchCostume(userID),
            ],
        }

        //update data
        parties.push(newParty);
        updateJsonFile(data);
        
        
    }
    //add a new player to the party
    static addPlayer(serverID, userID, partyIndex){
        //check if guild has a party database
        if(!guildExists(serverID)) return false;

        var data = getJsonData();
        var parties = data.find(server => server.serverID == serverID).parties;

        //add new player to the party
        parties[partyIndex].push(CostumeManager.fetchCostume(userID));
        updateJsonFile(data);
    }
    //get all parties in a server
    static fetchServer(serverID){

        return getJsonData().find(server=> server.serverID == serverID);

    }
    //get a party using userId and serverId
    static fetchParty(serverID, userID){        

        return fetchServer(serverID).parties.find(party => party.players.map(u => u.userID).include(userID));

    }
}
//helper methods 

//check if a guild exists in the database
function guildExists(serverID){
    if(getJsonData().find(server => server.serverID == serverID)){
        return true;
    } 
    return false;
}
//check if a party exists in the database
function partyExists(serverID, userID){

    if(guildExists(serverID)){
        var server = getJsonData().find(server => server.serverID == serverID);
        var parties = server.parties;
        return parties.find(party => party.players.map(u => u.userID).includes(userID));
    }
        
    
    return false;
}
//fetch data from database
function getJsonData(){

    const data = fs.readFileSync('./servers.json'); 
    return JSON.parse(data);
}
//update data
function updateJsonFile(data){

    const jsonString = JSON.stringify(data);
    fs.writeFileSync('./servers.json', jsonString);
}
module.exports = PartyManager;