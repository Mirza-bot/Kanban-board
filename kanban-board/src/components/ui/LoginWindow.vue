<template>
  <div class="container">
    <form @submit.prevent>
      <div class="email_input">
        <label for="email">E-Mail: </label>
        <input type="email" name="email" v-model="email" />
      </div>
      <p class="invalid_input" v-show="!formIsValid">Invalid E-Mail-Adress.</p>
      <div class="password_input">
        <label for="password">Password: </label>
        <input type="password" name="password" v-model="password" />
      </div>
      <p class="invalid_input" v-show="!formIsValid">
        Password must be at least 6 charakters or numbers long.
      </p>
      <div class="login_buttons">
        <standard-button mode="style-accept" @click="submitForm">{{
          buttonText
        }}</standard-button>
        <standard-button mode="style-cancle" @click="toggleLoginWindow"
          >Cancle</standard-button
        >
      </div>
      <p class="signup_button" @click="changeToSignup">{{ switchText }}</p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mode: "login",
      buttonText: "Log in",
      switchText: "Sign up instead?",
      formIsValid: true,
      email: "",
      password: "",
    };
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }

      this.$store.commit("loading");
      this.$store.commit("autenticatingSwitch");

      try {
        if (this.mode === "login") {
          await this.$store.dispatch("login", {
            email: this.email,
            password: this.password,
          });
        } else {
          await this.$store.dispatch("signup", {
            email: this.email,
            password: this.password,
          });
        }
      } catch (err) {
        console.log(err.message);
      }

      this.$store.commit("loading");
    },
    changeToSignup() {
      if (this.buttonText === "Log in") {
        this.mode = "signup";
        this.buttonText = "Sign up";
        this.switchText = "Log in instead?";
      } else {
        this.mode = "login";
        this.buttonText = "Log in";
        this.switchText = "Sign up instead?";
      }
    },
    toggleLoginWindow() {
      this.$store.commit("autenticatingSwitch");
      this.formIsValid = true;
    },
  },
};
</script>

<style scoped>
div.container {
  width: 60%;
  text-align: center;
  background: linear-gradient(rgb(14, 126, 190), rgb(5, 91, 141) 70%);
  color: white;
  text-shadow: -3px 2px 3px black;
  border: 3px solid white;
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

.email_input {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;
}

.password_input {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: -43px;
}

.login_buttons {
  margin-top: 2rem;
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

.invalid_input {
  color: red;
}
</style>
