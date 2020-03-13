function blog(id) {

    // ` this is a "back tick". Use it to define multi-line strings in JavaScript.
    var content = `  
         <div class="row">
                <div>
                    <p> In the first blog entry, it is easy to create the table and adding data into the table based on the instruction of the SQL tutorial. 
                        However, adding the foreign key which pointed to the users who contributed for the information I had some troubles 
                        since I forgot to make the foreign key into the integer as described in the table. </p>
                    <p> It is easy to follow if you go to my database document at <a href="database.docx">database</a>
                </div>
                <div class='stopFloat'></div>
            </div>

            <div class="row">
                <div>
                    <p> In the second blog entry, it is easy to follow the routing with the first four methods which are two pages copy paste, internal links
                    reuse without routing and simple routing. Besides that, routing framework and routing table are quite harder since it is required more complicated code 
                    in the script section.
                </div>
                <div class='stopFloat'></div>
            </div>
    
            <div class="row">
                <img src="pics/flight.jpg" alt="Flag" style="width:100%; border-radius:10px;">
                <div class='stopFloat'></div>
            </div>
    `;
    document.getElementById(id).innerHTML = content;
}