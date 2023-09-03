import { onBeforeMount, onBeforeUnmount, ref } from 'vue'

export const useChangeMainBackground = (set: string) => {
  const varColorTag = "--background"
  const varColorTagMain = "var(--background-main)"
  const style = getComputedStyle(document.body)
  const root = document.documentElement.style;

  const init = ref<string>(style.getPropertyValue(varColorTag))

  onBeforeMount(() => {
    init.value = style.getPropertyValue(varColorTag);
    root.setProperty(varColorTag, set);
  })

  onBeforeUnmount(() => {
    root.setProperty(varColorTag, varColorTagMain);
  })
}
