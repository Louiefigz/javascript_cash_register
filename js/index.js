$(document).ready(function(){

  var register = {'1': '0 ', '2': '0', '5': '6', '10': '2', '20': '1'}
  var den = [20, 10, 5, 2, 1]

  updateDom()
  keyups()



function updateDom(){
  updateTotalDom();
  updateQuantity();
}


// This is to display all totals including the final total
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

function updateQuantity(){
  $('#ones').html('<input id="keyup1" value='+ register["1"]+ ' />' );
  $('#two').html('<input id="keyup2" value='+ register["2"]+ ' />');
  $('#five').html('<input id="keyup5" value='+ register["5"]+ ' />');
  $('#ten').html('<input id="keyup10" value='+ register["10"]+ ' />');
  $('#twenty').html('<input id="keyup20" value='+ register["20"]+ ' />');
}

function clearQuantity(){
  $('#ones').html('');
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
  $('#keyup1').keyup(function(){
    if (($('#keyup1').attr('value') != $('#keyup1').val()) && (!isNaN($('#keyup1').val())) && ($('#keyup1').val() >= 0)  && ($('#keyup1').val() == Math.floor($('#keyup1').val()) ) ){
      register[1] = ($('#keyup1').val()).toString();
      $('#keyup1').attr('value', $('#keyup1').val())
      updateTotalDom()
    }
  })

  $('#keyup2').keyup(function(){
    if (($('#keyup2').attr('value') != $('#keyup2').val()) && (!isNaN($('#keyup2').val())) && ($('#keyup2').val() >= 0)   && ($('#keyup2').val() == Math.floor($('#keyup2').val()) ) ){
      register[2] = ($('#keyup2').val()).toString();
      $('#keyup2').attr('value', $('#keyup2').val())
      updateTotalDom()
    }
  })
  $('#keyup5').keyup(function(){
    if (($('#keyup5').attr('value') != $('#keyup5').val()) && (!isNaN($('#keyup5').val())) && ($('#keyup5').val() >= 0) && ($('#keyup5').val() == Math.floor($('#keyup5').val()) )  ){
      register[5] = ($('#keyup5').val()).toString();
      $('#keyup5').attr('value', $('#keyup5').val())
      updateTotalDom()
    }
  })

  $('#keyup10').keyup(function(){
    if (($('#keyup10').attr('value') != $('#keyup10').val()) && (!isNaN($('#keyup10').val())) && ($('#keyup10').val() >= 0) && ($('#keyup10').val() == Math.floor($('#keyup10').val()) )  ){
      register[10] = ($('#keyup10').val()).toString();
      $('#keyup10').attr('value', $('#keyup10').val())
      updateTotalDom()
    }
  })

  $('#keyup20').keyup(function(){
    if (($('#keyup20').attr('value') != $('#keyup10').val()) && (!isNaN($('#keyup20').val())) && ($('#keyup20').val() >= 0)  && ($('#keyup20').val() == Math.floor($('#keyup20').val()) ) ){
      register[20] = ($('#keyup20').val()).toString();
      $('#keyup20').attr('value', $('#keyup20').val())
      updateTotalDom()
    }
  })

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

  $('.changeAmount').on('submit', function(event){
    event.preventDefault();
    var unchangedRegister = Object.assign({}, register);
      clearMessage();
      if( (!isNaN($('#dollarAmountForChange').val())) && ($('#dollarAmountForChange').val() >=0) && (parseInt($('#dollarAmountForChange').val()) <= parseInt($('#totalRegister b').html())) && (Math.floor($('#dollarAmountForChange').val()) == $('#dollarAmountForChange').val())  ){
         makeChange(parseInt($('#dollarAmountForChange').val()), unchangedRegister)
      } else if( isNaN($('#dollarAmountForChange').val()) ) {
        console.log("Must be a number")
        $('#changeError').html("Must be number");
        // set up errors that handle 1. amount too large, 2. must be a number, 3.
      } else if( (parseInt($('#dollarAmountForChange').val()) > parseInt($('#totalRegister b').html())) ){
        $('#changeError').html("Now you're asking for too much!");
      } else if( Math.floor($('#dollarAmountForChange').val()) != $('#dollarAmountForChange').val()  ){
        $('#changeError').html('No coins in this Cash Register!')
      }
  })

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
        console.log(this.change)
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
