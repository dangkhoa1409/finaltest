//Load data: start
var dataCopy; //tạo biến copy data server trả về
function loadData() {
    $(".table tbody").empty();
    //Khi loaddata xong thì xoá các thành phần đã có trên trình duyệt để tránh bị trùng lắp
    $.ajax({
        url: "https://62b269f320cad3685c8db9c1.mockapi.io/farmManager",
        type: "GET",
        dataType: "json",
        success: function(data) {
            dataCopy = data;
            let emptyStr = '';
            for(let i=0 ; i<data.length ; i++){
                let edit = `<button class="feature" id="edit" onclick=edit(${data[i].id}) type="button"><i class="fa-solid fa-pen-to-square"></i></button>`;
                let final = `<button class="feature" id="last" type="button" onclick=final(${data[i].id})><i class="fa-solid fa-circle-check"></i></button>`
                let remove = `<button class="feature" id="remove" type="button" onclick=remove(${data[i].id})><i class="fa-solid fa-trash-can"></i></button>`;
                if(data[i].quantity == '' || data[i].quantity == undefined) {
                    data[i].comment = '';
                } else {
                    if(data[i].quantity == data[i].quantityEstimate) {
                    data[i].comment = 'Đạt chỉ tiêu';
                    } else if(data[i].quantity > data[i].quantityEstimate) {
                        data[i].comment = 'Vượt chỉ tiêu';
                    } else {
                        data[i].comment = 'Chưa đạt';
                    }
                }
                let strTemp = "<tr> <th scope='row'>" + data[i].id + "</th>"
                    + "<td class='border'>" + data[i].seasonName + "</td>"
                    + "<td class='border'>" + data[i].dateStart + "</td>"
                    + "<td class='border'>" + data[i].dateEnd+ "</td>"
                    + "<td class='border'>" + data[i].quantity + "</td>"
                    + "<td class='border'>" + data[i].quantityEstimate + "</td>"
                    + "<td class='border'>" + data[i].comment + "</td>"
                    + "<td class='border'>" + edit + final + remove + "</td> </tr>";
                    emptyStr += strTemp;
            }
            $(".table tbody").append(emptyStr); //append : mở rộng 
        }
    });
}
loadData();
//load data : end

//Tìm phần tử bằng id
function searchElement() {
    $(".table tbody").empty();
    $.ajax({
    url: "https://62b269f320cad3685c8db9c1.mockapi.io/farmManager",
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
                preventDefault(); //BUG
            } else {
                value -= 1;
            }
        }

        let edit = `<button class="feature" id="edit" onclick=edit(${data[value].id}) type="button"><i class="fa-solid fa-pen-to-square"></i></button>`;
        let final = `<button class="feature" id="last" type="button" onclick=final(${data[value].id})><i class="fa-solid fa-circle-check"></i></button>`
        let remove = `<button class="feature" id="remove" type="button" onclick=remove(${data[value].id})><i class="fa-solid fa-trash-can"></i></button>`;
        if(data[value].quantity == '' || data[value].quantity == undefined) {
            data[value].comment = '';
        } else {
            if(data[value].quantity == data[value].quantityEstimate) {
            data[value].comment = 'Đạt chỉ tiêu';
            } else if(data[value].quantity > data[value].quantityEstimate) {
                data[value].comment = 'Vượt chỉ tiêu';
            } else {
                data[value].comment = 'Chưa đạt';
            }
        }
        let strTemp = "<tr> <th scope='row'>" + data[value].id + "</th>"
            + "<td class='border'>" + data[value].seasonName + "</td>"
            + "<td class='border'>" + data[value].dateStart + "</td>"
            + "<td class='border'>" + data[value].dateEnd+ "</td>"
            + "<td class='border'>" + data[value].quantity + "</td>"
            + "<td class='border'>" + data[value].quantityEstimate + "</td>"
            + "<td class='border'>" + data[value].comment + "</td>"
            + "<td class='border'>" + edit + final + remove + "</td> </tr>";
        emptyStr += strTemp;
        $(".table tbody").append(emptyStr); 
        }
    });
}

