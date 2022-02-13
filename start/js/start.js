
const 큐앤에이질문= document.querySelector('.qnaQ')
const 대답박스 = document.querySelector('.qBox__answerBox')
const endPoint = 12;


function 대답버튼추가(버튼텍스트,qIdx){
    let 버튼추가 = document.createElement('button');
    대답박스.appendChild(버튼추가);
    버튼추가.innerHTML = 버튼텍스트;
    버튼추가.classList.add('col-10')
    버튼추가.classList.add('m-2')
    버튼추가.classList.add('p-3')
    버튼추가.classList.add('qna__button')
    
    버튼추가.addEventListener('click',function(){
        var children = document.querySelectorAll('.qna__button');
        for(let i = 0; i < children.length; i++){
            children[i].disabled = true;
            children[i].style.display = 'none';
        }
        큐앤애이페이지로이동1(++qIdx);
    }, false)
}

function 큐앤애이페이지로이동 (){
    let qIdx = 0;
    큐앤애이페이지로이동1(qIdx)
}

function 큐앤애이페이지로이동1(qIdx){
    큐앤에이질문.innerHTML = qnaList[qIdx].q;
    for(let i in qnaList[qIdx].a){
        대답버튼추가(qnaList[qIdx].a[i].answer,qIdx);
    } 
    var status = document.querySelector('.statusBar');
    status.style.width = (100/endPoint) * (qIdx+1) + '%'
}