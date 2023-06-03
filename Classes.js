const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
context.lineWidth = 2;

var elementCounter;
var Actions = []; // Записываются все элемнты, нарисованные на поле. Нужен для удаления последнего элемента.
var ActionsConnections = [];
var Line = []; //массив хранит одну линию
var ConnectionElementArray = []; //Записывает все связи триггеров, установленных на поле.
var AuxConnectionElementArray = []; //Вспомогательный массив для записей связей элементов.
var ActiveElementArray = []; //Активные элементы в конкретный момент времени.
var AuxActiveElementArray = []; //Вспомогательный массив
var DuplicateArray = []; //Для поиска некорректных соединений

let x = 0;
let y = 0;
var isDrawing=false;

let timerElements = document.querySelectorAll('.timer-number');
timerElements.forEach(function(timerElement) {
  timerElement.setAttribute('type', 'number');
  timerElement.setAttribute('value', '0.1');
  timerElement.setAttribute('step', '0.1');
});

const emulate2_button = document.getElementById('emulate2');
const impulse_generator_button = document.getElementById('impulse generator');
const trigger1_button = document.getElementById('trigger1');
const trigger2_button = document.getElementById('trigger2');
const trigger3_button = document.getElementById('trigger3');
const trigger4_button = document.getElementById('trigger4');
const trigger5_button = document.getElementById('trigger5');
const trigger6_button = document.getElementById('trigger6');
const trigger7_button = document.getElementById('trigger7');
const trigger8_button = document.getElementById('trigger8');
const timer1_button = document.getElementById('timer1');
const timer2_button = document.getElementById('timer2');
const timer3_button = document.getElementById('timer3');
const timer4_button = document.getElementById('timer4');
const timer5_button = document.getElementById('timer5');
const timer6_button = document.getElementById('timer6');
const timer7_button = document.getElementById('timer7');
const timer8_button = document.getElementById('timer8');
const line_button = document.getElementById('line');
const timer1_input = document.getElementById('timer1number');
const timer2_input = document.getElementById('timer2number');
const timer3_input = document.getElementById('timer3number');
const timer4_input = document.getElementById('timer4number');
const timer5_input = document.getElementById('timer5number');
const timer6_input = document.getElementById('timer6number');
const timer7_input = document.getElementById('timer7number');
const timer8_input = document.getElementById('timer8number');

var timer1, timer2, timer3, timer4, timer5, timer6, timer7, timer8;

emulate2_button.addEventListener('click', ()=>{
    timer1 = parseFloat(timer1_input.value)*1000;
    timer2 = parseFloat(timer2_input.value)*1000;
    timer3 = parseFloat(timer3_input.value)*1000;
    timer4 = parseFloat(timer4_input.value)*1000;
    timer5 = parseFloat(timer5_input.value)*1000;
    timer6 = parseFloat(timer6_input.value)*1000;
    timer7 = parseFloat(timer7_input.value)*1000;
    timer8 = parseFloat(timer8_input.value)*1000;
    fillActiveElementArray();
go()});

function onClickImpulseGeneratorButton() {
    elementCounter = 9; 
    canvas.addEventListener('click', drawElementOnField); 
    canvas.removeEventListener('mouseup',determinElementEnd);
    canvas.removeEventListener('mousedown',determinElementStart);
    impulse_generator_button.removeEventListener('click', onClickImpulseGeneratorButton);
}
impulse_generator_button.addEventListener('click', onClickImpulseGeneratorButton);

function onClickTrigger1Button() {
    elementCounter = 1; 
    canvas.addEventListener('click', drawElementOnField); 
    canvas.removeEventListener('mouseup',determinElementEnd);
    canvas.removeEventListener('mousedown',determinElementStart);
    trigger1_button.removeEventListener('click', onClickTrigger1Button);
}
trigger1_button.addEventListener('click', onClickTrigger1Button);
function onClickTrigger2Button() {
    elementCounter = 2; 
    canvas.addEventListener('click', drawElementOnField); 
    canvas.removeEventListener('mouseup',determinElementEnd);
    canvas.removeEventListener('mousedown',determinElementStart);
    trigger2_button.removeEventListener('click', onClickTrigger2Button);
}
trigger2_button.addEventListener('click', onClickTrigger2Button);
function onClickTrigger3Button() {
    elementCounter = 3; 
    canvas.addEventListener('click', drawElementOnField); 
    canvas.removeEventListener('mouseup',determinElementEnd);
    canvas.removeEventListener('mousedown',determinElementStart);
    trigger3_button.removeEventListener('click', onClickTrigger3Button);
}
trigger3_button.addEventListener('click', onClickTrigger3Button);
function onClickTrigger4Button() {
    elementCounter = 4; 
    canvas.addEventListener('click', drawElementOnField); 
    canvas.removeEventListener('mouseup',determinElementEnd);
    canvas.removeEventListener('mousedown',determinElementStart);
    trigger4_button.removeEventListener('click', onClickTrigger4Button);
}
trigger4_button.addEventListener('click', onClickTrigger4Button);
function onClickTrigger5Button() {
    elementCounter = 5; 
    canvas.addEventListener('click', drawElementOnField); 
    canvas.removeEventListener('mouseup',determinElementEnd);
    canvas.removeEventListener('mousedown',determinElementStart);
    trigger5_button.removeEventListener('click', onClickTrigger5Button);
}
trigger5_button.addEventListener('click', onClickTrigger5Button);
function onClickTrigger6Button() {
    elementCounter = 6; 
    canvas.addEventListener('click', drawElementOnField); 
    canvas.removeEventListener('mouseup',determinElementEnd);
    canvas.removeEventListener('mousedown',determinElementStart);
    trigger6_button.removeEventListener('click', onClickTrigger6Button);
}
trigger6_button.addEventListener('click', onClickTrigger6Button);
function onClickTrigger7Button() {
    elementCounter = 7; 
    canvas.addEventListener('click', drawElementOnField); 
    canvas.removeEventListener('mouseup',determinElementEnd);
    canvas.removeEventListener('mousedown',determinElementStart);
    trigger7_button.removeEventListener('click', onClickTrigger7Button);
}
trigger7_button.addEventListener('click', onClickTrigger7Button);
function onClickTrigger8Button() {
    elementCounter = 8; 
    canvas.addEventListener('click', drawElementOnField); 
    canvas.removeEventListener('mouseup',determinElementEnd);
    canvas.removeEventListener('mousedown',determinElementStart);
    trigger8_button.removeEventListener('click', onClickTrigger8Button);
}
trigger8_button.addEventListener('click', onClickTrigger8Button);

