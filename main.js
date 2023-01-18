//get inputs values


var courseName =document.getElementById('courseName');
var courseCategory = document.getElementById('courseCategory')
var coursePrice = document.getElementById('coursePrice')
var courseDescription = document.getElementById('courseDescription')
var courseCapacity = document.getElementById('courseCapacity')
var addbtn = document.getElementById('click')
var data = document.getElementById('data')
var deleteBtn = document.getElementById('deleteBtn')
var search = document.getElementById('search')
var courses
if(JSON.parse(localStorage.getItem('courses')) == null){
 courses= []
}else{
 courses = JSON.parse(localStorage.getItem('courses'))
displayData();  
}

var currentIndex =0 ;


//create course
addbtn.onclick =function(event){
    event.preventDefault();
    if(addbtn.value == 'Add Course'){
        addCourse(); 
    }
    else {
        updateCourse();
       /*  displayData();
        clearInputs(); */

        courseName.classList.remove('is-valid')
        courseCategory.classList.remove('is-valid')
        coursePrice.classList.remove('is-valid')
        courseDescription.classList.remove('is-valid')
        courseCapacity.classList.remove('is-valid')
    }
   
}

//Add Courses
function addCourse(){
    var course = {
        courseName : courseName.value,
        courseCategory:courseCategory.value,
        coursePrice: coursePrice.value,
        courseDescription: courseDescription.value,
        courseCapacity: courseCapacity.value,

    }
    courses.push(course);
    localStorage.setItem('courses',JSON.stringify(courses))
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Courses added successfuly',
        showConfirmButton: false,
        timer: 1500
      })
    clearInputs();
    console.log(courses);
    displayData();
}

//clear inputs
function clearInputs(){
    courseName.value =''
    courseCategory.value =''
    coursePrice.value =''
    courseDescription.value =''
    courseCapacity.value =''
}

//Read data in table
function displayData(){
    var result ='';
    for(var i=0; i<courses.length; i++){
     result+=`
     <tr>
       <td>${i+1}</td>
       <td>${courses[i].courseName}</td>
       <td>${courses[i].courseCategory}</td>
       <td>${courses[i].coursePrice}</td>
       <td>${courses[i].courseDescription}</td>
       <td>${courses[i].courseCapacity}</td>
       <td><button class="btn btn-info" onclick="getCourse(${i})">update</button></td>
       <td><button class="btn btn-danger" onClick="deleteCourse(${i})">delete</button></td>
      
     </tr>
     `
    }
    data.innerHTML =result;

}

//Delete Course 
function deleteCourse(index){

   Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
        courses.splice(index,1);
        localStorage.setItem('courses',JSON.stringify(courses))
        displayData();
      Swal.fire(
        'Deleted!',
        'Course has been deleted.',
        'success'
      )
    }
  })

}

//delete all
deleteBtn.onclick =function(){
   

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            courses = [];
            localStorage.setItem('courses',JSON.stringify(courses))
            data.innerHTML =''
          Swal.fire(
            'Deleted!',
            'All data has been deleted.',
            'success'
          )
        }
      })
}
/**
 * keyup
 * onkeypress
 * onkeydown
 */
search.onkeyup =function(){
    //console.log(search.value);
    var result = '';
    for(var i=0; i<courses.length; i++){
        if(courses[i].courseName.toLowerCase().includes(search.value.toLowerCase())){
        result+=`
        <tr>
          <td>${i+1}</td>
          <td>${courses[i].courseName}</td>
          <td>${courses[i].courseCategory}</td>
          <td>${courses[i].coursePrice}</td>
          <td>${courses[i].courseDescription}</td>
          <td>${courses[i].courseCapacity}</td>
          <td><button class="btn btn-info">update</button></td>
          <td><button class="btn btn-danger" onClick="deleteCourse(${i})">delete</button></td>
        </tr>
        `
       }
    }
    data.innerHTML= result;
}


//update
function getCourse (index){
    var course =courses[index]
    courseName.value = course.courseName
    courseCategory.value =course.courseCategory
    coursePrice.value = course.coursePrice
    courseDescription.value = course.courseDescription
    courseCapacity.value = course.courseCapacity
    addbtn.value= 'Update Course'
    currentIndex = index;
}

function updateCourse(){
    var course = {
        courseName : courseName.value,
        courseCategory:courseCategory.value,
        coursePrice: coursePrice.value,
        courseDescription: courseDescription.value,
        courseCapacity: courseCapacity.value,
    }
    var name = courses[currentIndex].courseName
    courses[currentIndex].courseName = course.courseName
    courses[currentIndex].courseCategory = course.courseCategory
    courses[currentIndex].coursePrice = course.coursePrice
    courses[currentIndex].courseDescription = course.courseDescription
    courses[currentIndex].courseCapacity = course.courseCapacity
    localStorage.setItem('courses',JSON.stringify(courses))
addbtn.value = 'Add Course'
Swal.fire({
  position: 'center',
  icon: 'success',
  title: `${ name} added successfuly`,
  showConfirmButton: false,
  timer: 1500
})
    displayData();
    clearInputs();

}

