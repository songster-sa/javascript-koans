function Muppet(age, hobby) {
  this.age = age;
  this.hobby = hobby;

  this.answerNanny = function(){
	return "Everything's cool!";
  }
}

function SwedishChef(age, hobby, mood) {
  Muppet.call(this, age, hobby); // setting paramters of the base object
  // even if prototy is set at line 20, the baove is required to set the values. else its undinfed
  this.mood = mood;

  this.cook = function() {
    return "Mmmm soup!";
  }
}

SwedishChef.prototype = new Muppet(); // this is optional here. 
//without this also, the code works as swedishChef contains a call to Muppet

describe("About inheritance", function() {
  beforeEach(function(){
    this.muppet = new Muppet(2, "coding");
	this.swedishChef = new SwedishChef(2, "cooking", "chillin");
  });

  it("should be able to call a method on the derived object", function() {
    expect(this.swedishChef.cook()).toEqual("Mmmm soup!");
  });

  it("should be able to call a method on the base object", function() {
    expect(this.swedishChef.answerNanny()).toEqual("Everything's cool!");
  });

  it("should set constructor parameters on the base object", function() {
    expect(this.swedishChef.age).toEqual(2);
    expect(this.swedishChef.hobby).toEqual("cooking");
    expect(this.muppet.age).toEqual(2);
    expect(this.muppet.hobby).toEqual("coding");
  });

  it("should set constructor parameters on the derived object", function() {
    expect(this.swedishChef.mood).toEqual("chillin");
  });
});

// http://javascript.crockford.com/prototypal.html
Object.prototype.beget = function () {
  function F() {}
  F.prototype = this;
  return new F();
}

function Gonzo(age, hobby, trick) {
  Muppet.call(this, age, hobby);
  this.trick = trick;

  this.doTrick = function() {
    return "Doing trick: "+this.trick;
  }
}

//no longer need to call the Muppet (base type) constructor
Gonzo.prototype = Muppet.prototype.beget();

describe("About Crockford's inheritance improvement", function() {
  beforeEach(function(){
  this.gonzo = new Gonzo(3, "daredevil performer", "eat a tire");
  });

  it("should be able to call a method on the derived object", function() {
    expect(this.gonzo.doTrick()).toEqual("Doing trick: eat a tire");
  });

  it("should be able to call a method on the base object", function() {
    expect(this.gonzo.answerNanny()).toEqual("Everything's cool!");
  });

  it("should set constructor parameters on the base object", function() {
    expect(this.gonzo.age).toEqual(3);
    expect(this.gonzo.hobby).toEqual("daredevil performer");
  });

  it("should set constructor parameters on the derived object", function() {
    expect(this.gonzo.trick).toEqual("eat a tire");
  });
});
