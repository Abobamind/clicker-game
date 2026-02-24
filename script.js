let score=0,clickPower=1,clickUpgradeCost=10;
let autoClickPower=0,autoClickCost=50;
let multiplier=1,multiplierCost=100;
let rewardsClaimed={100:false,500:false,1000:false};
let totalClicks=0;
let hatPrice=50,chestPrice=100;

const scoreDisplay=document.getElementById('score');
const scene=document.getElementById('scene');
const uClick=document.getElementById('upgradeClick');
const uAuto=document.getElementById('upgradeAuto');
const uMult=document.getElementById('upgradeMultiplier');
const pClick=document.getElementById('clickProgress');
const pAuto=document.getElementById('autoProgress');
const pMult=document.getElementById('multiProgress');
const hat=document.getElementById('hat');
const chest=document.getElementById('chest');

scene.addEventListener('click',e=>{
    addScore(clickPower*multiplier);
    totalClicks++;
    showFloating(e.clientX,e.clientY,clickPower*multiplier);
    spawnCoin();
    updateGoals();
});

function addScore(n){ score+=n; updateUI(); checkRewards(); }

function showFloating(x,y,n){
    const el=document.createElement('div');
    el.className='floating';
    el.textContent=`+${n}`;
    el.style.left=(x-20)+'px';
    el.style.top=(y-20)+'px';
    document.body.appendChild(el);
    setTimeout(()=>el.remove(),1000);
}

function spawnCoin(){
    const c=document.createElement('div');
    c.className='coinFall';
    c.textContent='🪙';
    c.style.left=Math.random()*window.innerWidth+'px';
    scene.appendChild(c);
    setTimeout(()=>c.remove(),1000);
}

function updateUI(){
    scoreDisplay.textContent='Очки: '+score;
    pClick.style.width=Math.min((score/clickUpgradeCost)*100,100)+'%';
    pAuto.style.width=Math.min((score/autoClickCost)*100,100)+'%';
    pMult.style.width=Math.min((score/multiplierCost)*100,100)+'%';
    uClick.classList.toggle('disabled',score<clickUpgradeCost);
    uAuto.classList.toggle('disabled',score<autoClickCost);
    uMult.classList.toggle('disabled',score<multiplierCost);
}

// апгрейды
uClick.addEventListener('click',()=>{if(score>=clickUpgradeCost){score-=clickUpgradeCost;clickPower++;clickUpgradeCost=Math.floor(clickUpgradeCost*1.5);updateUI();}});
uAuto.addEventListener('click',()=>{if(score>=autoClickCost){score-=autoClickCost;autoClickPower++;autoClickCost=Math.floor(autoClickCost*1.7);updateUI();}});
uMult.addEventListener('click',()=>{if(score>=multiplierCost){score-=multiplierCost;multiplier*=2;multiplierCost=Math.floor(multiplierCost*2.5);updateUI();}});

setInterval(()=>{if(autoClickPower>0)addScore(autoClickPower*multiplier);},1000);

// награды
function checkRewards(){
    if(score>=100&&!rewardsClaimed[100]){ alert('🎉 Награда за 100 очков!'); rewardsClaimed[100]=true; clickPower++; }
    if(score>=500&&!rewardsClaimed[500]){ alert('🏆 Награда за 500 очков!'); rewardsClaimed[500]=true; multiplier*=2; }
    if(score>=1000&&!rewardsClaimed[1000]){ alert('👑 Награда за 1000 очков!'); rewardsClaimed[1000]=true; autoClickPower+=5; }
}

// магазин
hat.addEventListener('click',()=>{if(score>=hatPrice){score-=hatPrice;clickPower+=2;hatPrice=Math.floor(hatPrice*1.5);updateUI();hat.textContent=`🎩 Шляпа (${hatPrice})`;alert('Вы купили шляпу! +2 клик');}});
chest.addEventListener('click',()=>{if(score>=chestPrice){score-=chestPrice;autoClickPower+=5;chestPrice=Math.floor(chestPrice*1.7);updateUI();chest.textContent=`💰 Сундук (${chestPrice})`;alert('Вы купили сундук! +5 автоклик');}});

// цели
function updateGoals(){
    document.querySelectorAll('#goals .goal').forEach(goal=>{
        let target=parseInt(goal.dataset.target);
        let type=goal.dataset.type||'score';
        let progressEl=goal.querySelector('.progress');
        let progress=type==='clicks'?totalClicks:score;
        progressEl.textContent=progress;
        if(progress>=target&&!goal.classList.contains('completed')){
            goal.classList.add('completed');
            alert(`🎯 Цель выполнена: ${goal.textContent}`);
        }
    });
}