//validation regex
//courseName
/**
 * first letter capital
 * name 3-10
 * no number
 * regex /^[A-Z][a-z]{2,10}$/
 */
courseName.onkeyup =function(){
  var pattern = /^[A-Z][a-z]{2,10}$/
  if(pattern.test(courseName.value)){
    if(courseName.classList.contains('is-invalid') 
    && document.getElementById('nameAlert').classList.contains('d-block')){
      courseName.classList.replace('is-invalid','is-valid')
      document.getElementById('nameAlert').classList.replace('d-block', 'd-none')
    }else
      addbtn.removeAttribute('disabled')
    courseName.classList.add('is-valid') 
    }
  else{
    if(courseName.classList.contains('is-valid')
    && document.getElementById('nameAlert').classList.contains('d-none')){
      courseName.classList.replace('is-valid','is-invalid')
      document.getElementById('nameAlert').classList.replace('d-none', 'd-block')
    }else
    addbtn.setAttribute('disabled','disabled')
    courseName.classList.add('is-invalid')
      document.getElementById('nameAlert').classList.replace('d-none', 'd-block')
  }
}

//validation regex
//courseName
/**
 * first letter capital
 * name 3-10
 * no number
 * regex /^[A-Z][a-z]{3,10}$/
 */
courseCategory.onkeyup =function(){
  var pattern = /^[A-Z][a-z]{3,10}$/
  if(pattern.test(courseCategory.value)){
    if(courseCategory.classList.contains('is-invalid') 
    && document.getElementById('nameAlert2').classList.contains('d-block')){
      courseCategory.classList.replace('is-invalid','is-valid')
      document.getElementById('nameAlert').classList.replace('d-block', 'd-none')
    }else
      addbtn.removeAttribute('disabled')
      courseCategory.classList.add('is-valid') 
    }
  else{
    if(courseCategory.classList.contains('is-valid')
    && document.getElementById('nameAlert2').classList.contains('d-none')){
      courseCategory.classList.replace('is-valid','is-invalid')
      document.getElementById('nameAlert').classList.replace('d-none', 'd-block')
    }else
    addbtn.setAttribute('disabled','disabled')
    courseCategory.classList.add('is-invalid')
      document.getElementById('nameAlert2').classList.replace('d-none', 'd-block')
  }
}

//price
/** 
 * numbers
 * 3 digits
 * no number
 * regex /^[0-9]{3,4}$/
 */
coursePrice.onkeyup =function(){
  var pattern = /^[0-9]{3,4}$/
  if(pattern.test(coursePrice.value)){
    if(coursePrice.classList.contains('is-invalid')){
      coursePrice.classList.replace('is-invalid','is-valid')
    }else
      addbtn.removeAttribute('disabled')
      coursePrice.classList.add('is-valid') 
    }
  else{
    if(coursePrice.classList.contains('is-valid')){
      coursePrice.classList.replace('is-valid','is-invalid')
    }else
    addbtn.setAttribute('disabled','disabled')
    coursePrice.classList.add('is-invalid')
  }
}

//description
/** 
 * first letter capital
 * numbers
 * number of chars 120
 * regex /^[A-Z][A-Za-z0-9\s]{3,120}$/
 */
courseDescription.onkeyup =function(){
  var pattern = /^[A-Z][A-Za-z0-9\s]{3,120}$/
  if(pattern.test(courseDescription.value)){
    if(courseDescription.classList.contains('is-invalid')){
      courseDescription.classList.replace('is-invalid','is-valid')
    }else
      addbtn.removeAttribute('disabled')
      courseDescription.classList.add('is-valid') 
    }
  else{
    if(courseDescription.classList.contains('is-valid')){
      courseDescription.classList.replace('is-valid','is-invalid')
    }else
    addbtn.setAttribute('disabled','disabled')
    courseDescription.classList.add('is-invalid')
  }
}

//Capacity
/** 
 * numbers
 * 2-3 digits
 * regex /^[0-9]{2,3}$/
 */
courseCapacity.onkeyup =function(){
  var pattern = /^[0-9]{2,3}$/
  if(pattern.test(courseCapacity.value)){
    if(courseCapacity.classList.contains('is-invalid')){
      courseCapacity.classList.replace('is-invalid','is-valid')
    }else
      addbtn.removeAttribute('disabled')
      courseCapacity.classList.add('is-valid') 
    }
  else{
    if(courseCapacity.classList.contains('is-valid')){
      courseDescription.classList.replace('is-valid','is-invalid')
    }else
    addbtn.setAttribute('disabled','disabled')
    courseCapacity.classList.add('is-invalid')
  }
}