import React, { useEffect, useState } from "react";
import DateTimePicker from "./dateTimePicker";
import { OpenPopUp } from "../components/Popup/popup";
import { notifyBackgroundPage } from "../message";

export default function WebsiteStats({ viewTime }) {
  const [statsDate, setDate] = useState({
    duedate: new Date().toISOString().split("T")[0].replaceAll("-", "/"),
  });
  const [getData, setGetData] = useState(false);
  function toTime(seconds) {
    var date = new Date(null);
    date.setSeconds(seconds);
    return date.toISOString().substr(11, 8);
  }
  function formTimeDate(time) {
    const constant = {
      0: "hr",
      1: "min",
      2: "sec",
    };
    let str = "";
    const time_split = time.split(":");
    for (var i = 0; i < time_split.length; i++) {
      if (time_split[i] != "00") {
        str = `${str} ${time_split[i]}${constant[i]}`;
      }
    }
    return str.trim();
  }
  function formArray(obj) {
    const sortedObj = Object.fromEntries(
      Object.entries(obj).sort(([, valueA], [, valueB]) => valueB - valueA)
    );
    let array = [];
    for (let key in sortedObj) {
      let newobj = {
        url: key,
        time: formTimeDate(toTime(sortedObj[key])),
      };
      array.push(newobj);
    }
    return array;
  }
  viewTime = viewTime && formArray(viewTime);
  useEffect(() => {
    setGetData(false);
  }, [viewTime]);
  useEffect(() => {
    getData && notifyBackgroundPage("get_usage_details", statsDate.duedate);
  }, [getData]);
  const openPopup = (e) => {
    OpenPopUp({
      elementID: "limitwebsite",
      textcomponent: {
        header: "Select date you want",
        yes: "Get Stats",
        no: "Cancel",
      },
      PopupComponent: () => {
        return (
          <DateTimePicker
            placeholder="Date"
            ChangeParentState={setDate}
            ParentState={statsDate}
            dontShowTime={true}
          />
        );
      },
      onYes: () => {
        setGetData(true);
      },
    });
  };
  return (
    <div className="weblimit-wrapper">
      <div className="head">
        Website Usage for <span>{statsDate.duedate}</span>
        <div className="edit-wrap">
          <img
            src={chrome.runtime.getURL("assests/images/edit.png")}
            onClick={openPopup}
          ></img>
        </div>
      </div>

      <div className="stats-tab">
        {viewTime.length > 0 ? (
          viewTime.map((data) => {
            return (
              data.url && (
                <div key={data.url} className="stats-wrapper">
                  {data.url}:<span>{data.time}</span>
                </div>
              )
            );
          })
        ) : (
          <div className="emptystate">No data found</div>
        )}
      </div>
    </div>
  );
}
