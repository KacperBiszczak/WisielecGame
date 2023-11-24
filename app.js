// @ts-nocheck
//Losowanie hasła

let passwords = [];
passwords[0] = ("Gdyby kózka nie skakała, to by nóżki nie złamała.");
passwords[1] = ("Samochód");
passwords[2] = ("Poduszka");
passwords[3] = ("Człowiek");

function passwordRandomGenerator(){
    //Maszyna losująca
    let randomNumber = 10;
    while(randomNumber >= passwords.length){
        randomNumber = Math.floor(Math.random()*10);
    }

    password = passwords[randomNumber];
    password = password.toUpperCase();
}

let password = "";
const letters_container = document.querySelector("#letters");
const gibbet = document.querySelector("#gibbet>img");
const win = document.querySelector(".win");
const lose = document.querySelector(".lose");

password = password.toUpperCase();

const password_length = password.length;
let passwordHidden = "";


//Ukrywanie hasła

function isLetter(char){
    return char.toLowerCase() != char.toUpperCase();
}

function passwordHiding(password){
    for(let i=0;i<password.length;i++){
        if(password.charAt(i) == " "){
            passwordHidden = passwordHidden + " ";
        }else if(isLetter(password.charAt(i))){
            passwordHidden = passwordHidden + "_";
        }else passwordHidden = passwordHidden + password.charAt(i);
    }
}

//Wypisywanie hasła
function writePassword(){
    document.querySelector("#board_word").innerHTML = passwordHidden;
}
//Wypisywanie liter na ekran

function writeLetters(){
    let letters = "";

    const alphabet = 'AĄBCĆDEĘFGHIJKLŁMNŃOÓPRSŚTUWYZŹŻ';

    for(let i=0; i<alphabet.length;i++){
        letters = letters + `<div id="${alphabet.charAt(i)}" class='letter'> ${alphabet.charAt(i)} </div>`;
        // if((i+1)%8==0){
            // letters = letters + `<div style='clear: both;'></div>`
        // }
    }

    letters_container.innerHTML = letters;
}

//Zdefiniowanie funkcji do podmieniania liter w haśle
function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}

//System podmieniania liter po kliknięciu

let fails = 0;

letters_container.addEventListener("click",(event)=>{
let goodLetter = false
    for(let i=0; i<password.length;i++){

        if(password.charAt(i) == event.target.id){
            passwordHidden = setCharAt(passwordHidden,i,event.target.id);
            goodLetter = true;
            writePassword();
            if(passwordHidden == password){
                win.classList.remove("hidden");
            }
        }
    }

    //Sprawdzenie czy litera została trafiona
    if(goodLetter){
        if(event.target.classList.contains("goodAnswer")){
            console.log("To już było klikane!")
        }else{
            event.target.classList.add("goodAnswer");
            event.target.classList.remove("letter");
        }
    }else{
        if(event.target.classList.contains("badAnswer") || event.target.id == "letters"){
            console.log("To już było klikane!");
        }else{
            event.target.classList.add("badAnswer");
            event.target.classList.remove("letter");

            //Zmienianie obrazka szubienicy
            fails++;
            console.log(fails);
            gibbet.src = `img/s${fails}.jpg`;

            //Przegrana
            if(fails == 9){
                lose.classList.remove("hidden");
            }
        }
    }
})

function start(){
    fails = 0;
    passwordHidden = "";
    passwordRandomGenerator();
    passwordHiding(password);
    writePassword();
    writeLetters();
    win.classList.add("hidden");
    lose.classList.add("hidden");
    gibbet.src = `img/s0.jpg`;
}

window.onload = start;