const DEFAULT_SIZE = 16;

const container = document.querySelector('#container');

let currentSize = DEFAULT_SIZE;

let color = 'red';
let mode = 'reg';

let btnDiv = document.createElement('div');
let gridDiv = document.createElement('div');

gridDiv.setAttribute('style', 'display: flex;')

let gridBtns = document.createElement('div');

let gridButton = document.createElement('button');

gridButton.setAttribute('style',
 'height: 4rem; width: 16rem; font-size: 2rem; border-radius: 55px; background-color: #CD5C5C; color: #87CEEB;')

gridButton.textContent = 'New Grid';

gridButton.addEventListener('click', () => {
    let newSize = parseInt(prompt('How many squares? (MAX: 100)'));
    while(newSize > 100 || newSize <= 0){
        newSize = parseInt(prompt('INVALID NUMBER!\nHow many squares? (MAX: 100)'));
    }

    currentSize = newSize;
    createGrid(currentSize);
})

let clearGridBtn = document.createElement('button');
clearGridBtn.setAttribute('style',
 'height: 4rem; width: 16rem; font-size: 2rem; border-radius: 55px; background-color: #CD5C5C; color: #87CEEB;')

 clearGridBtn.textContent = 'Clear';
clearGridBtn.addEventListener('click', () => {
    createGrid(currentSize);
})

gridBtns.appendChild(clearGridBtn);
gridBtns.appendChild(gridButton);

document.body.insertBefore(gridBtns, container);

btnDiv.setAttribute('style', 'display: flex; flex-direction: column;');

let colorTitle = document.createElement('h3');
colorTitle.textContent = 'Colors';
btnDiv.appendChild(colorTitle);

let colorArray = ['#FF0000', '#FF8000', '#FFFF00', '#80FF00', '#00FF00',
 '#00FF80', '#00FFFF', '#0080FF', '#0000FF', '#7F00FF',
  '#FF00FF', '#FF007F', '#808080', '#000000', '#FFFFFF'];

let colorsDiv = document.createElement('div');
colorsDiv.setAttribute('style', 'display: flex; flex-wrap: wrap; width: 6rem;')

for(let i = 0; i < colorArray.length; i++){
    let colorBtn = document.createElement('button');
    let bgColor = colorArray[i];
    colorBtn.setAttribute('style', `height: 2rem; width: 2rem; background-color: ${bgColor};`);

    colorBtn.addEventListener('click', () => {
        mode = 'reg';
        regMode.checked = true;
        rainbowMode.checked = false;
        color = bgColor;
    })
    colorsDiv.appendChild(colorBtn);
}

btnDiv.appendChild(colorsDiv);

let modeTitle = document.createElement('h3');
modeTitle.textContent = 'Modes';
btnDiv.appendChild(modeTitle);

let modeDiv = document.createElement('div');
let regMode = document.createElement('input');
let regLabel = document.createElement('label');
regLabel.textContent = 'Regular';
regMode.type = 'checkbox';
regMode.checked = true;

let rainbowMode = document.createElement('input');
let rainbowLabel = document.createElement('label');

rainbowLabel.textContent = 'Rainbow';
rainbowMode.type = 'checkbox';


regMode.addEventListener('change', () => {
    if(regMode.checked){
        rainbowMode.checked = false;
        mode = 'reg';
    } else {
        rainbowMode.checked = true;
        mode = 'rainbow';
    }
})

rainbowMode.addEventListener('change', () => {
    if(rainbowMode.checked){
        regMode.checked = false;
        mode = 'rainbow';
    } else {
        regMode.checked = true;
        mode = 'reg';
    }
})

modeDiv.appendChild(regLabel);
modeDiv.appendChild(regMode);

modeDiv.appendChild(rainbowLabel);
modeDiv.appendChild(rainbowMode);

btnDiv.appendChild(modeDiv);
container.appendChild(btnDiv);
container.appendChild(gridDiv);

function createGrid(size){
    gridDiv.innerHTML = '';

    for(let i = 0; i < size; i++){
        let div = document.createElement('div');
    
        div.setAttribute('style',
         'height: 16rem; width: 1rem;');
    
        for(let j = 0; j < size; j++){
            let square = document.createElement('div');
    
            square.setAttribute('style',
             'height: 1rem; width: 1rem; background-color: white; border-style: solid; border-color: black; border-width:0.01rem;');
            
            square.addEventListener('mouseover', () => {
                if(mode === 'reg'){
                    square.style.backgroundColor = color;
                } else {
                    let x = Math.floor(Math.random() * 256);
                    let y = Math.floor(Math.random() * 256);
                    let z = Math.floor(Math.random() * 256);
                    let randomColor = "rgb(" + x + "," + y + "," + z + ")";
                    square.style.backgroundColor = randomColor;
                }
            })
    
            div.appendChild(square);
        }
    
        gridDiv.appendChild(div);
    }
}

createGrid(currentSize);