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
    var logCharacter = "";



    // Character Name	Suggested Search Parameter

    // Bronn	        bronn
    // Brynden Tully	brynden
    // Cersei	        cersei
    // The Hound	    hound
    // Jaime Lannister	jaime
    // Littlefinger	    littlefinger
    // Olenna Tyrell	olenna
    // Renly Baratheon	renly
    // Tyrion	        tyrion
    // Varys	        varys

    //create list of characters with properties
    var characters = {
        "bronn": {
            name: "Bronn",
            image: "assets/images/Bronn.jpg"
            // quote: '"Sometimes there Is no happy choice, only one less grievous than the others.", "I do know some things, I know I love you. I know you love me. I have to go home now.", "We look up at the same stars and see such different things.", "If I fall, dont bring me back."'
        },
        "brynden": {
            name: "Brynden Tully",
            image: "assets/images/Blackfish.png"
        },
        "cersei": {
            name: "Cersei Lannister",
            image: "assets/images/CerseiLannister.png"
        },
        "hound": {
            name: "Sandor  'The Hound'  Clegane",
            image: "assets/images/sandorclegane1.jpg"
        },
        "jaime": {
            name: "Jaime Lannister",
            image: "assets/images/Jaime.jpg"
        },
        "littlefinger": {
            name: "Petyr Baelish",
            image: "assets/images/Littlefinger.png"
        },
        "olenna": {
            name: "Olenna Tyrell",
            image: "assets/images/Olenna.png"
        },
        "renly": {
            name: "Renly Baratheon",
            image: "assets/images/Renly.png"
        },
        "tyrion": {
            name: "Tyrion Lannister",
            image: "assets/images/tyrionlannister1.jpg"
        },
        "varys": {
            name: "Lord Varys",
            image: "assets/images/Varys.png"
        },
        "ned":{
            name: "Eddard  'Ned'  Stark",
            image: "assets/images/ned.jpg"
        },
        "robert":{
        name: "Robert Baratheon",
        image: "assets/images/robert.jpg"
        },
    "catelyn":{
        name: "Catelyn Stark",
        image: "assets/images/catelyn.jpg"
    },
    "daenerys":{
        name: "Daenerys",
        image: "assets/images/daenerys.jpg"
    },
    "jorah":{
        name: "Jorah Mormont",
        image: "assets/images/jorah.jpg"
    },
    "viserys":{
        name: "Viserys Targaryen",
        image: "assets/images/viserys.jpg"
    },
    "sansa":{
        name: "Sansa Stark",
        image: "assets/images/sansa.jpg"
    },
    "arya":{
        name: "Arya Stark",
        image: "assets/images/arya.jpg"
    },
    "robb":{
        name: "Robb Stark",
        image: "assets/images/robb.jpg"
    },
    "theon":{
        name: "Theon Greyjoy",
        image: "assets/images/theon.jpg"
    },
    "bran":{
        name: "Bran Stark",
        image: "assets/images/bran.jpg"
    },
    "joffrey":{
        name: "Joffrey Baratheon",
        image: "assets/images/joffrey.jpg"
    },
    "davos":{
        name: "Davos Seaworth",
        image: "assets/images/davos.jpg"
    },
    "samwell":{
        name: "Samwell Tarly",
        image: "assets/images/samwell.jpg"
    },
    "stannis":{
        name: "Stannis Baratheon",
        image: "assets/images/stannis.jpg"
    },
    "melisandre":{
        name: "Melisandre",
        image: "assets/images/melisandre1.jpg"
    },
    "jeor":{
        name: "Jeor Mormont",
        image: "assets/images/jeor.jpg"
    },
    "shae":{
        name: "Shae",
        image: "assets/images/shae.jpg"
    },
    "margaery":{
        name: "Margaery Tyrell",
        image: "assets/images/margaery.jpg"
    },
    "tywin":{
        name: "Tywin Lannister",
        image: "assets/images/tywin.jpg"
    },
    "talisa":{
        name: "Talisa Maegyr",
        image: "assets/images/talisa.jpg"
    },
    "ygritte":{
        name: "Ygritte",
        image: "assets/images/ygritte.jpg"
    },
    "gendry":{
        name: "Gendry",
        image: "assets/images/gendry.jpg"
    },
    "tormund":{
        name: "Tormund Giantsbane",
        image: "assets/images/tormund.jpg"
    },
    "brienne":{
        name: "Brienne of Tarth",
        image: "assets/images/brienne.jpg"
    },
    "ramsay":{
        name: "Ramsay Bolton",
        image: "assets/images/ramsay.jpg"
    },
    "gilly":{
        name: "Gilly",
        image: "assets/images/gilly.jpg"
    },
    "daario":{
        name: "Daario Naharis",
        image: "assets/images/daario.jpg"
    },
    "missandei":{
        name: "Missandei",
        image: "assets/images/missandei.webp"
    },
    "ellaria":{
        name: "Ellaria Sand",
        image: "assets/images/ellaria.jpg"
    },
    "tommen":{
        name: "Tommen Baratheon",
        image: "assets/images/tommen.jpg"
    },
    "jaqen":{
        name: "Jaqen H'ghar",
        image: "assets/images/jaqen.jpg"
    },
    "roose":{
        name: "Roose Bolton",
        image: "assets/images/roose.jpg"
    },
    "sparrow":{
        name: "The High Sparrow",
        image: "assets/images/sparrow.jpg"
    },




    }

    //creates the character cards from the characters object to put into the HTML
    function createCharactersDiv (character, key) {
        var charDiv = $("<div class='character' data-name='" + key + "'>");
        var charName = $("<div class='characterName'>").text(character.name);
        var charImage = $("<img alt='image' class='characterImage'>").attr('src', character.image);
        charDiv.append(charName).append(charImage);
        return charDiv;
    }

    // shows all characters to choose from by populating html with created characters
    function showCharacters() { 
        var characterArray = Object.keys(characters);
        for (var i = 0; i < characterArray.length; i++) {
        var characterIndex = characterArray[i];
        var character = characters[characterIndex];
        var charDiv = createCharactersDiv(character, characterIndex);
        $('#charactersDiv').append(charDiv);
        }
    }
    
    //click event for user pressing start button
    $("#startButton").on("click", function() {
        showCharacters();
        $("#startButton").hide();
    });

    //click event for user pressing a character picture
    $("#charactersDiv").on("click", ".character", function() {
        var chosenCharacter = $(this).attr("data-name");
        console.log("this", this);

        // var queryURL = "https://got-quotes.herokuapp.com/quotes?char=tyrion";
        var queryURL = "https://got-quotes.herokuapp.com/quotes?char=" + chosenCharacter + "";
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            // After data comes back from the request
            .then(function(response) {
                console.log(queryURL);
                console.log(response);
                // storing the data from the AJAX request in the results variable
            //   var results = response.data;
            var quoteString = response.quote + " ~ " + response.character;
            $("#quote").text(quoteString);
            addToTable(quoteString);
            });
    });
    function addToTable(q, t){
        var quote = q;
        var translation = t;

        var newRow = $("<tr>").addClass("row").append(
            $("<td>").text(quote).addClass("col-lg-6"),
            $("<td>").text(translation).addClass("col-lg-6"),
        );
        $("tbody").prepend(newRow);
    }


    $("#charactersDiv").on("click", function(event) {
       
        event.preventDefault();

        logCharacter = $("#charactersDiv").val().trim();

        database.ref().push({
            logCharacter: logCharacter,
            
        })
        console.log(logCharacter)
    });
  
});
