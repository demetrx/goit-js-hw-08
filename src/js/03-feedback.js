import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');

const FORM_DATA_KEY = 'feedback-form-state';
const formData = {};

formEl.addEventListener('input', throttle(onFormInput, 500));
formEl.addEventListener('submit', onFormSubmit);

populateForm();

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(FORM_DATA_KEY, JSON.stringify(formData));
}

function populateForm() {
  const lsData = localStorage.getItem(FORM_DATA_KEY);

  if (!lsData) {
    return;
  }

  const parsedLsData = JSON.parse(lsData);

  const keys = Object.keys(parsedLsData);
  keys.forEach(k => (formEl.elements[k].value = parsedLsData[k]));
}

function onFormSubmit(e) {
  e.preventDefault();

  const submittedData = JSON.parse(localStorage.getItem(FORM_DATA_KEY));
  console.log(submittedData);

  localStorage.removeItem(FORM_DATA_KEY);
  e.currentTarget.reset();
}
