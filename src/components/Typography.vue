<script setup lang='ts'>
type TypographyVariant = "title" | "subtitle" | "body" | "sm";

export interface ITypographyProps {
  text?: string | number;
  variant?: TypographyVariant;
  uppercase?: boolean;
}

//TODO: @types?? https://vuejs.org/guide/typescript/composition-api.html#typing-component-props
const {text, variant, uppercase} = withDefaults(defineProps<ITypographyProps>(), {
  text: "",
  variant: "body",
  uppercase: false,
});

const classOptions = `typography ${variant} ${uppercase && "uppercase"}`;

</script>

<template>
 <span :class='[classOptions]'>
   <slot>
     {{text}}
   </slot>
 </span>
</template>

<style scoped>
.typography {
  line-height: 1.2;
  font-weight: 400;
  padding: 2px;
  text-transform: none;
}

.typography.uppercase {
  text-transform: uppercase;
}

.typography.title {
  font-size: 20px;
  font-weight: 700;
}

.typography.subtitle {
  font-size: 16px;
  font-weight: 600;
}

.typography.body {
  font-size: 14px;

}
.typography.sm {
  font-size: 12px;
}

</style>
