export enum FormatType {
  'prettify',
  'clean',
  'hidden',
}

export const checkAccountFormat = (value: string): boolean => {
  // The string contains between 9 and 16 digits.
  // It can also contain spaces or dashes but no other characters.
  const regex = /^(?=(?:\D*\d){9,16}\D*$)[\d -]+$/;
  return regex.test(value);
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
