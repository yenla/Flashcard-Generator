var SimpleCard = function(front, back) {
	
  this.front = front;
  this.back = back;
  
}

SimpleCard.prototype.printCard = function() {
  console.log("Front: " + this.front + ", " + "Back: " + this.back);
};

SimpleCard.prototype.printFront = function() {
    console.log(this.front);

}

SimpleCard.prototype.printAnswer = function() {
    console.log('Sorry, the correct answer is ' + this.back + '.');
}

module.exports = SimpleCard;