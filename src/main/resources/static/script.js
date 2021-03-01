var selectedRow = null;
function onFormSubmit(){
    var formData = readFormData();
    if (selectedRow == null)
        insertNewRecord(formData);
    else
        insertNewRecord(formData);
    resetForm();
}

async function onSignSubmit(){
    let signData = readSignData();
    let bemVindo = document.getElementById("bemVindo").title;
    try {
        let testePost = await post(window.location.href + "person", JSON.stringify(signData), "users");
        bemVindo = testePost.result;
        if (testePost.status == 200 && bemVindo != 0 ) {
            document.getElementById("logOut").classList.remove("d-none");

            await buildTable(testePost.result);
            showTable(testePost.result);
        }else {
            window.alert("Usuário já cadastrado!");
        }
    } catch (_){
        window.alert("Usuário já cadastrado!");
    }

}

async function login(){
    let signData = loginData();
    let bemVindo = document.getElementById("bemVindo").title;
    try {
        let loginPost = await postLogin(window.location.href, JSON.stringify(signData), "auth", signData.emailId, signData.password);
        bemVindo = loginPost.result;
        if (loginPost.status == 200 && bemVindo != 0 ) {
            console.log(loginPost.result);
            document.getElementById("logOut").classList.remove("d-none");
            await buildTable(loginPost.result);
            showTable(loginPost.result);
        } else
        {
            window.alert("Dados incorretos ou usuário inexistente!");
        }
    } catch (_){
        window.alert("Dados incorretos ou usuário inexistente!");
    }
}

function logOut(){
    let element = document.getElementById("bemVindo");
    let name = element.title;


        if (window.confirm("Tem certeza?")){

            logOut.title = 0;
            window.location.hef = "#home";
            loadHome();
        }


}



function readFormData() {
    var formData = {};
    formData["name"] = document.getElementById("nomeTodo").value;
    formData["emailId"] = document.getElementById("email").value;
    formData["age"] = document.getElementById("age").value;
    return formData;

}

function loginData() {
    let loginData = {};
    loginData["emailId"] = document.getElementById("emailLoginEntry").value;
    loginData["password"] = document.getElementById("senhaEntry").value;
    return loginData;

}

function readSignData() {
    let signData = {};
    signData["name"] = document.getElementById("nomeTodoLogin").value;
    signData["emailId"] = document.getElementById("emailLogin").value;
    signData["age"] = document.getElementById("agelogin").value;
    signData["password"] = document.getElementById("senhaLogin").value;
    return signData;

}

function loadUsers(){

   let element = document.getElementById("bemVindo");
    let name = element.title;
    if (name == 0){
        if (!window.location.href.includes("#cadastro")) {
            document.getElementById("welcomeSign").classList.add("d-none");
            document.getElementById("login").classList.add("d-none");
            document.getElementById("Entry").classList.remove("d-none");
        }


        if (window.location.href.includes("#cadastro")) {
            document.getElementById("welcomeSign").classList.add("d-none");
            document.getElementById("Entry").classList.add("d-none");
            document.getElementById("login").classList.remove("d-none");
        }

    }else {
        if (name != 0){
            document.getElementById("login").classList.add("d-none");
            document.getElementById("Entry").classList.add("d-none");
            showTable(name);
        }
    }

}

async function showTable(userId){
    document.getElementById("Entry").classList.add("d-none");
    document.getElementById("welcomeSign").classList.add("d-none");
    document.getElementById("login").classList.add("d-none");
    let bemVindo = document.getElementById("bemVindo");

    if (bemVindo.title == 0) {

        bemVindo.title = userId;
        bemVindo.innerHTML = `<p> Bem-vindo(a)! <br>ID de usuário: ${userId} </p>`;
    }

    document.getElementById("mainTable").classList.remove("d-none");

}

