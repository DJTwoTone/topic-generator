document.addEventListener('DOMContentLoaded', function() {
    // Whimsical topics
    const topics = [
      "If cats ruled the world, what laws would they make?",
      "Would dragons make good pets?",
      "What's the most underrated ice cream flavor?",
      "If you could replace rain with any object, what would it be?",
      "Which mythical creature would you invite to a dinner party?",
      "Are unicorns secretly real and hiding somewhere?",
      "Convince me that being invisible isn't actually useful.",
      "Which fruit would win in a battle royale?",
      "If your pet could talk, what secrets would they reveal?",
      "Would life be better if everyone wore costumes daily?",
      "What’s the best snack for an astronaut to take to space?",
      "If vegetables were sentient, would vegetarians reconsider?",
      "What's the strangest thing you could find at the end of a rainbow?",
      "Would you rather swim in a pool of chocolate or marshmallows?",
      "Which movie would be improved by adding dinosaurs?",
      "What's the worst thing to accidentally shrink to miniature size?",
      "Would pirates or ninjas throw better parties?",
      "Is it better to explore space or the bottom of the ocean?",
      "What happens if gravity suddenly stops for a day?",
      "Convince us that socks and sandals is a good fashion choice.",
      "Would you rather have spaghetti hair or pancake hands?",
      "If you had to live inside a board game, which one would it be?",
      "What's the most annoying superpower someone could have?",
      "If animals wore clothes, which would be most fashionable?",
      "Should dessert always come before dinner?",
      "Is it weirder to talk to your plants or to your furniture?",
      "If robots took over the world, what jobs would humans have left?",
      "Would clouds taste like cotton candy or marshmallows?",
      "What would happen if the moon was made of cheese?",
      "Which everyday item would be hilarious if it screamed when you used it?",
      "Would it be fun or terrifying if toys came to life at night?",
      "What would be the best animal to scale up to elephant size?",
      "If you could have any animal's abilities, which would you choose?",
      "Would a mermaid or centaur win in a race?",
      "If you were a ghost, who would you haunt and why?",
      "What would be the funniest thing to fill a piñata with besides candy?",
      "If you could invent a new holiday, what would it celebrate?",
      "Would you rather ride a giant snail or a tiny elephant?",
      "What’s a better mode of transport: magic carpet or flying broomstick?",
      "If vegetables tasted like candy, would people eat them more?",
      "Which animal would throw the best birthday party?",
      "Would you rather live underwater or in the clouds?",
      "If your life had background music, what genre would it be?",
      "What's the funniest sport that doesn’t exist yet?",
      "If you could have one conversation with a historical figure, who and why?",
      "What’s the silliest Olympic sport you could invent?",
      "Would it be better if everyone spoke only in song?",
      "Which fictional world would you most like to vacation in?",
      "Would cookies or donuts make better currency?",
      "If animals had a talent show, who would win first place?"
    ];
  
    // Characters for random flip (letters, numbers, and symbols)
    const possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    function randomChar() {
      return possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
    }
  
    const topicElement = document.getElementById('topic');
    const generateButton = document.getElementById('generate');
  
    generateButton.addEventListener('click', function() {
      // Pick a random topic
      const finalText = topics[Math.floor(Math.random() * topics.length)];
      
      // Clear any previous content
      topicElement.innerHTML = '';
      
      // Arrays to hold the individual box elements and lock status
      const boxes = [];
      const locked = [];
      
      // Split the topic into words
      const words = finalText.split(' ');

      // Create a container for each word
      words.forEach((word, wordIndex) => {
        const wordContainer = document.createElement('span');
        wordContainer.classList.add('word-box');

        // Create a box for each character in the word
        for (let i = 0; i < word.length; i++) {
          const span = document.createElement('span');
          span.classList.add('letter-box');
          span.textContent = randomChar();
          locked.push(false);
          boxes.push(span);
          wordContainer.appendChild(span);
        }

        // Add a space after the word unless it's the last word
        if (wordIndex < words.length - 1) {
          const space = document.createElement('span');
          space.classList.add('letter-box', 'locked');
          space.textContent = '\u00A0'; // Non-breaking space
          locked.push(true);
          boxes.push(space);
          wordContainer.appendChild(space);
        }

        topicElement.appendChild(wordContainer);
      });

      // Update all unlocked boxes with a random character every 50ms
      const updateInterval = setInterval(() => {
        boxes.forEach((box, index) => {
          if (!locked[index] && box.textContent !== ' ') {
            box.textContent = randomChar();
          }
        });
      }, 50);

      // Get indices of boxes that are not spaces to lock them in random order
      const indices = [];
      for (let i = 0; i < locked.length; i++) {
        if (!locked[i]) {
          indices.push(i);
        }
      }
      // Shuffle the indices array
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }

      // For each index, schedule a timeout to lock in that letter at a random delay
      indices.forEach((index) => {
        const delay = 500 + Math.random() * 1000; // delay between 500ms and 1500ms
        setTimeout(() => {
          locked[index] = true;
          // Update the box with the final letter
          boxes[index].textContent = finalText[boxes.indexOf(boxes[index])];
          // Add the locked class to trigger the flip animation
          boxes[index].classList.add('locked');

          // Clear the update interval once all letters are locked
          if (locked.every(val => val)) {
            clearInterval(updateInterval);
          }
        }, delay);
      });
    });
  });
