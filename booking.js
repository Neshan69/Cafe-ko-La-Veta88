const form = document.getElementById("bookingForm");
const list = document.getElementById("bookingList");

window.onload = function () {
  displayBookings();
};

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const booking = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    guests: document.getElementById("guests").value,
    table: document.getElementById("tableType").value,
    date: document.getElementById("date").value,
    time: document.getElementById("time").value,
  };

  // 🚫 validation (table size vs guests)
  if (booking.guests > booking.table) {
    alert("Table too small for guests!");
    return;
  }

  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  bookings.push(booking);
  localStorage.setItem("bookings", JSON.stringify(bookings));

  displayBookings();
  form.reset();
});

function displayBookings() {
  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  list.innerHTML = "";

  bookings.forEach((b, index) => {
    list.innerHTML += `
      <tr>
        <td>${b.name}</td>
        <td>${b.email}</td>
        <td>${b.guests}</td>
        <td>${b.table}</td>
        <td>${b.date}</td>
        <td>${b.time}</td>
        <td><button class="delete-btn" onclick="deleteBooking(${index})">Delete</button></td>
      </tr>
    `;
  });
}

function deleteBooking(index) {
  let bookings = JSON.parse(localStorage.getItem("bookings"));
  bookings.splice(index, 1);
  localStorage.setItem("bookings", JSON.stringify(bookings));
  displayBookings();
}