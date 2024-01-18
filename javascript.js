const DEFAULT_SIZE = 16;

const container = document.querySelector('#container');

let color = 'red';

let colorButton = document.createElement('button'); //TODO

function createGrid(size){
    container.innerHTML = '';

    for(let i = 0; i < size; i++){
        let div = document.createElement('div');
    
        div.setAttribute('style',
         'height: 16rem; width: 1rem;');
    
        for(let j = 0; j < size; j++){
            let square = document.createElement('div');
    
            square.setAttribute('style',
             'height: 1rem; width: 1rem; border-style: solid; border-color: black; border-width:0.01rem;');
            
            square.addEventListener('mouseover', () => {
                square.style.backgroundColor = color;
            })
    
            div.appendChild(square);
        }
    
        container.appendChild(div);
    }
}

createGrid(DEFAULT_SIZE);

let gridButton = document.createElement('button');

gridButton.setAttribute('style',
 'height: 4rem; width: 16rem; font-size: 2rem; border-radius: 55px; background-color: #CD5C5C; color: #87CEEB;')

gridButton.textContent = 'New Grid';

gridButton.addEventListener('click', () => {
    let newSize = parseInt(prompt('How many squares? (MAX: 100)'));
    while(newSize > 100 || newSize <= 0){
        newSize = parseInt(prompt('INVALID NUMBER!\nHow many squares? (MAX: 100)'));
    }

    createGrid(newSize);
})

document.body.insertBefore(gridButton, container);

