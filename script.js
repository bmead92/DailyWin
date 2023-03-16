const api_url = "https://api.quotable.io/random";

document.onload = setUp();

/* Method for setting up the webpage */
function setUp() {
  todaysDate();
  trackStreak();
  getQuotesAPI(api_url);
}

/* Method for getting the date */
function todaysDate() {
  const header = document.getElementById("header");
  let fullDate = new Date();
  let date = fullDate.getDate();
  let month = fullDate.getMonth();
  let year = fullDate.getFullYear();
  header.innerHTML = `
  Daily Task List for ${date}-${month + 1}-${year}
  `;
}

/* Method for tracking how many days in a row the user has logged in */
function trackStreak() {
  // track daily streak somewhere
  var user_daily_streak = 0;
  user_daily_streak++;
  const task_streak_counter = document.getElementById("streak_counter");
  task_streak_counter.innerHTML = `
  Login Streak: ${user_daily_streak}
  `;
}

const add_task_button = document.getElementById("add_task_button");
add_task_button.onclick = function () {
  /* Create a form to fill out, make it a task */
};

/* Method for getting the quote of the day */
function getQuotesAPI(url) {
  const quote = document.getElementById("quote");
  fetch(url)
    .then((res) => res.json())
    .then(
      (data) =>
        (quote.innerHTML = `
    ${data.content} 
    -${data.author}
        `)
    );
}
