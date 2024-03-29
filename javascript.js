const DEFAULT_SIZE = 32;
const DEFAULT_PROPORTION = 1;
const DEFAULT_COLOR = 'black';
const DEFAULT_MODE = 'reg';
const RAINBOW_MODE = 'rainbow';

const container = document.querySelector('#container');

let currentSize = DEFAULT_SIZE;
let proportion = DEFAULT_PROPORTION;

let color = DEFAULT_COLOR;
let mode = DEFAULT_MODE;
let mousedown = false;

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

    let temp = parseInt(prompt('Choose the brush thickness:\n1 - Thick\n2 - Medium\n3 - Thin\nInsert the correspondent number!'));
    while(temp < 1 || temp > 3){
        temp = parseInt(prompt('INVALID NUMBER!\nChoose the brush thickness:\n1 - Thick\n2 - Medium\n3 - Thin\nInsert the correspondent number!'));
    }

    switch(temp){
        case 1:
            proportion = 0.5;
            break;
        case 2:
            proportion = 1;
            break;
        case 3:
            proportion = 2;
            break;
        default:
            break;
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
        mode = DEFAULT_MODE;
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
        mode = DEFAULT_MODE;
    } else {
        rainbowMode.checked = true;
        mode = RAINBOW_MODE;
    }
})

rainbowMode.addEventListener('change', () => {
    if(rainbowMode.checked){
        regMode.checked = false;
        mode = RAINBOW_MODE;
    } else {
        regMode.checked = true;
        mode = DEFAULT_MODE;
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

    for(let i = 0; i < size * proportion; i++){
        let div = document.createElement('div');
    
        div.setAttribute('style',
         `height: ${size * proportion * (1/proportion)}rem; width: ${1/proportion}rem; -webkit-user-drag: none; -moz-user-select: -moz-none; 
         -khtml-user-select: none;
         -webkit-user-select: none;
         -o-user-select: none;
         user-select: none;`);
    
        for(let j = 0; j < size * proportion; j++){
            let square = document.createElement('div');
    
            square.setAttribute('style',
             `height: ${1/proportion}rem; width: ${1/proportion}rem; background-color: white; ; border-width:0.01rem; -webkit-user-drag: none; -moz-user-select: -moz-none; 
             -khtml-user-select: none;
             -webkit-user-select: none;
             -o-user-select: none;
             user-select: none;`);
            
            square.addEventListener('mousedown', () => {
                mousedown = true;
            })

            square.addEventListener('mouseup', () => {
                mousedown = false;
            })

            square.addEventListener('mouseover', () => {
                if(mousedown === true){

                    if(mode === DEFAULT_MODE){
                        square.style.backgroundColor = color;
                    } else {
                        let x = Math.floor(Math.random() * 256);
                        let y = Math.floor(Math.random() * 256);
                        let z = Math.floor(Math.random() * 256);
                        let randomColor = "rgb(" + x + "," + y + "," + z + ")";
                        square.style.backgroundColor = randomColor;
                    }
                }
            })
    
            div.appendChild(square);
        }
    
        gridDiv.appendChild(div);
    }
}

createGrid(currentSize);