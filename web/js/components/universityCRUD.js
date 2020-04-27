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
            
             var deleteErrorMsg = Utils.make({
                htmlTag: "div",
                innerHTML: "",
                parent: div
            });
            deleteErrorMsg.id = "deleteErrorMsgId";

            var tableDiv = Utils.make({
                htmlTag: "div",
                parent: div
            });

            // create userList (new array of objects) to have only the desired properties of obj.webUserList. 
            // Add the properties in the order you want them to appear in the HTML table.  
            var universityList = [];
            for (var i = 0; i < obj.universityList.length; i++) {
                universityList[i] = {}; // add new empty object to array

                universityList[i].universityId = obj.universityList[i].universityId;
                universityList[i].name = obj.universityList[i].universityName;
                universityList[i].state = obj.universityList[i].universityState;
                universityList[i].image = obj.universityList[i].universityImage;
                universityList[i].tuition = obj.universityList[i].tuition;
                universityList[i].establishment = obj.universityList[i].establishment;
                universityList[i].ranking = obj.universityList[i].universityRanking;
                universityList[i].webUserId = obj.universityList[i].webUserId;
                universityList[i].userEmail = obj.universityList[i].userEmail;

                // Remove this once you are done debugging...
                universityList[i].errorMsg = obj.universityList[i].errorMsg;
                
                universityList[i].update = CRUD_icons.update + "' alt='update icon' onclick='universities.updateUI(" +
                        universityList[i].universityId + ", `" + targetId + "` )' />";
                universityList[i].delete = CRUD_icons.delete + "' alt='delete icon' onclick='universities.delete(" +
                        universityList[i].universityId + ",this)'  />";
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
                imgWidth: "30px"
            });
        } // end of function success
    }; // end of function universities.list
    
    // invoke a web API passing in userId to say which record you want to delete. 
    // but also remove the row (of the clicked upon icon) from the HTML table -- if Web API sucessful... 
    universities.delete = function (universityId, icon) {
        if (confirm("Do you really want to delete university " + universityId + "? ")) {
            console.log("icon that was passed into JS function is printed on next line");
            console.log(icon);

            ajax2({
                url: "webAPIs/deleteUniversityAPI.jsp?deleteId=" + universityId,
                successFn: success,
                errorId: "deleteErrorMsgId"
            });

            function success(obj) {
                if (obj.errorMsg.length === 0) {
                    obj.errorMsg = "University " + universityId + " was deleted!";

                    // icon's parent is cell whose parent is row 
                    var dataRow = icon.parentNode.parentNode;
                    var rowIndex = dataRow.rowIndex - 1; // adjust for oolumn header row?
                    var dataTable = dataRow.parentNode;
                    dataTable.deleteRow(rowIndex);
                }
                document.getElementById("deleteErrorMsgId").innerHTML = obj.errorMsg;
            }
        }

    };//universities.delete

     // pull out common code (between insert UI and update UI).
   // pull out common code (between insert UI and update UI).
    function createInsertUpdateArea(isUpdate, targetId) {

        // set variables as if it will be insert...
        var universityIdRowStyle = ' style="display:none" '; // hide row with webUserId
        var saveFn = "universities.insertSave()";
        
        // change variables for update
        if (isUpdate) {
            universityIdRowStyle = ""; // don't hide row with webUserId 
            saveFn = "universities.updateSave()";
        }

        var html = `
            <div id="insertArea">
                <div id="ajaxError">&nbsp;</div>
                <table>
                    <tr ${universityIdRowStyle}>
                        <td>University Id</td>
                        <td><input type="text"  id="universityId" disabled /></td>
                        <td id="universityIdError" class="error"></td> 
                    </tr>
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
                        <td>User Email</td>
                        <td>
                            <select id="roleUniPickList">
                            <!-- JS code will make ajax call to get all the roles 
                            then populate this select tag's options with those roles -->
                            </select>
                        </td>
                        <td id="webUserIdError" class="error"></td>
                    </tr>
                    <tr>
                        <td><button onclick="${saveFn}">Save</button></td>
                        <td id="recordError" class="error"></td>
                        <td></td>
                    </tr>
                </table>
            </div>
        `;

        document.getElementById(targetId).innerHTML = html;
    }

    universities.updateUI = function (universityId, targetId) {

        // This is needed to "reset" the application's perception of the "current" link. 
        // Otherwise, when the user tries to click on "user list" after doing a user list -> update
        // operation, there will be no response (because link would not change). 
        // Setting window.location.hash is like auto-clicking for the user (in code). 
        // But also in index.html, you have to add a routing rule for this link and associate 
        // it will a null function (a do nothing function) - to avoid a routing error.
        window.location.hash = "#/universityUpdate";

        createInsertUpdateArea(true, targetId); // first param is isUpdate (boolean)
        ajax2({
            url: "webAPIs/getUniversityWithRolesAPI.jsp?id=" + universityId,
            successFn: proceed,
            errorId: "ajaxError"
        });
        function proceed(obj) { // obj is what got JSON.parsed from Web API's output
            dbDataToUI(obj);
        }
    };

    universities.insertUI = function (targetId) {

        createInsertUpdateArea(false, targetId); // first param is isUpdate (boolean)

        ajax2({
            url: "webAPIs/getUniRolesAPI.jsp",
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

            Utils.makePickList({
                id: "roleUniPickList", // id of select tag on the page
                list: jsonObj.roleUniversityList, // JS array that holds the objects to populate the select tag
                valueProp: "userEmail", // field name of objects in list that holds the values of the select tag options
                keyProp: "webUserId"      // field name of objects in list that holds the keys of the options 
            });

        } // setRolePickList

    }; // users.insertUI


    function dbDataToUI(obj) {

        var universityObj = obj.university;
        var roleUniversityList = obj.uniRoleInfo.roleUniversityList;

        document.getElementById("universityId").value = universityObj.universityId;
        document.getElementById("universityName").value = universityObj.universityName;
        document.getElementById("universityState").value = universityObj.universityState;
        document.getElementById("universityImageError").innerHTML = universityObj.universityImage;
        document.getElementById("tuition").value = universityObj.tuition;
        document.getElementById("establishment").value = universityObj.establishment;
        document.getElementById("universityRanking").value = universityObj.universityRanking;
        console.log("selected role id is " + universityObj.webUserId);
        Utils.makePickList({
            id: "roleUniPickList", // id of <select> tag in UI
            list: roleUniversityList, // JS array that holds objects to populate the select list
            valueProp: "userEmail", // field name of objects in list that hold the values of the options
            keyProp: "webUserId", // field name of objects in list that hold the keys of the options
            selectedKey: universityObj.webUserId  // key that is to be pre-selected (optional)
        });
    }
    ;

    function getUniDataFromUI() {  // a private function

        // New code for handling role pick list.
        var ddList = document.getElementById("roleUniPickList");
        console.log("getUniDataFromUI");

        // create a user object from the values that the user has typed into the page.
        var universityInputObj = {

            "universityId": document.getElementById("universityId").value,
            "universityName": document.getElementById("universityName").value,
            "universityState": document.getElementById("universityState").value,
            "universityImage": document.getElementById("universityImage").value,
            "tuition": document.getElementById("tuition").value,
            "establishment": document.getElementById("establishment").value,
            "universityRanking": document.getElementById("universityRanking").value,

            "webUserId": ddList.options[ddList.selectedIndex].value,
            "userEmail": "",
            "errorMsg": ""
        };

        console.log(universityInputObj);

        // JSON.stringify converts a javaScript object into JSON format 
        // (like what GSON does on the server side).
        // 
        // Then, you have to encode the user's data (encodes special characters 
        // like space to %20 so the server will accept it with no security error). 
        return encodeURIComponent(JSON.stringify(universityInputObj));
        //return escape(JSON.stringify(userInputObj));
    }

    function writeErrorObjToUI(jsonObj) {
        console.log("here is JSON object (holds error messages.");
        console.log(jsonObj);

        document.getElementById("universityIdError").innerHTML = jsonObj.universityId;
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
        var myData = getUniDataFromUI();

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

    universities.updateSave = function () {

        console.log("universities.updateSave was called");

        // create a user object from the values that the user has typed into the page.
        var myData = getUniDataFromUI();

        ajax2({
            url: "webAPIs/updateUniversityAPI.jsp?jsonData=" + myData,
            successFn: processUpdate,
            errorId: "recordError"
        });

        function processUpdate(jsonObj) {

            // the server prints out a JSON string of an object that holds field level error 
            // messages. The error message object (conveniently) has its fiels named exactly 
            // the same as the input data was named. 

            if (jsonObj.errorMsg.length === 0) { // success
                jsonObj.errorMsg = "Record successfully updated !!!";
            }

            writeErrorObjToUI(jsonObj);
        }

    };

}());  // the end of the IIFE
        