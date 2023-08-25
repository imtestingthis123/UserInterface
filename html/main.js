window.addEventListener('message', function (event) {
  var data = event.data;

  switch (data.action) {
    case 'openInterface':
      Config = data.data;
      CanClose = Config.canClose == "false" ? false : true;
      openMenu()
      break;
    case 'closeInterface':
      let mainApp = document.getElementById('app');
      mainApp.innerHTML = '';
      break;
  }
});

// listen for keypresses of esc
document.addEventListener('keyup', function (event) {
  if (event.key == 'Escape' && CanClose) {
    closeMenu();
  }
});

const closeMenu = () => {
  let mainApp = document.getElementById('app');
  mainApp.innerHTML = '';
  sendToGame({ event: "close" });
}



const openMenu = () => {
  let headerContainer = newElement('div', mainApp, {
    classList: [
      'header',
      'flexRow',
      'flexCenter',
      'flexGrow0',
      'textCenter',
      'fullWidth'],
  });

  let headerTitle = newElement('div', headerContainer, {
    classList: [
      'headerTitle',
      'flexRow',
      'flexCenter',
      'flexGrow1',
      'textCenter',
      'fullWidth'
    ],
    innerHTML: Config.Header
  });

  let mainContainer = newElement('div', mainApp, {
    classList: ['main']
  });

  let footerContainer = newElement('div', mainApp, {
    classList: ['footer']
  });

  let userSelectionContainer = newElement('div', mainContainer, {
    classList: ['userSelection'],
  });


  let categoryContainer = newElement('div', userSelectionContainer, {
    classList: ['category', 'flexRow',],

  });

  let CurrentCategory = 0;
  Config.Body;

  if (Config.Body.length > 1) {
    prevCategoryButton = newElement('div', categoryContainer, {
      classList: ['categoryOption', 'categoryOptionChangePrev'],
      innerHTML: '<i class = "fas fa-arrow-left"></i>',
      onclick: function () {
        prevCategory();
      }
    });
  }

  let currentCategory = newElement('div', categoryContainer, {
    classList: ['categoryOption', 'categoryOptionCurrent'],
    id: 'categoryHeading',
    innerHTML: `<i class = "${Config.Body[0].icon}"></i> ${Config.Body[0].name}`,
  });

  if (Config.Body.length > 1) {
    nextCategoryButton = newElement('div', categoryContainer, {
      classList: ['categoryOption', 'categoryOptionChangeNext'],
      innerHTML: '<i class = "fas fa-arrow-right"></i>',
      onclick: function () {
        nextCategory();
      }
    });
  } else {
    currentCategory.style.borderRadius = '1vh 1vh 0 0';
  }



  const nextCategory = () => {
    if (CurrentCategory == 0) {
      CurrentCategory = Config.Body.length - 1;
    } else {
      CurrentCategory--;
    }
    loadCategoryInfo(Config.Body[CurrentCategory]);
  }

  const prevCategory = () => {
    if (CurrentCategory == Config.Body.length - 1) {
      CurrentCategory = 0;
    } else {
      CurrentCategory++;
    }
    loadCategoryInfo(Config.Body[CurrentCategory]);
  }


  let mainContainerForUserInput = newElement('div', userSelectionContainer, {
    classList: ['mainContainerForUserInput'],
    id: 'mainContainerForUserInput',
  });

  for (let i = 0; Config.Footer.length > i; i++) {
    let footerColumn = newElement('div', footerContainer, {
      classList: [
        'footerColumn',
        'footerButtons',
        'flexRow',
        'flexCenterY',
      ],
    });
    for (let j = 0; Config.Footer[i].length > j; j++) {
      let footerButton = newElement('div', footerColumn, {
        classList: ['footerButton'],
      });
      if (Config.Footer[i][j].showIcon) {
        let footerButtonIcon = newElement('div', footerButton, {
          classList: ['footerButtonIcon'],
        });
        footerButtonIcon.innerHTML = `<i class = "${Config.Footer[i][j].icon}"></i>`;
      }
      if (Config.Footer[i][j].showText) {
        let footerButtonText = newElement('div', footerButton, {
          classList: ['footerButtonText'],
        });
        footerButtonText.innerHTML = Config.Footer[i][j].name;
      }
      if (Config.Footer[i][j].name) {
      footerButton.onclick = function () {
        if (Config.Footer[i][j].isSubmit) {
          let retvals = {};
          let missingRequired = [];
          let alloptions = document.getElementsByClassName('dataoption');
          for (let i = 0; alloptions.length > i; i++) {
            let option = alloptions[i];
            if (option.isRequired && option.value == '') {
              missingRequired.push(option.id);
            }
            if (option.type == 'checkbox') {
              retvals[option.id] = option.checked;
            } else {
              retvals[option.id] = option.value;
            }
          }
          if (!missingRequired[0]) {
            sendToGame({ event: "Submit", params: retvals });
            return
          } else {

            for (let i = 0; missingRequired.length > i; i++) {
              let element = document.getElementById(missingRequired[i]);

              element.classList.add('stillrequired');
              element.onchange = function () {
                element.classList.remove('stillrequired');
              }
              element.onkeydown = function () {
                element.classList.remove('stillrequired');
              }
              if (element.parentNode.parentNode.classList.contains('hidden')) {

                prevCategoryButton.classList.add('stillrequired');
                nextCategoryButton.classList.add('stillrequired');
                setTimeout(function () {
                  prevCategoryButton.classList.remove('stillrequired');
                  nextCategoryButton.classList.remove('stillrequired');
                }, 1000);
              }
            }
            return
          }
        }

        sendToGame({ event: Config.Footer[i][j].event, params: Config.Footer[i][j].params });
      }
    }
    }
  }
  setUp()
  loadCategoryInfo(Config.Body[0]);
}