export function base64toBlob(data) {
    const base64WithoutPrefix = data.substr('data:application/pdf;base64,'.length);
    const bytes = window.atob(base64WithoutPrefix);
    let length = bytes.length;
    let out = new Uint8Array(length);
    while (length--) {
        out[length] = bytes.charCodeAt(length);
    }
    return new Blob([out], { type: 'application/pdf' });
};

export function openInNewTab(url, options) {
    const anchor = document.createElement("a");
    anchor.setAttribute("href", url);
    anchor.setAttribute("target", "_blank");
    if (options && options.download) {
        anchor.setAttribute("download", options.download || "file.pdf");
    }
    anchor.click();
}

export function openEmbedBase64(embed, options) {
    const html =
        `<html>
            ${options && options.title && `<head><title>${options.title}</title></head>`}
            <body style="margin:0!important">
            <embed width="100%" height="100%" 
                src="data:${embed.type};base64,${embed.data}" 
                type="${embed.type}" />
            </body>
        </html>`;
    const target = window.open("", "_blank");
    setTimeout(() => {
        target.document.write(html);
    }, 0);
}

export async function downloadFile(dataBase64) {
    // (A) CREATE BLOB OBJECT
    const blob = base64toBlob(dataBase64);
    // (B) FILE HANDLER & FILE STREAM
    const fileHandle = await window.showSaveFilePicker({
        suggestedName: "boleto.pdf",
        types: [{
            description: "Documentos PDF",
            accept: { "application/pdf": [".pdf"] }
        }]
    });
    const fileStream = await fileHandle.createWritable();
    // (C) WRITE FILE
    await fileStream.write(blob);
    await fileStream.close();
}

// const openPDF = async () => {

    // const anchor = document.createElement("a");
    // anchor.setAttribute("href", url);
    // anchor.setAttribute("target", "_blank");
    // // anchor.setAttribute("download", "boleto.pdf");
    // anchor.click();

    // const file = new File([blob], `boleto.pdf`, {
    //   type: "application/pdf"
    // });
    // const url = (window.URL || window.webkitURL).createObjectURL(file);
    // window.open(url, "_blank");

    // const fd = new FormData();
    // fd.set('a', blob);
    // const a= fd.get('a');
    // console.log(a)

    // var data = new FormData();
    // data.append("upfile", new Blob(["CONTENT"], { type: "text/plain" }));
    // console.log(data)

    // // window.open(`data:application/pdf;base64,${boletoBase64}`, "_blank");

    // const obj_url = URL.createObjectURL(file);
    // const iframe = document.getElementById('viewer');
    // iframe.setAttribute('src', obj_url);
    // URL.revokeObjectURL(obj_url);
//   }