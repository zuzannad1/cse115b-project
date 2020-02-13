// This script is used to replace HTML data with dynamic data

//Map values to html elements
let valToHTML = {}  //Syntax: [`elementID`, `displayName`]
valToHTML[`Energy`] = [`#energy`, `Calories`];
valToHTML[`Sugars, total`] = [`#sugars`, `Sugars`];
valToHTML[`Total lipid (fat)`] = [`#lipids`, `Fats`];
valToHTML[`Carbohydrate, by difference`] = [`#carbs`, `Carbohydrates`];

//Config
let databasekey = `10SKlZqWe3IkC3ymxUWxzMrjgUfNFuixcuqY10gC`;
let dbnum = `01009`;
let ntCategories = `&nutrients=205&nutrients=204&nutrients=208&nutrients=269`;
let flaskURL = `localhost:5000`;

function searchTutors(searchTerm) {
  searchTerm = searchTerm.split(":")[0];
  let searchQuery = `http://${flaskURL}/api/tutors/${searchTerm}`;

  $.get(searchQuery, function(data) {
    if (data[`tutors`] === undefined) {
      $(name).html(`<b>No tutor found for class: ${searchTerm}<b>`)
      return;
    }
    let tutors = data[`tutors`]
    console.log(tutors);
    $("#name").empty();
    $("#name").append(`<b>Available Tutors</b>`);
    
    for(var i = 0; i < tutors.length; i ++){
      var name = tutors[i].name.replace(" ","-")
      $("#name").append(
        `<div class = "column">
        <div class="card" style="width:35%;height:35%;margin-left:0%;margin-right:30%;margin-top:10%; margin-bottom: 10%; text-align:center;">
        <img src = "images/female.png" alt = "Avatar" style = "width:100%;margin-bottom: 10px">
        <div class="container">
        <h3>${tutors[i][`name`]}</h3>
        <button id = "${name}" style = "background-color: inherit; color: gray-dark; border: None;" onclick = "clicking(this.id)">Request Me</button>
        </div>
        </div>
        </div>
        `
      );
      $(`#${name}`).data("name", tutors[i][`name`]);
      $(`#${name}`).data("email", tutors[i][`email`]);
      $(`#${name}`).data("class", searchTerm);
      
      /*
      $("#Priya Rajarathinam").data('tutor_info',{
        name: tutors[i][`name`],
        email: tutors[i][`email`]
      });
      */
      console.log();
    } 
    //$("#name").html(`<b> ${tutors[0][`name`]} <b>`);
  })
}
function loadCheckBoxes(filter=undefined) {
  let searchQuery = `http://${flaskURL}/api/courses/all`;

  $.get(searchQuery).then(function (data) {
    if (data === undefined) {
      return;
    }
    options = Object.keys(data);
    $("#listofclasses").empty()
    for(var i = 0; i < options.length; i++){
      var classOptionHtml = 
        `<div class="checkbox">
        <label><input type="checkbox" name = "checkboxlist">${options[i]}</label>
        </div>`
      if (filter == undefined || options[i].startsWith(filter)) {
        $("#listofclasses").append(classOptionHtml)
      }
    }
  });
}


function addTutor() {
  var checkValues = $('input[name=checkboxlist]:checked').map(function() {
        return $(this).parent().text();
    }).get();
  var user_email = firebase.auth().currentUser.email;
  var user_name;
  var searchQuery = `http://${flaskURL}/api/user/${user_email}`;
    $.get(searchQuery, function(data) {
      console.log(data);
      user_name = data.name;
      searchQuery = `http://${flaskURL}/api/addtutor`;
   
      $.post(searchQuery, 
        { id: user_email, 
          name: user_name,
          class_id: JSON.stringify(checkValues)
        }); 
      
  
    });
    //do something with your checkValues array
}

function clicking(clicked_id) {
  //console.log(tutor);
  if (confirm('Clicking OK will send a tutor an email')) {
    var tutor_name = $(`#${clicked_id}`).data("name");
    var tutor_email = $(`#${clicked_id}`).data("email");
    var class_name = $(`#${clicked_id}`).data("class");
    var currentuser = firebase.auth().currentUser;
    var user_email = currentuser.email;
    var user_name;
    var searchQuery = `http://${flaskURL}/api/user/${user_email}`;
    $.get(searchQuery, function(data) {
      console.log(data);
      user_name = data.name;
      searchQuery = `http://${flaskURL}/api/sendNotification`;
      $.post(searchQuery, 
        { receiver_email: tutor_email, 
          receiver_name: tutor_name,
          student_email: user_email,
          student_name: user_name,
          class_name: class_name
        });  
    });
  } else {
      return false;
  }
}

// This function gets the profile of the user 
function getProfile() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var user_email = user.email;
      let searchQuery = `http://${flaskURL}/api/user/${user_email}`;
      $.get(searchQuery, function(data) { 
        console.log("this is data", data);
        let userName = data.name;
        let userEmail = data.email;
        $(".name").append("<b>"+ "&nbsp;"+ userName+"</b>");
        $(".email").append("<b>"+ "&nbsp;"+ userEmail+"</b>");
        console.log("this is the user's email", user);
      })
    } else {
      // No user is signed in.
    }
  });
}


function formatTitle(text) {  //Removes UPC and formats capitalization
  return text.toLowerCase()
    .split(` `)
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(` `);
}