function onClickTimer1Button() {
    elementCounter = 10; 
    canvas.addEventListener('click', drawElementOnField); 
    canvas.removeEventListener('mouseup',determinElementEnd);
    canvas.removeEventListener('mousedown',determinElementStart);
    timer1_button.removeEventListener('click', onClickTimer1Button);
}
timer1_button.addEventListener('click', onClickTimer1Button);
function onClickTimer2Button() {
    elementCounter = 11; 
    canvas.addEventListener('click', drawElementOnField); 
    canvas.removeEventListener('mouseup',determinElementEnd);
    canvas.removeEventListener('mousedown',determinElementStart);
    timer2_button.removeEventListener('click', onClickTimer2Button);
}
timer2_button.addEventListener('click', onClickTimer2Button);
function onClickTimer3Button() {
    elementCounter = 12; 
    canvas.addEventListener('click', drawElementOnField); 
    canvas.removeEventListener('mouseup',determinElementEnd);
    canvas.removeEventListener('mousedown',determinElementStart);
    timer3_button.removeEventListener('click', onClickTimer3Button);
}
timer3_button.addEventListener('click', onClickTimer3Button);
function onClickTimer4Button() {
    elementCounter = 13; 
    canvas.addEventListener('click', drawElementOnField); 
    canvas.removeEventListener('mouseup',determinElementEnd);
    canvas.removeEventListener('mousedown',determinElementStart);
    timer4_button.removeEventListener('click', onClickTimer4Button);
}
timer4_button.addEventListener('click', onClickTimer4Button);
function onClickTimer5Button() {
    elementCounter = 14; 
    canvas.addEventListener('click', drawElementOnField); 
    canvas.removeEventListener('mouseup',determinElementEnd);
    canvas.removeEventListener('mousedown',determinElementStart);
    timer5_button.removeEventListener('click', onClickTimer5Button);
}
timer5_button.addEventListener('click', onClickTimer5Button)
function onClickTimer6Button() {
    elementCounter = 15; 
    canvas.addEventListener('click', drawElementOnField); 
    canvas.removeEventListener('mouseup',determinElementEnd);
    canvas.removeEventListener('mousedown',determinElementStart);
    timer6_button.removeEventListener('click', onClickTimer6Button);
}
timer6_button.addEventListener('click', onClickTimer6Button);
function onClickTimer7Button() {
    elementCounter = 16; 
    canvas.addEventListener('click', drawElementOnField); 
    canvas.removeEventListener('mouseup',determinElementEnd);
    canvas.removeEventListener('mousedown',determinElementStart);
    timer7_button.removeEventListener('click', onClickTimer7Button);
}
timer7_button.addEventListener('click', onClickTimer7Button);
function onClickTimer8Button() {
    elementCounter = 17; 
    canvas.addEventListener('click', drawElementOnField); 
    canvas.removeEventListener('mouseup',determinElementEnd);
    canvas.removeEventListener('mousedown',determinElementStart);
    timer8_button.removeEventListener('click', onClickTimer8Button);
}
timer8_button.addEventListener('click', onClickTimer8Button);

line_button.addEventListener('click', ()=>{
    canvas.addEventListener('mousedown', determinElementStart);
    canvas.addEventListener('mouseup', determinElementEnd);
    canvas.addEventListener('mousemove', e=>{
        if (isDrawing === true) {
            drawLine(x, y, e.offsetX, e.offsetY);
            x = e.offsetX;
            y = e.offsetY;
            Line.push([x,y]);
        }
    })
    canvas.removeEventListener('click', drawElementOnField);
})

