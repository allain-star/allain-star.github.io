var firebaseConfig = {
  apiKey: "AIzaSyDGD1OvJtu3Z0sWCvGz_MW8I8xbNRjxq84",
  authDomain: "weconnectmoto.firebaseapp.com",
  databaseURL: "https://weconnectmoto.firebaseio.com",
  projectId: "weconnectmoto",
  storageBucket: "weconnectmoto.appspot.com",
  messagingSenderId: "785399505200",
  appId: "1:785399505200:web:af31d23588f6ebeaaae8f5",
  measurementId: "G-RGXEL9WZ0P"
};
firebase.initializeApp(firebaseConfig);

window.onscroll = function() {myFunction()};

var navbar = document.getElementById("navBar");
var sticky = navbar.offsetTop;
      
function myFunction() {
  if (window.pageYOffset >= sticky) {
      navbar.classList.add("sticky")
  } else {
      navbar.classList.remove("sticky");
  }
}

/*const loginButton = document.getElementById("loginButton");
const modal = document.getElementById("loginModal");
const cancelButton = document.getElementById("cancelBtn");
const submit = document.getElementById("submitBtn");
const ground = document.getElementById("background");

loginButton.addEventListener('click', function (){
  modal.style.display = "block";
  ground.style.display = "block";
});
cancelButton.addEventListener('click', function (){
  modal.style.display = "none";
  ground.style.display = "none";
});

const userChipt = document.getElementById("userInfo");
var processStatus = document.getElementById("serverResponse");
submit.addEventListener('click', function (){
  var username = document.getElementById("username").value;
  processStatus.innerHTML = "Please wait...";
  firebase.database().ref('USERS').on('value', function (snapshot){
    snapshot.forEach(element => {
      if(element.val().username == username){
        localStorage.setItem("user", element.val().username);
        ground.style.display = "none";
        modal.style.display = "none";
        loginButton.style.display = "none";
        userChipt.innerHTML = element.val().username;
        userChipt.style.display = "block";
        location.reload(); 
      }else{
        processStatus.innerHTML = "Invalid Credentials";
        processStatus.style.color = "red";
      }
    });
  });
});
*/
const logoutButton = document.getElementById("logoutButton");

logoutButton.addEventListener('click', function(){
  localStorage.setItem("log", "none");  
  location.reload();
});
/*
if(localStorage.getItem("user") == "login"){
  loginButton.style.display = "block";
}else{
  userChipt.innerHTML = localStorage.getItem('user');
  loginButton.style.display = "none";
  userChipt.style.display = "block";
  logoutButton.style.display = "block";
}*/

var button = ["ButtonGrad", ""];
function expandPrograms(program, button){
  program.style.display = "none";
  document.getElementById(button).style.display = "block";
  document.getElementById(program.className+"1").style.display = "block";
  temp = program.id;
}
function minimizePrograms(program, button){
  program.style.display = "none";
  document.getElementById(button).style.display = "block";
  document.getElementById(program.className+"1").style.display = "none";
}

var i = 0;
function expandProgramUnder(id){
  if(i == 0){
    document.getElementById(id.className).style.display = "block";
    document.getElementById(id.id).style.color = "#c51e3a";
    i++;
  }else{
    document.getElementById(id.className).style.display = "none";
    document.getElementById(id.id).style.color = "black";
    i = 0;
  }
  
}


      const logButton = document.getElementById("loginButton");
      const cancel = document.getElementById("cancelBtn");
      const modal = document.getElementById("loginModal");
      const teachInput = document.getElementById("teacher");
      const submit = document.getElementById("submitBtn");
      const message = document.getElementById("message");
      const fileAge = document.getElementById("fileDate");
      const userChipt = document.getElementById("userInfo");
      
      console.log(localStorage.getItem("log"));
      if(localStorage.getItem("log") == "none"){
        logButton.style.display = "block";
        var i = 0;
        
      }else{ 
        logButton.style.display = "none";
        logoutButton.style.display = "block";      
        if(localStorage.getItem("log") == "admin")
          document.getElementById("logButton").style.display = "inline";
            
      }
      
      logButton.addEventListener('click', function(){
        localStorage.setItem("log", "none");
      });
      logButton.addEventListener('click', function (){
        modal.style.display = "block";
      });
      cancel.addEventListener('click', function (){
        modal.style.display = "none";
      });
        
      submit.addEventListener('click', function (){
        var firebaseConfig = {
          apiKey: "AIzaSyDGD1OvJtu3Z0sWCvGz_MW8I8xbNRjxq84",
          authDomain: "weconnectmoto.firebaseapp.com",
          databaseURL: "https://weconnectmoto.firebaseio.com",
          projectId: "weconnectmoto",
          storageBucket: "weconnectmoto.appspot.com",
          messagingSenderId: "785399505200",
          appId: "1:785399505200:web:af31d23588f6ebeaaae8f5",
          measurementId: "G-RGXEL9WZ0P"
        };
        
        localStorage.setItem("log", "none");
        var teacherLog = teachInput.value;
        var userResults = 0;
        firebase.database().ref('USERS').on('value', function (snapshot){
            snapshot.forEach(element => {
              if(element.val().username == teacherLog){ 
                userResults++;
                modal.style.display = "none";
                logButton.style.display = "none";
                logoutButton.style.display = "block";
              }
            });
            console.log(userResults);
            if( userResults > 0){
              localStorage.setItem("log", "admin");
              console.log("admin");
              document.getElementById("logButton").style.display = "inline";
            }else if( userResults == 0){
              localStorage.setItem("log", teacherLog);
              console.log("VISITOR");
              submitLog();
            
            }
            
        });
        
        
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();;
        var time = today.getHours()+":"+today.getMinutes();
        
      /*  */
        function submitLog(){
          firebase.database().ref("log/"+teacherLog).set({
            name: teacherLog,
            date: date,
            time: time  
          });
          modal.style.display = "none";
          logButton.style.display = "none";
          logoutButton.style.display = "block";
        }
      });
       