var $days = $('.days');
var $monthSelect = $('.monthSelect');
var $yearSelect = $('.yearSelect');
var $previousMonth = $('.previousMonth');
var $nextMonth = $('.nextMonth');

var monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

var today = new Date();

monthArr.forEach(function(month, i) {
  $('<option/>').text(month).val(i).prop('selected', today.getMonth() === i).appendTo($monthSelect);     
})
   
$yearSelect.val(today.getFullYear());

function numberOfDays(y, m) {
  return new Date(parseInt(y), parseInt(m)+1, 0).getDate();
}

function offSetDays(y, m) {
  return new Date(parseInt(y), parseInt(m), 1).getDay();
}
function buildDays() {
  $days.empty();
  var days = numberOfDays($yearSelect.val(), $monthSelect.val());
  var offset = offSetDays($yearSelect.val(), $monthSelect.val());

for (var i = 1; i <= offset; i++) {
  $('<li/>').appendTo($days);
}

for (var i = 1; i <= days; i++) {
  $('<li/>').attr('data-date', i).appendTo($days);
 }
}

function validateYear() {
  return !isNaN($yearSelect.val()) && $yearSelect.val().length === 4; 
}

buildDays();
$monthSelect.on('change', buildDays);
$yearSelect.on('input', function() {
  if(validateYear()) {
    buildDays();
  } 
})

$yearSelect.on('blur', function() {
  if(!validateYear()) {
    $yearSelect.val(today.getFullYear());
    buildDays();
  }
})

$nextMonth.on('click', function() {
  var $current = $monthSelect.find(':selected');
  var $next = $current.next();
  var currentYear = parseInt($yearSelect.val());
  if($next.length === 0) {
    $next = $monthSelect.find(':first-child');
    currentYear += 1;
  }
  $current.prop('selected', false);
  $next.prop("selected", true);
  $yearSelect.val(currentYear);
  buildDays();
})

$previousMonth.on('click', function() {
  var $current = $monthSelect.find(':selected');
  var $next = $current.prev();
  var currentYear = parseInt($yearSelect.val());
  if($next.length === 0) {
    $next = $monthSelect.find(':last-child');
    currentYear -= 1;
  }
  $current.prop('selected', false);
  $next.prop("selected", true);
  $yearSelect.val(currentYear);
  buildDays();
})


