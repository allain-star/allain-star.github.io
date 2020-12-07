function openNav(id){
  
  const tabs = document.querySelectorAll('[data-tab-target]');
  const content = document.querySelectorAll('[data-tab-content]');
  
    tabs.forEach(tab =>{
  
      tab.addEventListener('click', () =>{
        const targetTab = document.querySelector(tab.dataset.tabTarget); 
        content.forEach(contentTab => {
          contentTab.classList.remove('active');
        });
        tabs.forEach(tabButtons => {
          tabButtons.classList.remove('active');
        });
        tab.classList.add('active');
        
        content.forEach(contentTab => {
          contentTab.classList.add('content');
        });
        
        targetTab.classList.remove('content');
        targetTab .classList.add('active');
      });
  
    });
    
} 

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

const logArea = document.getElementById("logData");

firebase.database().ref("log").orderByChild("time").on('value', function (snapshot){
  var i = 1;
  snapshot.forEach(logData =>{
    console.log(i);
    if(i % 2 == 0)
      logArea.innerHTML += "<tr style='font-size: small; border-bottom: 1px solid whitesmoke;'><td>"+logData.val().name+"</td><td style='text-align: center;'>"+logData.val().time+"</td><td>"+logData.val().date+"</td></tr>";
    else
      logArea.innerHTML += "<tr style='font-size: small; background-color: #f2f2f2; border-bottom: 1px solid whitesmoke;'><td style='background-color: #f2f2f2;'>"+logData.val().name+"</td><td style='background-color: #f2f2f2; text-align: center;'>"+logData.val().time+"</td><td style='background-color: #f2f2f2;'>"+logData.val().date+"</td></tr>";
  
    i++;
  });
});




      