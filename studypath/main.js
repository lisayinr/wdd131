const assignments = [
  { title: "Math Homework 5", course: "Math 108", completed: false },
  { title: "History Discussion Post", course: "History 201", completed: true },
  { title: "Science Lab Report", course: "Biology 110", completed: false },
  { title: "English Reading Notes", course: "English 150", completed: false }
];

function displayAssignments(list) {
  const container = document.querySelector("#assignmentList");
  const message = document.querySelector("#noResultsMessage");

  if (list.length === 0) {
    container.innerHTML = "";
    message.classList.remove("hidden");
    return;
  }

  message.classList.add("hidden");

  let html = "";

  list.forEach(function (assignment) {
    let cardClass = "";
    let statusClass = "";
    let statusText = "";

    if (assignment.completed === true) {
      cardClass = "completed";
      statusClass = "completed-text";
      statusText = "Completed";
    } else {
      statusClass = "incomplete-text";
      statusText = "Incomplete";
    }

    html += `
      <article class="assignment-card ${cardClass}">
        <h3>${assignment.title}</h3>
        <p><strong>Course:</strong> ${assignment.course}</p>
        <p class="status ${statusClass}">
          Status: ${statusText}
        </p>
      </article>
    `;
  });

  container.innerHTML = html;
}

function updateProgress(list) {
  let total = list.length;
  let completed = 0;

  list.forEach(function (assignment) {
    if (assignment.completed === true) {
      completed++;
    }
  });

  let remaining = total - completed;

  document.querySelector("#totalAssignments").textContent = total;
  document.querySelector("#completedAssignments").textContent = completed;
  document.querySelector("#remainingAssignments").textContent = remaining;
}

function filterAssignments() {
  const course = document.querySelector("#courseFilter").value;
  const status = document.querySelector('input[name="status"]:checked').value;

  let filtered = [];

  assignments.forEach(function (assignment) {
    let courseMatch = false;

    if (course === "All") {
      courseMatch = true;
    } else if (assignment.course === course) {
      courseMatch = true;
    }

    let statusMatch = true;

    if (status === "Completed") {
      if (assignment.completed === true) {
        statusMatch = true;
      } else {
        statusMatch = false;
      }
    }

    if (status === "Incomplete") {
      if (assignment.completed === false) {
        statusMatch = true;
      } else {
        statusMatch = false;
      }
    }

    if (courseMatch && statusMatch) {
      filtered.push(assignment);
    }
  });

  displayAssignments(filtered);
  updateProgress(filtered);
}

function loadCourses() {
  const select = document.querySelector("#courseFilter");

  let courses = [];

  assignments.forEach(function (assignment) {
    if (!courses.includes(assignment.course)) {
      courses.push(assignment.course);
    }
  });

  courses.forEach(function (course) {
    const option = document.createElement("option");
    option.value = course;
    option.textContent = course;
    select.appendChild(option);
  });
}

loadCourses();
displayAssignments(assignments);
updateProgress(assignments);

document.querySelector("#filterBtn").addEventListener("click", filterAssignments);