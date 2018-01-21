$('.modal').modal();
$('.button-collapse').sideNav();

$('.fileExplorerTrigger').click(function(){
  $('#fileExplorer').modal('open');
});

$(".downloadTrigger").click(function(){
  var blob = new Blob([$("textarea")[0].value],{"type":"text/plain"});
  
  var url = URL.createObjectURL(blob);
  
  $("#downloadLink").attr("href",url).attr("download","myFile.txt").click();
  
  document.getElementById('downloadLink').click();
});

$(".saveTrigger").click(function(){
  alert("Not included in alpha version!");
});

$('.close').click(function(){
  $('.modal.open').modal('close');
});