function render(count = 50){
    let container = document.querySelector('.container');
    container.innerHTML = '';
    fetch(`https://meme-api.herokuapp.com/gimme/${count}`)
    .then(result => result.json())
    .then(data => data.memes.forEach(item =>{
      
        // console.log(item);
        container.innerHTML += `
        <div class="card" style="width: 18rem;">
        <img src="${item.url}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Author: ${item.author}</h5>
          <a href="${item.postLink}" target="_blast" class="btn btn-primary">Detail</a>
        </div>
      </div>
        `
    }))
};
render();
let updatePageBtn = document.querySelector('#update-btn');

updatePageBtn.addEventListener('click', () => {
    render();
});
let selectCount = document.querySelectorAll('.dropdown-item');
selectCount.forEach(item => {
    item.addEventListener('click', (e)=> {
        render(e.target.innerText);
    })
})