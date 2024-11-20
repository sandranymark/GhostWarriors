export function handleRegister(targetSelector: string, resetSelector?: string): void {
  const targetElement = document.querySelector(targetSelector) as HTMLElement;
  const resetElement = resetSelector && (document.querySelector(resetSelector) as HTMLElement);
  if (targetElement) {
    targetElement.classList.add("hide");
  }

  if (resetElement) {
    resetElement.classList.remove("hide");
  }
}
// Författare Adréan
