const BIN="69af4de6d0ea881f40021797"
const KEY="TWOJ_MASTER_KEY"

let employees=[]
let users=[]

const ranks={
10:"Chief of Family",
9:"Deputy Chief",
8:"Assistant Chief",
7:"Awakend",
6:"Chosen",
5:"Seeker",
4:"Adept",
3:"Member",
2:"Cadet",
1:"Vacation"
}

async function loadData(){

const res=await fetch(`https://api.jsonbin.io/v3/b/${BIN}/latest`,{
headers:{ "X-Master-Key":KEY }
})

const data=await res.json()

employees=data.record.employees||[]
users=data.record.users||[]

renderTable()

}

function renderTable(){

const table=document.getElementById("table")

if(!table) return

table.innerHTML=""

employees.sort((a,b)=>b.rank-a.rank)

employees.forEach(e=>{

table.innerHTML+=`
<tr>
<td>${e.name}</td>
<td>${e.uid}</td>
<td>${ranks[e.rank]}</td>
<td>${e.exam}</td>
</tr>
`

})

}

function login(){

const l=document.getElementById("login").value
const p=document.getElementById("password").value

const user=users.find(u=>u.login===l && u.password===p)

if(user){

localStorage.setItem("logged",true)

window.location.href="/paneladm"

}else{

alert("Błędny login lub hasło")

}

}

function checkAuth(){

if(!localStorage.getItem("logged")){

window.location.href="/logowanie"

}

}

function logout(){

localStorage.removeItem("logged")

window.location.href="/logowanie"

}

async function saveData(){

await fetch(`https://api.jsonbin.io/v3/b/${BIN}`,{
method:"PUT",
headers:{
"Content-Type":"application/json",
"X-Master-Key":KEY
},
body:JSON.stringify({employees,users})
})

}

function addEmployee(){

const name=document.getElementById("name").value
const uid=document.getElementById("uid").value
const rank=document.getElementById("rank").value
const exam=document.getElementById("exam").value

employees.push({
name:name,
uid:uid,
rank:parseInt(rank),
exam:exam
})

saveData()
loadData()

}

loadData()
