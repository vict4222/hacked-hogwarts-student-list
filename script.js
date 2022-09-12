"use strict";

const dataEndPoint = "https://petlatkea.dk/2021/hogwarts/students.json"; // json endpoint
let students = []; // cleaned data fetched from the endpoint
//const cleanedStudentsJSON = []; // cleaned raw data
const HTML = []; // global variables

// prototype
const Student = {
  firstname: "",
  lastname: "",
  middlename: null,
  nickname: null,
  image: null,
  house: "",
};

document.addEventListener("DOMContentLoaded", init);

// initialize
function init() {
  // start fetching the data
  fetchData();
}

// fetch the raw json data from the end point
async function fetchData() {
  const response = await fetch(dataEndPoint);
  const jsonData = await response.json();
  cleanData(jsonData);
  //console.log(jsonData);
}

// clean up the data into a more desirable format
function cleanData(jsonData) {
  students = jsonData.map(prepareObjects);
  //console.table(students);
}

// this function fixes capitalization and whitespace
function prepareObjects(object) {
  // create new objects
  const preparedFullName = prepareData(object.fullname);
  //console.log(preparedFullName);

  const preparedHouse = prepareData(object.house);
  //console.log(preparedHouse);

  const student = Object.create(Student);

  student.firstname = getFirstName(preparedFullName);
  //console.log(student.firstname);

  student.lastname = getLastName(preparedFullName);
  //console.log(student.lastname);

  student.house = preparedHouse;

  return student;
}

// this general function prepares the data by removing excess whitespace and capitalize names properly
function prepareData(data) {
  // regex that captures the first letter and all lower case letters after a space, dash or a quotation mark
  const regex = /(?<=(-| |"))[a-z]/g;

  // remove excess whitespace
  const trimmedString = data.trim();

  // make all letters lowercase
  const lowerCaseString = trimmedString.toLowerCase();

  // capitalize the first letter of a name
  const capitalizeString =
    lowerCaseString.charAt([0]).toUpperCase() +
    lowerCaseString
      .replace(regex, function (character) {
        return character.toUpperCase();
      })
      .substring(1);

  return capitalizeString;
}

// extract the first name from a full name
function getFirstName(fullName) {
  return fullName.substring(0, fullName.includes(" ") ? fullName.indexOf(" ") : fullName.length);
}

// extract the last name from a full name
function getLastName(fullName) {
  return fullName.includes(" ") ? fullName.substring(fullName.lastIndexOf(" ") + 1) : null;
}