class PrimitiveBlock{
    constructor(x1, y1, colour, number, cornerRadius, width, height){
        this.x1 = x1;
        this.y1 = y1;
        this.number = number;
        this.colour = colour;
        this.cornerRadius = 10;
        this.width = 60;
        this.height = 60; 
    }
    drawPrimitiveBlock(){
        context.beginPath();
        context.strokeStyle = this.colour;

        context.moveTo(this.x1 + this.cornerRadius, this.y1);
        context.lineTo(this.x1 + this.width - this.cornerRadius, this.y1);
        context.arcTo(this.x1 + this.width, this.y1, this.x1 + this.width, this.y1 + this.cornerRadius, this.cornerRadius);
        context.lineTo(this.x1 + this.width, this.y1 + this.height - this.cornerRadius);
        context.arcTo(this.x1 + this.width, this.y1 + this.height, this.x1 + this.width - this.cornerRadius, this.y1 + this.height, this.cornerRadius);
        context.lineTo(this.x1 + this.cornerRadius, this.y1 + this.height);
        context.arcTo(this.x1, this.y1 + this.height, this.x1, this.y1 + this.height - this.cornerRadius, this.cornerRadius);
        context.lineTo(this.x1, this.y1 + this.cornerRadius);
        context.arcTo(this.x1, this.y1, this.x1 + this.cornerRadius, this.y1, this.cornerRadius);
        context.closePath();
        context.stroke();
    } 
    drawPrimitiveBlockMarkup(x){ //x = 60 для триггера, х = 30 для таймера.
        context.moveTo(this.x1+30, this.y1);
        context.lineTo(this.x1+30, this.y1+x);
        context.stroke();

        context.moveTo(this.x1, this.y1+30);
        context.lineTo(this.x1+60, this.y1+30);
        context.stroke();
    }
}

class StartIpulseGenerator extends PrimitiveBlock{
    drawStartIpulseGenerator(){
        super.drawPrimitiveBlock();

        context.font = 'bold 20px sans-serif'; // задаем шрифт и размер
        context.fillStyle = 'black'; // задаем цвет текста
        context.textAlign = 'right'; // выравнивание текста по правому краю
        context.textBaseline = 'bottom'; // выравнивание текста по нижнему краю
        context.fillText(this.number, this.x1 + this.width - 3, this.y1 + this.height - 3);
    }
}

class Trigger extends PrimitiveBlock{
    constructor(x1, y1, colour, number, setTrigger, resetTrigger, state, outcome, cornerRadius, width, height){
        super(x1, y1, colour, number, cornerRadius, width, height)
        this.setTrigger = setTrigger;
        this.resetTrigger = resetTrigger;
        this.state = state;
        this.outcome = outcome;
    }

    drawTrigger(){
        super.drawPrimitiveBlock();
        super.drawPrimitiveBlockMarkup(60);

        context.font = 'bold 20px sans-serif'; 
        context.fillStyle = 'black'; 
        context.textAlign = 'right'; 
        context.textBaseline = 'bottom'; 
        context.fillText(this.number, this.x1 + this.width - 3, this.y1 + this.height - 3);
        context.font = 'bold 15px sans-serif'; 
        context.fillText(this.resetTrigger, this.x1 + this.width - 33, this.y1 + this.height - 3);
        context.fillText(this.outcome, this.x1 + this.width - 3, this.y1 + this.height - 33);
    }
    setTriggerIndication(){
        context.fillStyle = 'red';
        context.fillRect(this.x1+34, this.y1+4, 22, 22)
        context.fillStyle = 'white';
        context.fillRect(this.x1+4, this.y1+4, 22, 22)

        context.font = 'bold 15px sans-serif'; 
        context.fillStyle = 'black';  
        context.fillText(this.setTrigger, this.x1 + this.width - 33, this.y1 + this.height - 33);
        context.fillText(this.outcome, this.x1 + this.width - 3, this.y1 + this.height - 33);
    }
    resetTriggerIndication(){
        context.fillStyle = 'green';
        context.fillRect(this.x1+4, this.y1+4, 22, 22)
        context.fillStyle = 'white';
        context.fillRect(this.x1+34, this.y1+4, 22, 22)

        context.font = 'bold 15px sans-serif'; 
        context.fillStyle = 'black';  
        context.fillText(this.setTrigger, this.x1 + this.width - 33, this.y1 + this.height - 33);
        context.fillText(this.outcome, this.x1 + this.width - 3, this.y1 + this.height - 33);
    }
}

class Timer extends PrimitiveBlock{
    constructor(x1, y1, colour, number, state, cornerRadius, width, height){
        super(x1, y1, colour, number, cornerRadius, width, height)
        this.state = state;
    }
    drawTimer(){
        super.drawPrimitiveBlock();
        super.drawPrimitiveBlockMarkup(30);

        context.font = 'bold 20px sans-serif'; // задаем шрифт и размер
        context.fillStyle = 'black'; // задаем цвет текста
        context.textAlign = 'right'; // выравнивание текста по правому краю
        context.textBaseline = 'bottom'; // выравнивание текста по нижнему краю
        context.fillText(this.number, this.x1 + this.width - 3, this.y1 + this.height - 3);
    }
    timerStartedIndication(){
        context.fillStyle = 'yellow';
        context.fillRect(this.x1+4, this.y1+4, 22, 22)
        context.fillStyle = 'white';
        context.fillRect(this.x1+34, this.y1+4, 22, 22)
    }
    timerWorkedIndication(){
        context.fillStyle = 'red';
        context.fillRect(this.x1+34, this.y1+4, 22, 22)
        context.fillStyle = 'white';
        context.fillRect(this.x1+4, this.y1+4, 22, 22)
    }
    resetTimerIndication(){
        context.fillStyle = 'green';
        context.fillRect(this.x1+4, this.y1+4, 22, 22)
        context.fillStyle = 'white';
        context.fillRect(this.x1+34, this.y1+4, 22, 22)
    }
}

