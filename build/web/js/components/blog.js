function blog(id) {

    // ` this is a "back tick". Use it to define multi-line strings in JavaScript.
    var content = `  
         <div class="row">
            <div>
                <p> [Blog Entry 1 - Web Home Page] It is easy to create the table and adding data into the table based on the instruction 
                    of the SQL tutorial. However, adding the foreign key which pointed to the users who contributed for the information 
                    I had some troubles since I forgot to make the foreign key into the integer as described in the table. </p>
                <p> It is easy to follow if you go to my database document at <a href="docs/database.docx">database</a>
            </div>
            <div class='stopFloat'></div>
        </div>

        <div class="row">
            <div>
                <p> [Blog Entry 2 - Routing and DB] It is easy to follow the routing with the first four methods which are two pages copy paste, 
                internal links reuse without routing and simple routing. Besides that, routing framework and routing table are quite harder 
                since it is required more complicated code in the script section. </p>
            </div>
            <div class='stopFloat'></div>
        </div>

        <div class="row">
            <div>
                <p> [Blog Entry 3 - Display Data] In this homework, I found it is more difficult than two previous, we have to combine the filterable 
                and the sortable javascript to make it display in the same page. The rest of the homework was quite intuitive and made a good bit 
                of sense. I found it particularly easy to export json from mySqlWorkbench, this saved me a ton of time in creating data. 
                An important concept that I learned was the use of ajax and how it is done in pure javascript.</p>
                <p> Two JSON files are <a href="json/allWebUsers.json">usersJSONfile</a> 
                    and <a href="json/universities.json">universityJSONfile</a> </p>
            </div>
            <div class='stopFloat'></div>
        </div>

        <div class="row">
            <div>
                <p> [Blog Entry 4 - Tutorial Proposal] In this homework, I choose to tutorial option to combine 2 effects to display the json data 
                in the single page.Based on the instruction I found it is easy to follow step by step, but at first I found difficult to find two effects 
                that are approriate with my webpage. After that, I found the timeline and the flip-card effects for my webpage, which will look nice.
                Besides, thanks to W3 School web, I would have learn experiences in CSS and HTML in both effects. </p>
                <p> If you want to go to my tutorial details, you would get go in two links below: </p>
                <ul>
                <li>
                    Click <a target="_blank" href="tutorial/proposal.pdf">here</a> for my Tutorial Proposal, 
                    a pdf that describes the provider style JS code I propose to implement. The pdf
                    provides links to the web pages that inspired my idea.
                </li>
                <li>
                    Click <a target="_blank" href="tutorial/poc.html">here</a> to see my Proof of Concept
                    code, which gives an idea of what I'm trying to accomplish but has not been fully implemented.
                </li>
                </ul>

            </div>
            <div class='stopFloat'></div>
        </div>
    
         <div class="row">
            <div>
                <p> [Blog Entry 5 - Web API HomeWork] In this homework, I learned about implementing web APIS and I learned how to install and 
                publish database access web apps.</p>
                
                <p> Things that were easy for me was putting in the libraries and the dbUtils and 
                view source packages because I remembered how to do that from the past lab. I think the most important thing I learned was getting more 
                familiar with mySQLWorkBench and comparing it to my web APIs. Whenever I had problems (a lot of my problems were from 
                formatting my tables fields) I was able to easily compare my code and my tables on SQL work bench and it made it simpler 
                to figure out what the problem was. When I first used SQL work bench I had no idea how to work it but now I can find what 
                I need quickly.</p>
    
                <p> The parts that I found hard or confusing were trying to read through the StringData, StringDataList, and the post/webUser view files 
                and see how they were all connected and how they worked to display the database information. </p>
    
                <p> <a href="docs/HW5_database_error.docx">This</a> is my error database message document. When I first started
                this homework and saw the requirement to do, I did not understand what the point was. Now I am actually really happy
                I did it because it helped me understand errors and made debugging easier. </p>
                
            <p>
                <a href="webAPIs/listUsersAPI.jsp">listUsersAPI</a> is my lists all the users in my database 
                and <a href="webAPIs/listUniversityAPI.jsp">listUniversityAPI</a> is my lists all universities in database entries.
                
           </p>
            </div>
            <div class='stopFloat'></div>
        </div>
    
         <div class="row">
            <div>
                <p> [Blog Entry 6 - Log On] In this homework, I learned about APIs and User Interfaces. This week we created 3 new web APIs, which are 
                log on, log off, and get profile.</p>
                
                 <p>Under the account tab in the navigation bar, it shows three links Log On, Log Off, and Get Profile. Each of these links call 
                their own user interfaces which call one of the three web APIs I just discussed, then displays the content on to the screen.</p>

                <p>The Log On API takes in two parameters, an email and a password. It then checks to see if those credentials match to any in the 
                database. If they do it gives back that users data. If it does not it prints an error message. It also saves the web user object into 
                the session which means the web users information is now in the system. For the Get Profile API, It just checks to see if there is 
                an object saved in the system. The Log Off API just invalidates the session, meaning the user information saved after someone logged on, 
                is discarded. If someone was to go to the Get Profile page again (after loggging out), an error would  show saying no one is logged on</p>
                
                <p>The most difficult part of the assignment was creating and understanding the Log on API, as well as the webUser/dbMods. But it was
                nice to have sample code to work on Log on API. After figuring out the Log on API, it was easy to work on get profile API and 
                Log off API.</p>
    
                <p> To see how my Log On code works, click on these items under the account icon: "Log On", "Profile", and "Log Off". You'll only see 
                the profile information if you are logged on. Below are links to my APIs.</p>
                <ul>
                <li>To invoke my User List Web API, click <a target="_blank" href="webAPIs/listUsersAPI.jsp">here</a>.</li>
                <li>To invoke my Log On Web API (logging in to a user in my database), click <a target="_blank" href="webAPIs/logonAPI.jsp?email=tuh39709@temple.edu&password=aw">here</a>.</li>
                <li>To invoke my Get Profile Web API, click <a target="_blank" href="webAPIs/getProfileAPI.jsp">here</a>.</li>
                <li>To invoke my Log Off Web API, click <a target="_blank" href="webAPIs/logoffAPI.jsp">here</a>
                    (try clicking on Get Profile again and you will see the data is no longer there)</li>
                </p>
            </div>
            <div class='stopFloat'></div>
        </div>

        <div class="row">
            <div>
                <p> [Blog Entry 7 - Insert HW] In this homework, I extend the web application so that can insert a web_user record and insert a "university"
                record. In each case, I will have a JSP Web API that handles the insert, providing field level, record level, and database error checking and messaging 
                (in JSON format) back to the client. They are all of concepts I have learned from this homework.</p>
                
                <p>The easy part for this homework was Insert a web_user as it looks like for the sample code.</p>
    
                <p>The most difficult part for this homework was working with the university JavaScript since it requires a lot of change for the 
                university role and the university insert.</p>
    
                <p>To invoke to my database desgin from my database homwork, click <a href="docs/database.docx">database</a>.
                </div>
            <div class='stopFloat'></div>
                
        </div>
    
        <div class="row">
            <div>
                <p> [Blog Entry 8 - Update HW] In this homework, I have learned about updating data. We created a couple new web APIs that get server 
                side code from the database. With these new APIs we created JavaScript code that can edit the data found in the database and 
                ultimately the data we use for our website. We were given sample code to work through to implement our own update user functions 
                as well as our update other function. This was a cool assignment because I learned a lot more about server side code and APIs, 
                it was pretty challenging to work through and try to understand the sample code because there was a lot and it was pretty advanced code.</p>
    
                <p>The easy part for this homework was update userrs as it looks like for the sample code.</p>
    
                <p> I think the most difficult part I had was trying to understand and work through what everything meant in ther user.js file found in the
                 sample code. This code implemented the CRUD idea and there was a lot of code there that I didn't learn and don't need to learn yet. 
                I had to kind parse through the code, figure out what everything was doing, and figure out what I needed to meet this hw requirement 
                of updating data. There was so much going, plus the reusability with the insert function made understanding the update function diffficult. </p>
    
                <p>To invoke to my database desgin from my database homwork, click <a href="docs/database.docx">database</a>.
                
        </div>
    `;
    document.getElementById(id).innerHTML = content;
}