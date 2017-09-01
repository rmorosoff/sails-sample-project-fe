/**
 * Use the jQuery Validate and the bootstrap-select plugin to enhance this page
 *
 * Here's what this you will need to do:
 *
 * 1. When the page is loaded all form fields should be disabled except
 *    for the dropdown to select a student
 *
 * 2. Using the bootstrap-selct plugin render dropdown on the page
 *
 * 3. Use the live search functionality to make the dropdown searchable
 *
 * 4. Add the user glyphicons next to each student in the list
 *
 * 6. Add a menu header to the dropdown
 *
 * 7. Customize further with anything you find intersting
 *
 * 8. When an student is selected the form fields should be enabled
      and populated with the data for the selected student
 *
 * 9. Use jQuery validate and add validation to the form with the following requirements
 *    First Name - required, at least 2 characters
 *    Last Name  - required, at least 2 characters
 *	  start_date - make sure date is yyyy-mm-dd
 *	  ADD any other validation that makes you happy
 *
 * 10. Make the color of the error text red
 *
 *
 *
 * Here's the documentation you need:
 * https://jqueryvalidation.org/validate/
 * https://jqueryvalidation.org/documentation/#link-list-of-built-in-validation-methods
 * https://silviomoreto.github.io/bootstrap-select/
 * https://silviomoreto.github.io/bootstrap-select/examples/
 * http://getbootstrap.com/components/#glyphicons
 * https://api.jquery.com/jQuery.get/
 * http://stackoverflow.com/questions/9807426/use-jquery-to-re-populate-form-with-json-data
 *
 */

(function() {

  $(function() {

    $("#updateStudentForm").validate({
      errorClass: "text-danger",
      rules: {
        // at least 15€ when bonus material is included
        first_name: {
          required: true,
          minlength: 2
        },
        last_name: {
          required: true,
          minlength: 2
        },
        gpa: {
          min: 0,
          max: 5
        },
        sat: {
          min: 0,
          max: 2400
        },
        start_date: {
          dateISO: true
        }
      },
      messages: {
        first_name: {
          minlength: "Please enter at least 2 characters"
        },
        last_name: {
          minlength: "Please enter at least 2 characters"
        },
        gpa: {
          min: "You can't have a negative GPA, dummy",
          max: "Nobody is that smart. 5.0 is the max GPA"
        },
        sat: {
          min: "You can't have a negative SAT, dummy",
          max: "Nobody is that smart. 2400 is the max SAT"
        },
        start_date: {
          dateISO: "Date needs to be in YYYY-MM-DD format"
        }
      }
    });

    // initialize global variable to hold URL with student_id, to be used for update of form
    let passURL;

    // disable form initially
    $("#updateStudentForm :input").prop("disabled", true);

    //  when student_id changes in dropdown, let's populate form with selected student
    $('#student_id').on('change', function() {
      // get the selected student_id
      var selected = $(this).find("option:selected").val();
      //  set global URL variable, we'll need it later
      passURL = `http://localhost:1337/student/${selected}`;
      // issue a get to the API on the selected student_id
      $.get(passURL, function(data) {
        $.each(data, function(name, val) {
          // magic code I stole and think I understand now
          // updates form with oject from get API call
          var $el = $('[name="' + name + '"]'),
            type = $el.attr('type');

          switch (type) {
            case 'checkbox':
              $el.attr('checked', 'checked');
              break;
            case 'radio':
              $el.filter('[value="' + val + '"]').attr('checked', 'checked');
              break;
            default:
              $el.val(val);
          }
        });
      })
      // now we can enable form
      $("#updateStudentForm :input").prop("disabled", false);
    });

    //  On Click event will respond to click on button in form
    $("#updateStudentForm").on("submit", function() {
      var confirmAnswer = confirm("Are you sure you want to update this student?");
      if (confirmAnswer) {
        $.ajax({
          url: passURL,  // this is global URL variable we set when Update button was clicked
          type: 'PUT',
          data: $("#updateStudentForm").serialize()
        });
      }
    })

  })

})();