//Удаление последнего нарисованного элемента или линии

document.addEventListener('keydown', function(e){
    if(e.ctrlKey && e.key === 'z'){  
        /* Эта часть кода нужна для предотвращения такой ситуации: допустим соединяем триггер1 с s2 и r2 и затем убираем соединение r2. Без этого
        куска кода будет показывать ошибку 'Impossible connection'. */
        if(Actions[Actions.length-1].colour!=='black' && Actions[Actions.length-1].colour!=='red' && Actions[Actions.length-1].colour!=='blue'){
            for(var i = 0; i<ActionsConnections.length; i++){
                if(Actions[Actions.length-1]===ActionsConnections[i][0] && ActionsConnections[i][1] && (ActionsConnections[i][1][1].colour==='blue' ||
                    ActionsConnections[i][1][1].colour==='black' ||
                    ActionsConnections[i][1][1].colour==='red')){
                    for(var m = 0; m<ConnectionElementArray.length; m++){
                        for(var n = 1; n<ConnectionElementArray[m].length; n++)
                        if(ActionsConnections[i][1]===ConnectionElementArray[m][n])
                            ConnectionElementArray[m].splice(n,1);
                    }
                }             
            }
        }

        if(Actions[Actions.length-1].number==='T1') trigger1_button.addEventListener('click', onClickTrigger1Button);
        if(Actions[Actions.length-1].number==='T2') trigger2_button.addEventListener('click', onClickTrigger2Button);
        if(Actions[Actions.length-1].number==='T3') trigger3_button.addEventListener('click', onClickTrigger3Button);
        if(Actions[Actions.length-1].number==='T4') trigger4_button.addEventListener('click', onClickTrigger4Button);
        if(Actions[Actions.length-1].number==='T5') trigger5_button.addEventListener('click', onClickTrigger5Button);
        if(Actions[Actions.length-1].number==='T6') trigger6_button.addEventListener('click', onClickTrigger6Button);
        if(Actions[Actions.length-1].number==='T7') trigger7_button.addEventListener('click', onClickTrigger7Button);
        if(Actions[Actions.length-1].number==='T8') trigger8_button.addEventListener('click', onClickTrigger8Button);
        if(Actions[Actions.length-1].number==='Tm1') timer1_button.addEventListener('click', onClickTimer1Button);
        if(Actions[Actions.length-1].number==='Tm2') timer2_button.addEventListener('click', onClickTimer2Button);
        if(Actions[Actions.length-1].number==='Tm3') timer3_button.addEventListener('click', onClickTimer3Button);
        if(Actions[Actions.length-1].number==='Tm4') timer4_button.addEventListener('click', onClickTimer4Button);
        if(Actions[Actions.length-1].number==='Tm5') timer5_button.addEventListener('click', onClickTimer5Button);
        if(Actions[Actions.length-1].number==='Tm6') timer6_button.addEventListener('click', onClickTimer6Button);
        if(Actions[Actions.length-1].number==='Tm7') timer7_button.addEventListener('click', onClickTimer7Button);
        if(Actions[Actions.length-1].number==='Tm8') timer8_button.addEventListener('click', onClickTimer8Button);
        if(Actions[Actions.length-1].number==='IG') impulse_generator_button.addEventListener('click', onClickImpulseGeneratorButton);
        
        Actions.pop(); 
        context.clearRect(0, 0, canvas.width, canvas.height); 
        for(var i = 0; i < Actions.length; i++){
            if(Actions[i].colour==='black') {
                Actions[i].drawTrigger();
                Actions[i].resetTriggerIndication();
            }
            if (Actions[i].colour==='blue'){
                Actions[i].drawTimer();
                Actions[i].resetTimerIndication();
            }
            if (Actions[i].colour==='red'){
                Actions[i].drawStartIpulseGenerator();
            }
            else{
                for(var j = 0; j < Actions[i].length - 1; j++){
                    drawLine(Actions[i][j][0], Actions[i][j][1], Actions[i][j + 1][0], Actions[i][j + 1][1]);
                }
            }
        }
    }
});
//-------------------------------------------

// Функции для рисования элементов. 

