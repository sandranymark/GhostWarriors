export function handleClose(targetSelector: string, resetSelector?: string): void {
  const targetElement = document.querySelector(targetSelector) as HTMLElement;
  const resetElement = resetSelector && (document.querySelector(resetSelector) as HTMLElement);

  if (!targetElement) {
    return;
  } else {
    targetElement.classList.add("hide");
    targetElement.style.display = "none";
    targetElement.classList.remove("animate");
  }

  if (!resetElement) {
    return;
  } else {
    resetElement.style.filter = "none";
  }
}

// Författare Adréan
