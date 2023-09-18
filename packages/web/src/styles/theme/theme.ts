import { createTheme } from '@mui/material';

export const themeDark = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212', // これで背景色が黒になります。
      paper: '#1e1e1e', // MUIコンポーネントの背景色（例えば、CardやPaper）
    },
    text: {
      primary: '#ffffff', // 主要なテキストの色
      secondary: '#90caf9', // 二次的なテキストの色
    },
  },
});
