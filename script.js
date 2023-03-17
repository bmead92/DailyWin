const quotes_api_url = "https://api.quotable.io/random";
const number_of_photos = 20;
const unsplash_api_url = "https://api.unsplash.com/photos/";
const unsplash_access_key = "YjSH_enuPwnF_m61VtLbNdmyI12J5DtWCJHbyq7iJ8c";
const quote_element = document.getElementById("quote");
const add_task_button = document.getElementById("add_task_button");
let background = document.body.background;

const months = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};

document.onload = setUp();

/* Method for setting up the webpage */
async function setUp() {
  todaysDate();
  trackStreak();
  fill_quote_element(await getAPI(quotes_api_url));
  // fill_background(
  //   await getAPI(
  //     `${unsplash_api_url}?query=motivational&count=${number_of_photos}&client_id=${unsplash_access_key}`
  //   )
  // );
  get_player_exp();
  get_player_level();
}

/* Method for getting the date */
function todaysDate() {
  const header = document.getElementById("header");
  let fullDate = new Date();
  let date = fullDate.getDate();
  let month = fullDate.getMonth();
  let year = fullDate.getFullYear();
  header.innerHTML = `
  Daily Task List for ${date}-${months[month + 1]}-${year}
  `;
}

/* Method for tracking how many days in a row the user has logged in */
function trackStreak() {
  // track daily streak somewhere
  var user_daily_streak = 0;
  user_daily_streak++;
  const task_streak_counter = document.getElementById("streak_counter");
  // if user has a day streak greater than 1, add an s
  user_daily_streak > 1 ? (s = "s") : (s = "");
  task_streak_counter.innerHTML = `
  Login Streak: ${user_daily_streak} day${s}!
  `;
}

add_task_button.onclick = function () {
  /* Create a form to fill out, make it a task */
};

/* Method for getting the quote of the day */
async function getAPI(url) {
  let request = await fetch(url);
  let json = await request.json();
  return json;
}

/* Method for dynamically creating the quote element */
function fill_quote_element(json) {
  quote_element.innerHTML = `
    ${json.content}-${json.author}
  `;
}

function fill_background(json) {
  var index = Math.floor(Math.random() * number_of_photos);
  const background_img_url = json[index].urls.full;
  console.log(background_img_url);
  document.body.style.backgroundImage = "url('" + background_img_url + "')";
}

/* Method for tracking player exp */
function get_player_exp() {
  var current_exp_since_previous_level = 0;
  var exp_needed_to_level_up = 100;
  var player_exp = document.getElementById("experience");
  player_exp.innerHTML = `
  Exp: ${current_exp_since_previous_level}/${exp_needed_to_level_up}
  `;
}

/* Method for tracking player level */
function get_player_level() {
  var player_level = 1;
  var player_level_div = document.getElementById("level");
  player_level_div.innerHTML = `
  Level - ${player_level}
  `;
}
