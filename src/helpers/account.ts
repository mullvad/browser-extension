export enum FormatType {
  'prettify',
  'clean',
  'hidden',
}

export const checkFormat = (value: string): boolean => {
  const containsSixteenDigits = /^(\d[\s-]*){16}$/;
  return containsSixteenDigits.test(value);
};

export const formatAccount = (accountNumber: string, type: FormatType) => {
  switch (type) {
    case FormatType.clean:
      // Remove space and dashes
      return accountNumber.replace(/-|\s/g, '');
    case FormatType.hidden:
      return '•••• •••• •••• ••••';
    case FormatType.prettify:
      // Add space every 4 chars
      return accountNumber.match(/.{1,4}/g)!.join(' ');
    default:
      return '';
  }
};
