let gameData = {
    score: 0,
    clickPower: 1,
    autoClickLevel: 0,
    achievements: {}
};

if(localStorage.getItem('gameData')) {
    gameData = JSON.parse(localStorage.getItem('gameData'));
}

const scoreDisplay = document.getElementById('score');
const clickPowerDisplay = document.getElementById('clickPowerDisplay');
const autoClickDisplay = document.getElementById('autoClickDisplay');
const achievementsDiv = document.getElementById('achievements');

const clickCoin = document.getElementById('clickCoin');
const gameArea = document.getElementById('gameArea');

const clickSound = document.getElementById('clickSound');
const upgradeSound = document.getElementById('upgradeSound');

function updateDisplay() {
    scoreDisplay.textContent = 'Очки: ' + gameData.score;
    clickPowerDisplay.textContent = 'Очки за клик: ' + gameData.clickPower;
    autoClickDisplay.textContent = 'Автоклик: ' + gameData.autoClickLevel;
    updateAchievements();
}

function saveGame() {
    localStorage.setItem('gameData', JSON.stringify(gameData));
}

// Функция клика
function addClick() {
    gameData.score += gameData.clickPower;
    clickSound.play();
    checkAchievements();
    updateDisplay();
    saveGame();
}

// Клик по монете
clickCoin.addEventListener('click', addClick);

// Клик по всей области (кроме кнопок)
gameArea.addEventListener('click', (e) => {
    if(e.target.id !== 'clickCoin' && e.target.tagName !== 'BUTTON') addClick();
});

// Апгрейды
document.getElementById('upgradeClick').addEventListener('click', () => {
    if(gameData.score >= 10) {
        gameData.score -= 10;
        gameData.clickPower += 1;
        upgradeSound.play();
        updateDisplay();
        saveGame();
    } else { alert('Недостаточно очков!'); }
});

document.getElementById('buyAutoClick').addEventListener('click', () => {
    if(gameData.score >= 50) {
        gameData.score -= 50;
        gameData.autoClickLevel += 1;
        upgradeSound.play();
        updateDisplay();
        saveGame();
    } else { alert('Недостаточно очков!'); }
});

// Новые апгрейды
document.getElementById('superClick').addEventListener('click', () => {
    if(gameData.score >= 200) {
        gameData.score -= 200;
        gameData.clickPower += 5;
        upgradeSound.play();
        updateDisplay();
        saveGame();
    } else { alert('Недостаточно очков!'); }
});

document.getElementById('megaAutoClick').addEventListener('click', () => {
    if(gameData.score >= 500) {
        gameData.score -= 500;
        gameData.autoClickLevel += 5;
        upgradeSound.play();
        updateDisplay();
        saveGame();
    } else { alert('Недостаточно очков!'); }
});

// Автоклик
setInterval(() => {
    if(gameData.autoClickLevel > 0) {
        gameData.score += gameData.autoClickLevel;
        checkAchievements();
        updateDisplay();
        saveGame();
    }
}, 1000);

// Достижения
const achievementGoals = [10, 25, 50, 100, 200, 300, 500, 1000, 2000, 5000];

function checkAchievements() {
    achievementGoals.forEach(goal => {
        if(gameData.score >= goal && !gameData.achievements[goal]) {
            gameData.achievements[goal] = true;
            alert('🎉 Достижение достигнуто: ' + goal + ' очков!');
        }
    });
}

function updateAchievements() {
    achievementsDiv.innerHTML = '<h2>Достижения</h2>';
    achievementGoals.forEach(goal => {
        const unlocked = gameData.achievements[goal] ? '✅' : '❌';
        achievementsDiv.innerHTML += `<div>${goal} очков: ${unlocked}</div>`;
    });
}

// Инициализация
updateDisplay();
saveGame();