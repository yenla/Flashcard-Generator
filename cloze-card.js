var ClozeCard = function(text, cloze) {
	
  this.text = text;
  this.cloze = cloze;
  this.partial = text.replace(cloze, '...');
  
}

ClozeCard.prototype.clozeCardQuiz = function(){
	return this.text;

};

