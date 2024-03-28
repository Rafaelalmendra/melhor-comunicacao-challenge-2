/* eslint-disable @typescript-eslint/strict-boolean-expressions */
const formatMoney = (value: string) => {
  const onlyDigits = value.replace(/[^\d]/g, '');

  if (onlyDigits === '0') {
    return '';
  }

  const cents = onlyDigits.slice(-2).padStart(2, '0');
  const reais = onlyDigits.slice(0, -2).replace(/^0+/, '') || '0';
  const formattedReais = reais.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

  return `R$ ${formattedReais},${cents}`;
};

export { formatMoney };
