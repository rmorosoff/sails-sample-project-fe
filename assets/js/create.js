/**
 * Use the jQuery Validate plugin to add validation to the form
 *
 * Here's what this you will need to do:
 *
 * 1. Include the following jQuery Validate JavaScript in layout.ejs
 *    <script type="text/javascript" src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.15.0/jquery.validate.min.js"></script>
 *
 * 2. Use jQuery validate and add validation to the form with the following requirements
 *    First Name - required, at least 2 characters
 *    Last Name  - required, at least 2 characters
 *	  start_date - make sure date is yyyy-mm-dd
 *	  ADD any other validation that makes you happy
 *
 * 3. Use a custom message for one validation
 *
 * 4. Make the color of the error text red
 *
 *
 *
 * Here's the documentation you need:
 * https://jqueryvalidation.org/validate/
 * https://jqueryvalidation.org/documentation/#link-list-of-built-in-validation-methods
 *
 */

(function() {

  $(function() {


    $("#addStudentForm").validate({
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

  })

})();
