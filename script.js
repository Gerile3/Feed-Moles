const MAX_SCORE = 10; //wins game when score reachs 10 at default
let score = 0;
let runAgainAt = Date.now() + 100; // 100ms

const getSadInterval = () => Date.now() + 1000 // 1 sec
const getGoneInterval = () => Date.now() + Math.floor(Math.random() * 18000) + 2000; // 2-20 secs
const getHungryInterval = () => Date.now() + Math.floor(Math.random() * 3000) + 2000; // 2-5 secs
const getKingStatus = () => Math.random() > .9; // %10 chance
const startButton = document.querySelector(".start")
const resetButton = document.querySelector(".reset")
const mainContainer = document.querySelector(".main-container")

const moles = [
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById("hole-0")
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById("hole-1")
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById("hole-2")
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById("hole-3")
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById("hole-4")
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById("hole-5")
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById("hole-6")
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById("hole-7")
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById("hole-8")
    },
]

const getNextStatus = (mole) => {
    switch (mole.status) {
        case "sad":
        case "fed":
            mole.status = "leaving"
            mole.next = getSadInterval()
            if (mole.king) {
                mole.node.children[0].src = `img/king-mole-leaving.png`
            } else {
                mole.node.children[0].src = `img/mole-leaving.png`
            }
            break;
        case "leaving":
            mole.status = "gone"
            mole.next = getGoneInterval()
            mole.node.children[0].classList.add("gone")
            break;
        case "gone":
            mole.status = "hungry"
            mole.next = getHungryInterval()
            mole.node.children[0].classList.add("hungry")
            mole.node.children[0].classList.remove("gone")
            mole.node.children[0].src = `img/mole-hungry.png`
            mole.king = getKingStatus()
            if(mole.king) mole.node.children[0].src = `img/king-mole-hungry.png`
            break
        case "hungry":
            mole.status = "sad"
            mole.next = getSadInterval()
            mole.node.children[0].classList.remove("hungry")
            if (mole.king) {
                mole.node.children[0].src = `img/king-mole-sad.png`
            } else {
                mole.node.children[0].src = `img/mole-sad.png`
            }
            break
        default:
            break;
    }
}

const win = () => {
    mainContainer.classList.add("hide")
    document.querySelector(".win-screen").classList.remove("hide")
    resetButton.classList.remove("hide")
}

const feed = (event) => {
    if (event.target.tagName !== "IMG" || !event.target.classList.contains("hungry")) return;

    const mole = moles[parseInt(event.target.dataset.index)]
    mole.status = "fed"
    mole.next = getSadInterval()
    mole.node.children[0].classList.remove("hungry")
    if (mole.king) {
        score += 2;
        mole.node.children[0].src = `img/king-mole-fed.png`
    } else {
        score++;
        mole.node.children[0].src = `img/mole-fed.png`
    }
    if (score >= MAX_SCORE){
        win()
    }
    document.querySelector(".worm-container").style.width = `${(score / MAX_SCORE)*100}%`
}

const nextFrame = () => {
    const now = Date.now()

    if (runAgainAt <= now) {
        for (let i = 0; i < moles.length; i++) {
            if(moles[i].next <= now){
                getNextStatus(moles[i])
            }
        }
        runAgainAt = now + 100;
    }
    requestAnimationFrame(nextFrame);
}

document.querySelector(".bg").addEventListener("click", feed);
startButton.addEventListener("click", () => {
    mainContainer.classList.remove("hide")
    startButton.classList.add("hide")
    document.querySelector(".init").classList.add("hide")
})
resetButton.addEventListener("click", () => {
    resetButton.classList.add("hide")
    mainContainer.classList.remove("hide")
    document.querySelector(".win-screen").classList.add("hide")
    document.querySelector(".worm-container").style.width = "5%"
    score = 0
})
nextFrame()