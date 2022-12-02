<template>
  <div class="w-full h-full pl-6">
    <el-scrollbar class="form w-50">
      <custom-form
        :model="form"
        :rule="rules"
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
import { formRule1 } from '../../api/types/form'
import { reactive } from 'vue'
import CustomForm from '../../components/FormComponents/CustomForm.vue'
import FormItem from '../../components/FormComponents/FormItem.vue'
import InputWithError from '../../components/FormComponents/InputWithError.vue'
const form = reactive({
  name: '',
  phone: ''
})
const rule: formRule1 = {
  name: [],
  phone: []
}
const rules = reactive(rule)
</script>

<style lang="scss" scoped>
.form {
    width: 500px;
}
</style>
