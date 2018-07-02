import ReactGA from "react-ga";
const apiEndpoint = "https://nzff-backend.herokuapp.com/wishlist";

export const fetchMovies = async (wishListId, filters) => {
  if (!wishListId) {
    return;
  }

  const updatedFilters = Object.values(filters).map(filter => ({
    ...filter,
    day: filter.day.toUpperCase(),
    from: filter.from.format("HH:mm:ss"),
    to: filter.to.format("HH:mm:ss"),
    excluded: !filter.included
  }));

  let data;
  try {
    let myHeaders = new Headers();
    myHeaders.append("Access-Control-Allow-Origin", "*");
    myHeaders.append("Access-Control-Allow-Methods", "*");
    myHeaders.append("Content-Type", "application/json");

    const myInit = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(updatedFilters)
    };
    const myRequest = new Request(`${apiEndpoint}?id=${wishListId}`, myInit);
    let response = await fetch(myRequest);
    data = await response.json();

    if (response.ok) {
      ReactGA.event({
        category: "Main page",
        action: "Get Movies",
        label: "Success"
      });
      return data;
    }
    ReactGA.event({
      category: "Main page",
      action: "Get Movies",
      label: "Failed"
    });
    console.log("Unable to get movies,", data.message);
    return null;
  } catch (e) {
    ReactGA.event({
      category: "Main page",
      action: "Get Movies",
      label: "Failed"
    });
    console.log("Unable to get movies", e);
    return null;
  }
};
