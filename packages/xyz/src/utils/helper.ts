/**
 * delay function to pause the process for a given number of milliseconds
 * @param milliseconds
 * @returns Promise<void>
 **/
export const delay = (milliseconds: number): Promise<void> => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
};

/**
 * Mask a string by replacing all characters except the first n number of characters with `*`, where n defaults to 3.
 */
export function mask(str: string, show = 3): string {
  if (!str) {
    return '""';
  }

  if (str.length <= show) {
    return "*".repeat(str.length);
  }

  return str.substring(0, show) + "*".repeat(str.length - show);
}

export const cleanString = (input: string): string => {
  // Remove \r and \n
  let cleaned = input.replace(/\r|\n/g, " ");

  // Remove <br/> and other HTML tags
  cleaned = cleaned.replace(/<br\s*\/?>|<\/?\w+.*?>/gi, " ");

  return cleaned.trim();
};
