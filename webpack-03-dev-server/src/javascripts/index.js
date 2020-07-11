import { sayHello } from "./greeting";
// import '../stylesheets/lib.scss';
import style from "CssFolder/lib.scss";

import $ from "jquery";
import "bootstrap";
import "jquery-ui";
import "jquery-ui/ui/widgets/datepicker";
import "jquery-ui/ui/widgets/draggable";
import "jquery-ui/ui/widgets/droppable";

import Quill from "quill";

var quill = new Quill("#editor", {
  theme: "snow",
});

$("#datepicker").datepicker();

if (module.hot) {
  module.hot.accept(function (err) {
    console.log(err);
  });
}

sayHello();

$("body").append(
  `<div style="background:red;padding:10px;">Hello jQuery!</div>
  <a href="#" class="btn btn-primary" >button</a>

  <button type="button" class="btn btn-secondary" data-toggle="tooltip" data- placement="top" title="Tooltip on top">Tooltip on top</button>
  `
);

$('[data-toggle="tooltip"]').tooltip();


// Lazy loading
setTimeout(() => {
  const textArea = document.createElement("textarea");
  textArea.setAttribute("id", "ckeditor");
  document.querySelector("body").appendChild(textArea);

  if (document.getElementById("ckeditor")) {
    // When using import() on es6 modules, you must reference the .default property as it's the actual module object that will be returned when the promise is resolved.
    import("@ckeditor/ckeditor5-build-classic").then(function (ClassicEditor) {
      ClassicEditor.default
        .create(document.querySelector("#ckeditor"))
        .then((editor) => {
          console.log(editor);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }
}, 5000);
