<script setup lang="ts">
  interface UIToggleOptionsListProps {
    label?: string;
    ariaLabel?: string;
    options: UIToggleOptionsListPropsOption[];
  }

  export interface UIToggleOptionsListPropsOption {
    value: number;
    label: string;
    disabled: boolean;
  }

  defineProps<UIToggleOptionsListProps>();

  const model = defineModel<string[]>({ default: [] });

  const isSelected = (value: string) => {
    return model.value.includes(value);
  };

  const toggleSelection = (value: string) => {
    const newValue = isSelected(value) ? model.value.filter((v) => v != value) : [...model.value, value];

    model.value = newValue;
  };
</script>

<template>
  <fieldset class="ui-toggle-options-list" :aria-label="ariaLabel">
    <legend v-if="label" class="ui-toggle-options-list__label">{{ label }}</legend>

    <label
      v-for="option in options"
      :key="option.value"
      :for="`toggle_item_${option.value}`"
      class="ui-toggle-options-list__item"
      :class="{ 'is-selected': isSelected(option.value), 'is-disabled': option.disabled }"
    >
      <input
        :id="`toggle_item_${option.value}`"
        type="checkbox"
        :value="option.value"
        :disabled="option.disabled"
        :checked="isSelected(option.value)"
        @change="toggleSelection(option.value)"
      />

      <span>
        <slot name="option" :option="option">
          {{ option.label }}
        </slot>
      </span>
    </label>
  </fieldset>
</template>

<style lang="scss">
  .ui-toggle-options-list {
    display: flex;
    gap: rem(16);

    &__item {
      @include square(44px);

      input {
        @include visually-hidden();
      }

      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
      background-color: var(--color-light);
      border: none;
      border-radius: 50%;
      transition-duration: var(--transition-duration);
      transition-property: background-color, box-shadow, color;

      @include hover {
        background-color: var(--color-green);
        color: var(--color-light);
      }

      &.is-selected {
        background-color: var(--color-green);
        color: var(--color-light);
        box-shadow: 0 rem(6) rem(20) 0 rgba(149, 208, 161, 1);
      }

      &.is-disabled {
        opacity: 0.4;
        pointer-events: none;
        background-color: var(--color-light);
        box-shadow: none;
      }
    }
  }
</style>
