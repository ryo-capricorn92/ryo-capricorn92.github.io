/* global $ */

var submitClass, addStudent, changeStudent;
var studentsArr = [];
var students = {};
var pairs = [];

var startup = function () {
  $('#app').html('<button onclick="createClass()">Create new class</button>');
  if (window.localStorage.getItem('REMOTE_PREP_HELPER_CLASS')) {
    $('#app').append('<button onclick="editClass()">Edit current class</button>');
    $('#app').append('<button onclick="clearClass()">Clear old class</button><br />');
    $('#app').append('<button onclick="createPairs()">Create new pairs</button');
    $('#app').append('<button onclick="clearPairs()">Clear old pairs</button>');
  }
}

var createClass = function () {
  submitClass = function () {
    studentsArr.forEach(function(student) {
      students[student] = [];
    })
    window.localStorage.setItem('REMOTE_PREP_HELPER_CLASS', JSON.stringify(students));
    startup();
  }

  addStudent = function () {
    var student = $('#student').val();
    console.log(student);
    $('#newClassTable').append('<tr><td>' + student + '</td></tr>').addlistener;
    studentsArr.push(student);
  }

  $('#app').html('<table border=1><thead><tr><th>Students</th></tr><tbody id="newClassTable"></tbody></table>');
  $('#app').append('<input id="student" />');
  $('#app').append('<button onclick="addStudent()">Add Student</button>');
  $('#app').append('<button onclick="submitClass()">Submit Class</button>');
}

var editClass = function () {
  changeStudent = function () {
    var input = document.getElementById('changeStudent');
    for (var student in students) {
      for (var i = 0; i < student.length; i++) {
        if (student[i] === input.name) {
          student[i] = input.value;
        }
      }
    }
    students[input.value] = students[input.name];
    delete students[input.name];
    window.localStorage.setItem('REMOTE_PREP_HELPER_CLASS', JSON.stringify(students));
    startup();
  }
  var students = JSON.parse(window.localStorage.getItem('REMOTE_PREP_HELPER_CLASS'));
  $('#app').html('<table border=1><thead><tr><th>Students</th></tr><tbody id="newClassTable"></tbody></table>');
  $('#app').append('<button onclick="startup()">Back</button>');
  for (var student in students) {
    $('#newClassTable').append('<tr><td id="' + student + '">' + student + '</td></tr>');
    $('#' + student).on('click', function (e) {
      $('#app').append('<input id="changeStudent" name="' + e.target.id +'"/>');
      $('#app').append('<button onclick="changeStudent()">Update Student</button>');
    })
  }
}

var clearClass = function () {
  var shouldDelete = confirm('Are you sure you want to delete your current class? You won\'t be able to retrieve it or any previous pairs.');
  if (shouldDelete) {
    window.localStorage.removeItem('REMOTE_PREP_HELPER_CLASS');
    startup();
  }
}

var createPairs = function () {
  var students = JSON.parse(window.localStorage.getItem('REMOTE_PREP_HELPER_CLASS'));
  var studentsArr = [], pairs = [], currentPair = [];
  for (var student in students) {
    studentsArr.push(student);
  }
  if (studentsArr.length % 2) {
    studentsArr.push('SOLO');
  }
  for (var i = 0; i < studentsArr.length; i++) {
    var j;
    do {
      j = Math.floor(Math.random() * studentsArr.length);
    } while (studentsArr[j] === '');
    if (currentPair.length && students[studentsArr[j]].includes(currentPair[0])) {
      i--;
    } else {
      currentPair.push(studentsArr[j]);
      studentsArr[j] = '';
      if (currentPair.length >= 2) {
        students[currentPair[0]].push(currentPair[1]);
        students[currentPair[1]].push(currentPair[0]);

        pairs.push(currentPair.slice());
        currentPair.length = 0;
      }
    }
  }

  $('#app').html('<table border=1><thead><tr><th colspan=2>Students</th></tr><tbody id="newPairsTable"></tbody></table>');
  $('#app').append('<button onclick="startup()">Back</button>');
  for (var pair in pairs) {
    $('#newPairsTable').append('<tr><td>' + pairs[pair][0] + '</td><td>' + pairs[pair][1] + '</tr>');
  }

  window.localStorage.setItem('REMOTE_PREP_HELPER_CLASS', JSON.stringify(students));
}

var clearPairs = function () {
  var students = JSON.parse(window.localStorage.getItem('REMOTE_PREP_HELPER_CLASS'));
  for (var student in students) {
    students[student].length = 0;
  }
  window.localStorage.setItem('REMOTE_PREP_HELPER_CLASS', JSON.stringify(students));
}


$(function () {
  startup();
})
