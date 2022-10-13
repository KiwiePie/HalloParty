const fs = require('fs')

class CostumeManager {
    static wear(avatarUrl, costumeName, userID){
        if(userExists){
            var users = getJsonData();
            var newUser = {
                "userID": userID,
                "userCostumeURL": avatarUrl,
                "userCostumeName": costumeName,
            };
            users.push(newUser);
            updateJsonFile(users);
        } else {
            updateCostume(avatarUrl, costumeName, userID)
        }
    }
    static fetchCostume(userID){
        return getJsonData().find(user => user.userID == userID);
    }
}
function updateCostume(newUrl, newName, userID){
    var users = getJsonData();
    var user = users.find(user => user.userID == userID);
    user.userCostumeURL = newUrl;
    user.userCostumeName = newName;
    updateJsonFile(users);

}
function userExists(userID){
    if(getJsonData().find(user => user.userID == userID)){
        return true;
    } 
    return false;
}
function getJsonData(){
    const data = fs.readFileSync('./users.json'); 
    return JSON.parse(data);
}
function updateJsonFile(data){
    const jsonString = JSON.stringify(data);
    fs.writeFileSync('./users.json', jsonString);
}
module.exports = CostumeManager;