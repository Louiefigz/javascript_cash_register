$(document).ready(function(){

  var register = {'1': '0 ', '2': '0', '5': '6', '10': '2', '20': '1'}
  var den = [1, 2, 5, 10, 20]
updateDom()



function updateDom(){
  updateQuantity();
  updateTotalDom();

}

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


// Changing fields for Quantity of Denominations
$('#keyup1').keyup(function(){
  if (($('#keyup1').attr('value') != $('#keyup1').val()) && (!isNaN($('#keyup1').val())) && ($('#keyup1').val() >= 0)){
    register[1] = ($('#keyup1').val()).toString();
    $('#keyup1').attr('value', $('#keyup1').val())
    updateTotalDom()
  }
})

$('#keyup2').keyup(function(){
  if (($('#keyup2').attr('value') != $('#keyup2').val()) && (!isNaN($('#keyup2').val())) && ($('#keyup2').val() >= 0)){
    register[2] = ($('#keyup2').val()).toString();
    $('#keyup2').attr('value', $('#keyup2').val())
    updateTotalDom()
  }
})
$('#keyup5').keyup(function(){
  if (($('#keyup5').attr('value') != $('#keyup5').val()) && (!isNaN($('#keyup5').val())) && ($('#keyup5').val() >= 0)){
    register[5] = ($('#keyup5').val()).toString();
    $('#keyup5').attr('value', $('#keyup5').val())
    updateTotalDom()
  }
})

$('#keyup10').keyup(function(){
  if (($('#keyup10').attr('value') != $('#keyup10').val()) && (!isNaN($('#keyup10').val())) && ($('#keyup10').val() >= 0)){
    register[10] = ($('#keyup10').val()).toString();
    $('#keyup10').attr('value', $('#keyup10').val())
    updateTotalDom()
  }
})

$('#keyup20').keyup(function(){
  if (($('#keyup20').attr('value') != $('#keyup10').val()) && (!isNaN($('#keyup20').val())) && ($('#keyup20').val() >= 0)){
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



});
