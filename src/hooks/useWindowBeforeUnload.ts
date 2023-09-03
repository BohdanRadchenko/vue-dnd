export const useWindowBeforeUnload = (callback: () => void): void => {
  window.onbeforeunload = function() {
    callback();
  }
}
