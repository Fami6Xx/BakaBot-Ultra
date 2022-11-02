const fs = require("fs");

// Register
// Login
// CheckName
// VerifyEmail?? - maybe not needed, as email might not be verified at all... we could just use discord verification instead
// data write

function checkUsersFile(){
    if(!fs.existsSync("/data/users.json")){
        fs.writeFileSync("/data/users.json", "[]");
    }
}

function getUsersJSON(){
    checkUsersFile();
    return fs.readFileSync("/data/users.json").toJSON();
}


