var users = {};

(function () {  // This is an IIFE, an immediately executing (anonymous) function
    //alert("I am an IIFE!");

    users.list = function (targetId) {

        // clear out whatever may be currently in the content area
        var contentDOM = document.getElementById(targetId);
        contentDOM.innerHTML = "";

        // Remember: getting a successful ajax call does not mean you got data. 
        // There could have been a DB error (like DB unavailable). 
        ajax2({
            url: "webAPIs/listUsersAPI.jsp",
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
                innerHTML: "Web User List ",
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
                window.location.hash = "#/userInsert";
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
            var userList = [];
            for (var i = 0; i < obj.webUserList.length; i++) {
                userList[i] = {}; // add new empty object to array

                userList[i].userCredentials = obj.webUserList[i].userEmail + "<br/> PW (to test Logon): " +
                        obj.webUserList[i].userPassword;
                userList[i].image = obj.webUserList[i].image;
                userList[i].birthday = obj.webUserList[i].birthday;
                userList[i].membershipFee = obj.webUserList[i].membershipFee;
                userList[i].role = obj.webUserList[i].userRoleId + "&nbsp;" +
                        obj.webUserList[i].userRoleType;
                userList[i].userId = obj.webUserList[i].webUserId;

                // Remove this once you are done debugging...
                userList[i].errorMsg = obj.webUserList[i].errorMsg;

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
                list: userList,
                target: tableDiv,
                style: "data",
                orderPropName: "userEmail",
                searchKeyElem: searchBox,
                reverse: false,
                imgWidth: "50px"
            });
        } // end of function success
    }; // end of function users.list


    users.insertUI = function (targetId) {
        console.log("users.inusertUI function - targetId is " + targetId);

        var html = `
    <div id="insertArea">
        <br/>
        <table>
            <tr>
                <td>Email Address</td>
                <td><input type="text"  id="userEmail" /></td>
                <td id="userEmailError" class="error"></td> 
            </tr>
            <tr>
                <td>Password</td>
                <td><input type="password"  id="userPassword" /></td>
                <td id="userPasswordError" class="error"></td>
            </tr>
            <tr>
                <td>Retype Your Password</td>
                <td><input type="password" id="userPassword2" /></td>
                <td id="userPassword2Error" class="error"></td>
            </tr>
            <tr>
                <td>Image URL</td>
                <td><input type="text" id="image" /></td>
                <td id="imageError" class="error"></td>
            </tr>
            <tr>
                <td>Birthday</td>
                <td><input type="text" id="birthday" /></td>
                <td id="birthdayError" class="error"></td> 
            </tr>
            <tr>
                <td>Membership Fee</td>
                <td><input type="text" id="membershipFee" /></td>
                <td id="membershipFeeError" class="error"></td>
            </tr>
            <tr>
                <td>User Role</td>
                <td>
                    <select id="rolePickList">
                    <!-- JS code will make ajax call to get all the roles 
                    then populate this select tag's options with those roles -->
                    </select>
                </td>
                <td id="userRoleIdError" class="error"></td>
            </tr>
            <tr>
                <!-- see js/insertUser.js to see the insertUser function (make sure index.html references the js file) -->
                <td><button onclick="users.insertSave()">Save</button></td>
                <td id="recordError" class="error"></td>
                <td></td>
            </tr>
        </table>
    </div>
    `;
        document.getElementById(targetId).innerHTML = html;

        ajax2({
            url: "webAPIs/getRolesAPI.jsp",
            successFn: setRolePickList,
            errorId: "userRoleIdError"
        });

        function setRolePickList(jsonObj) {

            console.log("setRolePickList was called, see next line for object holding list of roles");
            console.log(jsonObj);

            if (jsonObj.dbError.length > 0) {
                document.getElementById("userRoleIdError").innerHTML = jsonObj.dbError;
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
                id: "rolePickList",
                list: jsonObj.roleList,
                valueProp: "userRoleType",
                keyProp: "userRoleId"
            });

        } // setRolePickList

    }; // users.insertUI


    // a private function
    function getUserDataFromUI() {

        // New code for handling role pick list.
        var ddList = document.getElementById("rolePickList");

        // create a user object from the values that the user has typed into the page.
        var userInputObj = {

            "userEmail": document.getElementById("userEmail").value,
            "userPassword": document.getElementById("userPassword").value,
            "userPassword2": document.getElementById("userPassword2").value,
            "image": document.getElementById("image").value,
            "birthday": document.getElementById("birthday").value,
            "membershipFee": document.getElementById("membershipFee").value,

            // Modification here for role pick list
            //"userRoleId": document.getElementById("userRoleId").value,
            "userRoleId": ddList.options[ddList.selectedIndex].value,

            "userRoleType": "",
            "errorMsg": ""
        };

        console.log(userInputObj);

        // JSON.stringify converts the javaScript object into JSON format 
        // (the reverse operation of what gson does on the server side).
        // 
        // Then, you have to encode the user's data (encodes special characters 
        // like space to %20 so the server will accept it with no security error. 
        return encodeURIComponent(JSON.stringify(userInputObj));
        //return escape(JSON.stringify(userInputObj));
    }

    function writeErrorObjToUI(jsonObj) {
        console.log("here is JSON object (holds error messages.");
        console.log(jsonObj);

        document.getElementById("userEmailError").innerHTML = jsonObj.userEmail;
        document.getElementById("userPasswordError").innerHTML = jsonObj.userPassword;
        document.getElementById("userPassword2Error").innerHTML = jsonObj.userPassword2;
        document.getElementById("imageError").innerHTML = jsonObj.image;
        document.getElementById("birthdayError").innerHTML = jsonObj.birthday;
        document.getElementById("membershipFeeError").innerHTML = jsonObj.membershipFee;
        document.getElementById("userRoleIdError").innerHTML = jsonObj.userRoleId;
        document.getElementById("recordError").innerHTML = jsonObj.errorMsg;
    }

    users.insertSave = function () {

        console.log("users.insertSave was called");

        // create a user object from the values that the user has typed into the page.
        var myData = getUserDataFromUI();

        ajax2({
            url: "webAPIs/insertUserAPI.jsp?jsonData=" + myData,
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