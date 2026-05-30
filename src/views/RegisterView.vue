<script setup lang="ts">
import { ref } from "vue";
import { useRouter, RouterLink } from "vue-router";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import Message from "primevue/message";
import AuthLayout from "@/components/auth/AuthLayout.vue";
import { auth } from "@/stores/auth";
import { ApiError } from "@/api";

const router = useRouter();

const name = ref("");
const email = ref("");
const password = ref("");
const error = ref<string | null>(null);
const loading = ref(false);

async function submit() {
  error.value = null;
  if (password.value.length < 6) {
    error.value = "Password must be at least 6 characters";
    return;
  }
  loading.value = true;
  try {
    await auth.register(email.value.trim(), password.value, name.value.trim());
    router.replace("/");
  } catch (e) {
    error.value = e instanceof ApiError ? e.message : "Unable to create account";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <AuthLayout title="Create your account" subtitle="Join AFRIQX and start trading African markets.">
    <form class="space-y-4" @submit.prevent="submit">
      <Message v-if="error" severity="error" :closable="false">{{ error }}</Message>

      <div>
        <label for="name" class="mb-1.5 block text-sm font-medium text-platinum-200">Full name</label>
        <InputText id="name" v-model="name" autocomplete="name"
          class="w-full" placeholder="Amara Okafor" required />
      </div>

      <div>
        <label for="email" class="mb-1.5 block text-sm font-medium text-platinum-200">Email</label>
        <InputText id="email" v-model="email" type="email" autocomplete="email"
          class="w-full" placeholder="you@example.com" required />
      </div>

      <div>
        <label for="password" class="mb-1.5 block text-sm font-medium text-platinum-200">Password</label>
        <Password input-id="password" v-model="password" :feedback="false" toggle-mask
          inputClass="w-full" class="w-full" placeholder="At least 6 characters" required />
      </div>

      <Button type="submit" label="Create account" :loading="loading"
        class="w-full font-display font-semibold" />

      <p class="pt-2 text-center text-sm text-platinum-400">
        Already have an account?
        <RouterLink to="/login" class="font-medium text-emerald-400 hover:underline">Sign in</RouterLink>
      </p>
    </form>
  </AuthLayout>
</template>
