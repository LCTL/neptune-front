export function dockerTimestampToJsTimestamp(input: number) {
  return input < 1000000000000 ? input * 1000 : input;
}
