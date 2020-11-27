         
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
  
  function loadData(){
    
    var i = 0;
    firebase.database().ref("MAT").on('value', function (snapshot){
      
      snapshot.forEach(element => {
    
        var content = '';
        var _code = element.val().code;
        var _title = element.val().title;
        var _description = element.val().description;
        var _unit = element.val().unit;
        var refCode = element.val().id;
        var pdf = element.val().pdf;
        
        if( i%2 == 0)
          content += '<tr style="background-color: #f2f2f2; padding: 8px; text-align: left;"><td><button onclick="openPdf('+refCode+')" style="background: none; border: none; cursor: pointer; text-align: left; font-family: "Source Sans Pro", sans-serif; outline: none;">'+_code+'</button></td><td style="font-family: "Source Sans Pro", sans-serif;">'+_title+'</td><td style="font-family: "Source Sans Pro", sans-serif;">'+_description+'</td><td style="text-align: center; font-family: "Source Sans Pro", sans-serif;">'+_unit+'</td><td><button style="outine: none; border: none; cursor: pointer;background: none; font-family: "Source Sans Pro", sans-serif;" onclick="deleteData('+refCode+')"><img src="../css/icons/remove.png" height="19px"></button></td></tr>';
        else
          content += "<tr style='padding: 8px; background: none; padding: 8px;'><td><button onclick='openPdf("+refCode+")' style='background: none; border: none; cursor: pointer; text-align: left; outline: none; font-family: 'Source Sans Pro', sans-serif;'>"+_code+"</button></td><td>"+_title+"</td><td style=''>"+_description+"</td><td style='text-align: center; '>"+_unit+"</td><td style='width: 20px; text-align: center;'><button style='background: none; outline: none; border: none;cursor: pointer;' onclick='deleteData("+refCode+")'><img src='../css/icons/remove.png' height='19px'></button></td></tr>"; 
        document.getElementById('dataTable').innerHTML += content;
        i++;
      });
          
    });
    
  }
  
  /*
  var selectedFile;
          const file = document.getElementById('fileUploader');
          file.addEventListener('change', function(e){
            selectedFile = event.target.files[0];
            var storageRef = firebase.storage().ref('/files/');
            console.log(selectedFile);
            
          });
  
  const submitBtn = document.getElementById('submit');        
          submitBtn.addEventListener('click', function(){
            
            //COURSE CONTENT
            var id = document.getElementById('numCode').value;        
            var Code = document.getElementById('courseCode').value;
            var Title = document.getElementById('courseTitle').value;
            var Description = document.getElementById('courseDescription').value;
            var NumberUnits = document.getElementById('numberUnits').value;    
  
            //FILE UPLOAD
            var filename = selectedFile.name;
            var storageRef = firebase.storage().ref(+id+'/'+filename);
            var uploadTask = storageRef.put(selectedFile);
            
            uploadTask.on('state_changed', function(snapshot){
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
              switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                  console.log('Upload is paused');
                  break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                  console.log('Upload is running');
                  break;
              }
              
              if(progress == 100){
                alert("Upload Complete");
                document.getElementById('courseModal').style.display = "none";
               
              }
            }, function(error) {
              // Handle unsuccessful uploads
            }, function() {
              // Handle successful uploads on complete
              // For instance, get the download URL: https://firebasestorage.googleapis.com/...
              uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                console.log('File available at', downloadURL);
                //UPLOAD THE ACTUAL CONTENT
                firebase.database().ref("MAT/"+id).set({
                      id: id,
                      code: Code,
                      title: Title,
                      description: Description,
                      unit: NumberUnits,
                      pdf: downloadURL,
                      file: filename
                });
                
                location.reload();    
                loadData();
                
                
              });
              
            });
            
            
            
           
          });
            
        
          function deleteData(idd){
            
            var storageRef = firebase.storage().ref();

            // Points to 'images'
            
            firebase.database().ref("MAT/"+idd).on('value', function (snapshot){
              
              console.log(idd+'/'+snapshot.val().file);
              fileId = snapshot.val().file;
            });
            
              firebase.database().ref("MAT/"+idd).remove();;
              var spaceRef = storageRef.child(idd+'/'+fileId);

              spaceRef.delete().then(function() {
                
                   
              }).catch(function(error) {

              });
              alert('Remove row');
              location.reload(); 
                  
          }
          
          function openPdf(id){
            
            
            console.log(id);
            
            
            firebase.database().ref("MAT/"+id).on('value', function (snapshot){
              
              window.open(snapshot.val().pdf);
              
            });
            
          }
          */