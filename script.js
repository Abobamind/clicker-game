let gameData = {
    score: 0,
    clickPower: 1,
    autoClickLevel: 0,
    achievements: {}
};

// Загрузка прогресса
if(localStorage.getItem('gameData')) {
    gameData = JSON.parse(localStorage.getItem('gameData'));
}

const button = document.getElementById('clickButton');
const scoreDisplay = document.getElementById('score');
const clickPowerDisplay = document.getElementById('clickPowerDisplay');
const autoClickDisplay = document.getElementById('autoClickDisplay');
const achievementsDiv = document.getElementById('achievements');

// Обновление интерфейса
function updateDisplay() {
    scoreDisplay.textContent = 'Очки: ' + gameData.score;
    clickPowerDisplay.textContent = 'Очки за клик: ' + gameData.clickPower;
    autoClickDisplay.textContent = 'Автоклик: ' + gameData.autoClickLevel;
    updateAchievements();
}

// Сохранение прогресса
function saveGame() {
    localStorage.setItem('gameData', JSON.stringify(gameData));
}

// Клик по кнопке
button.addEventListener('click', () => {
    gameData.score += gameData.clickPower;
    checkAchievements();
    updateDisplay();
    saveGame();
});

// Апгрейд клика
document.getElementById('upgradeClick').addEventListener('click', () => {
    if(gameData.score >= 10) {
        gameData.score -= 10;
        gameData.clickPower += 1;
        updateDisplay();
        saveGame();
    } else {
        alert('Недостаточно очков!');
    }
});

// Покупка автоклика
document.getElementById('buyAutoClick').addEventListener('click', () => {
    if(gameData.score >= 50) {
        gameData.score -= 50;
        gameData.autoClickLevel += 1;
        updateDisplay();
        saveGame();
    } else {
        alert('Недостаточно очков!');
    }
});

// Автоклик каждую секунду
setInterval(() => {
    if(gameData.autoClickLevel > 0) {
        gameData.score += gameData.autoClickLevel;
        checkAchievements();
        updateDisplay();
        saveGame();
    }
}, 1000);

// Достижения
const achievementGoals = [10, 50, 100, 500, 1000];

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
