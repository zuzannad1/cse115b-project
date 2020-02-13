// Get user data

  
function addUser(name, email, password) {
    firebase.auth().createUserWithEmailAndPassword(email,password).catch(function(error){
        const errcode = error.code
        const errmsg = error.message
        alert(errmsg)
    });
    var flaskURL = `localhost:5000`;
    var requestURL = `http://${flaskURL}/api/adduser`;
    $.post(requestURL, {name: name, email: email});
    
    console.log("Sign in" + email)
    
    console.log("name: " + name + "\nemail: " + email + "\npassword: " + password);
}

function authUser(email, password) {
    console.log("email: " + email + "\npassword: " + password);
    firebase.auth().signInWithEmailAndPassword(email,password).catch(function(error){
        const errcode = error.code;
        const errmsg = error.message;
        alert(errmsg);
    });
   
}

function signOutUser() {
    firebase.auth().signOut().then(function() {
    console.log('Signed Out');
    }, function(error) {
    console.error('Sign Out Error', error);
    });
    
}

function setGreeting() {
    db.transaction(function (tx) {
        tx.executeSql('SELECT name FROm users WHERE email=?', [localStorage.getItem('user')], function (tx, results) {
            let ud = results.rows.item(0);
            $("#greeting").html(`Hello, ${ud.name}`);
        })
    });
}