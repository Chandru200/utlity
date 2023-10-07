import React, { useEffect } from "react";
import "jquery-datetimepicker/jquery.datetimepicker.css"; // Import the CSS
import "jquery-datetimepicker";
import $ from "jquery";
function DateTimePicker() {
  useEffect(() => {
    // Initialize the date and time picker when the component mounts
    $("#datetimepicker").datetimepicker();
  }, []);

  return (
    <div>
      <input type="text" id="datetimepicker" />
    </div>
  );
}

export default DateTimePicker;
