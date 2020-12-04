

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


function openModal(id){
  document.getElementById(id).style.display = "block";
  document.getElementById("numCode").value = Math.floor(Math.random()*10000);
}

function closeModal(id){
  document.getElementById(id).style.display = "none";
}

function sendingProgramId(courseId){
  
}
