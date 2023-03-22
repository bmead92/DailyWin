const quotes_api_url = "https://api.quotable.io/random";
const number_of_photos = 20;
const unsplash_api_url = "https://api.unsplash.com/photos/";
const unsplash_access_key = "YjSH_enuPwnF_m61VtLbNdmyI12J5DtWCJHbyq7iJ8c";
const quote_element = document.getElementById("quote");
const add_task_button = document.getElementById("add_task_button");
const progress_bar = document.getElementById("progress_bar");
const default_bg = "./default_bg.png";
var user_daily_streak = 0;
var task_counter = 0;
var tasks_completed = 0;
const max_tasks = 5;
const min_tasks = 0;
var task_elements = [];

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
  todays_date();
  track_streak();
  fill_quote_element(await get_API(quotes_api_url));
  fill_background(
    await get_API(
      `
      ${unsplash_api_url}?query=pastel&count=${number_of_photos}&client_id=${unsplash_access_key}
      `
    )
  );
  get_player_exp();
  get_player_level();
}

/* Method for getting the date */
function todays_date() {
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
function track_streak() {
  // track daily streak somewhere
  user_daily_streak++;
  const task_streak_counter = document.getElementById("streak_counter");
  // if user has a day streak greater than 1, add an s
  user_daily_streak > 1 ? (s = "s") : (s = "");
  task_streak_counter.innerHTML = `
  Login Streak: ${user_daily_streak} day${s}!
  `;
}

/* Method for adding functionality to the checkbox items in the to-do list */
function update_progress_bar() {
  console.log(
    `Tasks completed = ${tasks_completed} of ${task_elements.length}`
  );
  const percentage = (tasks_completed / task_counter).toFixed(2) * 100;
  progress_bar.textContent = `${percentage}%`;
  progress_bar.style = `width:${percentage}%`;
  progress_bar.ariaValueNow = `${percentage}`;
}

add_task_button.onclick = function () {
  // Create a form to fill out
  const html_to_add = `
  <form id="task_form">
    <div class="form-group">
      <label for="task_form">What task do you want to add to your to-do list?</label>
      <input type="text" class="form-control" id="task" placeholder="Example: Do the dishes">
    </div>
  </form>
  `;
  // Add form to section below button
  document.getElementById("form_div").innerHTML = html_to_add;

  const task_form = document.getElementById("task_form");
  const to_do_list = document.getElementById("to_do_list");
  const task = document.getElementById("task");
  // When submit event happens, take user input and add it to the to-do list
  task_form.addEventListener("submit", (event) => {
    task_counter++;
    to_do_list.innerHTML += `
    <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value="${task_counter}"
            id="item_${task_counter}">
          <label class="form-check-label" for="item_${task_counter}">
          <span id="label_${task_counter}"> ${task.value} </span>
          </label>
        </div>
    `;
    task_form.style.display = "none";
    task_elements[task_counter - 1] = document.getElementById(
      `item_${task_counter}`
    );
    event.preventDefault();
  });
};

const to_do_list = document.getElementById("to_do_list");
to_do_list.addEventListener("change", () => {
  console.log(task_elements);

  // when a checkbox is selected, cross out the text
  // update the progress bar
  // when a check is unchecked, uncross the text
  // update the progress bar
});

// task_elements.forEach((element) => {
//   element_label_text_field = document.getElementById(
//     `label_${element.value}`
//   );
// });
// if (element.checked) {
//   // strike through
//   element_label_text_field.style.textDecoration = "line-through";
//   element_label_text_field.style.textDecorationThickness = "33%";
//   console.log(`Item ${element.value} checked`);
//   tasks_completed++;
// } else {
//   // unstrike
//   element_label_text_field.style.textDecoration = "none";
//   console.log(`Item ${element.value} not checked`);
//   tasks_completed--;
// }
// console.log("\n");
// console.log(element_label_text_field);
// // update progress bar
// update_progress_bar();

/* Method for API fetch requests */
async function get_API(url) {
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

/* Method for changing the background */
function fill_background(json) {
  var index = Math.floor(Math.random() * number_of_photos);
  try {
    const background_img_url = json[index].urls.full;
    document.body.style.backgroundImage = "url('" + background_img_url + "')";
  } catch (undefined) {
    document.body.style.backgroundImage = "url('" + default_bg + "')";
  }
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
