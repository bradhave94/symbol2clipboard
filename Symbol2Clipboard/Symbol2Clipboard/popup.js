$(function () {
    $("#tabs").tabs();
    $("body").fadeOut(10, function () {
        $(this).show();
    });
    //On click of class symbol
    $("#tabs").on('click', '.symbol', function (e) {
        //Call method to copy to the clipboard
        copy($(this).text());
        $(this).animate({
            opacity: 0.1
        , }, 300, function () {
            window.close(); //Close the extension
        });
    });
    $('#add').click(function () {
        // Get a value saved in a form.
        var theValue = $('#fav').val()
        // Get all the items stored in the storage
        chrome.storage.sync.get(function (items) {
            // The data array already exists, add to it
            if (Object.keys(items).length > 0 && items.data) {
                items.data.push({
                    'value': theValue
                });
            }
            // The data array doesn't exist yet, create it
            else {          
                items.data = [{
                    'value': theValue
                }];
            }
            // Save the new item
            chrome.storage.sync.set(items, function () {
                console.log('Data successfully saved to the storage!');
                //Reset the form field
                $('#fav').val('')
            });
        });
        //Add the a list2
        $('#favList').append("<span class='symbol'>" + theValue + "</span>")
    });
    //Load the favourites list
    chrome.storage.sync.get(null, function (data) {
        for (i = 0; i < data.data.length; i++) {
            $('#favList').append("<span class='symbol'>" + data.data[i].value + "</span>")
        }
    });
    //Clear the saved storage
    $('#clearFav').click(function () {
        chrome.storage.sync.clear();
        //Remove the list from the tab
        document.getElementById("favList").remove();
        $('#tab-fav').append("<div id='favList'></div>");
    });
});

function copy(element) {
    // Create a "hidden" input
    var aux = document.createElement("input");
    // Assign it the value of the specified element
    aux.setAttribute("value", element);
    // Append it to the body
    document.body.appendChild(aux);
    // Highlight its content
    aux.select();
    // Copy the highlighted text
    document.execCommand("copy");
    // Remove it from the body
    document.body.removeChild(aux);
}