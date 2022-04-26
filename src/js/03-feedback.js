import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');

const FORM_DATA_KEY = 'feedback-form-state';
let formData = {};

formEl.addEventListener('input', throttle(onFormInput, 500));
formEl.addEventListener('submit', onFormSubmit);

populateForm();

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(FORM_DATA_KEY, JSON.stringify(formData));
}

function populateForm() {
  const lsData = getLsData();

  if (!lsData) {
    return;
  }

  Object.keys(lsData).forEach(k => {
    formEl.elements[k].value = formData[k] = lsData[k];
  });
}

function onFormSubmit(e) {
  e.preventDefault();

  const submittedData = getLsData();
  console.log(submittedData);

  localStorage.removeItem(FORM_DATA_KEY);
  e.currentTarget.reset();
  formData = {};
}

function getLsData() {
  if (!localStorage.getItem(FORM_DATA_KEY)) {
    return null;
  }

  return JSON.parse(localStorage.getItem(FORM_DATA_KEY));
}
