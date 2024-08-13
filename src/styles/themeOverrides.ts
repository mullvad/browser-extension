import { GlobalThemeOverrides } from 'naive-ui';

export const themeOverrides: GlobalThemeOverrides = {
  common: {
    cardColor: 'rgba(41, 77, 115, 0.5)',
    fontSize: '1rem',
    lineHeight: '1.4',
  },
  Avatar: {
    color: 'transparent',
  },
  Card: {
    actionColor: 'transparent',
    borderRadius: '8px',
  },
  Drawer: {
    color: 'var(--dark-blue)',
  },
  Switch: {
    railColorActive: 'var(--success)',
  },
  Checkbox: {
    colorChecked: 'var(--blue)',
    checkMarkColor: 'var(--success)',
    border: '1px solid var(--blue)',
    borderChecked: '1px solid var(--blue)',
  },
  Tabs: {
    tabFontSizeLarge: '1.12rem',
    tabFontWeight: '600',
    tabFontWeightActive: '600',
    tabColor: 'var(--blue)',
    tabTextColorLine: '--light-grey',
    tabTextColorHoverLine: 'var(--white)',
    tabTextColorActiveLine: 'var(--white)',
    tabBorderColor: 'var(--blue)',
    barColor: 'var(--white)',
  },
};
