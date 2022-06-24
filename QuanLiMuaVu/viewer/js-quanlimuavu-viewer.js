var elementCopy;
function loadData() {
    $(".table tbody").empty();
    //Sau khi update xong thi xoa thanh phan cu~ tren HTML
    $.ajax({
    url: "https://62b269f320cad3685c8db9c1.mockapi.io/farmManager",
    type: "GET",
    dataType: "json",
    success: function(data) {
        elementCopy = data;
        let emptyStr = '';
        for(let i=0 ; i<data.length ; i++){
            let edit = `<button class="feature" id="edit" onclick=edit(${data[i].id}) type="button"><i class="fa-solid fa-pen-to-square"></i></button>`;
            let final = `<button class="feature" id="last" type="button" onclick=final(${data[i].id})><i class="fa-solid fa-circle-check"></i></button>`
            let remove = `<button class="feature" id="remove" type="button" onclick=remove(${data[i].id})><i class="fa-solid fa-trash-can"></i></button>`;
            if(data[i].quantity == data[i].quantityEstimate) {
                data[i].comment = 'Đạt chỉ tiêu';
            } else if(data[i].quantity > data[i].quantityEstimate) {
                data[i].comment = 'Vượt chỉ tiêu';
            } else {
                data[i].comment = 'Chưa đạt';
            }
            let strTemp = "<tr> <th scope='row'>" + data[i].id + "</th>"
                + "<td class='border'>" + data[i].seasonName + "</td>"
                + "<td class='border'>" + data[i].dateStart + "</td>"
                + "<td class='border'>" + data[i].dateEnd+ "</td>"
                + "<td class='border'>" + data[i].quantity + "</td>"
                + "<td class='border'>" + data[i].quantityEstimate + "</td>"
                + "<td class='border'>" + data[i].comment + "</td>"
                emptyStr += strTemp;
        }
        $(".table tbody").append(emptyStr);
        }
    });
}
loadData();

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