import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  /* Importa a fonte 'Inter' do Google Fonts */
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

  /* Removemos margens e definimos a fonte padrão para tudo */
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
    background-color: #0f172a; /* bg-slate-900 */
    color: #f8fafc; /* text-slate-50 */
  }
`;