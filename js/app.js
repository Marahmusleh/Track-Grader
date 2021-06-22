'use strict'

let container = document.getElementById('tableDiv');
let table = document.createElement('table');
container.appendChild(table);

let allGrades=[];
let header = ['Student Name','Student Grade','Course','Status'];
function Grades(name,course,grade=getRndInteger(0,100),status){
    this.name=name;
    this.course=course;
    this.grade=grade;
    this.status=status ;
    allGrades.push(this);
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

  Grades.prototype.getStatus =function(){
   if(this.grade < 50){
     this.status ==='Fail';
   }
   if(this.grade >50){
       this.status==='Pass';
   }
  }

  function headerRender(){
  let row = document.createElement('tr');
  table.appendChild(row);

  for(let i =0; i<header.length;i++){
      let thElement = document.createElement('th');
      row.appendChild(thElement);
      thElement.textContent=header[i];
    }
}
headerRender();

Grades.prototype.renderTable = function(){
    let row = document.createElement('tr');
    table.appendChild(row);

    let tdElement = document.createElement('td');
    row.appendChild(tdElement);
    tdElement.textContent=this.name;

    let tdElement2 = document.createElement('td');
    row.appendChild(tdElement2);
    tdElement2.textContent=this.grade;

    let tdElement3 = document.createElement('td');
    row.appendChild(tdElement3);
    tdElement3.textContent=this.course;

    let tdElement4 = document.createElement('td');
    row.appendChild(tdElement4);
    tdElement4.textContent=this.status;


}

let form = document.getElementById('form');
form.addEventListener('submit',handleSubmitting);

function handleSubmitting(event){
    event.preventDefault();
    let studentName = event.target.name.value;
    let studentCourse = event.target.course.value;

    let showGrade = new Grades(studentName,studentCourse);
    setToLocalStorage();
    showGrade.getStatus();
    showGrade.renderTable();
}

function setToLocalStorage(){
    let convertArr = JSON.stringify(allGrades);
    localStorage.setItem('allInformation',convertArr);
}

function getToLocalStorage (){
    let data = localStorage.getItem('allInformation');
    let newData = JSON.parse(data);
    if(newData){
    for(let i=0;i<newData.length;i++){
        let reInstance = new Grades(newData[i].name,newData[i].course,newData[i].grade,newData[i].status);
        reInstance.getStatus();
        reInstance.renderTable();
    }
    }
}
getToLocalStorage();