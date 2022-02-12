document.cookie = "safeCookie1=foo; SameSite=Lax";
document.cookie = "safeCookie2=foo";
document.cookie = "crossCookie=bar; SameSite=None; Secure";


const main = document.querySelector('#main');
const qna = document.querySelector('#qna');
const qnaBox = document.querySelector('.qnaBox');
const result = document.querySelector('#result')
const endpoint = 12;
const select = [];
const qnaTopbanner = document.querySelector('.qna-topBanner');
const qnaBottombanner = document.querySelector('.qna-Bottombanner');

function calResult(){
    var pointArray = [
        {name : '최남라',value : 0, key : 0},
        {name : '서효령',value : 0, key : 1},
        {name : '예비좀비3',value : 0, key : 2},
        {name : '과학선생님',value : 0, key : 3},
        {name : '담임쌤',value : 0, key : 4},
        {name : '남온조',value : 0, key : 5},
        {name : '실종자598번',value : 0, key : 6},
        {name : '윤귀남',value : 0, key : 7},
        {name : '이수혁',value : 0, key : 8},
        {name : '귤까는 소리(bj)',value : 0, key : 9},
        {name : '박미진',value : 0, key : 10},
        {name : '교장선생님',value : 0, key : 11},
        {name : '온조아빠',value : 0, key : 12},
        {name : '학년부장',value : 0, key : 13},
        {name : '이청산',value : 0, key : 14},
        {name : '이나연',value : 0, key : 15},
    ]

    for(let i = 0; i < endpoint; i++){
        var target = qnaList[i].a[select[i]];
        for(let j = 0; j < target.type.length; j++){
            for(let k = 0; k < pointArray.length; k++){
                if(target.type[j] === pointArray[k].name){
                    pointArray[k].value += 1;
                }
            }
        }
    }

    var resultArray = pointArray.sort(function(a,b){
        if(a.value > b.value){
            return -1;
        }
        if(a.value < b.value){
            return 1;
        }
    })
    let resultword = resultArray[0].key;
    return resultword
}

function setResult(){
    let point = calResult();
    const resultName = document.querySelector('.resultName')
    resultName.innerHTML = infoList[point].name;

    var resultImg = document.createElement('img');
    const imgDiv = document.querySelector('.resultImg');
    var imgURL = 'start/img/image-' + point + '.png'
    resultImg.src = imgURL;
    resultImg.alt = point;
    imgDiv.appendChild(resultImg);

    const resultdesc = document.querySelector('.resultDesc');
    resultdesc.innerHTML = infoList[point].desc
}

function goResult(){
    qnaBox.style.display ='none';
    result.style.display ='block';
    setResult();
    
}

function addAnswer(answerText,qIdx,idx){
    var a = document.querySelector('.answerBox');
    var answer = document.createElement('button');
    answer.classList.add('answerList')
    
    a.appendChild(answer);
    answer.innerHTML = answerText;
    answer.addEventListener('click', function(){
        var children =  document.querySelectorAll('.answerList');
        select[qIdx] = idx;
        for(let i = 0; i <children.length; i++){
            children[i].disabled = true;
            children[i].style.display = 'none'
        }
        goNext(++qIdx);
    })
}

function goNext(qIdx) {
    if(qIdx === endpoint){
        goResult();
        return
    }
    var q = document.querySelector('.qBox')
    q.innerHTML = qnaList[qIdx].q;
    q.classList.add('qBox_title')
    for(let i in qnaList[qIdx].a) {
        addAnswer(qnaList[qIdx].a[i].answer,qIdx,i);
    }
    var status = document.querySelector('.statusBar')
    status.style.width = (100/endpoint) * (qIdx+1) + '%'}

function begin(){
    main.style.WebkitAnimation = 'fadeOut 1s';
    main.style.animation = 'fadeOut 1s';
    
    
    setTimeout(()=>{
        qnaBox.style.WebkitAnimation = 'fadeIn 1s';
        qnaBox.style.animation = 'fadeIn 1s';

        
        setTimeout(()=>{
            main.style.display = 'none';
            qnaBox.style.display = 'block';
        },450)
        let qIdx = 0;
        goNext(qIdx);
    },450)
    qnaTopbanner.style.display ='block'
    qnaBottombanner.style.display ='block'
}

function clip(){
	var url = '';
	var textarea = document.createElement("textarea");
	document.body.appendChild(textarea);
	url = window.document.location.href;
	textarea.value = url;
	textarea.select();
	document.execCommand("copy");
	document.body.removeChild(textarea);
	alert("URL이 복사되었습니다.")
}

document.querySelector('.testStart').addEventListener('click', begin);
document.querySelector('.resultGongyu').addEventListener('click', function(){
    window.location.reload()
});
document.querySelector('.buttonGrayMedium').addEventListener('click', clip);

