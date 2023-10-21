import React, { useState } from "react";
import { StyledLS } from "./styles/styleLimitSites.style";
import WebsiteStats from "./WebsiteStats";
import SetWebsiteLimit from "./SetWebsiteLimit";
export default function LimitWebsite({ canShowApp }) {
  const [options, setOptions] = useState("stats");
  return (
    <StyledLS id="limitwebsite">
      <div className="tabname">Limit Website Urls</div>
      <div className="options-wrapper">
        <div
          onClick={() => setOptions("stats")}
          className={`options ${options === "stats" && "selected"}`}
        >
          Website Usage Statistics
        </div>
        <div
          onClick={() => setOptions("limits")}
          className={`options ${options === "limits" && "selected"}`}
        >
          Set Website Limit
        </div>
      </div>
      <div className="content-weblimit">
        {options === "stats" ? (
          canShowApp.view_time ? (
            <WebsiteStats viewTime={canShowApp.view_time} />
          ) : (
            <div>No data recorded.Please refresh</div>
          )
        ) : (
          <SetWebsiteLimit website_time_limit={canShowApp.website_time_limit} />
        )}
      </div>
    </StyledLS>
  );
}
