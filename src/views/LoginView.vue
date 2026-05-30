<script setup lang="ts">
import { ref } from "vue";
import { useRouter, useRoute, RouterLink } from "vue-router";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import Message from "primevue/message";
import AuthLayout from "@/components/auth/AuthLayout.vue";
import { auth } from "@/stores/auth";
import { ApiError } from "@/api";

const router = useRouter();
const route = useRoute();

const email = ref("amara@afriqx.africa");
const password = ref("afriqx123");
const error = ref<string | null>(null);
const loading = ref(false);

async function submit() {
  error.value = null;
  loading.value = true;
  try {
    await auth.login(email.value.trim(), password.value);
    const redirect = typeof route.query.redirect === "string" ? route.query.redirect : "/";
    router.replace(redirect);
  } catch (e) {
    error.value = e instanceof ApiError ? e.message : "Unable to sign in";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <AuthLayout title="Welcome back" subtitle="Sign in to your AFRIQX account.">
    <form class="space-y-4" @submit.prevent="submit">
      <Message v-if="error" severity="error" :closable="false">{{ error }}</Message>

      <div>
        <label for="email" class="mb-1.5 block text-sm font-medium text-platinum-200">Email</label>
        <InputText id="email" v-model="email" type="email" autocomplete="email"
          class="w-full" placeholder="you@example.com" required />
      </div>

      <div>
        <label for="password" class="mb-1.5 block text-sm font-medium text-platinum-200">Password</label>
        <Password input-id="password" v-model="password" :feedback="false" toggle-mask
          inputClass="w-full" class="w-full" placeholder="••••••••" required />
      </div>

      <Button type="submit" label="Sign in" :loading="loading"
        class="w-full font-display font-semibold" />

      <p class="pt-2 text-center text-sm text-platinum-400">
        New to AFRIQX?
        <RouterLink to="/register" class="font-medium text-emerald-400 hover:underline">Create an account</RouterLink>
      </p>
    </form>
  </AuthLayout>
</template>
