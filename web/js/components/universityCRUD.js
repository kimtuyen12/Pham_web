var universities = {};

(function () {  // This is an IIFE, an immediately executing (anonymous) function
    //alert("I am an IIFE!");

    universities.list = function (targetId) {

        // clear out whatever may be currently in the content area
        var contentDOM = document.getElementById(targetId);
        contentDOM.innerHTML = "";

        // Remember: getting a successful ajax call does not mean you got data. 
        // There could have been a DB error (like DB unavailable). 
        ajax2({
            url: "webAPIs/listUniversityAPI.jsp",
            successFn: success,
            errorId: targetId
        });

        function success(obj) {

            // var obj = JSON.parse(hreq.responseText); // this already done by function ajax2...
            console.log(obj);

            if (obj.dbError.length > 0) {
                contentDOM.innerHTML += "Database Error Encountered: " + obj.dbError;
                return;
            }

            // Want the User List UI (plus headings and search filter) all to be centered. 
            // Cannot be sure content area will be like this, so create a div inside of the 
            // content area and set the div to be aligned center (HTML table will be styled 
            // margin: auto to make it centered as well). 
            var div = Utils.make({
                htmlTag: "div",
                parent: contentDOM
            });
            div.style.textAlign = "center";

            var heading = Utils.make({
                htmlTag: "h2",
                parent: div
            });

            Utils.make({// don't need reference to this span tag...
                htmlTag: "span",
                innerHTML: "University List ",
                parent: heading
            });

            var img = Utils.make({
                htmlTag: "img",
                parent: heading
            });
            img.src = CRUD_icons.insert;
            img.onclick = function () { // you cant pass input params directly into an event handler

                // Originally I had this line of code here:  
                //     users.insertUI(targetId);
                // And that worked to show the user insert UI, BUT, afterwards, if you tried to re-run 
                // the user list, nothing happened -- because this would make no change in the 
                // window.location.hash (the link in the browser's address bar) -- so nothing would happen. 
                // 
                // The solution was to invoke the user insert UI through a routing rule. 
                // For "other" insert (even though you probably won't have a Nav Bar link for inserting "other", 
                // you may need to create a routing rule and invoke that similarly (from the "other" list UI).
                window.location.hash = "#/universityInsert";
            };

            Utils.make({
                htmlTag: "span",
                innerHTML: " Search Filter: ",
                parent: div
            });

            var searchBox = Utils.make({
                htmlTag: "input",
                parent: div
            });
            searchBox.type = "text";
            //searchBox.setAttribute("type", "text");  // same thing...

            var tableDiv = Utils.make({
                htmlTag: "div",
                parent: div
            });

            // create userList (new array of objects) to have only the desired properties of obj.webUserList. 
            // Add the properties in the order you want them to appear in the HTML table.  
            var universityList = [];
            for (var i = 0; i < obj.universityList.length; i++) {
                universityList[i] = {}; // add new empty object to array

                universityList[i].name = obj.universityList[i].universityName;
                universityList[i].state = obj.universityList[i].universityState;
                universityList[i].image = obj.universityList[i].universityImage;
                universityList[i].tuition = obj.universityList[i].tuition;
                universityList[i].establishment = obj.universityList[i].establishment;
                universityList[i].ranking = obj.universityList[i].universityRanking;
                universityList[i].role = obj.universityList[i].webUserId + "&nbsp;" +
                        obj.universityList[i].userEmail;
                universityList[i].webUserId = obj.universityList[i].universityId;

                // Remove this once you are done debugging...
                universityList[i].errorMsg = obj.universityList[i].errorMsg;
            }

            // add click sortable HTML table to the content area

            // ********************** function tableBuilder.build ***********************************
            // params.list: an array of objects that are to be built into an HTML table.
            // params.target: reference to DOM object where HTML table is to be placed (by buildTable) -- 
            //         (this is not the id string but actual reference like you get from method getElementById()
            // params.style: will be added as className to DOM element target,
            // params.orderPropName (string): name of property (of objects in list) for iniial sort
            // params.reverse (boolean): if true, initial sort will be high to low (else low to high). 
            // params.imgWidth: any columns that hold image files will be turned into <img> tags with this width.

            tableBuilder.build({
                list: universityList,
                target: tableDiv,
                style: "data",
                orderPropName: "universityName",
                searchKeyElem: searchBox,
                reverse: false,
                imgWidth: "50px"
            });
        } // end of function success
    }; // end of function users.list


    universities.insertUI = function (targetId) {
        console.log("universities.inusertUI function - targetId is " + targetId);

        var html = `
    <div id="insertArea">
        <br/>
        <table>
            <tr>
                <td>University Name</td>
                <td><input type="text"  id="universityName" /></td>
                <td id="universityNameError" class="error"></td> 
            </tr>
            <tr>
                <td>University State</td>
                <td><input type="text"  id="universityState" /></td>
                <td id="universityStateError" class="error"></td>
            </tr>
            <tr>
                <td>University Image</td>
                <td><input type="text" id="universityImage" /></td>
                <td id="universityImageError" class="error"></td>
            </tr>
            <tr>
                <td>Tuition</td>
                <td><input type="text" id="tuition" /></td>
                <td id="tuitionError" class="error"></td>
            </tr>
             <tr>
                <td>Establishment</td>
                <td><input type="text" id="establishment" /></td>
                <td id="establishmentError" class="error"></td>
            </tr>
             <tr>
                <td>University Ranking</td>
                <td><input type="text" id="universityRanking" /></td>
                <td id="universityRankingError" class="error"></td>
            </tr>
            <tr>
                <td>University Role</td>
                <td>
                    <select id="roleUniPickList">
                    <!-- JS code will make ajax call to get all the roles 
                    then populate this select tag's options with those roles -->
                    </select>
                </td>
                <td id="webUserIdError" class="error"></td>
            </tr>
            <tr>
                <!-- see js/insertUniversity.js to see the insertUniversity function (make sure index.html references the js file) -->
                <td><button onclick="universities.insertSave()">Save</button></td>
                <td id="recordError" class="error"></td>
                <td></td>
            </tr>
        </table>
    </div>
    `;
        document.getElementById(targetId).innerHTML = html;

        ajax2({
            url: "webAPIs/getRolesUniversityAPI.jsp",
            successFn: setRoleUniPickList,
            errorId: "webUserIdError"
        });

        function setRoleUniPickList(jsonObj) {

            console.log("setRoleUniPickList was called, see next line for object holding list of roles");
            console.log(jsonObj);

            if (jsonObj.dbError.length > 0) {
                document.getElementById("webUserIdError").innerHTML = jsonObj.dbError;
                return;
            }

            /*  copy/pasting the first entry from the output of my get role API
             {
             "dbError": "",
             "roleList": [
             {
             "userRoleId": "1",
             "userRoleType": "Admin",
             "errorMsg": ""
             }, ...
             */

            Utils.makePickList({
                id: "roleUniPickList",
                list: jsonObj.roleUniversityList,
                valueProp: "userEmail",
                keyProp: "webUserId"
            });

        } // setRolePickList

    }; // users.insertUI


    // a private function
    function getUserDataFromUI() {

        // New code for handling role pick list.
        var ddList = document.getElementById("roleUniPickList");

        // create a user object from the values that the user has typed into the page.
        var universityInputObj = {

            "universityName": document.getElementById("universityName").value,
            "universityState": document.getElementById("universityState").value,
            "universityImage": document.getElementById("universityImage").value,
            "tuition": document.getElementById("tuition").value,
            "establishment": document.getElementById("establishment").value,
            "universityRanking": document.getElementById("universityRanking").value,

            // Modification here for role pick list
            //"userRoleId": document.getElementById("userRoleId").value,
            "webUserId": ddList.options[ddList.selectedIndex].value,

            "userEmail": "",
            "errorMsg": ""
        };

        console.log(universityInputObj);

        // JSON.stringify converts the javaScript object into JSON format 
        // (the reverse operation of what gson does on the server side).
        // 
        // Then, you have to encode the user's data (encodes special characters 
        // like space to %20 so the server will accept it with no security error. 
        return encodeURIComponent(JSON.stringify(universityInputObj));
        //return escape(JSON.stringify(userInputObj));
    }

    function writeErrorObjToUI(jsonObj) {
        console.log("here is JSON object (holds error messages.");
        console.log(jsonObj);

        document.getElementById("universityNameError").innerHTML = jsonObj.universityName;
        document.getElementById("universityStateError").innerHTML = jsonObj.universityState;
        document.getElementById("universityImageError").innerHTML = jsonObj.universityImage;
        document.getElementById("tuitionError").innerHTML = jsonObj.tuition;
        document.getElementById("establishmentError").innerHTML = jsonObj.establishment;
        document.getElementById("universityRankingError").innerHTML = jsonObj.universityRanking;
        document.getElementById("webUserIdError").innerHTML = jsonObj.webUserId;
        document.getElementById("recordError").innerHTML = jsonObj.errorMsg;
    }

    universities.insertSave = function () {

        console.log("universities.insertSave was called");

        // create a user object from the values that the user has typed into the page.
        var myData = getUserDataFromUI();

        ajax2({
            url: "webAPIs/insertUniversityAPI.jsp?jsonData=" + myData,
            successFn: processInsert,
            errorId: "recordError"
        });

        function processInsert(jsonObj) {

            // the server prints out a JSON string of an object that holds field level error 
            // messages. The error message object (conveniently) has its fiels named exactly 
            // the same as the input data was named. 

            if (jsonObj.errorMsg.length === 0) { // success
                jsonObj.errorMsg = "Record successfully inserted !!!";
            }

            writeErrorObjToUI(jsonObj);
        }
    };

}());  // the end of the IIFE