


  
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
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
   
   const submitBtn = document.getElementById('submit');
   console.log(submitBtn);
   
   
   
  var Myname = "allain john notarte";
  var programCode = "MAT";
  var courseCode = "MAT501";
  firebase.database().ref("Programs/"+programCode).set({
    
      code: courseCode,
      courseTitle: "The Foundation of Education"
    
  });
  


