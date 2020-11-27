<template>
  <div class="login">
    <div class="container mx-auto px-4">
      <div class="flex -mx-4">
        <div class="w-full">
          <LoginForm />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/authentication/LoginForm'
export default {
  components: {
    LoginForm
  } 
}
</script>