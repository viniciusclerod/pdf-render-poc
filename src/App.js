import { base64toBlob, downloadFile, openEmbedBase64, openInNewTab } from './bankslip';
import { dataBase64 } from './data';
import { useCallback } from 'react';

function App() {

  console.log(window.navigator);
  
  const handleButton1Click = useCallback(() => {
    const blob = base64toBlob(dataBase64);
    const url = (window.URL || window.webkitURL).createObjectURL(blob);
    openInNewTab(url);
  });

  const handleButton2Click = useCallback(() => {
    openEmbedBase64({
      data: dataBase64,
      type: 'application/pdf'
    }, {
      title: 'boleto.pdf'
    });
  });

  const handleButton3Click = useCallback(() => {
    const blob = base64toBlob(dataBase64);
    const url = (window.URL || window.webkitURL).createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.setAttribute("href", url);
    anchor.setAttribute("target", "_blank");
    anchor.setAttribute("download", "boleto.pdf");
    anchor.click();
  });

  const handleButton4Click = useCallback(() => {
    downloadFile(dataBase64);
  });

  return (
    <div>
      <p>{window.navigator.userAgent}</p>
      <button onClick={handleButton1Click}>Abrir Boleto</button>
      <button onClick={handleButton2Click}>Gerar Boleto</button>
      <button onClick={handleButton3Click}>Baixar Boleto (anchor)</button>
      <button onClick={handleButton4Click}>Baixar Boleto (API)</button>
    </div>
  );
}

export default App;
