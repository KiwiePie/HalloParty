const fs = require('fs')

class CostumeManager {
    //set up costume  
    static wear(avatarUrl, costumeName, userID){ 
        //check if user already has a costume 
        if(!userExists(userID)){  
            //create new costume

            var users = getJsonData();
            var newUser = {
                "userID": userID,
                "userCostumeURL": avatarUrl,
                "userCostumeName": costumeName,
            };
            users.push(newUser);
            updateJsonFile(users);
        } else {
            //update user's costume

            updateCostume(avatarUrl, costumeName, userID) 
        }
    }
    //get user's costume data
    static fetchCostume(userID){        

        return getJsonData().find(user => user.userID == userID);
    }
}
//helper methods 

//update user's costume method
function updateCostume(newUrl, newName, userID){

    var users = getJsonData();
    var user = users.find(user => user.userID == userID);
    user.userCostumeURL = newUrl;
    user.userCostumeName = newName;
    updateJsonFile(users);

}
//check if user's costume is registered in the database  
function userExists(userID){

    if(getJsonData().find(user => user.userID == userID)){
        return true;
    } 
    return false;
}
//fetch data from database
function getJsonData(){

    const data = fs.readFileSync('./users.json'); 
    return JSON.parse(data);
}
//update data
function updateJsonFile(data){

    const jsonString = JSON.stringify(data);
    fs.writeFileSync('./users.json', jsonString);
}
module.exports = CostumeManager;