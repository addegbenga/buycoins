const token = "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";

const searchRepo = document.querySelector(".search-repo");

const dice = 5;

searchRepo.addEventListener("change", (e) => {
  const user = e.target.value;
  fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `bearer ${token}`,
    },
    body: JSON.stringify({
      query: `
        query($user:String!) 
            {
                user(login:$user) {
                  repositories(first: 50, isFork: false) {
                    nodes {
                      name
                      url
                    }
                  }
                }
              }
                `,
      variables: { user },
    }),
  })
    .then((data) => data.json())
    .then((data) => console.log(data));
  e.target.value = "";
});
