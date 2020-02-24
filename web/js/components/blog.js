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


    `;
    document.getElementById(id).innerHTML = content;
}