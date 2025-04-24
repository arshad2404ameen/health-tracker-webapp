document.getElementById("healthForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const mood = parseInt(document.getElementById("mood").value);
  const water = parseInt(document.getElementById("water").value);
  const sleep = parseFloat(document.getElementById("sleep").value);

  let advice = [];

  // Mood advice
  if (mood >= 8) {
    advice.push("You're in a great mood today! Keep spreading positivity.");
  } else if (mood >= 5) {
    advice.push("You're doing okay. Try some deep breathing or a quick walk.");
  } else {
    advice.push("Low mood detected. Consider talking to a friend or writing your thoughts down.");
  }

  // Water advice
  if (water >= 8) {
    advice.push("Great job staying hydrated today!");
  } else if (water >= 5) {
    advice.push("Not bad, but try to drink a bit more water.");
  } else {
    advice.push("You need to drink more water to stay healthy. Aim for 8+ glasses.");
  }

  // Sleep advice
  if (sleep >= 8) {
    advice.push("You got enough sleep. That’s fantastic for your health.");
  } else if (sleep >= 6) {
    advice.push("Your sleep is okay, but try to get a bit more rest.");
  } else {
    advice.push("Low sleep hours. Try to prioritize rest tonight.");
  }

  // Combined advice
  if (mood < 5 && sleep < 6) {
    advice.push("Poor sleep can affect your mood. Consider winding down early tonight.");
  }

  if (mood >= 8 && water >= 8 && sleep >= 8) {
    advice.push("You're doing awesome! Keep up the great habits.");
  }

  advice.push("Remember: Small steps lead to big changes. Keep tracking daily!");

  // Doctor consultation advice
  if (mood < 5) {
    advice.push("Your mood suggests you may benefit from speaking with a **mental health professional** (Psychologist, Counselor, or Psychiatrist).");
  }

  if (water < 5) {
    advice.push("Low hydration levels may be a concern. You should consider consulting a **general practitioner (GP)** or a **nutritionist** for guidance.");
  }

  if (sleep < 6) {
    advice.push("Insufficient sleep could indicate a sleep disorder. It might be helpful to consult a **sleep specialist** or a **general practitioner (GP)**.");
  }

  advice.push("Consulting a doctor for personalized health advice is always a great step toward improving your well-being.");

  // Display the advice
  const resultElement = document.getElementById("result");
  resultElement.innerHTML = advice.map(line => `<li>${line}</li>`).join("");

  // Save to localStorage
  const todaySummary = {
    mood,
    water,
    sleep,
    advice
  };

  const dateKey = new Date().toISOString().split("T")[0]; // yyyy-mm-dd
  localStorage.setItem(`summary-${dateKey}`, JSON.stringify(todaySummary));
});

// View Previous Summary
document.getElementById("viewPreviousSummary").addEventListener("click", function() {
  const todayDate = new Date().toISOString().split("T")[0]; // yyyy-mm-dd
  let lastSummary = null;

  // Try fetching today's summary
  const todaySummary = localStorage.getItem(`summary-${todayDate}`);
  if (todaySummary) {
    lastSummary = JSON.parse(todaySummary);
  } else {
    // Fallback: Fetch the last available summary (the most recent one)
    const keys = Object.keys(localStorage).filter(key => key.startsWith("summary-"));
    if (keys.length > 0) {
      const latestKey = keys[keys.length - 1]; // Get the most recent summary
      lastSummary = JSON.parse(localStorage.getItem(latestKey));
    }
  }

  // Display previous summary if available
  const previousResultElement = document.getElementById("previousResult");
  if (lastSummary) {
    previousResultElement.innerHTML = `
      <h3>Previous Summary</h3>
      <p><strong>Mood:</strong> ${lastSummary.mood}/10</p>
      <p><strong>Water Intake:</strong> ${lastSummary.water} glasses</p>
      <p><strong>Sleep:</strong> ${lastSummary.sleep} hours</p>
      <ul>
        ${lastSummary.advice.map(line => `<li>${line}</li>`).join("")}
      </ul>
    `;
  } else {
    previousResultElement.innerHTML = "<p>No previous summary found.</p>";
  }
});


  