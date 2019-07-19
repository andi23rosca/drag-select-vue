# drag-select-vue

Simple Vue library that enables drag to select functionality.

Live demo [here](https://andi23rosca.github.io/drag-select-vue/)

Run the demo locally by cloning [this](https://github.com/andi23rosca/drag-select-vue) and doing 

```
  npm install
  npm run serve
```

## Installation

```
  npm install drag-select-vue
```

## Usage
Import the component and register it in your own component.
```javascript
import DragSelect from "drag-select-vue";

export default {
  components: { DragSelect },
  ...
}
```

Drag select uses an attribute prop to identify the children that it can select. Make sure to pass the custom name to the frag-select component and also that the children inside have the attribute set with an unique identifier for each one.

For example, these divs have the "customAttribute" set on them with the values 1, 2, and 3

```html
<drag-select attribute="customAttribute">
  <div v-for="item in [1,2,3]" :customAttribute="item" />
</drag-select>
```
Drag select will give you back a list of the custom attribute values that were selected.

There are 2 ways in which you can get access to the selected values.

## 1. Scoped slot prop

Use this method if you don't need access to the list from outside the component, for example if you just want to set some styling on the selected children.

Selected is a list of strings because html attributes 
are stored as strings no matter the original type. 

That is why the includes method needs a string 
conversion to be correct even though the original
item set on the attribute is a number

```html
<drag-select attribute="attr">
  <template v-slot="{ selected }">
    <div v-for="item in [1,2,3]" 
         :attr="item"
         :class="{'item-selected-class': selected.includes(String(item))}"/>
  </template>
</drag-select>
```


## 2. Change event emitted

Use this when you need access to the list of selected items outside of the drag select component

```javascript
<div>
  <drag-select attribute="attr" @change="selected = $event">
      <div v-for="item in [1,2,3]" 
          :attr="item"
          :class="{'item-selected-class': selected.includes(String(item))}"/>
  </drag-select>
</div>

export default {
  components: { DragSelect },
  data() {
    return {
      //Now you can use this anywhere in your template or js code
      selected: []
    }
  }
}
```