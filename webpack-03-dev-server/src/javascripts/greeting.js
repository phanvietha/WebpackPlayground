import $ from 'jquery';

function sayHello() {
  let tool = "webpack";
  $('body').append('<div style="background:#EEE;">does jQuery exist here?</div>');
}
export { sayHello };
