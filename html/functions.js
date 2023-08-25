const mainApp = document.getElementById('app');
mainApp.classList = ["mainApp fullScreen flexColumn"];

const loadCategoryInfo = (data) => {
  let categoryHeading = document.getElementById('categoryHeading');
  categoryHeading.innerHTML = `<i class = "${data.icon}"></i> ${data.name}`;
  let pages = document.getElementsByClassName('thisPageData');
  for (let i = 0; pages.length > i; i++) {
    pages[i].classList.add("hidden");
  }
  let page = document.getElementById(data.name);
  page.classList.remove("hidden");
};
const setUp = () => {
  for (let i = 0; Config.Body.length > i; i++) {
    let page = Config.Body[i];
    //
    let thisPageData = newElement('div', mainContainerForUserInput,{
      classList: ['thisPageData', "hidden"],
      id: page.name,
    });
    if (page.options) {
      for (let j = 0; page.options.length > j; j++) {
        let option = page.options[j];
        //
        let optionContainer = newElement('div', thisPageData,{
          classList: ['optionContainer'],
        });
        let optionLabel = newElement('div', optionContainer,{
          classList: ['optionLabel'],
          innerHTML: option.name,
        });
        if (option.type == 'select') {
            let optionSelect = newElement('select', optionContainer,{
              classList: ['dataoption', 'optionSelect'],
              id: option.name,
              isRequired: option.isRequired,
            });
            for (let k = 0; option.options.length > k; k++) {
              let options = option.options[k];
              let optionOption = newElement('option', optionSelect,{
                classList: ['optionOption'],
                innerHTML: options.name,
                value: options.value,
              });
            }
            if (option.isRequired) {
              optionSelect.classList.add('required');
            }
            if (option.event) {
              optionSelect.onchange = function () {
                sendToGame({ event: option.event, params: { value: this.value , key: this.id}});
              }
            }
          } else {
            let optionInput = newElement('input', optionContainer, {
              classList: ['dataoption'],
              id: option.name,
              type: option.type,
              isRequired: option.isRequired,
            });
            if (option.isRequired) {
              optionInput.classList.add('required');
            }
            if (option.type == "number"){
              optionInput.min = option.min || 0;
              optionInput.max = option.max;
            }
            if (option.event) {
              optionInput.onchange = function () {
                if (option.value < option.min || option.max ? option.value > option.max : false) {
                  optionInput.value = option.min;
                }
                sendToGame({ event: option.event, params: { value: this.value , key: this.id} });
              }
            }
          }
      }
    }
  }
}