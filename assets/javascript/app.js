// load document before starting javascript
$(document).ready(function(){

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAyS_C42Om1AcosbxXN_McNv0FazjuRQ4U",
        authDomain: "project1-3564d.firebaseapp.com",
        databaseURL: "https://project1-3564d.firebaseio.com",
        projectId: "project1-3564d",
        storageBucket: "project1-3564d.appspot.com",
        messagingSenderId: "953948840986"
    };
    firebase.initializeApp(config);
    var database = firebase.database();

    // variable to store ajax call URL based on quote text
    var uri = "";
    //hides page content until user selects something
    $(".row").hide();
    $("#tables").hide();
    //create list of characters with properties (some characters will be in the quote database, others are local)
    var characters = {
        "jon":{
            firstname:"Jon",
            lastname: "Snow",
            image: "assets/images/jonsnow1.jpg",
        },
        "tyrion": {
            firstname: "Tyrion",
            lastname: "Lannister",
            image: "assets/images/tyrionlannister1.jpg"
        },
        "bronn": {
            firstname: "Bronn",
            lastname: "",
            image: "assets/images/Bronn.jpg"
            // quote: '"Sometimes there Is no happy choice, only one less grievous than the others.", "I do know some things, I know I love you. I know you love me. I have to go home now.", "We look up at the same stars and see such different things.", "If I fall, dont bring me back."'
        },
        "brynden": {
            firstname: "Brynden",
            lastname: "Tully",
            image: "assets/images/Blackfish.png"
        },
        "cersei": {
            firstname: "Cersei",
            lastname: "Lannister",
            image: "assets/images/CerseiLannister.png"
        },
        "hound": {
            firstname: "Sandor  'The Hound'",
            lastname: "Clegane",
            image: "assets/images/sandorclegane1.jpg"
        },
        "jaime": {
            firstname: "Jaime",
            lastname: "Lannister",
            image: "assets/images/Jaime.jpg"
        },
        "littlefinger": {
            firstname: "Petyr",
            lastname: "Baelish",
            image: "assets/images/Littlefinger.png"
        },
        "olenna": {
            firstname: "Olenna",
            lastname: "Tyrell",
            image: "assets/images/Olenna.png"
        },
        "renly": {
            firstname: "Renly",
            lastname: "Baratheon",
            image: "assets/images/Renly.png"
        },
        "tyrion": {
            firstname: "Tyrion",
            lastname: "Lannister",
            image: "assets/images/tyrionlannister1.jpg"
        },
        "varys": {
            firstname: "Lord",
            lastname: "Varys",
            image: "assets/images/Varys.png"
        },
        "ned": {
            firstname: "Eddard  'Ned'",
            lastname: "Stark",
            image: "assets/images/ned.jpg"
        },
        "robert": {
            firstname: "Robert",
            lastname: "Baratheon",
            image: "assets/images/robert.jpg"
        },
        "catelyn": {
            firstname: "Catelyn",
            lastname: "Stark",
            image: "assets/images/catelyn.jpg"
        },
        "daenerys": {
            firstname: "Daenerys",
            lastname: "Targaryen",
            image: "assets/images/daenerys.jpg"
        },
        "jorah": {
            firstname: "Jorah",
            lastname: "Mormont",
            image: "assets/images/jorah.jpg"
        },
        "viserys": {
            firstname: "Viserys",
            lastname: "Targaryen",
            image: "assets/images/viserys.jpg"
        },
        "sansa": {
            firstname: "Sansa",
            lastname: "Stark",
            image: "assets/images/sansa.jpg"
        },
        "arya": {
            firstname: "Arya",
            lastname: "Stark",
            image: "assets/images/arya.jpg"
        },
        "robb": {
            firstname: "Robb",
            lastname: "Stark",
            image: "assets/images/robb.jpg"
        },
        "theon": {
            firstname: "Theon",
            lastname: "Greyjoy",
            image: "assets/images/theon.jpg"
        },
        "bran": {
            firstname: "Bran",
            lastname: "Stark",
            image: "assets/images/bran.jpg"
        },
        "joffrey": {
            firstname: "Joffrey",
            lastname: "Baratheon",
            image: "assets/images/joffrey.jpg"
        },
        "davos": {
            firstname: "Davos",
            lastname: "Seaworth",
            image: "assets/images/davos.jpg"
        },
        "samwell": {
            firstname: "Samwell",
            lastname: "Tarly",
            image: "assets/images/samwell.jpg"
        },
        "stannis": {
            firstname: "Stannis",
            lastname: "Baratheon",
            image: "assets/images/stannis.jpg"
        },
        "melisandre": {
            firstname: "Melisandre",
            lastname: "",
            image: "assets/images/melisandre1.jpg"
        },
        "jeor": {
            firstname: "Jeor",
            lastname: "Mormont",
            image: "assets/images/jeor.jpg"
        },
        "shae": {
            firstname: "Shae",
            lastname: "",
            image: "assets/images/shae.jpg"
        },
        "margaery": {
            firstname: "Margaery",
            lastname: "Tyrell",
            image: "assets/images/margaery.jpg"
        },
        "tywin": {
            firstname: "Tywin",
            lastname: "Lannister",
            image: "assets/images/tywin.jpg"
        },
        "talisa": {
            firstname: "Talisa",
            lastname: "Maegyr",
            image: "assets/images/talisa.jpg"
        },
        "ygritte": {
            firstname: "Ygritte",
            lastname: "",
            image: "assets/images/ygritte.jpg"
        },
        "gendry": {
            firstname: "Gendry",
            lastname: "",
            image: "assets/images/gendry.jpg"
        },
        "tormund": {
            firstname: "Tormund",
            lastname: "Giantsbane",
            image: "assets/images/tormund.jpg"
        },
        "brienne": {
            firstname: "Brienne of",
            lastname: "Tarth",
            image: "assets/images/brienne.jpg"
        },
        "ramsay": {
            firstname: "Ramsay",
            lastname: "Bolton",
            image: "assets/images/ramsay.jpg"
        },
        "gilly": {
            firstname: "Gilly",
            lastname: "",
            image: "assets/images/gilly.jpg"
        },
        "daario": {
            firstname: "Daario",
            lastname: "Naharis",
            image: "assets/images/daario.jpg"
        },
        "missandei": {
            firstname: "Missandei",
            lastname: "",
            image: "assets/images/missandei.jpeg"
        },
        "ellaria": {
            firstname: "Ellaria",
            lastname: "Sand",
            image: "assets/images/ellaria.jpg"
        },
        "tommen": {
            firstname: "Tommen",
            lastname: "Baratheon",
            image: "assets/images/tommen.jpg"
        },
        "jaqen": {
            firstname: "Jaqen",
            lastname: "H'ghar",
            image: "assets/images/jaqen.jpg"
        },
        "roose": {
            firstname: "Roose",
            lastname: "Bolton",
            image: "assets/images/roose.jpg"
        },
        "sparrow": {
            firstname: "The High",
            lastname: "Sparrow",
            image: "assets/images/sparrow.jpg"
        }
    }
    //copies the characters object so we can manipulate the keys in it and not affect the original
    var chosenPeopleObject = JSON.parse(JSON.stringify(characters));
    //variable to store the text from user hitting search button entry
    var userSearch = "";
    //variable that changes to the current character chosen
    var chosenCharacter = "";
    //object that will sent to firebase
    var quoteObj = {}; 

    //creates the character cards from the characters object to put into the HTML
    function createCharactersDiv (character, characterIndex) {
        var charDiv = $("<div class='character' data-name='" + characterIndex + "'>");
        var charName = $("<div class='characterName'>").text(character.firstname + "  " + character.lastname);
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
           // console.log(characterArray);
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
            $("#characterQuote").append(fetchedQuote);
            quoteObj.quote = fetchedQuote;
            //chosenCharObj.quote = fetchedQuote;

            uri = "https://api.funtranslations.com/translate/dothraki.json?text=" + encodeURIComponent(fetchedQuote);
            fetchTranslation();
            });
    }
    
    //query the Dothraki translator API to translate English text
    function fetchTranslation() {
        var translated = "this is a translated quote";
        // $.ajax({
        //     url: uri,
        //     method: "GET"
        // })
        //     // After data comes back from the request
        //     .then(function(response) {
        //     // storing the data from the AJAX request in the results variable
        //     var translatedQuote = response.contents.translated;
        //     console.log(translatedQuote);
        //     $("#translated").text(translatedQuote);
        //     $("#translatedQuote").append(translatedQuote);
        //     });
        quoteObj.translated = translated;
        database.ref().push(quoteObj);

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
            console.log('chartitles'+ charTitles);
            $("#characterTitles").text(charTitles);
            });
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
        $("#tables").show();
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

        chosenCharacter = $(this).attr("data-name");
        var chosenCharFullName = characters[chosenCharacter].firstname + "+" + characters[chosenCharacter].lastname;
        var quoteURL = "https://got-quotes.herokuapp.com/quotes?char=" + chosenCharacter;
        var charInfoURL = "https://www.anapioficeandfire.com/api/characters?name=" + chosenCharFullName;

        fetchQuote(quoteURL);       
        //fetchTranslation(uri);
        fetchCharInfo(charInfoURL);
        console.log(quoteObj);
        //
        $('#modal-container').removeAttr('class').addClass('one');
        $('body').addClass('modal-active');
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