//sửa : start
function edit(id){
    for(let i = 0; i<dataCopy.length;i++){
        if(dataCopy[i].id == id){
            $(".editModal").show();
            $(".txtId").val(dataCopy[i].id);
            $(".editModal .seasonName").val(dataCopy[i].seasonName);
            $(".editModal .dateStart").val(dataCopy[i].dateStart);
            $(".editModal .dateEnd").val(dataCopy[i].dateEnd);
            $(".editModal .state").val(dataCopy[i].state);
            break;
        }
    }
};

$(".editCancel").click(function() {
    $(".editModal").hide();
});

$("#editSuccess").click(function() {
    var editData = {};
    var id = $(".txtId").val();
    editData.seasonName = $(".editModal .seasonName").val();
    editData.dateStart = $(".editModal .dateStart").val();
    editData.dateEnd = $(".editModal .dateEnd").val();
    editData.state = $(".editModal .state").val();
    console.log(id);
    $.ajax({
        url: "https://62b269f320cad3685c8db9c1.mockapi.io/farmManager/" + id,
        type: "PUT",
        data: editData,
        success: function() {
            $(".editModal").hide();
            loadData();
        }
    })
})
//sửa : end

//thêm : start
$("#add").click(function() {
    $(".addModal").show();
});

$(".addCancel").click(function() {
    $(".addModal").hide();
});

var date = new Date();
var year = date.getFullYear();
var month = date.getMonth() + 1;
var day = date.getDate();
var current = `${year}-0${month}-${day}`;
$("#addSuccess").click(function() {
    var addData = {};
    addData.seasonName = $(".addModal .seasonName").val();
    addData.quantityEstimate = $(".addModal .quantityEstimated").val();
    addData.dateEnd = $(".addModal .dateEnd").val(); 
    addData.quantity = $(".addModal .quantity").val(); 
        
    if($(".addModal .dateStart").val() != '' && $(".addModal .dateStart").val() != undefined) {
        addData.dateStart = $(".addModal .dateStart").val();
    } else {
        addData.dateStart = current;
        console.log(current);
    }

    if(addData.seasonName != '' && addData.seasonName != undefined && addData.quantityEstimate != '' && addData.quantityEstimate != undefined){
        $.ajax({
            url: "https://62b269f320cad3685c8db9c1.mockapi.io/farmManager",
            type: "POST",
            data: addData,
            success: function() {
                $(".addModal").hide();
                $(".addModal .seasonName").val('');
                $(".addModal .quantityEstimated").val('');
                $(".addModal .dateStart").val('');
                loadData();
            }
        })
    } else {
        alert("Vui lòng nhập đầy đủ thông tin");
    }
})
//thêm : end


//Xoá : start
function remove(id){
    $.ajax({
        url: "https://62b269f320cad3685c8db9c1.mockapi.io/farmManager/" + id,
        type: "DELETE",
        success: function() {
            loadData();
        }
    })
};
//Xoá : end

//Final : start
function final(id){
    for(let i = 0; i<dataCopy.length;i++){
        if(dataCopy[i].id == id){
            $(".finalModal").show();
            $(".finalModal .txtId").val(dataCopy[i].id);
            $(".finalModal .quantity").val(dataCopy[i].quantity);
            $(".finalModal .state").val(dataCopy[i].state);
            $(".finalModal .dateEnd").val(dataCopy[i].dateEnd);
            break;
        }
    }
};

$(".finalCancel").click(function() {
    $(".finalModal").hide();
});

$("#finalSuccess").click(function() {
    var finalData = {};
    var id = $(".finalModal .txtId").val();
    finalData.quantity = $(".finalModal .quantity").val();
    finalData.state = $(".finalModal .state").val();
    finalData.dateEnd = $(".finalModal .dateEnd").val(); //+ `T${hours}:${minutes}:${seconds}.${miliseconds}Z`
    $.ajax({
        url: "https://62b269f320cad3685c8db9c1.mockapi.io/farmManager/" + id,
        type: "PUT",
        data: finalData,
        success: function() {
            $(".finalModal").hide();
            loadData();
        }
    })
});
//Final : end