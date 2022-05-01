import fetch from "node-fetch";

const url = "https://api.github.com/users/Melderey";

const getUser = async (url) => {
  const response = await fetch(url);
  const result = await response.json();

  return result;
};

console.log(getUser(url).then((data) => console.log(data)));
