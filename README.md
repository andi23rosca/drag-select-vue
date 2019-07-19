# drag-select-vue

Simple Vue library that enables drag to select functionality.

Live demo [here](https://andi23rosca.github.io/drag-select-vue/)

## Installation

```
  npm install drag-select-vue
```

## Usage

```
import DragSelect from "drag-select-vue";

//In your template
<drag-select attribute="userDefinedAttributeName" color="blue" :opacity="0.8">
  <template v-slot="{ selected }">
    <p userDefinedAttributeName="first"
       :class="{'blue-text': selected.includes('first')}">Item 1</p>
    <p userDefinedAttributeName="second"
       :class="{'blue-text': selected.includes('second')}">Item 2</p>
  </template>
</drag-select>
```
