const character = {
  name: "Blackreef",
  class: "Warrior",
  level: 1,
  health: 100,
  image: "blackreef.png",

  attacked: function () {
    this.health -= 20;

    if (this.health <= 0) {
      this.health = 0;
      alert(`${this.name} has died.`);
    }

    renderCharacter();
  },

  levelUp: function () {
    this.level += 1;
    renderCharacter();
  }
};

function renderCharacter() {
  document.querySelector("#charName").textContent = character.name;
  document.querySelector("#charClass").textContent = `Class: ${character.class}`;
  document.querySelector("#charLevel").textContent = `Level: ${character.level}`;
  document.querySelector("#charHealth").textContent = `Health: ${character.health}`;

  const img = document.querySelector("#charImage");
  img.setAttribute("src", character.image);
  img.setAttribute("alt", character.name);
}

document.querySelector("#attackBtn").addEventListener("click", function () {
  character.attacked();
});

document.querySelector("#levelUpBtn").addEventListener("click", function () {
  character.levelUp();
});

renderCharacter();