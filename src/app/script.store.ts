interface Scripts {
    name: string;
    src: string;
}  
export const ScriptStore: Scripts[] = [

    {name: 'pdfjs', src: "assets/shared/pdf.js"},
    {name: 'pdfviewer', src: "assets/shared/pdf_viewer.js"},
    {name: 'indexjs', src: "assets/index.js"}
];