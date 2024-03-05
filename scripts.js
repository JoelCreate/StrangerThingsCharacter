import {characters} from "./characters.js"

const yesNoBtn = document.querySelectorAll(".btn")
const questionsBlock = document.getElementById("questions")
const questionArr = Array.from(document.querySelectorAll(".question"))
const characterReveal = document.getElementById("character-reveal")

let currentQuestion = 0
let answers = []

function displayCurrentQuestion() {
    if (currentQuestion <= questionArr.length) {
        questionArr[currentQuestion].style.display = "block";
    } else {
        console.log("All questions have been answered.");
    }
}

displayCurrentQuestion()

yesNoBtn.forEach((button) => {
    button.addEventListener("click", (event) => { 

        const answer = event.target.value
        answers.push(answer)

        if (currentQuestion <= questionArr.length) {
            questionArr[currentQuestion].remove()
            currentQuestion++
        }

        if(currentQuestion >= questionArr.length) {
            questionsBlock.style.display = "none"
            document.getElementById("title").style.display = "none"
            document.getElementById("calculating").style.display = "block"
            setTimeout(showCharacter, 2700)
        } 

        displayCurrentQuestion()          
    })
})

function showCharacter() {  
    if (answers.length !== questionArr.length) {
        // Ensure all questions are answered
        console.error("All questions must be answered before revealing the character.");
        return;
    }

    const randomIndex = Math.floor(Math.random() * answers.length)
    const randomCharacter = answers[randomIndex]

    const  characterHTML = characters.map((character) => {        
        if (randomCharacter === character.name){
            return `
                <div id="character-card">
                    <h1 class="charater-title">You are most like</h1>
                    <h2 class="charater-name">${character.name}</h2>
                    <img class="character-img" src="${character.image}"/>
                    <div id="blurb">${character.blurb}</div>
                </div>
                <button class="btn" id="refresh-btn" onClick="window.location.reload()">Take again?</button>
                `
        }        
    }).join('')   

    characterReveal.innerHTML = characterHTML

    document.getElementById("calculating").style.display = "none"
}
