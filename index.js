
class Crud{
    setData(value){
        localStorage.setItem('data',value);
    }
    getData(){
       return localStorage.getItem('data');
    }
    clear(){
        localStorage.clear();
    }
    elements(id){
       return document.getElementById(id)
    }
    all(elementName){
        return document.querySelectorAll(elementName);
    }
}
const local = new Crud();

//add task
const addTask = () => {
  const e = local.elements('userInput'); // input details
  const error = local.elements('error'); // error details
  let arrayData = [];
  if(!e.value){
      error.innerText="please enter details"
      return;
  }
  const localData = local.getData();
  if(!localData){
    arrayData=[];
  }
  else{
      arrayData = JSON.parse(localData);
  }
  arrayData.push(e.value);
  local.setData(JSON.stringify(arrayData));
  error.innerText="";
  e.value = '';
  showData();
}

// show data
let showData = () =>{
    const localData = local.getData();
    let arrayData = [];
    if(!localData){
        arrayData=[];
    }
    else{
      arrayData = JSON.parse(localData)
    }

    let tr = '';
    const tbody = local.elements('tbody');
    arrayData.map((e,i)=>{
      tr+=`<tr>
            <td>${i+1}</td>
            <td>${e}</td>
            <td>
                <button type="button" class="btn btn-primary btn-sm" onClick='edit(${i})'>Edit</button>
                <button type="button" class="btn btn-danger btn-sm" onClick='deleteData(${i})'>Delete</button>
            </td>
            </tr>
      `
    })
    tbody.innerHTML = tr;

}
// edit
let editDataIndex;
const edit = (index) =>{
    editDataIndex=index;
 const localData = JSON.parse(local.getData());
 const indexData = localData[index];
 const userInput = local.elements('userInput');
 userInput.value = indexData;
 const saveData = local.elements("saveData")
 const addData = local.elements("addData");
 saveData.style.display = 'block';
 addData.style.display = 'none';
 const error = local.elements('error');
 error.innerText=''
}

// save Data

const saveData = ()=>{
 const localData = JSON.parse(local.getData());
 const userInput = local.elements('userInput');
 const error = local.elements('error');
 if(!userInput.value){
    error.innerText = 'please enter data';
    return
 }
 localData[editDataIndex] = userInput.value;
 local.setData(JSON.stringify(localData));
 showData();
 const saveData = local.elements("saveData")
 const addData = local.elements("addData");
 saveData.style.display = 'none';
 addData.style.display = 'block';
 userInput.value = ''
 error.innerText=''
}

// delete
const deleteData = (index) => {
 const localData =  JSON.parse(local.getData())
 localData.splice(index,1);
 local.setData(JSON.stringify(localData));
 showData();
}
// delete all

const deleteAll = () => {
    local.clear();
    const saveData = local.elements("saveData")
    const addData = local.elements("addData");
    saveData.style.display = 'none';
    addData.style.display = 'block';
    const userInput = local.elements('userInput');
    const error = local.elements('error');
    userInput.value = ''
    error.innerText=''
    showData();
}

const searchData = () => {
   const searchInput =  local.elements('search');
   const searchInputValue = searchInput.value
   const tr = local.all('tr');
   const arr = Array.from(tr);
   arr.forEach((e,i)=>{
     const td =  e.getElementsByTagName('td')[1];
     const tdValue = td.innerText;
     const reg = new RegExp(searchInputValue,'gi');
     if(tdValue.match(reg)){
        e.style.display = 'table-row';
     }
     else{
        e.style.display = 'none';
     }

   })
  
}

showData();


