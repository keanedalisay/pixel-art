const colorBtn = document.getElementById('color');
const eraseBtn = document.getElementById('erase');
const fillBtn = document.getElementById('fill');
const clearBtn = document.getElementById('clear');
const resizeBtn = document.getElementById('resize');

const usualColorBtn = document.getElementById('usual-color');
const randomColorBtn = document.getElementById('random-color');
const toggleGridBtn = document.getElementById('toggle-grid');

const colorDropdown = document.querySelector('.color-options');
const eraseDropdown = document.querySelector('.erase-options');
const resizeDropdown = document.querySelector('.resize-options');

const overlay = document.getElementById('overlay');

document.addEventListener('click', displayDropdown);

function displayDropdown(e){
    if (e.target === overlay){
        colorDropdown.classList.add('no-display');
        eraseDropdown.classList.add('no-display');
        resizeDropdown.classList.add('no-display');

        colorBtn.classList.remove('selected');
        eraseBtn.classList.remove('selected');
        resizeBtn.classList.remove('selected');

        overlay.classList.remove('overlay');
    } else if (e.target === colorBtn){
        colorDropdown.classList.remove('no-display');
        colorBtn.classList.add('selected');

        overlay.classList.add('overlay');
    } else if (e.target === eraseBtn){
        eraseDropdown.classList.remove('no-display');
        eraseBtn.classList.add('selected');

        overlay.classList.add('overlay');
    } else if (e.target === resizeBtn){
        resizeDropdown.classList.remove('no-display');
        resizeBtn.classList.add('selected');

        overlay.classList.add('overlay');
    } 
}


const colorBtnImg = document.querySelector('.color-img');
const usualColorPalette = document.querySelector('.usual-img');

let usualColorValue;

usualColorBtn.addEventListener('click', intUsualColor);

function intUsualColor(e){
    usualColorPalette.click();
    usualColorPalette.addEventListener('input', getUsualColor);
}
function getUsualColor(){
    usualColorValue = this.value;
    colorBtnImg.style.cssText = `background-color: ${usualColorValue}`;
    fillBtn.style.cssText = `background-color: ${usualColorValue}`;
    const blocks = document.querySelectorAll('#block');
    blocks.forEach((block) => {
        block.classList.add('sketch');
        block.classList.remove('erase');

        block.removeEventListener('dragenter', applyRandomColor);
        block.removeEventListener('mousedown', applyRandomColor);

        block.removeEventListener('dragenter', eraseBlock);
        block.removeEventListener('mousedown', eraseBlock);

        block.addEventListener('dragenter', applyUsualColor);
        block.addEventListener('mousedown', applyUsualColor);
    })
}
function applyUsualColor(){
    this.style.cssText = `background-color: ${usualColorValue}`;
}


randomColorBtn.addEventListener('click', intRandomColor);

function intRandomColor(e){
    const blocks = document.querySelectorAll('#block');
    blocks.forEach((block) => {
        block.classList.add('sketch');
        block.classList.remove('erase');

        block.removeEventListener('dragenter', applyUsualColor);
        block.removeEventListener('mousedown', applyUsualColor);

        block.removeEventListener('dragenter', eraseBlock);
        block.removeEventListener('mousedown', eraseBlock);

        block.addEventListener('dragenter', applyRandomColor);
        block.addEventListener('mousedown', applyRandomColor);
    })
}
function applyRandomColor(){
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    this.style.cssText = `background-color: rgb(${r}, ${g}, ${b})`;
}


const eraseSlider = document.getElementById('erase-slider');
const eraseLabel = document.getElementById('erase-size');

eraseSlider.addEventListener('input', getEraseSize);

function getEraseSize(e){
    eraseValue = e.target.valueAsNumber;
    eraseSize = eraseValue * eraseValue;
    changeEraseLabel();
    const blocks = document.querySelectorAll('#block');
    blocks.forEach((block) => {
        block.classList.add('erase');
        block.classList.remove('sketch');

        block.removeEventListener('dragenter', applyUsualColor);
        block.removeEventListener('mousedown', applyUsualColor);

        block.addEventListener('dragenter', applyRandomColor);
        block.addEventListener('mousedown', applyRandomColor);

        block.addEventListener('dragenter', eraseBlock);
        block.addEventListener('mousedown', eraseBlock);
    })
}
function changeEraseLabel(){
    eraseLabel.textContent = `
    ${eraseValue} x ${eraseValue}
    `;
}
function eraseBlock(e){
    this.style.cssText =  `background-color: none`;
}


fillBtn.addEventListener('click', intFillCanvas);

function intFillCanvas(e){
    const blocks = document.querySelectorAll('#block');
    blocks.forEach((block) => {
        block.style.cssText = `background-color: ${usualColorValue}`;
    })
}


clearBtn.addEventListener('click', intClearCanvas)

function intClearCanvas(e){
    const blocks = document.querySelectorAll('#block');
    blocks.forEach((block) => {
        block.style.cssText = `background-color: none`;
    })
}


const resizeSlider = document.getElementById('canvas-slider');
const resizeLabel = document.getElementById('canvas-size');

let canvasValue;
let crtCanvasSize = 225;
let intCanvasSize;

resizeSlider.addEventListener('input', getCanvasSize)
window.addEventListener('load', applyDefaultCanvas);

function applyDefaultCanvas(e){
    for (let i = 225; i > 0; i--){
        const block = document.createElement('div');
        block.setAttribute('id', 'block');
        block.classList.add('block');
        canvas.appendChild(block);
        intCanvasSize--;
    }
}

function getCanvasSize(e){
    canvasValue = e.target.valueAsNumber;
    changeResizeLabel();
    styleCanvasGrid();
    intCanvasSize = canvasValue * canvasValue;
    if (crtCanvasSize !== intCanvasSize){
        while (crtCanvasSize > 0){
            const block = document.getElementById('block');
            canvas.removeChild(block);
            crtCanvasSize--;
        }
        crtCanvasSize = intCanvasSize;
        while (intCanvasSize > 0){
            const block = document.createElement('div');
            block.setAttribute('id', 'block');
            block.classList.add('block');
            canvas.appendChild(block);
            intCanvasSize--;
        }
    }
}
function styleCanvasGrid(){
    canvas.style.cssText = `
    grid-template-columns: repeat(${canvasValue}, auto);
    grid-template-rows: repeat(${canvasValue}, auto);
    `
}
function changeResizeLabel(){
    resizeLabel.textContent =  `
    ${canvasValue} x ${canvasValue}
    `;
}


toggleGridBtn.addEventListener('click', toggleClassGrid);

function toggleClassGrid(e){
    const blocks = document.querySelectorAll('#block');
    blocks.forEach((block) => {
        block.classList.toggle('grid');
    })
}
