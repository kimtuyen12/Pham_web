function home(id) {

    // ` this is a "back tick". Use it to define multi-line strings in JavaScript.
    var content = `
       <div class="callOut">
                <p>
                    This is the place to help Vietnamese people to achieve American dream, which include studying and traveling in the USA. 
                    Besides that, this web page will introduce to Vietnamese people step by step to get the visa in every field.
                </p>
                
             </div>
            
            <div class="row">
                <div class='column column66'>
                    <strong>Study in the US</strong> America has the world’s largest international student population, 
                    with more than 1,000,000 students a year choosing to broaden their education and life experience in the United States. 
                    Based on the International Student's report, nearly 5% of all students enrolled in higher-level education in the USA are international students, 
                    and the numbers are growing. Many international students choose USA 
                    because America is one of the most convenient, developing and high-technology countries in the world.
                    <p>Therefore, F1 and J1 visa are one of the way to achieve American dream.</p>
                    <p>This page will introduce you some university in 52 states of America that allows international students to study there and some law to achieve an immirgrant visa.</p>
                    <ul>
                        <li>
                            F1 visa is for those wishing to study in the USA.
                        </li>
                        <li>
                            J1 visa is used for foreign visitors to come to the US in order to participate in the exchange program.
                        </li>
                    </ul>
                </div>

                <div class='column column33'>
                    <img src='pics/study.jpg' alt='Study in USA'>
                </div>
                <div class='stopFloat'></div>
            </div>

            <div class="row">
                <div class='column column33'>
                    <img src='pics/travel.jpeg' alt='Travel in USA'>
                </div>

                <div class='column column66'>
                    <strong>Traveling in the US</strong> USA is one of the biggest countries in the world.
                    From sea to sea, top of the mountains to the ocean, this country has a large portion of the North American continent.
                    This country also encompasses the rich history, the high-quality entertainment that gets spread to the world.
                    There are numerous cities to visit, landmarks to see and many beautiful sightseeing to explore across the American landscape.
                    Therefore, some of the most important necessities for traveling in USA is obtaining a passport and visa B2. 
                </div>

                <div class='stopFloat'></div>
            </div>

            <div class="row">
                <div class='column column66'>
                    <strong>Step by step to get a visa</strong> Everything you need to know to get US visa is covered in 5 steps below:
                    <ul>
                        <li>Step 1: Research your visa option.</li>
                        <li>Step 2: Check your finance.</li>
                        <li>Step 3: Complete the application.</li>
                        <li>Step 4: Apply for the visa.</li>
                        <li>Step 5: Prepare for US life.</li>
                    </ul>
                    <p>
                        If you want to get more specific information, you can go in the website <a href="https://www.ustraveldocs.com/in/index.html?firstTime=No">Apply for US Visa</a>
                    </p>
                </div>

                <div class='column column33'>
                    <img src='pics/visa.jpg' alt='USA VIsa'>
                </div>
                <div class='stopFloat'></div>
            </div>
    `;
    document.getElementById(id).innerHTML = content;
}