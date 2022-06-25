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
var arrEle;
function loadData() {
    $(".table tbody").empty();
    $.ajax({
    url: "https://627dc59db75a25d3f3ab7c94.mockapi.io/user",
    type: "GET",
    dataType: "json",
    success: function(data) {
        console.log(data);
        arrEle = data;
        let emptyStr = '';
        for(let i=0 ; i < data.length ; i++){
            let edit = `<button class="feature" id="edit" onclick=edit(${data[i].id}) type="button"><i class="fa-solid fa-pen-to-square"></i></button>`;
            let picture = `<input type="image" src="${data[i].picture}" alt="" class='api-picture'>`;
            let strTemp = "<tr> <th scope='row' class='align-middle'>" + data[i].id + "</th>"
                + "<td class='border align-middle'>" + data[i].name + "</td>"
                + "<td class='border align-middle'>" + data[i].username + "</td>"
                + "<td class='border align-middle'>" + data[i].password+ "</td>"
                + "<td class='border align-middle'>" + data[i].role + "</td>"
                + "<td class='border align-middle'>" + picture + "</td>"
                + "<td class='border align-middle'>" + edit + "</td> </tr>";
                emptyStr += strTemp;
        }
        $(".table tbody").append(emptyStr);
        }
    });
}
loadData();
$("#add").click(function(){
    $(".addModal").show();
})
$(".addCancel").click(function(){
    $(".addModal").hide();
})

// add user
let role = "";
$(document).ready(function () {
    $("#addSuccess").click(function(){
        let name = $(".nameModal").val();
        let username = $(".userModal").val();
        let pass = $(".passModal").val();
        let role = $("#inputGroupSelect01").val();
        let newStudent = new Student(name, username, pass, role)
        if(name == '' || name == undefined || username == '' || username == undefined || pass == '' || pass == undefined || role == 'Choose...'){
            alert("Vui lòng nhập đầy đủ thông tin");
        } else {
            $.ajax({
                url: "https://627dc59db75a25d3f3ab7c94.mockapi.io/user",
                type: "POST",
                data: newStudent,
                success: function(result) {
                  alert("Them User thanh cong!");
                  loadData();
                  $(".addModal").hide()
                  }
            })
        }
    });
});
// -------

// edit user
$(".editCancel").click(function(){
    $(".editModal").hide()
})
$("#editSuccess").click(function(){
    var obj = {};
    var id = $(".txtId").val();
    obj.name = $(".editModal .nameEdit").val();
    obj.username = $(".editModal .userEdit").val();
    obj.password = $(".editModal .passEdit").val()
    console.log(obj)
    $.ajax({
        url: "https://627dc59db75a25d3f3ab7c94.mockapi.io/user/" + id,
        type: "PUT",
        data: obj,
        success:function(result){
            $(".editModal").hide()
            loadData();
        }
    })
})
function edit(id){
    for(let i = 0; i<arrEle.length;i++){
        if(arrEle[i].id == id){
            $(".editModal").show();
            $(".txtId").val(arrEle[i].id);
            $(".editModal .nameEdit").val(arrEle[i].name)
            $(".editModal .userEdit").val(arrEle[i].username)
            $(".editModal .passEdit").val(arrEle[i].password)
            break;
        }
    }
};
// ----------

// remove user
function remove(id){
    $.ajax({
        url: "https://627dc59db75a25d3f3ab7c94.mockapi.io/user/" + id,
        type: "DELETE",
        success: function() {
            loadData();
        }
    })
};

// Find user
function searchElement() {
    $(".table tbody").empty();
    $.ajax({
    url: "https://627dc59db75a25d3f3ab7c94.mockapi.io/user",
    type: "GET",
    dataType: "json",
    success: function(data) {
        let emptyStr = '';
        let value = $("#search").val();
        if(value == '' || value == undefined) {
            loadData();
        } else {
            if( value < 1 ) {
                alert("Vui lòng nhập id > 0");
                $("#search").val('');
                preventDefault(); //BUG
            } else if( value >= 1 && value <= data.length) {
                value -= 1;
            } else {
                alert(`Vui lòng nhập dữ liệu <= ${data.length}`);
                $("#search").val('');
            }
        }
        let edit = `<button class="feature" id="edit" onclick=edit(${data[value].id}) type="button"><i class="fa-solid fa-pen-to-square"></i></button>`;
        let remove = `<button class="feature" id="remove" type="button" onclick=remove(${data[value].id})><i class="fa-solid fa-trash-can"></i></button>`;
        let picture = `<img class="api-picture" src="${data[value].picture}" alt="">`;
        let strTemp = "<tr> <th scope='row' class='align-middle'>" + data[value].id + "</th>"
            + "<td class='border align-middle'>" + data[value].name + "</td>"
            + "<td class='border align-middle'>" + data[value].username + "</td>"
            + "<td class='border align-middle'>" + data[value].password + "</td>"
            + "<td class='border align-middle'>" + data[value].role + "</td>"
            + "<td class='border align-middle'>" + picture + "</td>"
            + "<td class='border align-middle'>" + edit + remove + "</td> </tr>";
        emptyStr += strTemp;
        $(".table tbody").append(emptyStr); 
        }
    });
}