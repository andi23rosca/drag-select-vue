<template>
  <div class="container mx-auto mt-32 px-4">
    <div class="text-green-500 text-2xl font-semibold mb-20">
      Drag select Vue demo
    </div>
    <div class="mb-4">Drag to select items in this container</div>
    <div class="bg-gray-200 rounded-sm shadow-inner">
      <drag-select
        attribute="itemNumber"
        class="p-5 flex flex-wrap"
        v-slot="{ selected }"
        @change="selectedItems = $event"
      >
        <div
          v-for="item in 24"
          :key="item"
          :itemNumber="item"
          class="w-20 h-20 bg-white shadow-md rounded m-2 flex justify-center items-center text-lg text-gray-700"
          :class="{
            'shadow-outline': selected.includes(String(item))
          }"
        >
          {{ item }}
        </div>
      </drag-select>
    </div>
    <div class="flex mt-3">
      <div class="mr-2">Selected items:</div>
      <div class="mr-2" v-for="item in selectedItems" :key="item">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
import DragSelect from "./DragSelect.vue";
export default {
  components: { DragSelect },
  data() {
    return { selectedItems: [] };
  }
};
</script>
