// load document before starting javascript
$(document).ready(function(){

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBpZXxTnENHTeGwIKLJwX8ZY0EG88ojysI",
        authDomain: "uglymagentafinish.firebaseapp.com",
        databaseURL: "https://uglymagentafinish.firebaseio.com",
        projectId: "uglymagentafinish",
        storageBucket: "",
        messagingSenderId: "357761868557"
    };
    firebase.initializeApp(config);
    var database = firebase.database();

    // variable to store ajax call URL based on quote text
    var uri = "";

    //hides page content until user selects something
    $(".row").hide();

    //create list of characters with properties (some characters will be in the quote database, others are local)
    var characters = {
        "jon snow": {
            name: "Jon Snow",
            image: "assets/images/jonsnow1.jpg"
        },
        "tyrion": {
            firstname: "Tyrion",
            lastname: "Lannister",
            image: "assets/images/tyrionlannister1.jpg"
        },
        "hound": {
            name: "The Hound",
            image: "assets/images/sandorclegane1.jpg"
        },
        "bronn": {
            firstname: "Bronn",
            lastname: "",
            image: "assets/images/bronn1.png"
            // quote: '"Sometimes there Is no happy choice, only one less grievous than the others.", "I do know some things, I know I love you. I know you love me. I have to go home now.", "We look up at the same stars and see such different things.", "If I fall, dont bring me back."'
        },
        "brynden": {
            name: "Brynden Tully",
            image: "assets/images/brynden1.jpg"
        },
        "cersei": {
            name: "Cersei Lannister",
            image: "assets/images/cersei1.jpg"
        },
        "jaime": {
            name: "Jaime Lannister",
            image: "assets/images/jaime1.jpg"
        },
        "littlefinger": {
            name: "Petyr Baelish",
            image: "assets/images/littlefinger.jpg"
        },
        "olenna": {
            name: "Olenna Tyrell",
            image: "assets/images/olenna1.png"
        },
        "renly": {
            name: "Renly Baratheon",
            image: "assets/images/renly1.jpg"
        },
        "varys": {
            name: "Lord Varys",
            image: "assets/images/varys1.jpeg"
        },
        "khaldrogo": {
            name: "Khal Drogo",
            image: "assets/images/khaldrogo1.jpg",
            quote: "The stallion that mounts the world has no need for iron chairs"
        },
        "melisandre": {
            name: "Melisandre",
            image: "assets/images/melisandre1.jpg"
        },
        "brienne": {
            name: "Brienne of Tarth",
            image: "assets/images/brienne1.jpg"
        },
        "rob": {
            name: "Rob Stark",
            image: "assets/images/rob1.jpg"
        },
        "shae": {
            name: "Shae",
            image: "assets/images/shae1.jpg"
        },
        "tormund": {
            name: "Tormund",
            image: "assets/images/tormund1.jpg"
        }
    }

    //copies the characters object so we can manipulate the keys in it and not affect the original
    var chosenPeopleObject = JSON.parse(JSON.stringify(characters));
    //variable to store the text from user hitting search button entry
    var userSearch = "";

    //creates the character cards from the characters object to put into the HTML
    function createCharactersDiv (character, characterIndex) {
        var charDiv = $("<div class='character' data-name='" + characterIndex + "'>");
        var charName = $("<div class='characterName'>").text(character.firstname);
        var charImage = $("<img alt='image' class='characterImage'>").attr('src', character.image);
        charDiv.append(charName).append(charImage);
        //remove the current character from the object so it does not have chance to repeat in next loop
        delete chosenPeopleObject[characterIndex];
        
        return charDiv;
    }

    // shows a certain number of characters to choose from by populating html with created character cards
    function showCharacters() { 
        //reset user choices for characters once the object is empty (all choices displayed and removed)
        if (Object.keys(chosenPeopleObject).length === 0) {
            chosenPeopleObject = JSON.parse(JSON.stringify(characters));
        }
        $('#charactersDiv').empty();
        for (var i = 0; i < 5 && Object.keys(chosenPeopleObject).length !== 0; i++) {
            //turn object into array so we can index it with random number
            var characterArray = Object.keys(chosenPeopleObject);
            var characterIndex = characterArray[(Math.floor(Math.random() * characterArray.length))];
            var character = chosenPeopleObject[characterIndex];
            var charDiv = createCharactersDiv(character, characterIndex);
            $('#charactersDiv').append(charDiv);
        }
    }

    //query the Game of Thrones Quote API to get a quote by the chosen character
    function fetchQuote(quoteURL) {
        $.ajax({
            url: quoteURL,
            method: "GET"
        })
            // After data comes back from the request
            .then(function(response) {
            // storing the data from the AJAX request in the results variable
            var fetchedQuote = response.quote + " ~ " + response.character;
            $("#quote").text(fetchedQuote);
            addToTable(fetchedQuote);
            $("#characterQuote").append(fetchedQuote);

            uri = "https://api.funtranslations.com/translate/dothraki.json?text=" + encodeURIComponent(fetchedQuote);
            });
    }
    
    //query the Dothraki translator API to translate English text
    function fetchTranslation() {
        $.ajax({
            url: uri,
            method: "GET"
        })
            // After data comes back from the request
            .then(function(response) {
            // storing the data from the AJAX request in the results variable
            var translatedQuote = response.contents.translated;
            console.log(translatedQuote);
            $("#translated").text(translatedQuote);
            addToTable(translatedQuote);
            $("#translatedQuote").append(translatedQuote);
            });
    }

     //query the Fire and Ice API to get specific chosen character information
     function fetchCharInfo(charInfoURL) {
        $.ajax({
            url: charInfoURL,
            method: "GET"
        })
            // After data comes back from the request
            .then(function(response) {
            // storing the data from the AJAX request in the results variable
            var charTitles = response[0].titles;
            $("#characterTitles").text(charTitles);
            });
    }

    // function fetchVideos() {
    //         var queryURL = 
        
    //     $.ajax({
    //         url: queryURL,
    //         method: "GET"
    //     })
    //         // After data comes back from the request
    //         .then(function(response) {
    //         // storing the data from the AJAX request in the results variable
    //         var videoResults = response.contents.translated;
    //         console.log(translatedQuote);
    //         $("#translated").text(translatedQuote);
    //         addToTable(translatedQuote);
    //         });
    // }

    function addToTable(q, t){
        var quote = q;
        var translation = t;

        var newRow = $("<tr>").addClass("row").append(
            $("<td>").text(quote).addClass("col-lg-6"),
            $("<td>").text(translation).addClass("col-lg-6"),
        );
        $("#qTableBody").prepend(newRow);
    }
    
    //click event for user search (stored in Firebase)
    $("#searchButton").on("click", function(event) {
        event.preventDefault();
        userSearch = $("#searchInput").val().trim();
        database.ref().push({ 
            searchterm: userSearch
        });
        $("#searchInput").val("");

        //Database event for retrieving user search terms from Firebase and displaying them as recent searches in HTML
        database.ref().on("child_added", function(childSnapshot) {
            $("#recent-table").append("<tr><td>" + (childSnapshot.val().searchterm) + "</td></tr>");
            $(".row").show();
        });
    });

    //click event for user pressing people button
    $("#peopleButton").on("click", function() {
        showCharacters();
        $(".row").show();
    });

    //click event for user pressing translator button
    $(document).on("click", "#translateButton", function(event){
        event.preventDefault();
        var translateText = $("#translateInput").val().trim();
        uri = "https://api.funtranslations.com/translate/dothraki.json?text=" + encodeURIComponent(translateText);
        fetchTranslation(uri);
        $(".row").show();
        $("#translateModal").modal("hide");
    });

    //click event for user pressing a character picture
    $("#charactersDiv").on("click", ".character", function() {

        var chosenCharacter = $(this).attr("data-name");
        var chosenCharFullName = characters[chosenCharacter].firstname + "+" + characters[chosenCharacter].lastname;
        var quoteURL = "https://got-quotes.herokuapp.com/quotes?char=" + chosenCharacter;
        var charInfoURL = "https://www.anapioficeandfire.com/api/characters?name=" + chosenCharFullName;
        fetchQuote(quoteURL);
        $('#modal-container').removeAttr('class').addClass('one');
        $('body').addClass('modal-active');

        // fetchTranslation(uri);

        fetchCharInfo(charInfoURL);

        addToTable()
        //create character div with name and image and send to modal
        var charDiv = createCharactersDiv(characters[chosenCharacter], chosenCharacter);
        $("#characterImage").empty();
        $("#characterQuote").empty();
        $("#characterImage").append(charDiv);


    });
    // code for clicking out of the modal
    $('#modal-container').click(function(){
        $(this).addClass('out');
        $('body').removeClass('modal-active');
      });

});