function drawElementOnField(e){
    if (elementCounter===1){
        x=e.offsetX;
        y=e.offsetY;
        var tg1 = new Trigger(x,y,'black', 'T1', 's1', 'r1', 'off', 'Q1');
        tg1.drawTrigger();
        tg1.resetTriggerIndication();
        Actions.push(tg1);
        elementCounter=0;
    }  
    if (elementCounter===2){
        x=e.offsetX;
        y=e.offsetY;
        var tg2 = new Trigger(x,y,'black', 'T2', 's2', 'r2', 'off', 'Q2');
        tg2.drawTrigger();
        tg2.resetTriggerIndication();
        Actions.push(tg2);
        elementCounter=0;
    } 
    if (elementCounter===3){
        x=e.offsetX;
        y=e.offsetY;
        var tg3 = new Trigger(x,y,'black', 'T3', 's3', 'r3', 'off', 'Q3');
        tg3.drawTrigger();
        tg3.resetTriggerIndication();
        Actions.push(tg3);
        elementCounter=0;
    } 
    if (elementCounter===4){
        x=e.offsetX;
        y=e.offsetY;
        var tg4 = new Trigger(x,y,'black', 'T4', 's4', 'r4', 'off', 'Q4');
        tg4.drawTrigger();
        tg4.resetTriggerIndication();
        Actions.push(tg4);
        elementCounter=0;
    }
    if (elementCounter===5){
        x=e.offsetX;
        y=e.offsetY;
        var tg5 = new Trigger(x,y,'black', 'T5', 's5', 'r5', 'off', 'Q5');
        tg5.drawTrigger();
        tg5.resetTriggerIndication();
        Actions.push(tg5);
        elementCounter=0;
    }
    if (elementCounter===6){
        x=e.offsetX;
        y=e.offsetY;
        var tg6 = new Trigger(x,y,'black', 'T6', 's6', 'r6', 'off', 'Q6');
        tg6.drawTrigger();
        tg6.resetTriggerIndication();
        Actions.push(tg6);
        elementCounter=0;
    }
    if (elementCounter===7){
        x=e.offsetX;
        y=e.offsetY;
        var tg7 = new Trigger(x,y,'black', 'T7', 's7', 'r7', 'off', 'Q7');
        tg7.drawTrigger();
        tg7.resetTriggerIndication();
        Actions.push(tg7);
        elementCounter=0;
    }
    if (elementCounter===8){
        x=e.offsetX;
        y=e.offsetY;
        var tg8 = new Trigger(x,y,'black', 'T8', 's8', 'r8', 'off', 'Q8');
        tg8.drawTrigger();
        tg8.resetTriggerIndication();
        Actions.push(tg8);
        elementCounter=0;
    }
    if (elementCounter===9){ // Start impulse generator
        x=e.offsetX;
        y=e.offsetY;
        var implseGenerator = new StartIpulseGenerator(x,y,'red', 'IG');
        implseGenerator.drawStartIpulseGenerator();
        Actions.push(implseGenerator);
        elementCounter=0;
    }
    if (elementCounter===10){
        x=e.offsetX;
        y=e.offsetY;
        var tmr1 = new Timer(x,y,'blue', 'Tm1', 'off');
        tmr1.drawTimer();
        tmr1.resetTimerIndication();
        Actions.push(tmr1);
        elementCounter=0;
    }
    if (elementCounter===11){
        x=e.offsetX;
        y=e.offsetY;
        var tmr2 = new Timer(x,y,'blue', 'Tm2', 'off');
        tmr2.drawTimer();
        tmr2.resetTimerIndication();
        Actions.push(tmr2);
        elementCounter=0;
    }
    if (elementCounter===12){
        x=e.offsetX;
        y=e.offsetY;
        var tmr3 = new Timer(x,y,'blue', 'Tm3', 'off');
        tmr3.drawTimer();
        tmr3.resetTimerIndication();
        Actions.push(tmr3);
        elementCounter=0;
    }
    if (elementCounter===13){
        x=e.offsetX;
        y=e.offsetY;
        var tmr4 = new Timer(x,y,'blue', 'Tm4', 'off');
        tmr4.drawTimer();
        tmr4.resetTimerIndication();
        Actions.push(tmr4);
        elementCounter=0;
    }
    if (elementCounter===14){
        x=e.offsetX;
        y=e.offsetY;
        var tmr5 = new Timer(x,y,'blue', 'Tm5', 'off');
        tmr5.drawTimer();
        tmr5.resetTimerIndication();
        Actions.push(tmr5);
        elementCounter=0;
    }
    if (elementCounter===15){
        x=e.offsetX;
        y=e.offsetY;
        var tmr6 = new Timer(x,y,'blue', 'Tm6', 'off');
        tmr6.drawTimer();
        tmr6.resetTimerIndication();
        Actions.push(tmr6);
        elementCounter=0;
    }
    if (elementCounter===16){
        x=e.offsetX;
        y=e.offsetY;
        var tmr7 = new Timer(x,y,'blue', 'Tm7', 'off');
        tmr7.drawTimer();
        tmr7.resetTimerIndication();
        Actions.push(tmr7);
        elementCounter=0;
    }
    if (elementCounter===17){
        x=e.offsetX;
        y=e.offsetY;
        var tmr8 = new Timer(x,y,'blue', 'Tm8', 'off');
        tmr8.drawTimer();
        tmr8.resetTimerIndication();
        Actions.push(tmr8);
        elementCounter=0;
    }
}

function drawLine(x1, y1, x2, y2) {
  context.beginPath();
  context.strokeStyle = 'black';
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
  context.closePath();
}

