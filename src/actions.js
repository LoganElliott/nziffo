import ReactGA from "react-ga";
const apiEndpoint = "https://nzff-backend.herokuapp.com/api/nzfforg/wishlist";

export const fetchMovies = async wishListId => {
  if (!wishListId) {
    return;
  }

  let data;
  try {
    let myHeaders = new Headers();
    myHeaders.append("Access-Control-Allow-Origin", "*");
    myHeaders.append("Access-Control-Allow-Methods", "*");

    const myInit = {
      method: "GET",
      headers: myHeaders
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
    return [];
  } catch (e) {
    ReactGA.event({
      category: "Main page",
      action: "Get Movies",
      label: "Failed"
    });
    console.log("Unable to get movies", e);
  }
};
