
const formEl = document.getElementById('main_form');
const result_data = document.getElementById('result_data');


const formData = new FormData(formEl);
const searchParams = new URLSearchParams(formData);
fetch('./php/load.php', {
    method: 'POST', 
    headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
    body: searchParams,
}).then(res => res.text())
.then(function (searchParams) {
    console.log(searchParams);
    result_data.innerHTML = searchParams;
})
.catch(err => alert("Ошибка HTTP " + err.status + " . Повторите попытку позже. " + err));  
            
    



formEl.addEventListener('submit', e => {
    e.preventDefault();
    if(validateForm()){
        const formData = new FormData(formEl);
        const searchParams = new URLSearchParams(formData);
        fetch('./php/script.php', {
            method: 'POST', 
            headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: searchParams,
        }).then(res => res.text())
        .then(function (searchParams) {
            console.log(searchParams);
            result_data.innerHTML = searchParams;
        })
        .catch(err => alert("Ошибка HTTP " + err.status + " . Повторите попытку позже. " + err));       
    }
});


const formClear = document.getElementById('clear_form');
formClear.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(formClear);
    const searchParams = new URLSearchParams(formData);
    fetch('./php/clear.php', {
        method: 'POST', 
        headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
        body: searchParams,
    }).then(res => res.text())
    .then(function (searchParams) {
        console.log(searchParams);
        result_data.innerHTML = searchParams;
    })
    .catch(err => alert("Ошибка HTTP " + err.status + ". Повторите попытку позже." + err));       

});

// function isNumber(s){
//     var n = parseFloat(s.replace(',','.'));
//     return !isNaN(n) && isFinite(n);
//   }

function validateForm() {
    return validateX()&&validateY()&&validateR();
 }

function validateY() {
    y = document.querySelector("input[name=y]").value;
    let regexPattern = /^[-+]?[0-9]*[.,]?[0-9]+(?:[eE][-+]?[0-9]+)?$/;
    let result = regexPattern.test(y);
    if (y === "") {
        alert("Введите значение");
        return false;
    } else if (!result){
       alert("Введите целое число :)");
       return false;
    } else return true;
}

function validateX() {
    try {
        x = document.querySelector("input[name=x]:checked").value;
        return true;
        
    } catch (err) {
        alert("Значение X не выбрано");
        return false;
    }
}

function validateR() {
    try {
        r = document.querySelector("input[name=r]:checked").value;
        return true;
    } catch (err) {
        alert("Значение R не выбрано");
        return false;
    }
}



