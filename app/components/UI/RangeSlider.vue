<script setup lang="ts">
  import { computed, ref, watch } from "vue";

  import clamp from "#shared/clamp";
  import { MAX_PERCENT_VALUE, MIN_PERCENT_VALUE } from "~~/constants/percent";

  interface RangeSliderProps {
    label: string;
    max?: number;
    maxLabel?: string;
    min?: number;
    minLabel?: string;
    step?: number;
  }

  const props = withDefaults(defineProps<RangeSliderProps>(), {
    step: 1,
    min: 10,
    max: 50,
    minLabel: "от",
    maxLabel: "до",
  });

  const model = defineModel<[number, number]>({
    default: [10, 50],
  });

  const lower = ref<number>(model.value[0]);
  const upper = ref<number>(model.value[1]);

  const displayedLower = computed(() => clamp(lower.value, props.min, props.max));
  const displayedUpper = computed(() => clamp(upper.value, props.min, props.max));

  const labelValues = computed(() => ({
    lower: displayedLower.value.toLocaleString(),
    upper: displayedUpper.value.toLocaleString(),
  }));

  const labels = computed(() => [
    [props.minLabel, labelValues.value.lower],
    [props.maxLabel, labelValues.value.upper],
  ]);

  const rangePercent = computed(() => {
    const total = props.max - props.min;

    if (total <= MIN_PERCENT_VALUE || !isFinite(total)) {
      return { left: MIN_PERCENT_VALUE, right: MIN_PERCENT_VALUE };
    }

    const left = clamp(
      ((displayedLower.value - props.min) / total) * MAX_PERCENT_VALUE,
      MIN_PERCENT_VALUE,
      MAX_PERCENT_VALUE
    );
    const right = clamp(
      ((displayedUpper.value - props.min) / total) * MAX_PERCENT_VALUE,
      MIN_PERCENT_VALUE,
      MAX_PERCENT_VALUE
    );

    return { left, right };
  });

  const progressStyle = computed(() => {
    const { left, right } = rangePercent.value;
    return {
      left: `${left}%`,
      width: `${Math.max(MIN_PERCENT_VALUE, right - left)}%`,
    };
  });

  const commitValues = () => {
    const minVal = Math.min(clamp(lower.value, props.min, props.max), clamp(upper.value, props.min, props.max));
    const maxVal = Math.max(clamp(lower.value, props.min, props.max), clamp(upper.value, props.min, props.max));

    lower.value = minVal;
    upper.value = maxVal;
    model.value = [minVal, maxVal];
  };

  watch(
    model,
    ([min, max]) => {
      lower.value = clamp(min, props.min, props.max);
      upper.value = clamp(max, props.min, props.max);
    },
    { immediate: true }
  );
</script>

<template>
  <div class="range-slider">
    <p class="range-slider__title">{{ label }}</p>

    <div class="range-slider__labels">
      <span v-for="([l, v], index) of labels" :key="index" class="range-slider__label">
        {{ l }} <strong>{{ v }}</strong>
      </span>
    </div>

    <div class="range-slider__track">
      <div class="range-slider__progress" :style="progressStyle" />

      <input
        v-model.number="lower"
        type="range"
        :min="min"
        :max="max"
        :step="step"
        class="range-slider__thumb"
        aria-label="Минимальное значение"
        @mouseup="commitValues"
        @touchend="commitValues"
      />

      <input
        v-model.number="upper"
        type="range"
        :min="min"
        :max="max"
        :step="step"
        class="range-slider__thumb"
        aria-label="Максимальное значение"
        @mouseup="commitValues"
        @touchend="commitValues"
      />
    </div>
  </div>
</template>

<style lang="scss">
  .range-slider {
    height: max-content;

    &__title {
      @include fluid-text(14, 13);
      font-weight: 400;
      line-height: rem(20);
      margin-bottom: rem(8);
    }

    &__labels {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;

      .range-slider__label {
        font-size: 0.875rem;
        color: #7a7a7a;

        strong {
          margin-left: 0.25rem;
          font-weight: 600;
          color: #1a1a1a;
        }
      }
    }

    &__track {
      position: relative;
      height: 6px;
      background-color: #d3d3d3;
      border-radius: 3px;
    }

    &__progress {
      position: absolute;
      height: 100%;
      background-color: #28a745;
      border-radius: 3px;
    }

    &__thumb {
      margin: 0;
      position: absolute;
      top: -6px;
      width: 100%;
      height: 18px;
      background: none;
      pointer-events: none;
      appearance: none;

      &::-webkit-slider-thumb {
        pointer-events: all;
        appearance: none;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background-color: var(--color-green);
        cursor: pointer;
        border: none;
      }

      &::-moz-range-thumb {
        pointer-events: all;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background-color: var(--color-green);
        cursor: pointer;
        border: none;
      }
    }
  }
</style>