async function buildTable(userId){
    let list = await getList2(window.location.href,"person");

    list = list.result;

    var table = document.getElementById("Listadepessoas").getElementsByTagName('tbody')[0];


    let data2 = JSON.parse(list);

    let x =0;
    for(let element of data2) {
        if(element.creationId == userId) {
            var newRow = table.insertRow(table.length);

            cell0 = newRow.insertCell(0);
            cell0.innerHTML = element.id;
            cell1 = newRow.insertCell(1);
            cell1.innerHTML = element.name;

            cell2 = newRow.insertCell(2);
            cell2.innerHTML = element.age;


            cell4 = newRow.insertCell(3);
            cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
            x += 1;
        }
    }
}

function showSignUp(){
    document.getElementById("Entry").classList.add("d-none");
    document.getElementById("welcomeSign").classList.add("d-none");
    document.getElementById("login").classList.remove("d-none");
}

function loadHome(){

    document.getElementById("mainTable").classList.add("d-none");
    document.getElementById("Entry").classList.add("d-none");
    document.getElementById("login").classList.add("d-none");
    document.getElementById("welcomeSign").classList.remove("d-none");
}




window.onload = function (){
    const url = window.location.href;
   if(url.includes("#users") ||url.includes("#cadastro") ){
        loadUsers();
   }
   if(url.includes("#home") || (!url.includes("#users"))){
        loadHome();
    }
    if(url.includes("#cadastro")){
        loadUsers();
    }
}

window.onhashchange = function() {
    const url = window.location.href;
    if(url.includes("#users")){
        loadUsers();
    }
    if(url.includes("#home") || (!url.includes("#users"))){
        loadHome();
    }
    if(url.includes("#cadastro")){
        loadUsers();
    }

}

async function sort(){
    let emailSender = {};
    emailSender["emailSender"]= (document.getElementById("emailSender").value);
    let list = await getList2(window.location.href,"person");
    let element = document.getElementById("bemVindo");
    let id = element.title;
    emailSender["id"] =(id);
    list = list.result;
    list = JSON.parse(list);
    for(let element of list) {
       if (element.creationId != id) {
           list.pop(element);
       }
    }
    let tam = list.length;
    if (tam >= 3 ){

        emailSender = JSON.stringify(emailSender);
       let url = window.location.href
        let result = await post(url, emailSender, "sort");
        if(result.status == 200){
            window.alert("Amigos secretos gerados!");
            let sorteio = JSON.parse(result.result);
            for(const person of sorteio) {
                console.log("O amigox do(a) " + person.name + " é " + person.partnerName);
            }
        }
    } else {
        window.alert("Insira mais pessoas para o sorteio");
    }

}


async function insertNewRecord(data){

    let element = document.getElementById("bemVindo");
    data["creationId"] = element.title;
    let testePost = await post(window.location.href, JSON.stringify(data), "person");

    console.log(testePost.result);

    var table = document.getElementById("Listadepessoas").getElementsByTagName('tbody')[0];



            var newRow = table.insertRow(table.length);

            cell0 = newRow.insertCell(0);
            cell0.innerHTML = testePost.result;
            cell1 = newRow.insertCell(1);
            cell1.innerHTML = data.name;

            cell2 = newRow.insertCell(2);
            cell2.innerHTML = data.age;


            cell4 = newRow.insertCell(3);
            cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;

    document.getElementById("mainTable").classList.remove("d-none");


}

function resetForm(){
    document.getElementById("nomeTodo").value = "";
    document.getElementById("age").value = "";
    document.getElementById("email").value = "";


}

async function onEdit(td){
    selectedRow = td.parentElement.parentElement;
    await onDelete(td);
    document.getElementById("nomeTodo").value = selectedRow.cells[1].innerHTML;
    document.getElementById("age").value = selectedRow.cells[2].innerHTML;
    document.getElementById("email").value = "Digite seu e-mail";

}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.name;
    selectedRow.cells[1].innerHTML = formData.age;
    selectedRow.cells[2].innerHTML = formData.emailId;
}


async function onDelete(td) {
    if (confirm('Tem certeza?')) {
        row = td.parentElement.parentElement;
        let elementID = row.firstChild.innerHTML;
        let response = await del(window.location.href , "",`person/ ${elementID}`);
        console.log(response.status);
        document.getElementById("Listadepessoas").deleteRow(row.rowIndex);
        resetForm();
    }
}
 async function changeElement() {
    //document.getElementById("ajaxbutton").addEventListener('click', get);
    const url = window.location.href + "greeting";
     let teste = await get(url);
     console.log(typeof teste.result);
     if ( teste.result == "greeting") {
         location.href = url;
     }
 }

