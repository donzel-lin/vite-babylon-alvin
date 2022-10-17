<template>
  <div class="w-full h-full pl-6">
    <el-scrollbar class="form w-50">
      <!-- <el-form
        label="left"
        label-width="100px"
      >
        <el-form-item label="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="phone">
          <el-input v-model="form.phone" />
        </el-form-item>
      </el-form> -->
      <custom-form
        :model="form"
        :rules="rules"
      >
        <form-item label="name">
          <input-with-error
            :filed-value="form.name"
          />
        </form-item>
      </custom-form>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import CustomForm from '../../components/FormComponents/CustomForm.vue'
import FormItem from '../../components/FormComponents/FormItem.vue'
import InputWithError from '../../components/FormComponents/InputWithError.vue'
const form = reactive({
  name: '',
  phone: ''
})
const rules = reactive({
  name: [],
  phone: []
})
</script>

<style lang="scss" scoped>
.form {
    width: 500px;
}
</style>
