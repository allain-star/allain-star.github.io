         
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
  
  var allowAccess = "dasda";
  var programId = document.getElementById('programId').value;
  //validateUser(localStorage.getItem("user"));
  
  if( localStorage.getItem("user") == "login")
    document.getElementById("addingCourseButton").style.display = "none";
  else
  document.getElementById("addingCourseButton").style.display = "block";
  
  
  var fileUpdate = document.getElementById("fileDate");
  var add = document.getElementById("addingCourseButton");
  var user = localStorage.getItem("log");
  //console.log(user);
  localStorage.setItem("fileDate", "");
  
    if(user == "none"){
      fileUpdate.style.display = "none";
    }else{
      fileUpdate.style.display = "block";
      loadData();
    }
        
    if(localStorage.getItem("log") == "admin"){
      add.style.display = "block";
    }else if(localStorage.getItem("log") != "none"){  
      add.style.display = "none";     
    }
    
      
    fileUpdate.addEventListener("change", function (){
      displayNull();
      localStorage.setItem("fileDate", fileUpdate.value);
      loadData();
    });

    
    function displayNull(){
        document.getElementById('dataTable').innerHTML = "";
    }
  
    
    function loadData(){
          firebase.database().ref(programId+""+localStorage.getItem("fileDate")).orderByChild("code").on('value', function (snapshot){
          snapshot.forEach(element => {
            var content = '';
            var _code = element.val().code;
            var _title = element.val().title;
            var _description = element.val().description;
            var _unit = element.val().unit;
            var refCode = element.val().id;
            var pdf = element.val().pdf;
            
            if(localStorage.getItem("log") == "admin")
              content += "<tr style='font-weight: bold; border-bottom: 1px solid whitesmoke;'><td>"+_code+"</td><td>"+_title+"</td><td style='word-wrap: break-word; min-width: 800px;'>"+_description+"</td><td style='text-align: center;'>"+_unit+"</td><td style='text-align: right;'><button style='background: none; border: none; outline: none; margin-right: -37px;' onclick='openPdf("+refCode+")' ><img src='../css/icons/pdf.png' style='height: 22px; margin: 0px; cursor: pointer; border-right: 1px solid gray; padding-right: 4px;'></button><button style='outine: none; border: none; cursor: pointer;background: none; font-family: 'Source Sans Pro', sans-serif;' onclick='deleteData("+refCode+")'><img src='../css/icons/delete.png' height='22px padding: 0px; outline: none; margin-left: 0px;'></button></td></tr>";
            else
            content += "<tr style='font-weight: bold; border-bottom: 1px solid whitesmoke;'><td>"+_code+"</td><td>"+_title+"</td><td style='word-wrap: break-word; min-width: 800px;'>"+_description+"</td><td style='text-align: center;'>"+_unit+"</td><td style='text-align: right;'><button style='float:right; background: none; border: none; outline: none; margin-right: 0px;' onclick='openPdf("+refCode+")' ><img src='../css/icons/pdf.png' style='height: 22px; margin: 0px; cursor: pointer; padding-right: 4px;'></button></td></tr>";
            
            document.getElementById('dataTable').innerHTML += content;
          });

        });
    }
    
    var selectedFile;
    const file = document.getElementById('fileUploader');
            file.addEventListener('change', function(e){
              selectedFile = event.target.files[0];
              console.log(selectedFile);           
            });
    
    const uploadStatus = document.getElementById("uploadingStatus");
    const upload = document.getElementById("uploadPercentage");
    const submitBtn = document.getElementById('submit');        
            
            submitBtn.addEventListener('click', function(){
              uploadStatus.style.display = "block";
              //COURSE CONTENT
              var id = Math.floor(Math.random() * 5000);        
              var Code = document.getElementById('courseCode').value;
              var Title = document.getElementById('courseTitle').value;
              var Description = document.getElementById('courseDescription').value;
              var NumberUnits = document.getElementById('numberUnits').value;    
              var fileStatus = document.getElementById("fileDateUploading").value;
              //FILE UPLOAD
            
              var filename = selectedFile.name;
              var storageRef = firebase.storage().ref(filename);
              var uploadTask = storageRef.put(selectedFile);
              
              uploadTask.on('state_changed', function(snapshot){
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                      console.log('Upload is paused');
                      break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                      console.log('Upload is running');
                      upload.innerHTML = " ("+Math.floor(progress)+"%)";
                      break;
                  }
                  
                  if(progress == 100){
                    upload.innerHTML = " Complete";
                    setTimeout(function (){ 
                        document.getElementById('courseModal').style.display = "none";  
                        upload.style.display = "none";
                        document.getElementById("uploadingStatus").style.display = "none";
                        document.getElementById("bg").style.display = "none";
                        loadData();
                    }, 3000);
                    
                  }
                
              }, function(error) {
              }, function() {
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                  console.log('File available at', downloadURL);
                  firebase.database().ref(programId+""+fileStatus+"/"+id).set({
                        id: id,
                        code: Code,
                        title: Title,
                        description: Description,
                        unit: NumberUnits,
                        pdf: downloadURL,
                        file: filename
                  });
                  displayNull(); 
                });
              });        
            });
              
          
            function deleteData(idd){
              confirm("Are you sure?");
              firebase.database().ref(programId+""+localStorage.getItem("fileDate")+"/"+idd).on('value', function (snapshot){
                fileId = snapshot.val().file;
                firebase.database().ref(programId+""+localStorage.getItem("fileDate")+"/"+idd).remove();    
                firebase.storage().ref().child(snapshot.val().file).delete();
              });  
              displayNull();
              loadData();    
            }
            
            function openPdf(id){
              firebase.database().ref(programId+"/"+id).on('value', function (snapshot){
                window.open(snapshot.val().pdf);
              }); 
            } 
  
  
  function logout(){
    location.replace("../index.html");
  }
  
  function validateUser(user){
    firebase.database().ref("USERS/"+user).on( 'value', function (snapshot){
      if(snapshot.val().username == user)
        allowAccess = "allow";
      else
        allowAccess = "denied";
      
    });
  }
  
  var backtoTopBtn = document.getElementById("floatingButton");  
  window.onscroll = function() {scrollFunction()};

  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      backtoTopBtn.style.display = "block";
    } else {
      backtoTopBtn.style.display = "none";
    }
  }
  
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }


function addCourse(){
  document.getElementById("courseModal").style.display = "block";
  document.getElementById("bg").style.display = "block";
}

function closeModal(){
  document.getElementById("courseModal").style.display = "none";
  document.getElementById("bg").style.display = "none";
}