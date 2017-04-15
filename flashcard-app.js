var fs = require("fs");

var inquirer = require('inquirer');

var simpleCard = require("./simple-card");

var clozeCard = require("./cloze-card");

var wrongAnswer = 0;

var rightAnswer = 0;

FlashCards();

function FlashCards() {

    inquirer.prompt([
    	{
            type: 'list',
            name: 'userType',
            message: 'Please choose one of the following?',
            choices: ['create-basic-cards', 'create-cloze-cards', 'basic-quiz', 'cloze-quiz', 'quit']
        }

    ]).then(function(choice) {

        if (choice.userType === 'create-basic-cards') {
            createBazicCards('log.txt');
            // createCards('log.txt');
        } else if (choice.userType === 'create-cloze-cards') {
            createClozeCards('cloze-log.txt');
            // createCards(clozePrompt, 'cloze-log.txt');
        } else if (choice.userType === 'basic-quiz') {
            quiz('log.txt', 'front', 'back');
        } else if (choice.userType === 'cloze-quiz') {
            quiz('cloze-log.txt', 'text', 'cloze');
        } else if (choice.userType === 'quit') {
            console.log('Thanks for playing!');
        }
    });	
}

function readCards(file) {
	fs.readFile(file, "utf-8", (error, data) => {
		console.log(data);
		createBazicCards('log.txt');
		createClozeCards('cloze-log.txt');
	});
}

// =====* Basic Card Creation *====== //

function createBazicCards(file) {

	inquirer.prompt([
		{
			type: 'input',
			name: 'front',
			message:'Enter Front of Your Card'
		},
		{
			type: 'input',
			name: 'back',
			message:'Enter Back of Your Card'
		}

	]).then(function(basicCard){
		var basicCardFront = basicCard.front;
		var basicCardBack = basicCard.back;

		console.log(basicCardFront);
		console.log(basicCardBack);

		var basicCardObj = {
			"front" : basicCardFront,
			"back" : basicCardBack
		}

		fs.appendFile(file,'; \n\n' + JSON.stringify(basicCardObj), (err) => {
	  		if (err) throw err;
	  		// console.log('Card front was appended to file!');
	  		quitOrNot('log.txt');
	  	});
	  	
	});	
}

function quitOrNot(file){
	inquirer.prompt([
	{
		type:'list',
		name: 'quit',
		message: 'Do you want to quit?',
		choices: ['yes', 'no']
	}
	]).then(function(answer){
		if(answer.quit === 'yes'){
			FlashCards();
		} else {
			createBazicCards(file);
		}
	});
}

// =====* Cloze Card Creation *====== //

function createClozeCards(file) {

	inquirer.prompt([
		{
			type: 'input',
			name: 'text',
			message:'Enter your sentence and put ..... on where you want to hide words, for example: ..... was the first president of the United States'
		},
		{
			type: 'input',
			name: 'cloze',
			message:'Enter your cloze text'
		}

	]).then(function(clozeCard){
		var clozeCardText = clozeCard.text;
		var clozeCardCloze = clozeCard.cloze;

		console.log(clozeCardText);
		console.log(clozeCardCloze);

		var clozeCardObj = {
			"text" : clozeCardText,
			"cloze" : clozeCardCloze
		}

		fs.appendFile(file,'; \n\n' + JSON.stringify(clozeCardObj), (err) => {
	  		if (err) throw err;
	  		// console.log('cloze text is appended');
	  		quitOrNot('cloze-log.txt');

	  	});
	  	
	});	
}

function readLogFile(file, cb){
	var newDataArr;
	fs.readFile(file, "utf-8", (error, data) => {
		var dataString = data.replace(/\n\n/, '');
		var dataArr = dataString.split(';');
		// console.log(Array.isArray(dataArr));
		newDataArr = dataArr.map(function(el){
			return JSON.parse(el);
		});
		cb(newDataArr);
	});
}

function quiz(file, frontProperty, backProperty) {

	var index = 0;

	readLogFile(file, function(newDataArr){
		// console.log(newDataArr);
		inquirer.prompt([
		{
			type: 'input',
			name: 'userGuess',
			message: newDataArr[index][frontProperty].toLowerCase()		
		}
		]).then(function(response){

			// console.log(response.userGuess);
			// console.log(newDataArr[index][backProperty]);

			if (response.userGuess.toLowerCase() === newDataArr[index][backProperty].toLowerCase()) {
				console.log("Correct!!!");
				console.log("");
				rightAnswer++;
			} else {
				console.log('Wrong!!!');
				console.log("");
				console.log('The correct answer is ' + newDataArr[index][backProperty].toLowerCase());
				wrongAnswer++;
			} 

			if (index > newDataArr[index].length) {
				quiz(file);
			} else {
				console.log("");
				console.log('Game Over!');
				console.log("");
				console.log('Correct Answers: ' + rightAnswer);				console.log("");
				console.log('Wrong Answers: ' + wrongAnswer);
				console.log("");

			}
			quitQuiz();

		});
	});
};

// function quitQuiz(file){
// 	inquirer.prompt([{
// 		// type: 'confirm',
// 		type:'list',
// 		name: 'quitQuiz',
// 		message: 'Do you want to quit?',
// 		choices: ['yes', 'no']
// 	}]).then(function(answers){
// 		if (answers.quitQuiz === yes) {
// 			rightAnswer = 0;
// 			wrongAnswer = 0;
// 			quiz();
// 		} else {
// 			console.log('Thank you for playing!');
// 		}
// 	});
// }
