// dang ky tai khoan va day data len api
var HOST = "https://627dc59db75a25d3f3ab7c94.mockapi.io"
var USER = "user"
class Student {
    constructor(name, username, password, role) {
    this.name = name;
    this.username = username;
    this.password = password;
    this.role = role;
    }
}


$("#btn-reg").click(function(){
    let name = $("#name").val();
    let username = $("#username").val();
    let pass = $("#pass").val();
    let role = $("#inputGroupSelect01").val();
    let newStudent = new Student(name, username, pass, role)
    if(name === '' || name === undefined || username === '' || username === undefined || pass === '' || pass === undefined || role == 'Choose...') {
        alert("Vui lòng nhập đầy đủ thông tin");
        $(".nav-link").attr("href", "");
    } else {
        $.ajax({
            url: "https://627dc59db75a25d3f3ab7c94.mockapi.io/user",
            type: "POST",
            data: newStudent,
            success: function(result) {
                console.log(result);
                alert("success");
            }
        })
    }
});

$("#op1").click(function(){
    role = $("#option1").val()
})
$("#op2").click(function(){
    role = $("#option2").val()
})
$("#op3").click(function(){
    role = $("#option3").val()
})
// checkpass
function checkpass(){
    var mk = document.getElementById("pass");
    mk.type = (mk.type == "password")? "text":"password";
}
function checkConpass(){
    var mk = document.getElementById("con-pass");
    mk.type = (mk.type == "password")? "text":"password";
}







