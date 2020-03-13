
// Declare single global object with same name as js file name.
// This object will have just one public method for now, but more later...
var universities = {};

universities.display = function (id) {

    var content = `  
        <div id="listHere" class="clickSort"></div>
    `;
    document.getElementById(id).innerHTML = content;

    function formatCurrency(num) {
        var myNum = Number(num);
        return myNum.toLocaleString("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2});
    }

    // invoke ajax function to read cars.json and if the call was successful, 
    // run function processJSON, otherwise, put an error message in the DOM element 
    // that has id "listHere".
    ajax("json/universities.json", processData, "listHere");

    function processData(carList) {

        console.log(carList);  // car list as an array of objects

        // modify properties (image and price) of the array of objects so it will look 
        // better on the page.
        for (var i = 0; i < carList.length; i++) {           
            carList[i].tuition = formatCurrency(carList[i].tuition);
            
        }

        // Making a DOM object, nothing shows yet... 
        MakeSortFilterableTable(carList, "listHere");

    }
};