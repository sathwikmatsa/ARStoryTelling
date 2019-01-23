let objects = ['a-sphere', 'a-cylinder', 'a-plane', 'a-box'];
let iter = 0;

function changeObject(){
  console.log('state change');
  let prev = document.getElementById("target");
  let change = document.createElement(objects[(iter++)%4]);
  let index;

  // Copy the children
  while (prev.firstChild) {
      change.appendChild(prev.firstChild); // *Moves* the child
  }

  // Copy the attributes
  for (index = prev.attributes.length - 1; index >= 0; --index) {
      change.attributes.setNamedItem(prev.attributes[index].cloneNode());
  }

  // Replace it
  prev.parentNode.replaceChild(change, prev);
  document.getElementsByTagName('title')[0].innerText = change.tagName;
}

let m = document.querySelector("a-marker");
//m.addEventListener("markerFound", changeObject);
m.addEventListener("markerLost", changeObject);