function getList(url, path, userID) {
    url = url.split('#')[0];
    url = url + path;
    var ajax = new XMLHttpRequest();


    ajax.open("GET", url, true);

    ajax.send();

    ajax.onreadystatechange = function() {

        // Caso o state seja 4 e o http.status for 200, é porque a requisiçõe deu certo.
        if (ajax.readyState == 4 && ajax.status == 200) {

            var data = ajax.responseText;

            var table = document.getElementById("Listadepessoas").getElementsByTagName('tbody')[0];

            let listaPeople = data;

            let data2 = JSON.parse(listaPeople);

            let x =0;
            for(let element of data2) {
                if(element.creationId == userID) {
                    var newRow = table.insertRow(table.length);

                    cell0 = newRow.insertCell(0);
                    cell0.innerHTML = element.id;
                    cell1 = newRow.insertCell(1);
                    cell1.innerHTML = element.name;

                    cell2 = newRow.insertCell(2);
                    cell2.innerHTML = element.age;


                    cell4 = newRow.insertCell(3);
                    cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
                    x += 1;
                }
            }
        }
    }

}function getList2(url, path , userID) {
    url = url.split('#')[0];
    url = url + path;
    return new Promise((resolve, reject) => {

        let ajax = new XMLHttpRequest();

        ajax.open("GET", url,true);
        ajax.onload = function() {
            if (ajax.readyState == 4 && ajax.status == 200) {
                resolve({
                    status: ajax.status,
                    result: ajax.response
                });
            }
            else {
                reject({
                    status: ajax.status,
                    message: ajax.responseText
                });
            }
        }
        ajax.send(''); }
    )

}

function get(url, path) {
    url = url.split('#')[0];
    url = url + path;
   return new Promise((resolve, reject) => {

       let ajax = new XMLHttpRequest();

       ajax.open("GET", url,true);
       ajax.onload = function() {
           if (ajax.readyState == 4 && ajax.status == 200) {
                   resolve({
                       status: ajax.status,
                       result: ajax.response
                   });
           }
           else {
               reject({
                   status: ajax.status,
                   message: ajax.responseText
               });
           }
    }
    ajax.send(''); }
    )

}

function postLogin(url,request, path, user, password) {
    url = url.split('#')[0];
    url = url + path;
    return new Promise((resolve, reject) => {

        let ajax = new XMLHttpRequest();

        ajax.open("Post", url,true);
        ajax.onload = function() {
            if (ajax.readyState == 4 && ajax.status == 200) {
                resolve({
                    status: ajax.status,
                    result: ajax.response
                });
            }
            else {
                reject({
                    status: ajax.status,
                    message: ajax.responseText
                });
            }
        }
        ajax.send(request); }
    )

}

function post(url, request, path) {
    url = url.split('#')[0];
    url = url + path;
    return new Promise((resolve, reject) => {

        let ajax = new XMLHttpRequest();

        ajax.open("POST", url, true);
        ajax.onload = function() {
            if (ajax.readyState == 4 && ajax.status == 200) {
                resolve({
                    status: ajax.status,
                    result: ajax.response
                });
            }
            else {
                reject({
                    status: ajax.status,
                    message: ajax.responseText
                });
            }
        }
        ajax.send(request);
    });

}
function del(url, request, path) {
    url = url.split('#')[0];
    url = url + path;
    return new Promise((resolve, reject) => {

        let ajax = new XMLHttpRequest();

        ajax.open("DELETE", url, true);
        ajax.onload = function() {
            if (ajax.readyState == 4 && ajax.status == 200) {
                resolve({
                    status: ajax.status,
                    result: ajax.response
                });
            }
            else {
                reject({
                    status: ajax.status,
                    message: ajax.responseText
                });
            }
        }
        ajax.send(request);
    });

}


