<template>
  <div>
    <ul>
      <li>
        <label for="email">E-Mail: </label>
      </li>
      <li>
        <input type="email" name="email" />
      </li>
      <li>
        <label for="password">Password: </label>
      </li>
      <li>
        <input type="password" name="password" class="last_input" />
      </li>
      <li>
        <standard-button mode="style-accept">{{ buttonText }}</standard-button>
        <standard-button mode="style-cancle" @click="toggleLoginWindow">Cancle</standard-button>
      </li>
      <p class="signup_button" @click="changeToSignup">{{ switchText }}</p>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buttonText: "Log in",
      switchText: "Sign up instead?",
    };
  },
  methods: {
    changeToSignup() {
      if (this.buttonText === "Log in") {
        this.buttonText = "Sign up";
        this.switchText = "Log in instead?";
      } else {
        this.buttonText = "Log in";
        this.switchText = "Sign up instead?";
      }
    },
    toggleLoginWindow() {
      this.$store.commit("autenticatingSwitch");
    },
  },
};
</script>

<style scoped>
div {
  width: 60%;
  text-align: center;
  background: linear-gradient(rgb(14, 126, 190), rgb(5, 91, 141) 70%);
  color: white;
  text-shadow: -3px 2px 3px black;
  border: 5px outset silver;
  border-radius: 15px;
  position: absolute;
  z-index: 1;
  opacity: 0.985;
  margin-left: auto;
  margin-right: auto;
  margin-top: -3vh;
  left: 0;
  right: 0;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

label {
  padding: 0 15px 0 0;
  font-size: 1.5rem;
}
li {
  margin: 1rem;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

p.signup_button {
  width: 150px;
  float: right;
}

p.signup_button:hover {
  cursor: pointer;
}

p.signup_button:active {
  color: rgb(18, 50, 156);
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

.last_input {
  margin-bottom: 3rem;
}
</style>
