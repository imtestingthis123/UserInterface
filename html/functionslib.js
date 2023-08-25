const newElement = (type, parent, other, label) => {
  if (label) {
    const labelElement = document.createElement('div');
    labelElement.innerHTML = label;
    if (other && other.id) {
      labelElement.id = other.id + 'Label';
    }
    parent.append(labelElement);
  }
  const element = document.createElement(type);
  parent.append(element);
  if (other) {
    for (const [key, value] of Object.entries(other)) {
      if (key == 'classList') {
        for (let i = 0; value.length > i; i++) {
          element.classList.add(value[i]);
        }
      } else {
        element[key] = value;
      }
    }
  }
  return element;
}

const sendToGame = (data) => {

  fetch(`https://${GetParentResourceName()}/retvals`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  });
}