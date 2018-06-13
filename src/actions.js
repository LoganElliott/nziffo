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
      return data;
    }
    console.log("Unable to get movies,", data.message);
    return [];
  } catch (e) {
    console.log("Unable to get movies", e);
  }
};
