'use strict';
// project3 pig game
// 需求:
//背景介绍:pig game是一个简单的双人对战游戏4
//双方投掷一个骰子,如果
//投到1以外的数字,则会记录在自己的记录中,玩家可以选择持有,然后交给其他玩家,也可以继续投掷累加
//如果投掷到1的数字,则当前记录清零,然后递交给别的玩家

//流程图

//相关的dom元素

//骰子元素
const dice=document.querySelector('.dice')
//新游戏按钮
const newGameBtn=document.querySelector('.btn--new')
//投色子按钮
const rollDiceBtn=document.querySelector('.btn--roll')
//持有按钮
const holdBtn=document.querySelector('.btn--hold')

//骰子数字
let num=0;
//当前分数
let currentScore=0
//当前玩家
let activePlayer=0
//总分数组
let arrScore=[0,0]



//玩家切换
function changePlayer(){
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
    activePlayer=activePlayer^1;
    document.querySelector(`.player--${activePlayer}`).classList.add('player--active')
}

//重置游戏
function reset(){
    //根据骰子是否在显示,新游戏开始的时候先隐藏骰子
    if(!dice.classList.contains('hidden')){
        dice.classList.add('hidden')
    }else{
        console.log("gaming......")
    }
    for(let i=0;i<2;i++){
        document.getElementById(`current--${i}`).textContent='0'
        document.getElementById(`score--${i}`).textContent='0'
        currentScore=0
        arrScore[i]=0
    }
    if(activePlayer){
        changePlayer()
    }

}


//没能获得到数据
function unHold(){
    //当前分数清零
    currentScore=0
    //当前得到分数清零
    document.getElementById(`current--${activePlayer}`).textContent='0'
    //总分数不变
}


//获得到数据
function hold(){
    //把数据加到总分里面
    arrScore[activePlayer]+=currentScore
    //总分数发生改变
    document.getElementById(`score--${activePlayer}`).textContent=String(arrScore[activePlayer])
    //当前分数清零
    currentScore=0
    //显示的当前分数应该和上面同步
    document.getElementById(`current--${activePlayer}`).textContent='0'
}
//开始新游戏
newGameBtn.addEventListener('click',()=>{
    reset()
})

//投掷色子并且展示
rollDiceBtn.addEventListener('click',()=>{
    //如果骰子还没有显示,就显示骰子
    if(dice.classList.contains('hidden')){
        dice.classList.remove('hidden')
    }
    //生成随机数字
    num=Math.trunc(Math.random()*6)+1;//1-6的一个随机数字
    //使用模板文字修改图标
    dice.setAttribute('src',`dice-${num}.png`)

    //根据生成元素判断
    if(num===1){   //消除
        //当前分数清零,并且切换到另一个玩家
        unHold()
        changePlayer()
    }else{         //进行正常操作
        currentScore+=num
        document.getElementById(`current--${activePlayer}`).textContent=currentScore
    }

})

//选择持有并且给当前玩家设置数字
holdBtn.addEventListener('click',()=>{
    //把数字添加到整体上
    hold()

    //正常提交以后判断是否胜利
    if(arrScore[activePlayer]>=20){
        alert(`player${activePlayer} is success`)
        reset()
    }else{
        changePlayer()
    }
})