// details
details = document.getElementById("details");
if (window.location.search.slice(5)) {
  details.textContent = `Your usage time for ${window.location.search.slice(
    5
  )} is over,You can acces this site tommorrow`;
  details.innerHtml = `Your usage time for ${window.location.search.slice(
    5
  )} is over,You can acces this site tommorrow`;
} else {
  details.textContent =
    "You are exceeding your tab limit,Please close unused tabs or increase tab limit to open new tab";
}
