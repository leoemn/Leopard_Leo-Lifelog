document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('daily-log-form');

    // Auto-fill today's date
  const logDateInput = document.getElementById("log-date");
  const today = new Date().toISOString().split("T")[0];
  logDateInput.value = today;

  // Auto-fill work hours if day off is selected
  const workDayRadio = form.querySelector('input[value="workday"]');
  const dayOffRadio = form.querySelector('input[value="dayoff"]');
  const workHoursInput = form.querySelector('input[name="workhours"]');

  dayOffRadio.addEventListener('change', () => {
    if (dayOffRadio.checked) {
      workHoursInput.value = "N/A";
      workHoursInput.readOnly = true;
    }
  });

  workDayRadio.addEventListener('change', () => {
    if (workDayRadio.checked) {
      workHoursInput.value = "";
      workHoursInput.readOnly = false;
    }
  });
  
    form.addEventListener('submit', function (event) {
      event.preventDefault(); // Stop form from refreshing the page
  
      // Step 1: Grab the date
      const logDate = document.getElementById('log-date').value;
  
      // Step 2: Collect all tasks
      const taskCheckboxes = form.querySelectorAll('input[name="tasks"]:checked');
      const tasksCompleted = Array.from(taskCheckboxes).map(cb => cb.value);
  
      // Step 3: Work Info
      const workType = form.querySelector('input[name="worktype"]:checked')?.value || "";
      const workHours = form.querySelector('input[name="workhours"]').value;
  
      // Step 4: Mood, Energy, Focus
      const mood = form.querySelector('input[name="mood"]').value;
      const energy = form.querySelector('input[name="energy"]').value;
      const focus = form.querySelector('input[name="focus"]').value;
  
      // Step 5: Time
      const wakeup = form.querySelector('input[name="wakeup"]').value;
      const sleeptime = form.querySelector('input[name="sleeptime"]').value;
  
      // Step 6: Notes
      const notes = form.querySelector('textarea[name="notes"]').value;
  
      // Step 7: Create data object
      const logData = {
        date: logDate,
        tasksCompleted,
        workType,
        workHours,
        mood,
        energy,
        focus,
        wakeup,
        sleeptime,
        notes
      };
  
      // Step 8: Save to localStorage
      localStorage.setItem(`log-${logDate}`, JSON.stringify(logData));
  
      // Just show it in console for now
      console.log("Log saved:", logData);
      alert("Log saved for " + logDate + "! 🦁");
    });
  });
  