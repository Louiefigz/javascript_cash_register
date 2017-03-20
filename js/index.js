$(document).ready(function(){

  var register = {'1': '0 ', '2': '0', '5': '6', '10': '2', '20': '1'}
  var den = [20, 10, 5, 2, 1]

  updateDom();


  function updateDom(){
    updateTotalDom();
    updateQuantity();
  }

  $('.changeAmount').on('submit', function(event){
    event.preventDefault();
    executeChangeOrder();
  })

  function executeChangeOrder(){
    // I'm copying the original hash to document the changes between the hashes to report
    // the denominations given out from the register to make change.
    var unchangedRegister = Object.assign({}, register);
      clearMessage(); //Fail safe to make sure that no two different errors are showing.
      // Checking if the input from user is a number, not a string, over 0, not over the total register amount, and not a decimal
      if( (!isNaN($('#dollarAmountForChange').val())) && ($('#dollarAmountForChange').val() >=0) && (parseInt($('#dollarAmountForChange').val()) <= parseInt($('#totalRegister b').html())) && (Math.floor($('#dollarAmountForChange').val()) == $('#dollarAmountForChange').val())  ){
        // if valid, we're going to continue to the makChange Function
         makeChange(parseInt($('#dollarAmountForChange').val()), unchangedRegister);

        //  Below handle the errors
      } else if( isNaN($('#dollarAmountForChange').val()) ) {
        $('#changeError').html("Must be number");
      } else if( (parseInt($('#dollarAmountForChange').val()) > parseInt($('#totalRegister b').html())) ){
        $('#changeError').html("Now you're asking for too much!");
      } else if( Math.floor($('#dollarAmountForChange').val()) != $('#dollarAmountForChange').val()  ){
        $('#changeError').html('No coins in this Cash Register!')
      }
  }


// This is to display all totals including the final total.
// Making it total register amount available to the DOM.
function updateTotalDom(){
  var registerTotal = []
  den.forEach(function(index){
    var total = register[index]* index;
    registerTotal.push(total);
    var number = setNumber(index);
    $('.total#'+number).html(total);
  })
  $('#totalRegister').html('<b>'+ registerTotal.reduce(function(a, b) { return a + b; }, 0)+ '</b>');
}

// This is only used once when the browser loads the first time.
// It allows me the opportunity to set the values later after user changes the quantity.
function updateQuantity(){
  $('#one').html('<input id="keyup1" value='+ register["1"]+ ' />' );
  $('#two').html('<input id="keyup2" value='+ register["2"]+ ' />');
  $('#five').html('<input id="keyup5" value='+ register["5"]+ ' />');
  $('#ten').html('<input id="keyup10" value='+ register["10"]+ ' />');
  $('#twenty').html('<input id="keyup20" value='+ register["20"]+ ' />');
}

function clearQuantity(){
  $('#one').html('');
  $('#two').html('');
  $('#five').html('');
  $('#ten').html('');
  $('#twenty').html('');
}


// Changing fields for Quantity of Denominations
function keyups(){
  $('#keyup1').attr('value', register[1] );
  $('#keyup2').attr('value', register[2] );
  $('#keyup5').attr('value', register[5] );
  $('#keyup10').attr('value', register[10] );
  $('#keyup20').attr('value', register[20] );
}

// All the keyup Functions here.
  $('#keyup1').keyup(function(){
    keyupChanges("#keyup1", 1)
  })

  $('#keyup2').keyup(function(){
    keyupChanges("#keyup2", 2);
  })

  $('#keyup5').keyup(function(){
    keyupChanges("#keyup5", 5)
  })

  $('#keyup10').keyup(function(){
    keyupChanges("#keyup10", 10)
  })

  $('#keyup20').keyup(function(){
    keyupChanges("#keyup20", 20)
  })

// Shifted keyup logic to this function to stay DRY
  function keyupChanges(keyup, index){
    if (($(keyup).attr('value') != $(keyup).val()) && (!isNaN($(keyup).val())) && ($(keyup).val() >= 0)  && ($(keyup).val() == Math.floor($(keyup).val()) ) ){
      register[index] = ($(keyup).val()).toString();
      $(keyup).attr('value', $(keyup).val())
      updateTotalDom()
    }
  }

// End of Quantity Fields

function setNumber(index){
  if (index == "1"){
     return "one"
  }else if (index == "2") {
    return   "two"
  }else if (index =="5"){
    return  "five"
  }else if(index=="10"){
    return "ten"
  }else if (index == "20"){
    return  "twenty"
  }
}


// Whenever the input field for change is empty, the error messages should disappear
  $('#dollarAmountForChange').keyup(function(){
    if( $('#dollarAmountForChange').val() == "" ){
      clearMessage();
    }
  })

  function clearMessage(){
    $('#successMessage').html('');
    $('#changeError').html('');
  }

function makeChange(change, unchangedRegister){
  this.change = change;
  den.forEach(function(den){
    // if the denomination left is more than 0 and it is divisible by the change amount.
    if ( (parseInt(register[den]) > 0) &&  (this.change/den >= 1) ){
      if ( parseInt(register[den]) >=  Math.floor(this.change/den)){
        register[den] = (register[den] - Math.floor(this.change/den)).toString();

          this.change = this.change - (Math.floor(this.change/den)* den)
      } else {

        this.change = this.change - (register[den] * den)
        register[den] = "0"
      }
    }
  })
  if (this.change==0){
    keyups();
    updateTotalDom();
    clearMessage();
    changedValues = {}

    den.forEach(function(index){
      if ( unchangedRegister[index] !== register[index] ){
        var number = setNumber(index);
        var quantityChanged = unchangedRegister[index]-register[index]
        if ($('#'+ number + ' input').attr('value') === "" || $('#'+ number+ ' input').attr('value') == undefined){
          var value =  "0"
        } else {
          var value = $('#'+ number+ ' input').attr('value')
        }

        $('#'+number+ ' input').val(value)
        console.log(number)
        // changedValues[number] = (unchangedRegister[index] - register[index]);
        $('#successMessage').append("<li>" + quantityChanged +" - "+ number +"'s"+ "</li>");

      }
    })
  } else {
    $('#changeError').html("Sorry, We don't have enough in the register to give you change. You should have paid with a card.")
  }
}

});