function determinElementStart(e){
  x = e.offsetX;
  y = e.offsetY;
  isDrawing=true;
  for(var i = 0; i<Actions.length; i++){
    if (x>Actions[i].x1 + 30 && x<Actions[i].x1 + 60 && y>Actions[i].y1 && y<Actions[i].y1 + 30 && Actions[i].colour ==='black') 
    AuxConnectionElementArray.push(Actions[i].number);
    if (x>Actions[i].x1 + 30 && x<Actions[i].x1 + 60 && y>Actions[i].y1 && y<Actions[i].y1 + 30 && Actions[i].colour ==='blue') 
    AuxConnectionElementArray.push(Actions[i]);
    if (x>Actions[i].x1 && x<Actions[i].x1 + 60 && y>Actions[i].y1 && y<Actions[i].y1 + 60 && Actions[i].colour ==='red')
    AuxConnectionElementArray.push(Actions[i].number);
  }
  Line.push([x,y]);
}

function determinElementEnd(e){
    x = e.offsetX;
    y = e.offsetY;
    isDrawing=false;
    Actions.push([]);
    Actions[Actions.length-1] = Line.slice();
    Line.length = 0;
    for(var i = 0; i<Actions.length; i++){
        if (x>Actions[i].x1 && x<Actions[i].x1 + 30 && y>Actions[i].y1 && y<Actions[i].y1 + 30 && Actions[i].colour === 'black') 
        AuxConnectionElementArray.push([Actions[i].setTrigger, Actions[i]]);
        if (x>Actions[i].x1 && x<Actions[i].x1 + 30 && y>Actions[i].y1 +30 && y<Actions[i].y1 + 60 && Actions[i].colour === 'black')
        AuxConnectionElementArray.push([Actions[i].resetTrigger, Actions[i]]);
        if (x>Actions[i].x1 && x<Actions[i].x1 + 30 && y>Actions[i].y1 && y<Actions[i].y1 + 30 && Actions[i].colour === 'blue') 
        AuxConnectionElementArray.push([Actions[i].number, Actions[i]]);
    }

    ActionsConnections.push([Actions[Actions.length-1], AuxConnectionElementArray[AuxConnectionElementArray.length-1]]);

    if(AuxConnectionElementArray.length < 2) {AuxConnectionElementArray.length = 0;}
    
    if (AuxConnectionElementArray.length>1){
        ConnectionElementArray.push([]);
        ConnectionElementArray[ConnectionElementArray.length - 1] = AuxConnectionElementArray.slice();
        AuxConnectionElementArray.length = 0; 
        if (ConnectionElementArray.length>1){
            for (var i = 0; i<ConnectionElementArray.length-1; i++){
                if (ConnectionElementArray[i][0]===ConnectionElementArray[ConnectionElementArray.length-1][0]){
                    ConnectionElementArray[i].push(ConnectionElementArray[ConnectionElementArray.length-1][1]);
                    ConnectionElementArray.pop();
                }
            }
        }
    }  
}
//--------------------------------------------

function fillActiveElementArray(){
    for(var i=0; i<ConnectionElementArray.length; i++){
        if (ConnectionElementArray[i][0]==='IG'){
            ActiveElementArray.push(ConnectionElementArray[i]);
        }
    }
}

