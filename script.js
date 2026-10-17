let questionform = document.getElementById("questionform");
let search = document.getElementById("search");
let newbtn = document.getElementById("new");
let submitQuestion = document.getElementById("submitQuestion");
let questions = JSON.parse(localStorage.getItem("questions")) || [];

saveQuestions();
displayQuestions();

function displayQuestions(){
    questionform.innerHTML = "";
    questions.forEach(function(question){
        if (question.resolved == true){
            return;
        }
        displayQuestion(question);
    });
}

function displayQuestion(questionData){
    let div = document.createElement("div");
    let heading = document.createElement("h2");
    let questionvalue = document.createElement("p");
    let favoriteButton = document.createElement("button");

    div.className = "question-card";
    favoriteButton.className = "favoritebtn";
    heading.innerText = questionData.subject;
    questionvalue.innerText = questionData.question;

    if(questionData.favorite === true){
        favoriteButton.innerHTML = '<i class="fa-solid fa-star"></i>';
    } else{
        favoriteButton.innerHTML = '<i class="fa-regular fa-star"></i>';
    }

    div.appendChild(heading);
    div.appendChild(questionvalue);
    div.appendChild(favoriteButton);

    div.onclick = function(){
        showQuestion(questionData);
    };

    favoriteButton.onclick = function(event){
        event.stopPropagation();
        questionData.favorite = !questionData.favorite;

        if(questionData.favorite === true){
            favoriteButton.innerHTML = '<i class="fa-solid fa-star"></i>';
        } else{
            favoriteButton.innerHTML = '<i class="fa-regular fa-star"></i>';
        }
        saveQuestions();
    };
    questionform.appendChild(div);
}

function addquestion(){
    let subject = document.getElementById("subject").value.trim();
    let question = document.getElementById("question").value.trim();

    if (subject === "" || question === ""){
        alert("Please enter subject and question");
        return;
    }

    let questionData ={
        subject: subject,
        question: question,
        responses: [],
        resolved: false,
        favorite: false
    };

    questions.push(questionData);
    saveQuestions();
    displayQuestions();

    document.getElementById("subject").value = "";
    document.getElementById("question").value = "";

    showNewQuestionForm();
}

function showQuestion(questionData){
    let right = document.getElementById("right");
    right.innerHTML = "";

    let questionDiv = document.createElement("div");
    questionDiv.className = "question-detail";

    let questionHeading = document.createElement("h2");
    questionHeading.innerText = questionData.subject;

    let questionText = document.createElement("p");
    questionText.innerText = questionData.question;

    let resolveButton = document.createElement("button");
    resolveButton.innerText = "Resolve";
    resolveButton.className = "resolvebtn";

    questionDiv.appendChild(questionHeading);
    questionDiv.appendChild(questionText);
    questionDiv.appendChild(resolveButton);

    let responseHeading = document.createElement("h3");
    responseHeading.innerText = "Responses";
    responseHeading.className = "response-heading";

    let responseContainer = document.createElement("div");

    let sortedResponses = questionData.responses.slice();

    sortedResponses.sort(function(a, b){
        return b.likes - a.likes;
    });

    sortedResponses.forEach(function(response){
        displayResponse(response, responseContainer, questionData);
    });

    let addResponseHeading = document.createElement("h3");
    addResponseHeading.innerText = "Add Response";
    addResponseHeading.className = "response-heading";

    let nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.placeholder = "Enter your name";
    nameInput.id = "name";

    let commentInput = document.createElement("textarea");
    commentInput.placeholder = "Enter your comment";
    commentInput.id = "comment";

    let responseButton = document.createElement("button");
    responseButton.innerText = "Submit Response";
    responseButton.className = "submitbtn";

    resolveButton.onclick = function(){
        questionData.resolved = true;
        saveQuestions();
        displayQuestions();
        showNewQuestionForm();
    };

    responseButton.onclick = function(){
        let name = nameInput.value.trim();
        let comment = commentInput.value.trim();

        if (name === "" || comment === "") {
            alert("Please enter name and comment");
            return;
        }

        let response = {
            name: name,
            comment: comment,
            likes: 0,
            dislikes: 0
        };

        questionData.responses.push(response);
        saveQuestions();
        showQuestion(questionData);
    };

    right.appendChild(questionDiv);
    right.appendChild(responseHeading);
    right.appendChild(responseContainer);
    right.appendChild(addResponseHeading);
    right.appendChild(nameInput);
    right.appendChild(commentInput);
    right.appendChild(responseButton);
}

function displayResponse(response, responseContainer, questionData){
    let responseDiv = document.createElement("div");
    responseDiv.className = "response-card";

    let nameHeading = document.createElement("h4");
    nameHeading.innerText = response.name;

    let commentText = document.createElement("p");
    commentText.innerText = response.comment;

    let likeButton = document.createElement("button");
    likeButton.className = "responsebtn";
    likeButton.innerHTML = '<i class="fa-solid fa-thumbs-up"></i> ' + response.likes;

    let dislikeButton = document.createElement("button");
    dislikeButton.className = "responsebtn";
    dislikeButton.innerHTML = '<i class="fa-solid fa-thumbs-down"></i> ' + response.dislikes;

    likeButton.onclick = function(){
        response.likes++;
        saveQuestions();
        showQuestion(questionData);
    };

    dislikeButton.onclick = function(){
        response.dislikes++;
        saveQuestions();
        showQuestion(questionData);
    };

    responseDiv.appendChild(nameHeading);
    responseDiv.appendChild(commentText);
    responseDiv.appendChild(likeButton);
    responseDiv.appendChild(dislikeButton);

    responseContainer.appendChild(responseDiv);
}

function applyFilter(){
    let searchValue = search.value.toLowerCase().trim();
    let cards = questionform.querySelectorAll(".question-card");
    let found = false;

    cards.forEach(function(card){
        let heading = card.querySelector("h2");

        if (heading.innerText.toLowerCase().includes(searchValue)){
            card.style.display = "block";
            found = true;
        } else {
            card.style.display = "none";
        }
    });

    let message = document.getElementById("noresult");

    if (!found && searchValue !== ""){
        if(!message){
            message = document.createElement("p");
            message.id = "noresult";
            message.innerText = "No questions found";
            questionform.appendChild(message);
        }
    } else{
        if(message){
            message.remove();
        }
    }
}

function showNewQuestionForm(){
    let right = document.getElementById("right");
    right.innerHTML = "";

    let heading = document.createElement("h1");
    heading.id = "welcome";
    heading.innerText = "Welcome to Discussion Portal!";

    let paragraph = document.createElement("p");
    paragraph.id = "para";
    paragraph.innerHTML = "<b>Enter a question and subject to get started</b>";

    let subject = document.createElement("input");
    subject.type = "text";
    subject.placeholder = "Subject";
    subject.id = "subject";

    let question = document.createElement("textarea");
    question.id = "question";
    question.placeholder = "Question";

    let button = document.createElement("button");
    button.className = "submitbtn";
    button.innerText = "Submit";

    button.onclick = function(){
        addquestion();
    };

    right.appendChild(heading);
    right.appendChild(paragraph);
    right.appendChild(subject);
    right.appendChild(question);
    right.appendChild(button);
}

function saveQuestions(){
    localStorage.setItem("questions", JSON.stringify(questions));
}

newbtn.onclick = function(){
    showNewQuestionForm();
};

submitQuestion.onclick = function(){
    addquestion();
};

search.oninput = function(){
    applyFilter();
};