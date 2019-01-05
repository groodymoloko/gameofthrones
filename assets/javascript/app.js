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
        "jon": {
            firstname: "Jon",
            lastname: "Snow",
            image: "assets/images/jonsnow1.jpg",
            quote: "First lesson, stick them with the pointy end."
        },
        "tyrion": {
            firstname: "Tyrion",
            lastname: "Lannister",
            image: "assets/images/tyrionlannister1.jpg",
            quote: "I have a tender spot in my heart for cripples and bastards and broken things."
        },
        "bronn": {
            firstname: "Bronn",
            lastname: "",
            image: "assets/images/Bronn.jpg",
            quote: "Sometimes there Is no happy choice, only one less grievous than the others."
        },
        "brynden": {
            firstname: "Brynden",
            lastname: "Tully",
            image: "assets/images/Blackfish.png",
            quote: "My first rule of war, Cat-never give the enemy his wish."
        },
        "cersei": {
            firstname: "Cersei",
            lastname: "Lannister",
            image: "assets/images/CerseiLannister.png",
            quote: "Everyone who isn't us is an enemy."

        },
        "hound": {
            firstname: "Sandor",
            lastname: "Clegane",
            image: "assets/images/sandorclegane1.jpg",
            quote: "I bet his hair is greasier than Jofferies cunt."

        },
        "jaime": {
            firstname: "Jaime",
            lastname: "Lannister",
            image: "assets/images/Jaime.jpg",
            quote: "How can you still count yourself a knight, when you have forsaken every vow you ever swore?"
        },
        "littlefinger": {
            firstname: "Petyr",
            lastname: "Baelish",
            image: "assets/images/Littlefinger.png",
            quote: "What we dont know is what usually gets us killed."
        
        },
        "olenna": {
            firstname: "Olenna",
            lastname: "Redwyne",
            image: "assets/images/Olenna.png",
            quote: "I wonder if you're the worst person I've ever met. At a certain age it's hard to recall, but the truly vile do stand out through the years."
        },
        "renly": {
            firstname: "Renly",
            lastname: "Baratheon",
            image: "assets/images/Renly.png",
            quote: "I propose that you dismount, bend your knee, and swear me your allegiance."
        },
    
        "varys": {
            firstname: "Varys",
            lastname: "",
            image: "assets/images/Varys.png",
            quote: "Why is it no one ever trusts the eunuch?"
        },
        "ned": {
            firstname: "Eddard",
            lastname: "Stark",
            image: "assets/images/ned.jpg",
            quote: "Winter is coming."
        },
        "robert": {
            firstname: "Robert",
            lastname: "Baratheon",
            image: "assets/images/robert.jpg",
            quote: "You heard the Hand, the king's too fat for his armor! Go find the breastplate stretcher! NOW!"
        },
        "catelyn": {
            firstname: "Catelyn",
            lastname: "Stark",
            image: "assets/images/catelyn.jpg",
            quote: "On my honor as a Tully. On my honor as a Stark. Let him go, or I will CUT your wife's throat."
        },
        "daenerys": {
            firstname: "Daenerys",
            lastname: "Targaryen",
            image: "assets/images/daenerys.jpg",
            quote: "All men must die, but we are not men."
        },
        "jorah": {
            firstname: "Jorah",
            lastname: "Mormont",
            image: "assets/images/jorah.jpg",
            quote:"No one can survive in this world without help. No one."
        },
        "viserys": {
            firstname: "Viserys",
            lastname: "Targaryen",
            image: "assets/images/viserys.jpg",
            quote:"No, you cannot touch me, I am the dragon, the dragon, and I will be crowned."
        },
        "sansa": {
            firstname: "Sansa",
            lastname: "Stark",
            image: "assets/images/sansa.jpg",
            quote: "You're going to die tomorrow Lord Bolton, sleep well."
        },
        "arya": {
            firstname: "Arya",
            lastname: "Stark",
            image: "assets/images/arya.jpg",
            quote: "I'm going to kill the queen."
        },
        "robb": {
            firstname: "Robb",
            lastname: "Stark",
            image: "assets/images/robb.jpg",
            quote: "I have won every battle, yet somehow I'm losing the war."
        },
        "theon": {
            firstname: "Theon",
            lastname: "Greyjoy",
            image: "assets/images/theon.jpg",
            quote: "It's better to be cruel than weak."
        },
        "bran": {
            firstname: "Bran",
            lastname: "Stark",
            image: "assets/images/bran.jpg",
            quote: "I hate your stories."
        },
        "joffrey": {
            firstname: "Joffrey",
            lastname: "Baratheon",
            image: "assets/images/joffrey.jpg",
            quote: "I'm asking if he fucked other women when he grew tired of you. How many bastards does he have?"

        },
        "davos": {
            firstname: "Davos",
            lastname: "Seaworth",
            image: "assets/images/davos.jpg",
            quote: "If we don't put aside our enmities and band together, we will die. And then it doesn't matter whose skeleton sits on the Iron Throne."

        },
        "samwell": {
            firstname: "Samwell",
            lastname: "Tarly",
            image: "assets/images/samwell.jpg",
            quote: "Seems a bit greedy for one man to have so many wives. Wouldn't two or three be enough for him?"
        },
        "stannis": {
            firstname: "Stannis",
            lastname: "Baratheon",
            image: "assets/images/stannis.jpg",
            quote: "I will not become a page in someone else's history book."
        },
        "melisandre": {
            firstname: "Melisandre",
            lastname: "",
            image: "assets/images/melisandre1.jpg",
            quote: "We all must choose. Man or woman, young or old, lord or peasant, our choices are the same. We choose light or we choose darkness."
        },
        "jeor": {
            firstname: "Jeor",
            lastname: "Mormont",
            image: "assets/images/jeor.jpg",
            quote: "You want to lead one day? Well, learn how to follow."
        },
        "shae": {
            firstname: "Shae",
            lastname: "",
            image: "assets/images/shae.jpg",
            quote: "I don't think Lord Varys likes fish pie."
        },
        "margaery": {
            firstname: "Margaery",
            lastname: "Tyrell",
            image: "assets/images/margaery.jpg",
            quote: "I want to be the queen."
        },
        "tywin": {
            firstname: "Tywin",
            lastname: "Lannister",
            image: "assets/images/tywin.jpg",
            quote: "Any man who must say, ' I am the king' is no true king. I'll make sure you understand that when I've won your war for you."
        },
        "ygritte": {
            firstname: "Ygritte",
            lastname: "",
            image: "assets/images/ygritte.jpg",
            quote: "You know nothing Jon Snow."
        },
        "gendry": {
            firstname: "Gendry",
            lastname: "",
            image: "assets/images/gendry.jpg",
            quote: "He may be their leader, but they chose him. These men are brothers. They're a family. I've never had a family."
        },
        "tormund": {
            firstname: "Tormund",
            lastname: "",
            image: "assets/images/tormund.jpg",
            quote: "You have to keep moving, that's the secret. Walking's good, fightings better, fucking's best."
        },
        "brienne": {
            firstname: "Brienne",
            lastname: "",
            image: "assets/images/brienne.jpg",
            quote: "All my life men like you have sneered at me. And all of my life I've been knocking men like you into the dust."

        },
        "ramsay": {
            firstname: "Ramsay",
            lastname: "Snow",
            image: "assets/images/ramsay.jpg",
            quote: "If you think this has a happy ending, you haven't been paying attention."
        },
        "gilly": {
            firstname: "Gilly",
            lastname: "",
            image: "assets/images/gilly.jpg",
            quote: "I'm angry that horrible people can treat good people that way and get away with it."
        },
        "daario": {
            firstname: "Daario",
            lastname: "Naharis",
            image: "assets/images/daario.jpg",
            quote: "I count no day as lived unless I have loved a woman, slain a foeman, and eaten a fine meal..."
        },
        "missandei": {
            firstname: "Missandei",
            lastname: "",
            image: "assets/images/missandei.jpeg",
            quote: "I have tried wine before. It made me feel funny."
        },
        "ellaria": {
            firstname: "Ellaria",
            lastname: "Sand",
            image: "assets/images/ellaria.jpg",
            quote:"It's always changing, who we're supposed to love and who we're not. The only thing that stays the same is that we want who we want."
        },
        "tommen": {
            firstname: "Tommen",
            lastname: "Baratheon",
            image: "assets/images/tommen.jpg",
            quote: "The crown and the faith are the twin pillars upon which the world rests. Together we will restore the Seven Kingdoms to glory."
        },
        "roose": {
            firstname: "Roose",
            lastname: "Bolton",
            image: "assets/images/roose.jpg",
            quote: "In my family we say, 'A naked man has few secrets, a flayed man, none."
			},
    }

    //copies the characters object so we can manipulate the keys in it and not affect the original
    var chosenPeopleObject = JSON.parse(JSON.stringify(characters));
    //variable to store the text from user hitting search button entry
    var userSearch = "";
    //object that will be sent to firebase
    var quoteObj = {};

    // $(function() {
    //     $(document).on("click", "#searchButton", function(e) {
    //         e.preventDefault();
    //         var request = gapi.client.youtube.search.list({
    //             part: "snippet",
    //             type: "video",
    //             q: encodeURIComponent($("#searchInput").val()).replace(/%20/g, "+"),
    //             maxResults: 5,
    //             order: "viewCount",
    //         });

    //         request.execute(function(response) {
    //         });

    //         $("#recent-table").append("<tr><td>" + response + "</td></tr>");
    //         $(".row").show();
            
    //     });
    // });
    
    // function init() {
    //     gapi.client.setApiKey("AIzaSyC5WIkYxb4L7c4mYmfB6UjfJ_EfYTJ2YaE");
    //     gapi.client.load("youTube", "v3", function() {

    //     });
    // }
    
    // function videoSearch() {

    //     $(document).on("click", "#searchButton", function(e) {
    //         e.preventDefault();

    //    
    //     var apiKey = 'AIzaSyC5WIkYxb4L7c4mYmfB6UjfJ_EfYTJ2YaE';
    //     var q = $('#searchInput').val();
        
    //         gapi.client.setApiKey(apiKey);
    //         gapi.client.load('youtube', 'v3', function() {
    //             isLoad = true;
    //         }); 
    //     
        
    //         request = gapi.client.youtube.search.list({
    //             q: 'q',
    //             part: 'id, snippet',
    //             type: 'video',
    //             order: 'date'
    //         });
    
    //   request.execute(function(response) {
    //     var str = JSON.stringify(response.result);
    //     $('#translatedQuote').html('<pre>' + str + '</pre>');
    //     $(".row").show();

    //   });
    // });
    // }
    
    
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
            var characterIndex = characterArray[(Math.floor(Math.random() * characterArray.length))];
            var character = chosenPeopleObject[characterIndex];
            var charDiv = createCharactersDiv(character, characterIndex);
            $('#charactersDiv').append(charDiv);
        }
    }

    //query the Game of Thrones Quote API to get a quote by the chosen character
    function fetchQuote(quoteURL, chosenCharacter) {
        $.ajax({
            url: quoteURL,
            method: "GET"
        })
            // After data comes back from the request
            .then(function(response) {
            // storing the data from the AJAX request in the results variable
            if (chosenCharacter.toUpperCase() == response.character.split(" ")[0].toUpperCase()) {
            var fetchedQuote = response.quote + " ~ " + response.character;
            // addToTable(fetchedQuote);
            $("#characterQuote").text(fetchedQuote);
            
            quoteObj.quote = fetchedQuote;
            
            uri = "https://api.funtranslations.com/translate/dothraki.json?text=" + encodeURIComponent(fetchedQuote);
            fetchTranslation(uri);
            }
            else {
                // addToTable(characters[chosenCharacter].quote);
                // $("#characterQuote").text(characters[chosenCharacter].quote);
                var backupQuote = characters[chosenCharacter].quote + " ~ " + chosenCharacter
                quoteObj.quote = backupQuote;
                uri = "https://api.funtranslations.com/translate/dothraki.json?text=" + encodeURIComponent(backupQuote);
                $("#characterQuote").text(backupQuote);
                fetchTranslation(uri);
            }
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
            // addToTable(translatedQuote);
            $("#translatedQuote").text(translatedQuote);
            });

        quoteObj.trans = translatedQuote;
        console.log(quoteObj.trans);
        database.ref().push(quoteObj);
    }

    //clears the character modal to prepare for the new character that was chosen
    function emptyCharModal() {
        $("#characterTitles").empty();
        $("#characterBorn").empty();
        $("#characterAliases").empty();
        $("#characterHouse").empty();
        $("#characterSpouse").empty();
        $("#characterImage").empty();
        $("#characterQuote").empty();
        $("#characterName").empty();
    }
    
    //query the Fire and Ice API to get specific chosen character information
     function fetchCharInfo1(charInfoURL1) {
        $.ajax({
            url: charInfoURL1,
            method: "GET"
        })
            // After data comes back from the request
            .then(function(response) {
            // populating the character modal with information
            $("#characterTitles").text(response[0].titles);
            $("#characterBorn").text(response[0].born);
            $("#characterAliases").text(response[0].aliases);
            });
    }

    //query the Game of Thrones API to get specific chosen character information
    function fetchCharInfo2(charInfoURL2) {
        $.ajax({
            url: charInfoURL2,
            method: "GET"
        })
            // After data comes back from the request
            .then(function(response) {
            // populating the character modal with information
            $("#characterHouse").text(response.data.house);
            $("#characterSpouse").text(response.data.spouse);

            });
    }

     //shows or hides recent quotes
     function showHideQuotes () {
        var x = document.getElementById("quoteTable");
        console.log(x.style.display);
        if (x.style.display === "none" || x.style.display === "") {
            x.style.display = "block";
            $("#recentQuotesButton").html("Hide Recent Quotes");
        } else {
            x.style.display = "none";
            $("#recentQuotesButton").html("Show Recent Quotes");
        }
    }
    
    //retrieves info from firebase to the page when Recent Quotes button is pressed
    database.ref().on("child_added", function(childSnapshot) {
        var newRow = $("<div>").addClass("row");
        var cell = $("<div>").addClass("col-lg-6");
        var cell2 = $("<div>").addClass("col-lg-6");
        var q = $("<div>").text(childSnapshot.val().quote).addClass("tableContent");
        var t = $("<div>").text(childSnapshot.val().translated).addClass("tableContent");
        cell.append(q);
        cell2.append(t);
        newRow.append(cell,cell2);
        $("#quoteTable").append(newRow);
    });

    // //click event for user search (stored in Firebase)
    // $("#searchButton").on("click", function(event) {
    //     event.preventDefault();
    //     userSearch = $("#searchInput").val().trim();
    //     database.ref().push({ 
    //         searchterm: userSearch
    //     });
    //     $("#searchInput").val("");

    //     //Database event for retrieving user search terms from Firebase and displaying them as recent searches in HTML
    //     database.ref().on("child_added", function(childSnapshot) {
    //         $("#recent-table").append("<tr><td>" + (childSnapshot.val().searchterm) + "</td></tr>");
    //         $(".row").show();
    //     });
    // });

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
        // fetchTranslation(uri);
        $(".row").show();
        $("#translateModal").modal("hide");
    });

    //click event for user pressing show or hide recent quotes
    $("#recentQuotesButton").on("click", function() {
        showHideQuotes();
    });

    //click event for user pressing a character picture
    $("#charactersDiv").on("click", ".character", function characterModalLaunch() {

        var chosenCharacter = $(this).attr("data-name");
        var chosenCharFullName = characters[chosenCharacter].firstname + "+" + characters[chosenCharacter].lastname;
        var chosenCharSlug = characters[chosenCharacter].firstname + "_" + characters[chosenCharacter].lastname;
        var quoteURL = "https://got-quotes.herokuapp.com/quotes?char=" + chosenCharacter;
        var charInfoURL1 = "https://www.anapioficeandfire.com/api/characters?name=" + chosenCharFullName;
        if (characters[chosenCharacter].lastname !== "") {
            var charInfoURL2 = "https://api.got.show/api/characters/byslug/" + chosenCharSlug;
        } else {
            var charInfoURL2 = "https://api.got.show/api/characters/byslug/" + chosenCharacter;
        }

        $('#modal-container').removeAttr('class').addClass('one');
        $('body').addClass('modal-active');
        
        fetchQuote(quoteURL, chosenCharacter);

        //retrieves information from APIs on character for the character modal
        emptyCharModal();
        fetchCharInfo1(charInfoURL1);
        fetchCharInfo2(charInfoURL2);

        //create character div with name and image and send to modal
        var charModalImage = $("<img alt='image' class='characterModalImage'>").attr('src', characters[chosenCharacter].image);
        $("#characterImage").append(charModalImage);
        $("#characterName").text(characters[chosenCharacter].firstname + " " + characters[chosenCharacter].lastname);
        //make picture larger for modal
        $(".characterModalImage").animate({
            width: 250,
            height: 250
        });

    });

    // code for clicking out of the modal
    $('#modal-container').click(function(){
        $(this).addClass('out');
        $('body').removeClass('modal-active');
    });


     //click event for user pressing a house picture
     $(".gallery").on("click", function() {

        //get name attribute of clicked divs and save to variable
        var chosenHouse = ($(this).attr("data-name"));
        //take name + api url to form query and store in variable
        var housesURL = "https://api.got.show/api/houses/" + encodeURIComponent(chosenHouse);

                //function to query API
            function fetchHouses(housesURL) {
                $.ajax({
                    url: housesURL,
                    method: "GET"
                })
                    // After data comes back from the request
                    .then(function(response) {
                    //clear out the Divs
                    $("#houseResponseLord").empty();
                    $("#houseResponseWords").empty();
                    $("#houseResponseRegion").empty();
                    // storing the data from the AJAX request in the variables
                    var houseResponseWords = response.data.words;
                    var houseResponseRegion = response.data.region;
                    var houseResponseLord = response.data.currentLord;
                    //take response and write to div
                    $("#houseResponseLord").append("Current Lord Of the House:", houseResponseLord);
                    $("#houseResponseWords").append("Words Of the House:", houseResponseWords);
                    $("#houseResponseRegion").append("Region of The House:", houseResponseRegion);
                    // console.log("FINALITY", houseResponse);
                        });
                }
                fetchHouses(housesURL);
        })

});