function go(){
    for(var i = 0; i<ActiveElementArray.length; i++){  //проверка на некорректные соединения
        for(var j = 1; j<ActiveElementArray[i].length; j++){
            DuplicateArray.push(ActiveElementArray[i][j]);
            for(var k = 0; k<DuplicateArray.length-1; k++){
                if(DuplicateArray[k][1]===DuplicateArray[DuplicateArray.length-1][1] &&
                    DuplicateArray[k][0]!==DuplicateArray[DuplicateArray.length-1][0]){
                    alert('Impossible connection');
                    return;
                }
            }
        }
    }
    DuplicateArray.length = 0;

    for(var i = 0; i<ActiveElementArray.length; i++){
        for(var j = 1; j<ActiveElementArray[i].length; j++){
            if(ActiveElementArray[i][j][0]==='s1' && ActiveElementArray[i][j][1].state==='off'){
                ActiveElementArray[i][j][1].setTriggerIndication();
                ActiveElementArray[i][j][1].state = 'on';
                for(var m = 0; m<ConnectionElementArray.length; m++){
                    if (ConnectionElementArray[m][0]==='T1')
                    AuxActiveElementArray.push(ConnectionElementArray[m]);
                }
            }
            if(ActiveElementArray[i][j][0]==='s2' && ActiveElementArray[i][j][1].state==='off'){
                ActiveElementArray[i][j][1].setTriggerIndication();
                ActiveElementArray[i][j][1].state = 'on';
                for(var m = 0; m<ConnectionElementArray.length; m++){
                    if (ConnectionElementArray[m][0]==='T2')
                    AuxActiveElementArray.push(ConnectionElementArray[m]);
                }
            }
            if(ActiveElementArray[i][j][0]==='s3' && ActiveElementArray[i][j][1].state==='off'){
                ActiveElementArray[i][j][1].setTriggerIndication();
                ActiveElementArray[i][j][1].state = 'on';
                for(var m = 0; m<ConnectionElementArray.length; m++){
                    if (ConnectionElementArray[m][0]==='T3')
                    AuxActiveElementArray.push(ConnectionElementArray[m]);
                }
            }
            if(ActiveElementArray[i][j][0]==='s4' && ActiveElementArray[i][j][1].state==='off'){
                ActiveElementArray[i][j][1].setTriggerIndication();
                ActiveElementArray[i][j][1].state = 'on';
                for(var m = 0; m<ConnectionElementArray.length; m++){
                    if (ConnectionElementArray[m][0]==='T4')
                    AuxActiveElementArray.push(ConnectionElementArray[m]);
                }
            }
            if(ActiveElementArray[i][j][0]==='s5' && ActiveElementArray[i][j][1].state==='off'){
                ActiveElementArray[i][j][1].setTriggerIndication();
                ActiveElementArray[i][j][1].state = 'on';
                for(var m = 0; m<ConnectionElementArray.length; m++){
                    if (ConnectionElementArray[m][0]==='T5')
                    AuxActiveElementArray.push(ConnectionElementArray[m]);
                }
            }
            if(ActiveElementArray[i][j][0]==='s6' && ActiveElementArray[i][j][1].state==='off'){
                ActiveElementArray[i][j][1].setTriggerIndication();
                ActiveElementArray[i][j][1].state = 'on';
                for(var m = 0; m<ConnectionElementArray.length; m++){
                    if (ConnectionElementArray[m][0]==='T6')
                    AuxActiveElementArray.push(ConnectionElementArray[m]);
                }
            }   
            if(ActiveElementArray[i][j][0]==='s7' && ActiveElementArray[i][j][1].state==='off'){
                ActiveElementArray[i][j][1].setTriggerIndication();
                ActiveElementArray[i][j][1].state = 'on';
                for(var m = 0; m<ConnectionElementArray.length; m++){
                    if (ConnectionElementArray[m][0]==='T7')
                    AuxActiveElementArray.push(ConnectionElementArray[m]);
                }
            }
            if(ActiveElementArray[i][j][0]==='s8' && ActiveElementArray[i][j][1].state==='off'){
                ActiveElementArray[i][j][1].setTriggerIndication();
                ActiveElementArray[i][j][1].state = 'on';
                for(var m = 0; m<ConnectionElementArray.length; m++){
                    if (ConnectionElementArray[m][0]==='T8')
                    AuxActiveElementArray.push(ConnectionElementArray[m]);
                }
            }
            if (ActiveElementArray[i][j][0] === 'Tm1' && ActiveElementArray[i][j][1].state === 'off') {
                ActiveElementArray[i][j][1].timerStartedIndication();
                ActiveElementArray[i][j][1].state = 'on';
                for (var m = 0; m < ConnectionElementArray.length; m++) {
                    if (ConnectionElementArray[m][0].number === 'Tm1') {
                        setTimeout(function(m) {
                            ConnectionElementArray[m][0].timerWorkedIndication();
                            ConnectionElementArray[m][0].state = 'off';
                            ActiveElementArray.push(ConnectionElementArray[m]);
                            setTimeout(()=>{ ConnectionElementArray[m][0].resetTimerIndication(); }, 100); 
                        }.bind(null, m), timer1);
                    }
                }
            }
            if (ActiveElementArray[i][j][0] === 'Tm2' && ActiveElementArray[i][j][1].state === 'off') {
                ActiveElementArray[i][j][1].timerStartedIndication();
                ActiveElementArray[i][j][1].state = 'on';
                for (var m = 0; m < ConnectionElementArray.length; m++) {
                    if (ConnectionElementArray[m][0].number === 'Tm2') {
                        setTimeout(function(m) {
                            ConnectionElementArray[m][0].timerWorkedIndication();
                            ConnectionElementArray[m][0].state = 'off';
                            ActiveElementArray.push(ConnectionElementArray[m]);
                            setTimeout(()=>{ ConnectionElementArray[m][0].resetTimerIndication(); }, 100); 
                        }.bind(null, m), timer2);
                    }
                }
            }
            if (ActiveElementArray[i][j][0] === 'Tm3' && ActiveElementArray[i][j][1].state === 'off') {
                ActiveElementArray[i][j][1].timerStartedIndication();
                ActiveElementArray[i][j][1].state = 'on';
                for (var m = 0; m < ConnectionElementArray.length; m++) {
                    if (ConnectionElementArray[m][0].number === 'Tm3') {
                        setTimeout(function(m) {
                            ConnectionElementArray[m][0].timerWorkedIndication();
                            ConnectionElementArray[m][0].state = 'off';
                            ActiveElementArray.push(ConnectionElementArray[m]);
                            setTimeout(()=>{ ConnectionElementArray[m][0].resetTimerIndication(); }, 100); 
                        }.bind(null, m), timer3);
                    }
                }
            }
            if (ActiveElementArray[i][j][0] === 'Tm4' && ActiveElementArray[i][j][1].state === 'off') {
                ActiveElementArray[i][j][1].timerStartedIndication();
                ActiveElementArray[i][j][1].state = 'on';
                for (var m = 0; m < ConnectionElementArray.length; m++) {
                    if (ConnectionElementArray[m][0].number === 'Tm4') {
                        setTimeout(function(m) {
                            ConnectionElementArray[m][0].timerWorkedIndication();
                            ConnectionElementArray[m][0].state = 'off';
                            ActiveElementArray.push(ConnectionElementArray[m]);
                            setTimeout(()=>{ ConnectionElementArray[m][0].resetTimerIndication(); }, 100); 
                        }.bind(null, m), timer4);
                    }
                }
            }
            if (ActiveElementArray[i][j][0] === 'Tm5' && ActiveElementArray[i][j][1].state === 'off') {
                ActiveElementArray[i][j][1].timerStartedIndication();
                ActiveElementArray[i][j][1].state = 'on';
                for (var m = 0; m < ConnectionElementArray.length; m++) {
                    if (ConnectionElementArray[m][0].number === 'Tm5') {
                        setTimeout(function(m) {
                            ConnectionElementArray[m][0].timerWorkedIndication();
                            ConnectionElementArray[m][0].state = 'off';
                            ActiveElementArray.push(ConnectionElementArray[m]);
                            setTimeout(()=>{ ConnectionElementArray[m][0].resetTimerIndication(); }, 100); 
                        }.bind(null, m), timer5);
                    }
                }
            }
            if (ActiveElementArray[i][j][0] === 'Tm6' && ActiveElementArray[i][j][1].state === 'off') {
                ActiveElementArray[i][j][1].timerStartedIndication();
                ActiveElementArray[i][j][1].state = 'on';
                for (var m = 0; m < ConnectionElementArray.length; m++) {
                    if (ConnectionElementArray[m][0].number === 'Tm6') {
                        setTimeout(function(m) {
                            ConnectionElementArray[m][0].timerWorkedIndication();
                            ConnectionElementArray[m][0].state = 'off';
                            ActiveElementArray.push(ConnectionElementArray[m]);
                            setTimeout(()=>{ ConnectionElementArray[m][0].resetTimerIndication(); }, 100); 
                        }.bind(null, m), timer6);
                    }
                }
            }
            if (ActiveElementArray[i][j][0] === 'Tm7' && ActiveElementArray[i][j][1].state === 'off') {
                ActiveElementArray[i][j][1].timerStartedIndication();
                ActiveElementArray[i][j][1].state = 'on';
                for (var m = 0; m < ConnectionElementArray.length; m++) {
                    if (ConnectionElementArray[m][0].number === 'Tm7') {
                        setTimeout(function(m) {
                            ConnectionElementArray[m][0].timerWorkedIndication();
                            ConnectionElementArray[m][0].state = 'off';
                            ActiveElementArray.push(ConnectionElementArray[m]);
                            setTimeout(()=>{ ConnectionElementArray[m][0].resetTimerIndication(); }, 100); 
                        }.bind(null, m), timer7);
                    }
                }
            }
            if (ActiveElementArray[i][j][0] === 'Tm8' && ActiveElementArray[i][j][1].state === 'off') {
                ActiveElementArray[i][j][1].timerStartedIndication();
                ActiveElementArray[i][j][1].state = 'on';
                for (var m = 0; m < ConnectionElementArray.length; m++) {
                    if (ConnectionElementArray[m][0].number === 'Tm8') {
                        setTimeout(function(m) {
                            ConnectionElementArray[m][0].timerWorkedIndication();
                            ConnectionElementArray[m][0].state = 'off';
                            ActiveElementArray.push(ConnectionElementArray[m]);
                            setTimeout(()=>{ ConnectionElementArray[m][0].resetTimerIndication(); }, 100); 
                        }.bind(null, m), timer8);
                    }
                }
            }
            if(ActiveElementArray[i][j][0]==='r1' && ActiveElementArray[i][j][1].state==='on'){
                ActiveElementArray[i][j][1].resetTriggerIndication();
                ActiveElementArray[i][j][1].state = 'off';
            }
            if(ActiveElementArray[i][j][0]==='r2' && ActiveElementArray[i][j][1].state==='on'){
                ActiveElementArray[i][j][1].resetTriggerIndication();
                ActiveElementArray[i][j][1].state = 'off';
            }
            if(ActiveElementArray[i][j][0]==='r3' && ActiveElementArray[i][j][1].state==='on'){
                ActiveElementArray[i][j][1].resetTriggerIndication();
                ActiveElementArray[i][j][1].state = 'off';
            }
            if(ActiveElementArray[i][j][0]==='r4' && ActiveElementArray[i][j][1].state==='on'){
                ActiveElementArray[i][j][1].resetTriggerIndication();
                ActiveElementArray[i][j][1].state = 'off';
            }
            if(ActiveElementArray[i][j][0]==='r5' && ActiveElementArray[i][j][1].state==='on'){
                ActiveElementArray[i][j][1].resetTriggerIndication();
                ActiveElementArray[i][j][1].state = 'off';
            }
            if(ActiveElementArray[i][j][0]==='r6' && ActiveElementArray[i][j][1].state==='on'){
                ActiveElementArray[i][j][1].resetTriggerIndication();
                ActiveElementArray[i][j][1].state = 'off';
            }
            if(ActiveElementArray[i][j][0]==='r7' && ActiveElementArray[i][j][1].state==='on'){
                ActiveElementArray[i][j][1].resetTriggerIndication();
                ActiveElementArray[i][j][1].state = 'off';
            }
            if(ActiveElementArray[i][j][0]==='r8' && ActiveElementArray[i][j][1].state==='on'){
                ActiveElementArray[i][j][1].resetTriggerIndication();
                ActiveElementArray[i][j][1].state = 'off';
            }
        }
    } 
    ActiveElementArray.length = 0;
    ActiveElementArray = AuxActiveElementArray.slice();
    AuxActiveElementArray.length = 0;
    setTimeout(go, 500);   
}
