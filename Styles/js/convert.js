var fileExtension;
var conversionAllowed = false;
var convertTypeSelected = true;
var convertType;
var p;

document.getElementById("file-to-convert").addEventListener("change", function () {
    if (this.files && this.files[0]) {
        var label = document.querySelector(".convert-box h3");
        p = document.getElementById("dropafile-p");

        label.textContent = "File Selected";
        p.textContent = this.files[0].name;

        // Get the file extension
        fileExtension = getFileExtension(this.files[0].name);

        // Display the file extension
        // var fileTypeDisplay = document.getElementById("file-type-display");
        // fileTypeDisplay.textContent = "File Type: " + fileExtension;

        document.getElementById('select-a-file-h3').style.display = 'none';
        document.querySelector('svg.upload-file-icon').style.display = 'none';
        document.getElementById('file-img').setAttribute("src", `./Styles/img/${fileExtension.toUpperCase()}.svg`);

        document.querySelector('.convert-file-types-images-container').classList.add('display-grid');


        if (!(fileExtension == 'pdf')) {
            document.querySelector('#convert-file-img').setAttribute("src", `./Styles/img/PDF.svg`);

            conversionAllowed = true;
            convertType = 'pdf';
            greenButton('PDF');
        } else {
            document.querySelector('#convert-file-img').classList.add('display-none');
            document.querySelector('#cftic-transfer-svg').classList.add('display-none');
            document.querySelector('.convert-button-container-file-types').classList.add('display-grid');
            document.querySelector('#convert-button-info').innerHTML = "Please Select Convert Type";
        }
    }
});

// Function to get file extension from file name
function getFileExtension(fileName) {
    return fileName.split('.').pop();
}

function convertCheck() {
    if (!conversionAllowed) {
        if (document.querySelector('#convert-button-info').innerHTML == "Please Select Convert Type") {
            let buttons = document.querySelectorAll('.cbcft-main button');

            buttons.forEach(button => {
                button.classList.add('cimcim');
            });
        }
        document.querySelector('#convert-button-info').classList.add('display-block');
        setTimeout(function () {
            document.querySelector('#convert-button-info').classList.remove('display-block');
        }, 2000);
    } else {
        convertingAnimation(p.textContent, convertType);
        setTimeout(function () {
            document.querySelector('#file-upload-form').submit();
        }, 8500);
    }
}

function greenButton(convertType) {
    document.querySelector('#convert-file-img').classList.remove('display-none');
    document.querySelector('#cftic-transfer-svg').classList.remove('display-none');
    document.querySelector('#convert-button').classList.add('btn-green');
    document.querySelector('#convert-button a').innerHTML = `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
        d="M13.7857 6L14.5807 8.00215C13.8273 7.57761 12.9442 7.33333 12 7.33333C9.23858 7.33333 7 9.42267 7 12C7 12.4149 7.058 12.8171 7.16686 13.2M10.2143 18L9.41931 15.9978C10.1727 16.4224 11.0558 16.6667 12 16.6667C14.7614 16.6667 17 14.5773 17 12C17 11.5851 16.942 11.1829 16.8331 10.8"
        stroke="white" stroke-width="1.2" stroke-linecap="round"
        stroke-linejoin="round" />
    <path
        d="M18 2H6C3.79086 2 2 3.79086 2 6V18C2 20.2091 3.79086 22 6 22H18C20.2091 22 22 20.2091 22 18V6C22 3.79086 20.2091 2 18 2Z"
        stroke="white" stroke-width="1.2" stroke-linecap="round"
        stroke-linejoin="round" />
</svg>
    Convert to ${convertType}
    `;
}

function chooseConvertType(name) {
    conversionAllowed = true;
    greenButton(name);
    convertType = name.toLowerCase();
    document.querySelector('#convert-file-img').setAttribute("src", `./Styles/img/${name}.svg`);

    let buttons = document.querySelectorAll('.cbcft-main button');

    buttons.forEach(button => {
        button.classList.remove('cimcim');
    });
}

function convertingAnimation(name, type) {
    let onlyName = name.slice(0, name.lastIndexOf('.'));
    let convertBox = document.querySelector('.convert-loading');
    let convertedIMG = document.querySelector('#converted-image');
    let convertedP = document.querySelector('#converted-p');
    let convertedbox = document.querySelector('.convert-finished-popup');

    document.querySelector('.popups').classList.add('displayBlock');
    convertBox.classList.add('display-grid');
    convertBox.classList.add('cl-opening-animation');

    setTimeout(function () {
        convertBox.classList.remove('cl-opening-animation');
    }, 500);

    setTimeout(function () {
        convertBox.classList.add('cl-closing-animation');
    }, 5000);

    setTimeout(function () {
        convertBox.classList.remove('display-grid');
        convertBox.classList.remove('cl-closing-animation');

        convertedIMG.setAttribute('src', `./Styles/img/${type.toUpperCase()}.svg`);
        convertedP.innerHTML = `${onlyName}.${type}`;
        convertedbox.classList.add('display-grid');
        convertedbox.classList.add('cl-opening-animation');
    }, 5500);

    setTimeout(function () {
        convertedbox.classList.remove('cl-opening-animation');
    }, 6000);

    setTimeout(function () {
        convertedbox.classList.add('cl-closing-animation');
    }, 8000);

    setTimeout(function () {
        convertedbox.classList.remove('cl-closing-animation');
        convertedbox.classList.remove('display-grid');
    }, 8500);
}