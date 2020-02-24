
// Declare single global object with same name as js file name.
// This object will have just one public method for now, but more later...
var universities = {};

universities.display = function (id) {

    var content = `  
        <style>
            /* override size of image from the clicksort.css */
            .clickSort td img { /* applies to any <img> tag in a <td> tag in any element classed "clickSort" */
                width: 100px;
                border-radius: 6px;
                box-shadow: 3px 3px 3px #444444;
            }
        </style> 
        <div id="listHere" class="clickSort"></div>
    `;
    document.getElementById(id).innerHTML = content;

    ajax("webAPIs/listUniversityAPI.jsp", processData, "listHere");
    function processData (obj) {
        if (obj.dbError.length > 0) {
        document.getElementById("listHere").innerHTML = obj.dbError;
        return;
    }
    list = obj.universityList; 
    for (var i=0; i<list.length; i++){
        list[i].universityImage = "<img src='" + list[i].universityImage + "'>";
    }
    MakeSortableTable(list,"listHere");
        
    }
};