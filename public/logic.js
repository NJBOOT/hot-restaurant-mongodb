$(document).ready(function() {
   
    $(".submit").on("click", function(e){
        e.preventDefault();

        let reservation = {
        customerName: $("#reserve-name").val().trim(),
        customerEmail: $("#reserve-email").val().trim(),
        customerID: $("#reserve-unique-id").val().trim(),
        customerPhone: $("#reserve-phone").val().trim()
        }

        $.post("/api/tables", reservation, function(data){

            if (data){
                alert("You are booked!");
            } else  {
                alert("You are on the waiting list")
            };

            $("#reserve-name").val("");
            $("#reserve-phone").val("");
            $("#reserve-email").val("");
            $("#reserve-unique-id").val("");
        });
    })

    function tableList () {
        $.ajax({url: "/api/tables",  method: "GET"})
        .then(function (data){
            console.log(data)
                for (let i = 0; i < data.length; i++){

                    let tables = $("#tableList");
                    let li = $("<li class='list-group-item mt-4'>");

                    li.append(
                        $("<h2>").text("Table Number: " + (i +1)),
                        $("<hr>"),
                        $("<h2>").text("Name: " + data[i].customerName),
                        $("<h2>").text("Email: " + data[i].customerEmail),
                        $("<h2>").text("ID: " + data[i].customerID),
                        $("<h2>").text("Phone: " + data[i].customerPhone)

                    );
                    tables.append(li);


                }
            })
    }

    function waitingList () {
        $.ajax({url: "/api/waitList", method: "GET"})
        .then(function(waitingData){
            for(let i = 0; i < waitingData.length; i++){

                let ul = $("#waitList")
                let li = $("<li class='list-group-item mt-4'>");

                li.append(
                    $("<h2>").text("Table Number: " + (i +1)),
                    $("<hr>"),
                    $("<h2>").text("Name: " + waitingData[i].customerName),
                    $("<h2>").text("Email: " + waitingData[i].customerEmail),
                    $("<h2>").text("ID: " + waitingData[i].customerID),
                    $("<h2>").text("Phone: " + waitingData[i].customerPhone)

                );
                ul.append(li)
            }
        })
    }

    $("#clear").on('click', function(){
        $.ajax({url: "/api/clear", method: "POST"})
        .then(function(){
            alert("Clearing...");
            $("#waitList").empty();
            $("#tableList").empty();
        })
    })

    tableList();
    waitingList();

});
