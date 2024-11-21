import {scaleFactor} from "./constants.js";

const closeBtn = document.getElementById("close");
const dialogueUI = document.getElementById("textbox-container");
const dialogue = document.getElementById("dialogue");

let currentDialogue;
let typer;

class Typing {
    textElement;
    texts;
    textIdx;
    index;
    intervalRef;
    res;
    remaining = true;
    promise;

    constructor(textElement, texts) {
        this.textElement = textElement;
        this.texts = texts;
        this.promise = new Promise(res => {
            this.res = res;
        });
        this.startSegment(0);
    }

    startSegment(index) {
        this.textIdx = index;
        this.index = 0;
        this.textElement.innerHTML = "";
        closeBtn.innerHTML = "Skip";
        this.intervalRef = setInterval(this.type.bind(this), 1);
    }

    type() {
        if (this.index < this.texts[this.textIdx].length) {
            this.textElement.innerHTML += this.texts[this.textIdx][this.index];
            this.index++;
        } else {
            this.stop();
        }
    }

    skip() {
        if (this.intervalRef) {
            this.stop();
            this.textElement.innerHTML = this.texts[this.textIdx];
        } else {
            this.startSegment(this.textIdx + 1);
        }
    }

    stop(force = false) {
        closeBtn.innerHTML = "Next";
        clearInterval(this.intervalRef);
        this.intervalRef = null;
        if (force || this.textIdx >= this.texts.length - 1) {
            this.remaining = false;
            this.res();
        }
    }
}

async function typingEffect(text) {
    if (typer) typer.stop(true);

    const textSegments = text.split("\n");

    dialogue.innerHTML = "";
    if (currentDialogue.title) {
        const headerElement = document.createElement("h2");
        headerElement.innerHTML = currentDialogue.title;
        dialogue.appendChild(headerElement);
    }
    const textElement = document.createElement("p");
    dialogue.appendChild(textElement);

    typer = new Typing(textElement, textSegments);
    await typer.promise;

    closeBtn.innerHTML = "Close";
}

function onCloseBtnClick() {
    if (typer?.remaining)
        return typer.skip();
    if (typer) typer.stop(true);
    currentDialogue.onDisplayEnd();
    currentDialogue = null;
    dialogueUI.style.display = "none";
}

closeBtn.addEventListener("click", onCloseBtnClick);

document.addEventListener("keydown", (key) => {
    if (key.code.startsWith("Digit") || key.code.startsWith("Numpad")) {
        const number = key.code.slice(-1) - 0;
        onQuestionAwnser(number);
    } else {
        if (!currentDialogue) return;
        if (key.code === "Enter" || key.code === "Escape" || key.code === "Space") closeBtn.click();
    }
});


async function onQuestionAwnser(number) {
    if (!currentDialogue) return;
    if (currentDialogue.correctAnswer === 0) return;
    if (number === 0) return;
    if (currentDialogue.answers.length < number) return;

    if (currentDialogue.correctAnswer === number) {
        await typingEffect(currentDialogue.correctText); //TODO: punktesystem
    } else {
        await typingEffect(currentDialogue.wrongText);
    }
    currentDialogue.correctAnswer = 0;
}

export async function displayDialogue(dialogue_options, onDisplayEnd) {
    currentDialogue = Object.assign({}, dialogue_options, { onDisplayEnd });

    dialogueUI.style.display = "block";
    let answered = false;

    await typingEffect(currentDialogue.text);

    for (let index = 0; index < currentDialogue.answers.length; index++) {
        const button = document.createElement("button");
        button.classList.add("question-btn");
        button.innerHTML = currentDialogue.answers[index];
        button.addEventListener("click", () => {
            onQuestionAwnser(index + 1);
        });
        dialogue.appendChild(button);
    }
}

export function setCamScale(k) {
    const resizeFactor = k.width() / k.height();
    if (resizeFactor < 1) {
        k.camScale(k.vec2(1));
    } else {
        k.camScale(k.vec2(1.5));
    }
}

export function enableFullMapView(k, map) {
    const screenWidth = k.width();
    const screenHeight = k.height();
    const mapWidth = map.width * scaleFactor;
    const mapHeight = map.height * scaleFactor;

    const marginFactor = 0.1;  // 10% margin on each side
    const scaleX = screenWidth / (mapWidth * (1 + marginFactor));
    const scaleY = screenHeight / (mapHeight * (1 + marginFactor));
    const fitScale = Math.min(scaleX, scaleY);

    k.camPos(mapWidth / 2, mapHeight / 2);
    k.camScale(fitScale);
    document.getElementsByClassName("note")[0].style.display = "none";
}

export function disableFullMapView(k) {
    document.getElementsByClassName("note")[0].style.display = "block";
    setCamScale(k);
}

export function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

export function getCookie(name) {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length);
        }
    }
    return null;
}
