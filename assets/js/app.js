//import moment from 'moment';

//const moment = require("moment");

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBtiC69qsTTJEOej-Ev1-q2b6ja-MhfL3s",
  authDomain: "cypher-61788.firebaseapp.com",
  databaseURL: "https://cypher-61788.firebaseio.com",
  projectId: "cypher-61788",
  storageBucket: "cypher-61788.appspot.com",
  messagingSenderId: "695203959830",
  appId: "1:695203959830:web:f5eb475d5c55fdbb8b5137",
  measurementId: "G-CL5K1Q13FB",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

db = firebase.firestore();

$("form.php-email-form").submit(function (e) {
  e.preventDefault();

  var f = $(this).find(".form-group"),
    ferror = false,
    emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

  f.children("input").each(function () {
    // run all inputs

    var i = $(this); // current input
    var rule = i.attr("data-rule");

    if (rule !== undefined) {
      var ierror = false; // error flag for current input
      var pos = rule.indexOf(":", 0);
      if (pos >= 0) {
        var exp = rule.substr(pos + 1, rule.length);
        rule = rule.substr(0, pos);
      } else {
        rule = rule.substr(pos + 1, rule.length);
      }

      switch (rule) {
        case "required":
          if (i.val() === "") {
            ferror = ierror = true;
          }
          break;

        case "minlen":
          if (i.val().length < parseInt(exp)) {
            ferror = ierror = true;
          }
          break;

        case "email":
          if (!emailExp.test(i.val())) {
            ferror = ierror = true;
          }
          break;

        case "checked":
          if (!i.is(":checked")) {
            ferror = ierror = true;
          }
          break;

        case "regexp":
          exp = new RegExp(exp);
          if (!exp.test(i.val())) {
            ferror = ierror = true;
          }
          break;
      }
      i.next(".validate")
        .html(
          ierror
            ? i.attr("data-msg") !== undefined
              ? i.attr("data-msg")
              : "wrong Input"
            : ""
        )
        .show("blind");
    }
  });
  f.children("textarea").each(function () {
    // run all inputs

    var i = $(this); // current input
    var rule = i.attr("data-rule");

    if (rule !== undefined) {
      var ierror = false; // error flag for current input
      var pos = rule.indexOf(":", 0);
      if (pos >= 0) {
        var exp = rule.substr(pos + 1, rule.length);
        rule = rule.substr(0, pos);
      } else {
        rule = rule.substr(pos + 1, rule.length);
      }

      switch (rule) {
        case "required":
          if (i.val() === "") {
            ferror = ierror = true;
          }
          break;

        case "minlen":
          if (i.val().length < parseInt(exp)) {
            ferror = ierror = true;
          }
          break;
      }
      i.next(".validate")
        .html(
          ierror
            ? i.attr("data-msg") != undefined
              ? i.attr("data-msg")
              : "wrong Input"
            : ""
        )
        .show("blind");
    }
  });
  if (ferror) return false;

  var this_form = $(this);
  var action = $(this).attr("action");

  /*if( ! action ) {
      this_form.find('.loading').slideUp();
      this_form.find('.error-message').slideDown().html('The form action property is not set!');
      return false;
    }*/

  this_form.find(".sent-message").slideUp();
  this_form.find(".error-message").slideUp();
  this_form.find(".loading").slideDown();

  /*if ( $(this).data('recaptcha-site-key') ) {
      var recaptcha_site_key = $(this).data('recaptcha-site-key');
      grecaptcha.ready(function() {
        grecaptcha.execute(recaptcha_site_key, {action: 'php_email_form_submit'}).then(function(token) {
          php_email_form_submit(this_form,action,this_form.serialize() + '&recaptcha-response=' + token);
        });
      });
    } else {
      php_email_form_submit(this_form,action,this_form.serialize());
    }*/

  createCita();

  return true;
});

function login() {}

function createCita() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let date = document.getElementById("date").value;
  let day = document.getElementById("day").value;
  let month = document.getElementById("month").value;
  let year = document.getElementById("year").value;
  let time = document.getElementById("time").value;
  let message = document.getElementById("message").value;

  if (name.length > 0) {
    db.collection("messages")
      .add({
        name: name,
        email: email,
        phone: phone,
        date: date,
        year: parseInt(year),
        month: parseInt(month),
        day: parseInt(day),
        message: message,
      })
      .then(() => {
        viewAlert(
          "¡GRACIAS!",
          "Hemos agendado una cita para ti, te llegara un correo de confirmación, gracias por su preferencia.",
          "success"
        );
      })
      .catch((error) => {
        viewAlert(
          "ERROR",
          "Rayosss..., algo a salido mal, intente nuevamente porfavor.",
          "error"
        );
      });
  }
}

function openCalendar() {
  document.getElementById("blockCalendar").style.display = "flex";
}

function viewAlert(title, message, type) {
  Swal.fire(title, message, type);
}
