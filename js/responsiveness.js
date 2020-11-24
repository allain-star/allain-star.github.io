function openNav(id){
  console.log(1);
  const tabs = document.querySelectorAll('[data-tab-target]');
  const content = document.querySelectorAll('[data-tab-content]');
    tabs.forEach(tab =>{
      tab.addEventListener('click', () =>{
        const targetTab = document.querySelector(tab.dataset.tabTarget); 
        //DISPOSING 'active' CLASS NAME
        content.forEach(contentTab => {
          contentTab.classList.remove('active');
        });
        tabs.forEach(tabButtons => {
          tabButtons.classList.remove('active');
        });
        tab.classList.add('active');
        //LOOP FOR PUTTING CONTENT TO CLASS NAME OF TABS
        content.forEach(contentTab => {
          contentTab.classList.add('content');
        });
        //THE TARGET CONTENT
        targetTab.classList.remove('content');
        targetTab .classList.add('active');
      });
    });
    
} 

function buttonPressed(id){
  var navButtons = ["dashboard", "courses", "departments"];
  
    document.getElementsByClassName(id).classList.remove('active');
  
}