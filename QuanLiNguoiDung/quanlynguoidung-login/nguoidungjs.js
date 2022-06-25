
var HOST = "https://627dc59db75a25d3f3ab7c94.mockapi.io"
var USER = "user"
$.ajax({
    url: "https://627dc59db75a25d3f3ab7c94.mockapi.io/user",
    type: "GET",
    datatype: "json",
    success:function(data){
        let showAlert = true;
        for(let i = 0; i < data.length; i++){
            console.log(data);
            $(".lgin").click(function(){
                let username = $("#user").val();
                let pass = $("#pass").val();
                let login = $(".lgin");
                if(username === '' || username === undefined || pass === '' || pass === undefined) {
                    if(showAlert) {
                        alert("Vui lòng nhập đầy đủ thông tin");
                        showAlert = false;
                        login.attr("href", "");
                    }
                } else {
                    if(username == data[i].username && pass == data[i].password){
                        if(data[i].role == 'Owner') {
                            login.attr("href", "../owner/quanliuser.html");
                        } else if(data[i].role == 'Staff') {
                            login.attr("href", "../staff/quanliuser.html")
                        } else {
                            alert("Bạn không có quyền đăng nhập vào đây");
                        }
                    }
                }
            })
        }
        
    }
})
function checkpass(){
    var mk = document.getElementById("pass");
    mk.type = (mk.type === "password")? "text":"password";
}

