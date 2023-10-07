import React, { useEffect } from "react";
import Input from "./Input";
import "jquery-datetimepicker/jquery.datetimepicker.css"; // Import the CSS
import "jquery-datetimepicker";
import $ from "jquery";
function DateTimePicker({ placeholder, ParentState, ChangeParentState }) {
  $(document).ready(function () {
    $("#datetimepicker").datetimepicker({
      format: "d/m/Y h:ia",
      blank: false,
      step: 15,
      onChangeDateTime: function (currentDateTime, $input) {
        ChangeParentState({ ...ParentState, duedate: $input.val() });
      },
      beforeShow: function (input, inst) {
        if (inst.input.val() !== "") {
          inst.input.datetimepicker("setValue", inst.input.val());
        }
      },
      beforeShowDay: function (date) {
        return [true, ""];
      },
    });
    $(".xdsoft_datetimepicker").css("z-index", "11111111");
    if (ParentState.duedate) {
      $("#datetimepicker").val(ParentState.duedate);
    }
  });

  return (
    <div>
      <Input placeholder={placeholder} type="text" id="datetimepicker" />
    </div>
  );
}

export default DateTimePicker;
