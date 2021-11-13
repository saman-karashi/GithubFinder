class GitHubFinder {
constructor() {
this.card = document.querySelectorAll('.card');
this.input=document.querySelector('#searchInput')
this.api_key='fe3d9aed8134c443534da888d9323cbd919001ae'
}

async getUsers() {

    const fetchUsersData = await fetch(`https://api.github.com/users?api-key=${this.api_key}`, {
      accept: 'application/vnd.github.v3+json',
      method: 'GET',
    });
    const response = await fetchUsersData.json();
  
    return response;
}

searchHandler(){
this.getUsers().then(resovle=>{
for(let i=0; i<this.card.length ; i++){
const users=resovle[i].login.toLocaleLowerCase();

this.input.addEventListener('keyup', (event)=>{
const inputValue=event.target.value;

if(users.indexOf(inputValue) > -1){
return this.card[i].style.display='flex'
}else{
return this.card[i].style.display='none'
}
})
}
})

document.addEventListener('DOMContentLoaded' , ()=>{
this.input.value='';
})
}

}

class UI {
  constructor() {
      this.card = document.querySelectorAll('.card');
      this.container=document.querySelector('.container')
    }
    
    displayUsersProfile() {
        usersInformInstance.getUsers().then(resolve => {
            for (let index = 0; index < this.card.length; index++) {
                this.card[index].innerHTML = `
                <div class="mb">
                <img src=${resolve[index].avatar_url}>
                </div>
                <div class="mb">
                <p class="para">${resolve[index].login}</p>
                </div>
                <div class="mt">
                <a href=${resolve[index].html_url} target=__blank class="btn dark">More</a>
                </div>
                `;
            }
        }).catch( ()=> {
            this.container.innerHTML=`
            <div class='center'>
            <p class='line-height para'>There's something went wrong,</p>
            <br>
            <p class='line-height para'>Please reload the page.</p>
            <button class='btn dark' type='reset' value='Try Again'>Try Again</button>
            </div>
            `
            document.querySelector('button[type=reset]').addEventListener('click',()=>{
                window.location.reload()
            })
        });
    }
}

const usersInformInstance = new GitHubFinder();
const ui = new UI();
ui.displayUsersProfile();
usersInformInstance.searchHandler()
