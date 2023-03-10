const DEFAULT_COLOR = 'white';
const DEFAULT_MODE = 'color';
let current_color = DEFAULT_COLOR;
let current_mode = DEFAULT_MODE;

const grid = document.querySelector('.grid');
const slider = document.querySelector('#slider');
const sliderLabel = document.querySelector('#slider-label')
const clear = document.querySelector('#clear');
const color = document.querySelector('#color');
const colorInput = document.querySelector('#color-input')
const rainbow = document.querySelector('#rainbow');

colorInput.addEventListener('input', () => getColor());
clear.addEventListener('click', () => clearGrid());
rainbow.addEventListener('click', () => setCurrentMode('rainbow'));
color.addEventListener('click', () => setCurrentMode('color'));
slider.addEventListener('input', () => {
    let size = slider.value;
    createGrid(size);
    updateSliderLabel(size);
});

// helper function to change the mode from color to rainbow and vice versa

function setCurrentMode(newMode) {
    activateMode(newMode);
    current_mode = newMode;
}

// creates the grid and adds the functionality for changing the grid squares

function createGrid(size) {

    grid.innerHTML = '';

    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size*size; i++) {
        let div = document.createElement('div');
        div.classList.add('grid-square');
        grid.appendChild(div);
    }

    const squares = document.querySelectorAll('.grid-square');

    squares.forEach(square => {
        square.addEventListener('mouseover', () => {
            colorSquare(square);
        });
    });
}

// clears the grid 

function clearGrid() {
    const squares = document.querySelectorAll('.grid-square');
    squares.forEach(square => {
        square.style.backgroundColor = 'black';
    });
}

// colors in the squares when hovered over

function colorSquare(square) {
    if (current_mode === 'rainbow') {
        const randomR = Math.floor(Math.random() * 265);
        const randomG = Math.floor(Math.random() * 265);
        const randomB = Math.floor(Math.random() * 265);
        square.style.backgroundColor = `rgb(${randomR},${randomG},${randomB})`;
    } else {
        square.style.backgroundColor = current_color;
    }
}

// gets the color from the color input

function getColor() {
    let colorHEX = colorInput.value;
      // Remove the # character if it exists
    colorHEX = colorHEX.replace('#', '');
    // Convert the hexadecimal value to RGB values
    let r = parseInt(colorHEX.substring(0, 2), 16);
    let g = parseInt(colorHEX.substring(2, 4), 16);
    let b = parseInt(colorHEX.substring(4, 6), 16);
    current_color = `rgb(${r},${g},${b})`;
}

// updates the grid size

function updateSliderLabel(size) {
    sliderLabel.textContent = `Grid size: ${size}x${size}`;
}

// updates the mode based on user input

function activateMode(newMode) {
    if (current_mode === 'rainbow') {
        rainbow.classList.remove('active');
    } else {
        color.classList.remove('active');
    }

    if (newMode === 'rainbow') {
        rainbow.classList.add('active');
    } else {
        color.classList.add('active');
    }
}

// default grid size

createGrid(16);