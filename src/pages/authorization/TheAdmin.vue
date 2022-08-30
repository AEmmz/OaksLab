<template>
  <div class="q-ma-xl column items-center">
    <q-card class="my-card q-px-md column items-center bg-secondary">
      <q-card
        class="my-card-inner q-pa-lg column"
        square>
        <q-card-section class="self-center">
          <div class="text-h2">Admin Settings</div>
        </q-card-section>
        <q-card-section class="q-gutter-y-md">
          <h6>User Details</h6>
          <div class="text-subtitle1 q-gutter-y-sm">
            <p>Username:<br>{{ username }}</p>
            <p>Email:<br>{{ userEmail }}</p>
          </div>

        </q-card-section>
        <q-card-section class="q-gutter-y-sm">
          <h6>Change Username</h6>
          <div class="row q-gutter-x-lg">
            <q-input
              class="input"
              v-model="newUsername"
              type="text"
              label="New Username"
              clearable
              rounded
              outlined>
              <template v-slot:prepend>
                <q-icon name="fa-solid fa-user"/>
              </template>
            </q-input>
            <q-btn
              class="submitButton"
              padding="md"
              label="Update"
              type="submit"
              icon="fas fa-pen-to-square"
              rounded
              size="md"
              color="secondary"
              unelevated></q-btn>
          </div>
        </q-card-section>
        <q-card-section class="q-gutter-y-sm">
          <h6>Change E-Mail</h6>
          <div
            v-if="emailError"
            class="flex items-center q-gutter-x-sm">
            <q-icon
              size="sm"
              name="fas fa-circle-exclamation"
              color="negative"/>
            <span class="text-subtitle1 text-negative">{{ emailError }}</span>
          </div>
          <div
            v-if="emailSuccess"
            class="flex items-center q-gutter-x-sm">
            <q-icon
              size="sm"
              name="fas fa-circle-check"
              color="positive"/>
            <span class="text-subtitle1 text-positive">{{ emailSuccess }}</span>
          </div>
          <q-form
            @submit.prevent="updateEmail"
            class="row q-gutter-x-lg">
            <div class="password-cont q-gutter-y-md">
              <q-input
                class="password-input"
                v-model="newEmail"
                type="email"
                label="New E-Mail"
                clearable
                rounded
                outlined>
                <template v-slot:prepend>
                  <q-icon name="fa-solid fa-at"/>
                </template>
              </q-input>
              <q-input
                class="password-input"
                v-model="newEmailPassword"
                type="password"
                label="Current Password"
                clearable
                rounded
                outlined>
                <template v-slot:prepend>
                  <q-icon name="fa-solid fa-key"/>
                </template>
              </q-input>
            </div>
            <div class="row items-center submitButton">
              <q-btn
                class="passwordButton"
                padding="md"
                label="Update"
                type="submit"
                icon="fas fa-pen-to-square"
                rounded
                size="md"
                color="secondary"
                unelevated></q-btn>
            </div>
          </q-form>
        </q-card-section>

        <q-card-section class="q-gutter-y-sm">
          <h6>Change Password</h6>
          <div
            v-if="passwordError"
            class="flex items-center q-gutter-x-sm">
            <q-icon
              size="sm"
              name="fas fa-circle-exclamation"
              color="negative"/>
            <span class="text-subtitle1 text-negative">{{ passwordError }}</span>
          </div>
          <div
            v-if="passwordSuccess"
            class="flex items-center q-gutter-x-sm">
            <q-icon
              size="sm"
              name="fas fa-circle-check"
              color="positive"/>
            <span class="text-subtitle1 text-positive">{{ passwordSuccess }}</span>
          </div>
          <q-form
            @submit.prevent="updatePassword"
            class="row q-gutter-x-lg">
            <div class="password-cont q-gutter-y-md">
              <q-input
                class="password-input"
                v-model="currentPassword"
                type="password"
                label="Current Password"
                clearable
                rounded
                outlined>
                <template v-slot:prepend>
                  <q-icon name="fa-solid fa-key"/>
                </template>
              </q-input>
              <q-input
                class="password-input"
                v-model="newPassword"
                type="password"
                label="New Password"
                clearable
                rounded
                outlined>
                <template v-slot:prepend>
                  <q-icon name="fa-solid fa-key"/>
                </template>
              </q-input>
              <q-input
                class="password-input"
                v-model="newPasswordConfirm"
                type="password"
                label="Confirm New Password"
                clearable
                rounded
                outlined>
                <template v-slot:prepend>
                  <q-icon name="fa-solid fa-key"/>
                </template>
              </q-input>
            </div>
            <div class="row items-center submitButton">
              <q-btn
                class="passwordButton"
                padding="md"
                label="Update"
                type="submit"
                icon="fas fa-pen-to-square"
                rounded
                size="md"
                color="secondary"
                unelevated></q-btn>
            </div>
          </q-form>
        </q-card-section>
        <q-card-section class="q-gutter-y-sm">
          <h6>Delete Account</h6>
          <q-btn
            class="delete-button"
            padding="md"
            label="Delete Account"
            type="submit"
            icon="fas fa-trash"
            rounded
            size="md"
            color="negative"
            unelevated></q-btn>
        </q-card-section>
      </q-card>
    </q-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "TheAdmin",
  data() {
    return {
      newUsername: "",
      newEmail: "",
      newEmailPassword: "",
      currentPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
      passwordError: "",
      passwordSuccess: "",
      emailError: "",
      emailSuccess: ""

    };
  },
  computed: {
    ...mapGetters("authorization", ["currentUser", "username"]),
    userEmail() {
      return this.currentUser.email;
    }
  },
  methods: {
    ...mapActions("authorization", ["updatePasswordDb", "updateEmailDb", "updateUsernameDb", "deleteAccountDb"]),
    updateUsername() {

    },

    async updateEmail() {
      if (!this.newEmail || !this.newEmailPassword) {
        this.emailError = "Please fill out all fields to change email.";
        return;
      }
      if (this.newEmail === this.currentUser.email) {
        this.emailError = "Current email and new email cannot be the same.";
        return;
      }
      const update = await this.updateEmailDb({
        newEmail: this.newEmail,
        currentPass: this.newEmailPassword
      });
      if (update?.error) {
        this.emailError = update.message;
        return;
      }
      this.emailError = "";
      this.emailSuccess = update.message;

    },
    async updatePassword() {
      if (!this.currentPassword || !this.newPassword || !this.newPasswordConfirm) {
        this.passwordError = "Please fill out all fields to change password.";
        return;
      }
      if (this.currentPassword === this.newPassword) {
        this.passwordError = "Current and new password cannot be the same.";
        return;
      }
      if (this.newPassword !== this.newPasswordConfirm) {
        this.passwordError = "Both new password fields must match.";
        return;
      }
      const update = await this.updatePasswordDb({
        currentPass: this.currentPassword,
        newPass: this.newPassword
      });
      if (update?.error) {
        this.passwordError = update.message;
        return;
      }
      this.passwordError = "";
      this.passwordSuccess = update.message;
    },

    async deleteAccount() {
      const deleteAccount = await this.deleteAccountDb();
    }
  }
};
</script>

<style scoped>

.my-card, .delete-button {
  width: 40%;
}

.password-cont, .input {
  width: 60%;
}

.submitButton {
  width: 20%;
}

.passwordButton, .password-input, .my-card-inner {
  width: 100%;
}

</style>
